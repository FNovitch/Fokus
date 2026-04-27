type SessionKey = "foco" | "descanso-curto" | "descanso-longo";

type SessionConfig = {
  duration: number;
  title: string;
  heroImageAlt: string;
  pageLabel: string;
};

const sessionConfig: Record<SessionKey, SessionConfig> = {
  foco: {
    duration: 25 * 60,
    title: "Mergulhe no que importa e mantenha uma cadência sustentável.",
    heroImageAlt: "Ilustração do modo foco do aplicativo",
    pageLabel: "Foco"
  },
  "descanso-curto": {
    duration: 5 * 60,
    title: "Pausas curtas ajudam a recuperar a atenção sem quebrar o ritmo.",
    heroImageAlt: "Ilustração do modo pausa curta do aplicativo",
    pageLabel: "Pausa curta"
  },
  "descanso-longo": {
    duration: 15 * 60,
    title: "Use pausas mais longas para respirar, se reorganizar e voltar melhor.",
    heroImageAlt: "Ilustração do modo pausa longa do aplicativo",
    pageLabel: "Pausa longa"
  }
};

const html = document.documentElement;
const timerElement = document.querySelector<HTMLElement>("#timer");
const startPauseButton = document.querySelector<HTMLButtonElement>("#start-pause");
const startPauseLabel = document.querySelector<HTMLSpanElement>("#start-pause span");
const startPauseIcon = document.querySelector<HTMLImageElement>(".app__card-primary-butto-icon");
const restartButton = document.querySelector<HTMLButtonElement>("#restart");
const musicToggle = document.querySelector<HTMLInputElement>("#alternar-musica");
const contextText = document.querySelector<HTMLElement>(".app__title");
const heroImage = document.querySelector<HTMLImageElement>(".app__image");
const statusMessage = document.querySelector<HTMLElement>("#status-message");
const modeButtons = Array.from(document.querySelectorAll<HTMLButtonElement>(".app__card-button"));

const backgroundMusic = new Audio("./src/sons/luna-rise-part-one.mp3");
const playSound = new Audio("./src/sons/play.wav");
const pauseSound = new Audio("./src/sons/pause.mp3");
const finishSound = new Audio("./src/sons/beep.mp3");
const resetSound = new Audio("./src/sons/restart.mp3");

let activeSession: SessionKey = "foco";
let totalSeconds = sessionConfig[activeSession].duration;
let remainingSeconds = totalSeconds;
let intervalId: number | null = null;
let isPaused = true;
let endTime = 0;
let statusTimeoutId: number | null = null;

backgroundMusic.loop = true;
backgroundMusic.volume = 0.12;
playSound.volume = 0.12;
pauseSound.volume = 0.12;
finishSound.volume = 0.16;
resetSound.volume = 0.12;

function formatTime(total: number) {
  const minutes = Math.floor(total / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(total % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
}

function updatePageTitle() {
  document.title = `${formatTime(remainingSeconds)} | ${sessionConfig[activeSession].pageLabel} - Fokus`;
}

function updateTimerDisplay() {
  if (!timerElement) return;

  timerElement.textContent = formatTime(remainingSeconds);
  updatePageTitle();
}

function updateStartPauseButton() {
  if (!startPauseButton || !startPauseLabel || !startPauseIcon) return;

  const isStartState = isPaused;

  startPauseButton.setAttribute("aria-label", isStartState ? "Iniciar temporizador" : "Pausar temporizador");
  startPauseLabel.textContent = isStartState ? "Começar" : "Pausar";
  startPauseIcon.src = isStartState ? "./src/imagens/play_arrow.png" : "./src/imagens/pause.png";
}

function updateActiveButton() {
  modeButtons.forEach((button) => {
    const isActive = button.dataset.contexto === activeSession;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
}

function updateContextContent() {
  const config = sessionConfig[activeSession];

  html.setAttribute("data-contexto", activeSession);

  if (contextText) {
    contextText.textContent = config.title;
  }

  if (heroImage) {
    heroImage.src = `./src/imagens/${activeSession}.png`;
    heroImage.alt = config.heroImageAlt;
  }

  updateActiveButton();
}

function clearCountdown() {
  if (intervalId !== null) {
    window.clearInterval(intervalId);
    intervalId = null;
  }
}

function showStatus(message: string) {
  if (!statusMessage) return;

  statusMessage.textContent = message;
  statusMessage.classList.add("is-visible");

  if (statusTimeoutId !== null) {
    window.clearTimeout(statusTimeoutId);
  }

  statusTimeoutId = window.setTimeout(() => {
    statusMessage.classList.remove("is-visible");
  }, 3200);
}

function resetTimer(playFeedback = false) {
  if (playFeedback) {
    void resetSound.play();
  }

  clearCountdown();
  isPaused = true;
  remainingSeconds = totalSeconds;
  updateTimerDisplay();
  updateStartPauseButton();
}

function finishCountdown() {
  clearCountdown();
  isPaused = true;
  remainingSeconds = 0;
  updateTimerDisplay();
  updateStartPauseButton();
  void finishSound.play();
  showStatus("Sessão concluída. Hora de decidir o próximo passo.");
}

function tick() {
  const secondsLeft = Math.max(Math.ceil((endTime - Date.now()) / 1000), 0);
  remainingSeconds = secondsLeft;
  updateTimerDisplay();

  if (secondsLeft === 0) {
    finishCountdown();
  }
}

function startCountdown() {
  clearCountdown();
  isPaused = false;
  endTime = Date.now() + remainingSeconds * 1000;
  updateStartPauseButton();
  tick();
  intervalId = window.setInterval(tick, 250);
}

function pauseCountdown() {
  clearCountdown();
  isPaused = true;
  updateStartPauseButton();
}

function toggleCountdown() {
  if (isPaused) {
    void playSound.play();
    startCountdown();
    return;
  }

  void pauseSound.play();
  pauseCountdown();
}

function changeSession(session: SessionKey) {
  activeSession = session;
  totalSeconds = sessionConfig[session].duration;
  remainingSeconds = totalSeconds;
  updateContextContent();
  resetTimer();
}

musicToggle?.addEventListener("change", () => {
  if (musicToggle.checked) {
    void backgroundMusic.play();
    return;
  }

  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
});

startPauseButton?.addEventListener("click", toggleCountdown);

restartButton?.addEventListener("click", () => {
  resetTimer(true);
  showStatus("Temporizador reiniciado.");
});

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const session = button.dataset.contexto as SessionKey | undefined;

    if (!session) return;

    changeSession(session);
  });
});

updateContextContent();
updateTimerDisplay();
updateStartPauseButton();
