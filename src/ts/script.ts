const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const ImgFront = document.querySelector(".app__image");
const Tittle = document.querySelector(".app__title");
const Buttons = document.querySelectorAll(".app__card-button");
const TimeinScreen = document.querySelector("#timer");
const MusicFoco = document.querySelector("#alternar-musica");
const Music = new Audio("./src/sons/luna-rise-part-one.mp3");
const StartPauseBT = document.querySelector("#start-pause");
const StartAndPauseBT = document.querySelector("#start-pause span");
const StartAndPauseBTImg = document.querySelector(".app__card-primary-butto-icon");
const Reset = document.querySelector("#restart");
const PlaySound = new Audio("./src/sons/play.wav");
const PauseSound = new Audio("./src/sons/pause.mp3");
const FinishSound = new Audio("./src/sons/beep.mp3");
const ResetSound = new Audio("./src/sons/restart.mp3");

// Variáveis de controle do temporizador
let tempoTotalEmSegundos = 1500;
let tempoRestanteEmSegundos = 1500;
let intervalId: number | null = null;
let estaPausado = true;
let tempoInicio: number | null = null;

// Controle de reprodução de música de fundo
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

// Atualiza a interface do usuário com base no contexto selecionado
function alterarCaminho(contexto: string) {
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

// Inicia ou pausa a contagem do temporizador
function iniciarOuPausarContagem() {
  if (estaPausado) {
    PlaySound.play();
    PlaySound.volume = 0.1;
    iniciarContagem();
  } else {
    PauseSound.play();
    PauseSound.volume = 0.1;
    pausarContagem();
  }
}
// Inicia a contagem regressiva
function iniciarContagem() {
  if (intervalId) clearInterval(intervalId);
  estaPausado = false;
  tempoInicio = Date.now() - (tempoTotalEmSegundos - tempoRestanteEmSegundos) * 1000;
  intervalId = setInterval(atualizarTempo, 1000);
  atualizarBotaoStartPause();
}

// Pausa a contagem regressiva
function pausarContagem() {
  estaPausado = true;
  if (intervalId) clearInterval(intervalId);
  atualizarBotaoStartPause();
}

// Atualiza o tempo restante e a exibição
function atualizarTempo() {
  if (tempoInicio === null) return;

  const tempoDecorrido = Math.floor((Date.now() - tempoInicio) / 1000);
  tempoRestanteEmSegundos = Math.max(tempoTotalEmSegundos - tempoDecorrido, 0);
  if (tempoRestanteEmSegundos <= 0) {
    finalizarContagem();
    return;
  }
  tempoRestanteEmSegundos--;

  atualizarExibicaoTempo();
}

// Finaliza a contagem quando o tempo acaba
function finalizarContagem() {
  // Toca o som imediatamente
  FinishSound.play();
  FinishSound.volume = 0.1;

  // Exibe uma notificação não bloqueante na página
  exibirNotificacao("Tempo Finalizado!");

  // Pausa a contagem e reseta o tempo
  pausarContagem();
  resetarTempo();
}

// Exibe uma mensagem na página, sem bloquear a execução
function exibirNotificacao(mensagem: string | null) {
  // Cria um elemento div para exibir a notificação
  const notificacao = document.createElement("div");
  notificacao.textContent = mensagem;
  notificacao.style.position = "fixed";
  notificacao.style.bottom = "10px";
  notificacao.style.right = "10px";
  notificacao.style.padding = "10px";
  notificacao.style.backgroundColor = "#b872ff";
  notificacao.style.color = "#fff";
  notificacao.style.fontSize = "16px";
  notificacao.style.borderRadius = "5px";
  notificacao.style.fontFamily = "Poppins";

  // Adiciona a notificação ao corpo do documento
  document.body.appendChild(notificacao);

  // Remove a notificação após 5 segundos
  setTimeout(() => {
    notificacao.remove();
  }, 5000);
}

// Reseta o temporizador para o tempo total
function resetarTempo() {
  pausarContagem();
  tempoRestanteEmSegundos = tempoTotalEmSegundos;
  tempoInicio = null;
  atualizarExibicaoTempo();
}

// Atualiza a exibição do tempo na tela
function atualizarExibicaoTempo() {
  const tempo = new Date(tempoRestanteEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-Br", { minute: "2-digit", second: "2-digit" });
  if (TimeinScreen) TimeinScreen.textContent = tempoFormatado;
}

// Atualiza o botão de início/pausa
function atualizarBotaoStartPause() {
  if (!StartAndPauseBTImg || !StartAndPauseBT) return;
  if (estaPausado) {
    StartAndPauseBTImg.setAttribute("src", "./src/imagens/play_arrow.png");
    StartAndPauseBT.textContent = "Começar";
  } else {
    StartAndPauseBTImg.setAttribute("src", "./src/imagens/pause.png");
    StartAndPauseBT.textContent = "Pausar";
  }
}

// Event listeners para os botões de controle
if (StartPauseBT) {
  StartPauseBT.addEventListener("click", iniciarOuPausarContagem);
}
if (Reset) {
  Reset.addEventListener("click", () => {
    ResetSound.play();
    ResetSound.volume = 0.1;
    resetarTempo();
  });
}
function alterarContexto(contexto: string, tempo: number) {
  tempoTotalEmSegundos = tempo;
  tempoRestanteEmSegundos = tempo;
  tempoInicio = null;
  alterarCaminho(contexto);
  resetarTempo();
  Buttons.forEach((botao) => botao.classList.remove("active"));
  switch (contexto) {
    case "foco":
      focoBt?.classList.add("active");
      break;
    case "descanso-curto":
      curtoBt?.classList.add("active");
      break;
    case "descanso-longo":
      longoBt?.classList.add("active");
      break;
  }
}

// Event listeners para os botões de contexto
if (focoBt) {
  focoBt.addEventListener("click", () => alterarContexto("foco", 1500));
}

if (curtoBt) {
  curtoBt.addEventListener("click", () => alterarContexto("descanso-curto", 300));
}

if (longoBt) {
  longoBt.addEventListener("click", () => alterarContexto("descanso-longo", 900));
}

// Inicialização
atualizarExibicaoTempo();
atualizarBotaoStartPause();
