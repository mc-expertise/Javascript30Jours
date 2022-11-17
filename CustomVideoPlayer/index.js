const video = document.querySelector("video");
const toggle = document.querySelector(".toggle");
const btnSkipping = document.querySelectorAll("[data-skip]");
const range = document.querySelectorAll(".player__slider");
const prograssBar = document.querySelector(".progress__filled");
const progress = document.querySelector(".progress");

function togglePlay() {
  const method = video.paused ? "play" : "pause";
  video[method]();
}

function updateButton() {
  const icon = this.paused ? "►" : "❚ ❚";
  toggle.textContent = icon;
}
function skip() {
  console.log(this.dataset.skip);
  video.currentTime += parseFloat(this.dataset.skip);
}
function handlUpdate() {
  video[this.name] = [this.value];
}
function handlProgree() {
  const perc = (video.currentTime / video.duration) * 100;
  prograssBar.style.flexBasis = `${perc}%`;
}
function scrub(e) {
  console.log(e.offsetX);
  perc = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = perc;
}
video.addEventListener("click", togglePlay);
toggle.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handlProgree);
btnSkipping.forEach((button) => button.addEventListener("click", skip));
range.forEach((range) => range.addEventListener("change", handlUpdate));
let mouseDown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mouseDown && scrub(e));
progress.addEventListener("mousedown", () => (mouseDown = true));
progress.addEventListener("mouseup", () => (mouseDown = false));
