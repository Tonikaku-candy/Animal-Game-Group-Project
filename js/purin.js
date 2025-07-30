let affection = 0;
let currentDay = 0;

function updateAffectionBar() {
  const bar = document.getElementById('affection-bar');
  const score = document.getElementById('affection-score');
  bar.innerHTML = '';

  const heartCount = Math.min(5, Math.max(0, Math.floor(affection / 5)));

  for (let i = 0; i < heartCount; i++) {
    const img = document.createElement('img');
    img.src = './assets/heart.png';
    img.alt = 'heart';
    img.className = 'heart-icon';
    bar.appendChild(img);
  }

  
  score.innerText = `Affection: ${affection}`;
}


const questions = [
  {
    text: 'Day 1: Purin stares at you... What will you do?',
    options: [
      { text: 'Offer a banana', affection: +1 },
      { text: 'Offer a lemon', affection: -1 },
    ],
  },
   {
    text: 'Day 2: Purin seems bored. What do you do?',
    options: [
      { text: 'Give him a toy rabbit', affection: +1 },
      { text: 'Do a silly dance', affection: +2 },
      { text: 'Ignore him', affection: -2 },
    ],
  },
  {
    text: 'Day 3: Purin hops around. What now?',
    options: [
      { text: "Say: 'Nice pants!'", affection: +1 },
      { text: 'Pat his butt', affection: +2 },
      { text: 'Let out a fart', affection: -2 },
    ],
  },
];

function loadQuestion() {
  const resultText = document.getElementById('result-text'); 
  resultText.style.display = 'none';

  const question = questions[currentDay];
  if (!question) {
    showEnding();

    return;
  }

  // change photo
  const characterImage = document.getElementById('purin-photo');
  if (currentDay === 0) {
    characterImage.src = './assets/purin2.png';
  } else if (currentDay === 1) {
    characterImage.src = './assets/purin.png';
  } else {characterImage.src = './assets/purin2.png';}

  document.getElementById('story-text').innerText = question.text;
  updateAffectionBar();

  const choicesDiv = document.getElementById('choices');
  choicesDiv.innerHTML = '';

  question.options.forEach((option) => {
    const btn = document.createElement('button');
    btn.innerText = option.text;
    btn.onclick = () => chooseOption(option.affection);
    choicesDiv.appendChild(btn);
  });
}

function chooseOption(delta) {
  affection += delta;
  updateAffectionBar();

  const resultText = document.getElementById('result-text');
  resultText.style.display = 'block';
  resultText.innerText =
    delta > 0
      ? 'Purin looks happy!'
      : delta < 0
      ? 'Purin looks sad...'
      : 'No reaction...';

  currentDay++;

  setTimeout(() => {
    resultText.innerText = '';
    resultText.style.display = 'none'; 
    loadQuestion();
  }, 1500);
}


function showEnding() {
  const resultText = document.getElementById('result-text');
  const characterImage = document.getElementById('purin-photo');
  const gameContainer = document.getElementById('game-container');

  document.getElementById('story-text').innerText = 'The End';
  document.getElementById('choices').innerHTML = '';

  if (affection >= 3) {
    resultText.innerText = '💖 Purin jumps into your arms!';
    characterImage.src = './assets/purin-happy.png';
  } else {
    resultText.innerText = '💔 Purin turns away with sad eyes...';
    characterImage.src = './assets/purin-sad.png';
  }
   resultText.style.display = 'block';
  document.getElementById('replay-btn').style.display = 'block';
}



document.getElementById('replay-btn').addEventListener('click', function () {
  affection = 0;
  currentDay = 0;
  window.location.href = './index.html';
});

// ゲーム開始
loadQuestion();
