function showCharacterSelect() {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("character-select").style.display = "block";
}

document.getElementById("skip-btn").addEventListener("click", showCharacterSelect);

document.getElementById("start-btn").addEventListener("click", function () {
  const video = document.getElementById("intro-video");
  video.muted = false;
  video.play();
  video.addEventListener("ended", showCharacterSelect);
  this.style.display = "none";
});

function selectCharacter(name) {
  localStorage.setItem("selectedCharacter", name); // キャラを保存
  console.log("You selected:", name);
  window.location.href = `${name}.html`; // 例: purin.html に移動
}
