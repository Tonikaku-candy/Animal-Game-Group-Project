let selectedCharacter = "";
let affection = 0;
let currentDay = 0;


function showCharacterSelect() {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("character-select").style.display = "block";
}

document.getElementById("skip-btn").addEventListener("click", function () {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("character-select").style.display = "block";
});

function selectCharacter(name) {
  selectedCharacter = name;
  console.log("You selected:", selectedCharacter);

  document.getElementById("character-select").style.display = "none";
  document.getElementById("game-container").style.display = "block";

  loadQuestion(); // ←ゲーム本編へ
}

// ⭐ スタートボタンで再生＆イベント追加
document.getElementById("start-btn").addEventListener("click", function () {
  const video = document.getElementById("intro-video");

  video.muted = false;
  video.play();

  // 💡 ここが重要！動画が終わったらキャラ選択画面へ
  video.addEventListener("ended", showCharacterSelect);

  this.style.display = "none";
});



// game design

function updateAffectionBar() {
  const bar = document.getElementById("affection-bar");
  bar.innerHTML = ""; // 一旦リセット

  // ハートの数 = 好感度 / 5 （例: 0〜20を4段階で）


  const heartCount = Math.max(0, Math.floor(affection / 5));

  for (let i = 0; i < heartCount; i++) {
    const img = document.createElement("img");
    img.src = "../assets/heart.png"; // 🩷ハート画像のパス
    img.alt = "heart";
    img.className = "heart-icon";
    bar.appendChild(img);
  }
}



// story

const questions = [
  {
    text: "Day 1: Purin stands before you, his eyes fixed on your hands...\nHe stares at you silently. What will you do?",
    options: [
      { text: "Offer a banana", affection: +1 },
      { text: "Offer a lemon", affection: -1 }
    ]
  },
  {
    text: "Day 2: Purin hops in circles. He seems excited. What should you do?",
    options: [
      { text: "Say: 'Nice pants!'", affection: +1 },
      { text: "Gently pat his butt", affection: +2 },
      { text: "Let out a fart", affection: -2 }
    ]
  }
];

function loadQuestion() {
    console.log("✅ loadQuestion()が呼ばれたよ！");
  const question = questions[currentDay];

  if (!question) {
    showEnding(); // 質問がもうないとき
    return;
  }

  document.getElementById("story-text").innerText = question.text;
  updateAffectionBar();

  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  question.options.forEach((option) => {
    const btn = document.createElement("button");
    btn.innerText = option.text;
    btn.onclick = () => chooseOption(option.affection);
    choicesDiv.appendChild(btn);
  });
}



function chooseOption(delta) {
  affection += delta;
  updateAffectionBar();

  const resultText = document.getElementById("result-text");
  resultText.innerText =
    delta > 0 ? "Purin looks happy!" :
    delta < 0 ? "Purin looks sad..." :
    "No reaction...";

  // 1. Dayを1つ進める
  currentDay++;

  // 2. 少し待ってから次の質問へ
  setTimeout(() => {
    resultText.innerText = "";
    loadQuestion();
  }, 1500);
}



function showEnding() {
  document.getElementById("story-text").innerText = "The End 💌";
  document.getElementById("choices").innerHTML = "";

  const resultText = document.getElementById("result-text");
  resultText.innerText =
    affection >= 3
      ? "💖 You and Purin are soulmates!"
      : "💔 Purin hops away in silence...";

  // 🎉 リプレイボタンを表示
  document.getElementById("replay-btn").style.display = "block";
}


document.getElementById("replay-btn").addEventListener("click", function () {
  // 初期化
  affection = 0;
  currentDay = 0;

  // 表示切り替え
  document.getElementById("game-container").style.display = "none";
  document.getElementById("character-select").style.display = "block";
  document.getElementById("replay-btn").style.display = "none";

  // リザルトも消しておく
  document.getElementById("result-text").innerText = "";
});


