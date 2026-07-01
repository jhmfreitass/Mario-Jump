const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');

const restartButton = document.querySelector('.restart');
const gameOverScreen = document.querySelector('.game-over-screen');

const scoreElement = document.getElementById('score');

let score = 0;
let gameOver = false;

// ======================
// PULO
// ======================

const jump = () => {

    if (gameOver) return;

    if (mario.classList.contains('jump')) return;

    // Conta apenas os pulos
    score++;
    scoreElement.textContent = score;

    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 600);

};

document.addEventListener('keydown', jump);

// ======================
// LOOP DO JOGO
// ======================

const loop = setInterval(() => {

    const marioRect = mario.getBoundingClientRect();
    const pipeRect = pipe.getBoundingClientRect();

    const adjustedMarioRect = {
        top: marioRect.top + 10,
        bottom: marioRect.bottom - 5,
        left: marioRect.left + 10,
        right: marioRect.right - 10,
    };

    if (
        pipeRect.left < adjustedMarioRect.right &&
        pipeRect.right > adjustedMarioRect.left &&
        pipeRect.bottom > adjustedMarioRect.top &&
        pipeRect.top < adjustedMarioRect.bottom
    ) {

        gameOver = true;

        // Para o cano
        pipe.style.animation = 'none';
        pipe.style.left = `${pipe.offsetLeft}px`;

        // Para as nuvens
        clouds.style.animation = 'none';
        clouds.style.left = `${clouds.offsetLeft}px`;

        // Para o Mario
        mario.classList.remove('jump');
        mario.style.animation = 'none';
        mario.style.bottom = `${parseFloat(getComputedStyle(mario).bottom)}px`;

        // Mario morto
        mario.src = "./images/game-over.png";
        mario.style.width = "65px";
        mario.style.marginLeft = "40px";

        // Pequena queda
        mario.style.animation = "dead .4s forwards";

        clearInterval(loop);

        // Exibe a tela de Game Over
        setTimeout(() => {
            gameOverScreen.classList.add('active');
        }, 450);

    }

}, 15);

// ======================
// REINICIAR
// ======================

restartButton.addEventListener('click', () => {
    location.reload();
});