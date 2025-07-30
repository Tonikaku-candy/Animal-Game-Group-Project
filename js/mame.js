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

  // 質問はお好みで変えてください！
  {
    text: 'Day 1: Mame looks at the sky. What do you do?',
    options: [
      { text: 'Sit next to Mame', affection: +1 },
      { text: 'Talk really loud', affection: -1 },
    ],
  },
  {
    text: 'Day 2: Mame is sleepy. What now?',
    options: [
      { text: 'Give warm tea', affection: +1 },
      { text: 'Fluff pillow', affection: +2 },
      { text: 'Play loud music', affection: -2 },
    ],
  },
  {
  text: 'Day 3: Mame is sitting quietly by the window... What do you do?',
  options: [
    { text: 'Bring a cozy blanket', affection: +1 },
    { text: 'Make a cup of herbal tea', affection: +2 },
    { text: 'Open the window loudly', affection: -2 },
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

  const characterImage = document.getElementById('mame-photo');
  if (currentDay === 0) {
    characterImage.src = './assets/mame.png';
  } else if (currentDay === 1) {
    characterImage.src = './assets/mame2.png';
  } else { characterImage.src = './assets/mame.png';}

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
      ? 'Mame smiles a little.'
      : delta < 0
      ? 'Mame looks away...'
      : 'No change...';

  currentDay++;

  setTimeout(() => {
    resultText.innerText = '';
    resultText.style.display = 'none'; 
    loadQuestion();
  }, 1500);
}

function showEnding() {
  const resultText = document.getElementById('result-text');
  const characterImage = document.getElementById('mame-photo');
  const gameContainer = document.getElementById('game-container');

  document.getElementById('story-text').innerText = 'The End';
  document.getElementById('choices').innerHTML = '';

  if (affection >= 3) {
    resultText.innerText = '💖 You and Mame are good friends!';
    characterImage.src = './assets/mame-happy.png';
  } else {
    resultText.innerText = '💔 Mame walks away slowly...';
    characterImage.src = './assets/mame-sad.png';
  }

  resultText.style.display = 'block';
  document.getElementById('replay-btn').style.display = 'block';
}

document.getElementById('replay-btn').addEventListener('click', function () {
  affection = 0;
  currentDay = 0;
  window.location.href = './index.html';
});

loadQuestion();
