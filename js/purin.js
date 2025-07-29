let affection = 0;
let currentDay = 0;

function updateAffectionBar() {
  const bar = document.getElementById('affection-bar');
  bar.innerHTML = '';

  const heartCount = Math.min(5, Math.max(0, Math.floor(affection / 5)));

  for (let i = 0; i < heartCount; i++) {
    const img = document.createElement('img');
    img.src = './assets/heart.png';
    img.alt = 'heart';
    img.className = 'heart-icon';
    bar.appendChild(img);
  }
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
    text: 'Day 2: Purin hops around. What now?',
    options: [
      { text: "Say: 'Nice pants!'", affection: +1 },
      { text: 'Pat his butt', affection: +2 },
      { text: 'Let out a fart', affection: -2 },
    ],
  },
];

function loadQuestion() {
  const question = questions[currentDay];

  if (!question) {
    showEnding();
    return;
  }

  // 💡ここで画像を切り替える
  const characterImage = document.getElementById('purin-img');
  if (currentDay === 0) {
    characterImage.src = './assets/purin.png';
  } else if (currentDay === 1) {
    characterImage.src = './assets/purin2.png';
  }

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
  resultText.innerText =
    delta > 0
      ? 'Purin looks happy!'
      : delta < 0
      ? 'Purin looks sad...'
      : 'No reaction...';

  currentDay++;

  setTimeout(() => {
    resultText.innerText = '';
    loadQuestion();
  }, 1500);
}

function showEnding() {
  document.getElementById('story-text').innerText = 'The End 💌';
  document.getElementById('choices').innerHTML = '';

  const resultText = document.getElementById('result-text');
  resultText.innerText =
    affection >= 3
      ? '💖 You and Purin are soulmates!'
      : '💔 Purin hops away in silence...';

  document.getElementById('replay-btn').style.display = 'block';
}

document.getElementById('replay-btn').addEventListener('click', function () {
  affection = 0;
  currentDay = 0;

  document.getElementById('replay-btn').style.display = 'none';
  loadQuestion();
});

// ゲーム開始
loadQuestion();
