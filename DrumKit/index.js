window.addEventListener("keydown", playSound);

function playSound(e) {
  // Get value of data-key for audio
  const audio = document.querySelector(`audio[data-key = "${e.keyCode}"]`);
  if (!audio) return;
  audio.currentTime = 0; //Rewind to the start
  audio.play();

  // Get value of data-key for key
  const key = document.querySelector(`div[data-key = "${e.keyCode}"]`);
  key.classList.add("playing"); //Add class
}

// Remove class Playing
function removeTransition(e) {
  e.target.classList.remove("playing");
}

const keys = document.querySelectorAll(".key");
keys.forEach((key) => key.addEventListener("transitionend", removeTransition));
