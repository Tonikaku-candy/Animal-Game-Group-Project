function showCharacterSelect() {
  document.getElementById('start-screen').style.display = 'none';
  document.getElementById('character-select').style.display = 'block';
}

document
  .getElementById('skip-btn')
  .addEventListener('click', showCharacterSelect);

document.getElementById('start-btn').addEventListener('click', function () {
  const video = document.getElementById('intro-video');
  video.muted = false;
  video.play();
  video.addEventListener('ended', showCharacterSelect);
  this.style.display = 'none';
});

function selectCharacter(name) {
  localStorage.setItem('character', name); // キャラを保存
  console.log('You selected:', name);
  window.location.href = `${name}.html`;
}

document.getElementById('purin-btn').addEventListener('click', () => {
  localStorage.setItem('character', 'purin');
  window.location.href = 'purin.html';
});

document.getElementById('mame-btn').addEventListener('click', () => {
  localStorage.setItem('character', 'mame');
  window.location.href = 'mame.html';
});

window.addEventListener('DOMContentLoaded', () => {
  const selectedCharacter = localStorage.getItem('character');
  const gameContainer = document.getElementById('game-container');

  if (selectedCharacter === 'purin') {
    gameContainer.style.backgroundImage = "url('./assets/bg1.jpeg')";
  } else if (selectedCharacter === 'mame') {
    gameContainer.style.backgroundImage = "url('./assets/bg2.jpeg')";
  }
});
