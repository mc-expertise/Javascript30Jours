const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

function getVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((localMediaStream) => {
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch((err) => {
      console.error(
        "We Don't find the camera please contacte u support 85 200",
        err
      );
    });
}
function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;
  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    // Get Data
    let pixels = ctx.getImageData(0, 0, width, height);
    // Creat Effect
    pixels = redEffect(pixels);
    // Set Effect in canvas
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}
function takePhoto() {
  // Played Sound
  snap.currentTime = 0;
  snap.play();
  // Take The data out of the canvas
  const data = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = data;
  link.setAttribute("Download", "handsome");
  link.innerHTML = `<img src="${data}" alt="You're not handsome" />`;
  strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 100;
    pixels.data[i + 1] = pixels.data[i + 1] - 50;
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5;
  }
  return pixels;
}
getVideo();

video.addEventListener("canplay", paintToCanvas);
