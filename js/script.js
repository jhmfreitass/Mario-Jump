const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

const jump = () => {
  mario.classList.add('jump');
  setTimeout(() => {
    mario.classList.remove('jump');
  }, 500);
};

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
    pipe.style.animation = 'none';
    pipe.style.left = `${pipeRect.left}px`;

    mario.style.animation = 'none';
    mario.style.bottom = `${parseFloat(window.getComputedStyle(mario).bottom)}px`;

    mario.src = './images/game-over.png';
    mario.style.width = '70px';
    mario.style.marginLeft = '50px';

    clearInterval(loop);
  }
}, 10);

document.addEventListener('keydown', jump);
