//Main Javascript

const btn = document.querySelector(".btn_porta");
const bar = document.querySelector(".bar");
const msgBox = document.querySelector(".msgBox");
const divMsg = document.querySelector(".div_msg");
const imgPorta = document.querySelector(".img_porta");
const btnFechar = document.querySelector(".btn_fechar");
const divBtn = document.querySelector(".div_btn");
const barProxima = document.querySelector("#bar-proxima");
const home = document.querySelector("#home");
const final = document.querySelector("#final");

//Audio
const clickSound = new Audio("audio/click.wav");
clickSound.preload = "auto";

let index = 1;
let cliques = 0;
let intervalo_cliques = 35
const intervalo = intervalo_cliques;

const lista_msgs = {
    msg_1: "Para o seu aniversário, eu preparei uma surpresa para a mulher que eu mais amo nesse mundo... será que você consegue desbloquear esse presente?",
    msg_2: "Continue assim, meu amorzinho, você já está quase na metade. Mal vejo a hora de conseguir abrir essa porta...",
    msg_3: "Você chegou na metade do caminho, minha Pitucha. Avançou mais do que imagina. Continua tentanto, o cadeado já está começando a revelar o meu presente",
    msg_4: "Agora só falta mais um pouquinho. O cadeado já está cedendo... você está indo muito bem, meu amorzinho!",
    msg_5: "Não para! Você está a um passo de abrir esse cadeado, meu amor.",
    msg_6: "Eu sabia que você ia conseguir, Carol. Eu nunca tive duvidas que uma mulher tão forte quanto você conseguiria, eu te amo, o seu presente te espera."
};

const lista_barra = [
    "src/heart-bar-empty.png",
    "src/heart-bar-bit.png",
    "src/heart-bar-almost-mid.png",
    "src/heart-bar-mid.png",
    "src/heart-bar-almost-full.png",
    "src/heart-bar-full.png"
];

function trocarImagem(novaSrc) {
    
    imgPorta.classList.add("fade-out");
    btn.disabled = true;
    
    setTimeout(() => {
        
        imgPorta.src = novaSrc;
        imgPorta.classList.remove("fade-out");
        
        btn.disabled = false;
        
    }, 1000);

}

function atualizarBarra() {

    let indexBar = index - 1;

    if (indexBar >= 0 && indexBar < lista_barra.length) {

        barProxima.src = lista_barra[indexBar];
     
        barProxima.classList.add("ativa");
        bar.classList.remove("ativa");
    }

}

function mostrarMensagem() {
    
    msgBox.classList.remove('show');

    //Força o navegador a reiniciar a animação
    void msgBox.offsetWidth;
    
    let chave = `msg_${index}`;

    if (lista_msgs[chave]) {

        msgBox.textContent = lista_msgs[chave];
    }
    
    msgBox.classList.add('show');
    console.log(lista_msgs[chave]);
}

function abrirPorta() {
    btn.disabled = true;

    const openSound = new Audio("audio/open.wav");

    openSound.play();

    trocarImagem("src/porta-chave.png");

    openSound.addEventListener("ended", () => {
        
        trocarImagem("src/IMG_3029.png")
    });

}

function abrirCarta() {

    const openSound = new Audio("audio/openLetter.wav")

    openSound.play();

    divMsg.classList.add("hide");
    trocarImagem("src/IMG_3029.png");

    openSound.addEventListener("ended", () => {

        divBtn.classList.add("show");

        setTimeout(() => {

            divBtn.classList.remove("oculto");
        }, 500);
    });
}

btn.addEventListener("click", function () {
    
    if (imgPorta.src.endsWith("porta-aberta.png")) {
        
        abrirCarta();
        return;
    }
    
    cliques += 1;
    console.log(cliques);

    if (cliques === intervalo_cliques) {
        
        index += 1;
        
        if (index === 6) {
            
            updateScreen();
            abrirPorta();
            return;
        } else {
            
            intervalo_cliques += intervalo;
            updateScreen();
        }

    }

    clickSound.currentTime = 0;
    clickSound.play();
});

function updateScreen() {

    console.log(imgPorta.src);
    
    mostrarMensagem();
    atualizarBarra();

    if (imgPorta.getAttribute("src") === "") {

        trocarImagem("src/Btn-Porta.png");
    }

}

function mudarSecao() {
    const chuvaCoracoes = document.getElementById("chuva-coracoes");

    home.classList.add("hide");

    setTimeout(() => {

        home.classList.add("oculto");

        chuvaCoracoes.classList.remove("oculto");

        void chuvaCoracoes.offsetWidth;
    
        chuvaCoracoes.classList.add("show")

    }, 500)
   
}

function spawnHeart() {

    const heart = document.createElement("img")
    const divHearts = document.querySelector(".coracoes")

    heart.src = "src/coracoes.png"
    divHearts.appendChild(heart);

    heart.addEventListener("animationend", () => {
        heart.remove();
    })
}

function mensagemFinal() {

    const message = document.querySelector(".message");

    message.textContent = "EU TE AMO DEMAIS, AMOR DA MINHA VIDA! MUITÍSSIMO OBRIGADA POR TUDO!";

    message.classList.remove("oculto");

    message.style.animation = "none";
    message.offsetHeight;

    message.style.animation =
        "slide-message 15s linear infinite, blink-message 0.35s step-end infinite";
}

document.querySelector(".btn_fechar").onclick = function() {
    mudarSecao();
    mensagemFinal();
    setInterval(spawnHeart, 300)

    const sparkleSound = new Audio("audio/sparkle.wav");
    sparkleSound.volume = 0.2;
    sparkleSound.preload = "auto";

    setInterval(() => {
        sparkleSound.currentTime = 0;
        sparkleSound.play();
    }, 1500);
    
}

updateScreen();
