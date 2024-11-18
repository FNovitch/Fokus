"use strict";
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
let tempoTotalEmSegundos = 1500;
let tempoRestanteEmSegundos = 1500;
let intervalId = null;
let estaPausado = true;
let tempoInicio = null;
if (MusicFoco) {
    MusicFoco.addEventListener("change", () => {
        Music.loop = true;
        if (Music.paused) {
            Music.play();
            Music.volume = 0.1;
        }
        else {
            Music.pause();
            Music.currentTime = 0;
        }
    });
}
function alterarCaminho(contexto) {
    Buttons.forEach(function (contexto) {
        contexto.classList.remove("active");
    });
    html === null || html === void 0 ? void 0 : html.setAttribute("data-contexto", contexto);
    if (ImgFront) {
        ImgFront.setAttribute("src", `./src/imagens/${contexto}.png`);
    }
    switch (contexto) {
        case "foco":
            Tittle.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
        case "descanso-curto":
            Tittle.innerHTML = `Que tal dar<br>uma respirada?<br>
            <strong class="app__title-strong">Faça uma<br>pausa curta!</strong>`;
            break;
        case "descanso-longo":
            Tittle.innerHTML = `Hora de voltar<br>á superficie.<br>
            <strong class="app__title-strong">Faça uma<br>pausa longa.</strong>`;
        default:
            break;
    }
}
function iniciarOuPausarContagem() {
    if (estaPausado) {
        PlaySound.play();
        PlaySound.volume = 0.1;
        iniciarContagem();
    }
    else {
        PauseSound.play();
        PauseSound.volume = 0.1;
        pausarContagem();
    }
}
function iniciarContagem() {
    if (intervalId)
        clearInterval(intervalId);
    estaPausado = false;
    tempoInicio = Date.now() - (tempoTotalEmSegundos - tempoRestanteEmSegundos) * 1000;
    intervalId = setInterval(atualizarTempo, 1000);
    atualizarBotaoStartPause();
}
function pausarContagem() {
    estaPausado = true;
    if (intervalId)
        clearInterval(intervalId);
    atualizarBotaoStartPause();
}
function atualizarTempo() {
    if (tempoInicio === null)
        return;
    const tempoDecorrido = Math.floor((Date.now() - tempoInicio) / 1000);
    tempoRestanteEmSegundos = Math.max(tempoTotalEmSegundos - tempoDecorrido, 0);
    if (tempoRestanteEmSegundos <= 0) {
        finalizarContagem();
        return;
    }
    tempoRestanteEmSegundos--;
    atualizarExibicaoTempo();
}
function finalizarContagem() {
    FinishSound.play();
    FinishSound.volume = 0.1;
    exibirNotificacao("Tempo Finalizado!");
    pausarContagem();
    resetarTempo();
}
function exibirNotificacao(mensagem) {
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
    document.body.appendChild(notificacao);
    setTimeout(() => {
        notificacao.remove();
    }, 5000);
}
function resetarTempo() {
    pausarContagem();
    tempoRestanteEmSegundos = tempoTotalEmSegundos;
    tempoInicio = null;
    atualizarExibicaoTempo();
}
function atulizarTituloAba(tempoFormatado) {
    const contextoAtual = html === null || html === void 0 ? void 0 : html.getAttribute("data-contexto");
    let tituloContexto = "";
    switch (contextoAtual) {
        case "foco":
            tituloContexto = "Foco";
            break;
        case "descanso-curto":
            tituloContexto = "Descanso Curto";
            break;
        case "descanso-longo":
            tituloContexto = "Descanso Longo";
            break;
        default:
            tituloContexto = "Pomodoro";
    }
    document.title = `${tempoFormatado} - ${tituloContexto}`;
}
function atualizarExibicaoTempo() {
    const tempo = new Date(tempoRestanteEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString("pt-Br", { minute: "2-digit", second: "2-digit" });
    if (TimeinScreen)
        TimeinScreen.textContent = tempoFormatado;
    atulizarTituloAba(tempoFormatado);
}
function atualizarBotaoStartPause() {
    if (!StartAndPauseBTImg || !StartAndPauseBT)
        return;
    if (estaPausado) {
        StartAndPauseBTImg.setAttribute("src", "./src/imagens/play_arrow.png");
        StartAndPauseBT.textContent = "Começar";
    }
    else {
        StartAndPauseBTImg.setAttribute("src", "./src/imagens/pause.png");
        StartAndPauseBT.textContent = "Pausar";
    }
}
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
function alterarContexto(contexto, tempo) {
    tempoTotalEmSegundos = tempo;
    tempoRestanteEmSegundos = tempo;
    tempoInicio = null;
    alterarCaminho(contexto);
    resetarTempo();
    Buttons.forEach((botao) => botao.classList.remove("active"));
    switch (contexto) {
        case "foco":
            focoBt === null || focoBt === void 0 ? void 0 : focoBt.classList.add("active");
            break;
        case "descanso-curto":
            curtoBt === null || curtoBt === void 0 ? void 0 : curtoBt.classList.add("active");
            break;
        case "descanso-longo":
            longoBt === null || longoBt === void 0 ? void 0 : longoBt.classList.add("active");
            break;
    }
}
if (focoBt) {
    focoBt.addEventListener("click", () => alterarContexto("foco", 1500));
}
if (curtoBt) {
    curtoBt.addEventListener("click", () => alterarContexto("descanso-curto", 300));
}
if (longoBt) {
    longoBt.addEventListener("click", () => alterarContexto("descanso-longo", 900));
}
atualizarExibicaoTempo();
atualizarBotaoStartPause();
