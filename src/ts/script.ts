const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const ImgFront = document.querySelector(".app__image");
const Tittle = document.querySelector(".app__title");
const Buttons = document.querySelectorAll(".app__card-button");
const TimeinScreen = document.querySelector("#timer");
const MusicFoco = document.querySelector("#alternar-musica");
const Music = new Audio("/scr/sons/luna-rise-part-one.mp3");
const StartPauseBT = document.querySelector("#start-pause");
const StartAndPauseBT = document.querySelector("#start-pause span");
const StartAndPauseBTImg = document.querySelector(".app__card-primary-butto-icon");
const Reset = document.querySelector("#restart");
const PlaySound = new Audio("./src/sons/play.wav");
const PauseSound = new Audio("./src/sons/pause.mp3");
const FinishSound = new Audio("./src/sons/beep.mp3");
const ResetSound = new Audio("./src/sons/restart.mp3");

let timeinSeconds = 1500;
let Interval: number | null | undefined = null;

if (MusicFoco) {
  MusicFoco.addEventListener("change", () => {
    Music.loop = true;

    if (Music.paused) {
      Music.play();
      Music.volume = 0.1;
    } else {
      Music.pause();
      Music.currentTime = 0;
    }
  });
}
if (focoBt) {
  focoBt.addEventListener("click", () => {
    Zero();
    timeinSeconds = 1500;
    alterarCaminho("foco");
    focoBt.classList.add("active");
  });
}
if (curtoBt) {
  curtoBt.addEventListener("click", () => {
    Zero();
    timeinSeconds = 300;
    alterarCaminho("descanso-curto");
    curtoBt.classList.add("active");
  });
}

if (longoBt) {
  longoBt.addEventListener("click", () => {
    Zero();
    timeinSeconds = 900;
    alterarCaminho("descanso-longo");
    longoBt.classList.add("active");
  });
}

function alterarCaminho(contexto: string) {
  ShowTime();
  Buttons.forEach(function (contexto) {
    contexto.classList.remove("active");
  });
  html?.setAttribute("data-contexto", contexto);
  if (ImgFront) {
    ImgFront.setAttribute("src", `./src/imagens/${contexto}.png`);
  }

  switch (contexto) {
    case "foco":
      Tittle!.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`;
      break;
    case "descanso-curto":
      Tittle!.innerHTML = `Que tal dar<br>uma respirada?<br>
            <strong class="app__title-strong">Faça uma<br>pausa curta!</strong>`;
      break;
    case "descanso-longo":
      Tittle!.innerHTML = `Hora de voltar<br>á superficie.<br>
            <strong class="app__title-strong">Faça uma<br>pausa longa.</strong>`;
    default:
      break;
  }
}

const Countdown = () => {
  if (timeinSeconds <= 0) {
    FinishSound.play();
    FinishSound.volume = 0.1;
    alert("Tempo finalizado!");
    Zero();
    return;
  }
  timeinSeconds -= 1;
  ShowTime();
};

if (StartPauseBT) {
  StartPauseBT.addEventListener("click", StartAndPause);
}
function StartAndPause() {
  if (Interval) {
    PauseSound.play();
    PauseSound.volume = 0.1;
    Zero();
    return;
  }
  PlaySound.play();
  PlaySound.volume = 0.1;
  Interval = setInterval(Countdown, 1000);
  StartAndPauseBTImg?.setAttribute("src", "./src/imagens/pause.png");
  StartAndPauseBT!.textContent = "Pausar";
}
function Zero() {
  if (Interval !== null && Interval !== undefined) {
    clearInterval(Interval);
  }
  StartAndPauseBTImg?.setAttribute("src", "./src/imagens/play_arrow.png");
  StartAndPauseBT!.textContent = "Começar";
  Interval = null;
}

function ShowTime() {
  const Time = new Date(timeinSeconds * 1000);
  const TimeFormated = Time.toLocaleTimeString("pt-Br", { minute: "2-digit", second: "2-digit" });
  TimeinScreen!.innerHTML = `${TimeFormated}`;
}

if (Reset) {
  Reset.addEventListener("click", RestartTime);
} else {
  console.error("Elemento 'Reset' não encontrado.");
}

function RestartTime() {
  if (focoBt?.classList.contains("active")) {
    timeinSeconds = 1500;
  } else if (curtoBt?.classList.contains("active")) {
    timeinSeconds = 300;
  } else if (longoBt?.classList.contains("active")) {
    timeinSeconds = 900;
  }
  ResetSound.play();
  ResetSound.volume = 0.1;
  Zero();
  ShowTime();
}

ShowTime();
