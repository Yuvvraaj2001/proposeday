var canvas = document.getElementById("starfield");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext("2d");
var stars = 500;
var colorrange = [0, 60, 240];
var starArray = [];

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (var i = 0; i < stars; i++) {
  var x = Math.random() * canvas.offsetWidth;
  var y = Math.random() * canvas.offsetHeight;
  var radius = Math.random() * 1.2;
  var hue = colorrange[getRandom(0, colorrange.length - 1)];
  var sat = getRandom(50, 100);
  var opacity = Math.random();
  starArray.push({ x, y, radius, hue, sat, opacity });
}

var frameNumber = 0;
var opacity = 0;
var secondOpacity = 0;
var thirdOpacity = 0;

var baseFrame = context.getImageData(
  0,
  0,
  window.innerWidth,
  window.innerHeight
);

function drawStars() {
  for (var i = 0; i < stars; i++) {
    var star = starArray[i];

    context.beginPath();
    context.arc(star.x, star.y, star.radius, 0, 360);
    context.fillStyle =
      "hsla(" + star.hue + ", " + star.sat + "%, 88%, " + star.opacity + ")";
    context.fill();
  }
}

function updateStars() {
  for (var i = 0; i < stars; i++) {
    if (Math.random() > 0.99) {
      starArray[i].opacity = Math.random();
    }
  }
}

// Function to display text messages
function drawText() {
  var fontSize = Math.min(30, window.innerWidth / 25);
  var lineHeight = 8;

  context.font = fontSize + "px Comic Sans MS";
  context.textAlign = "center";

  if (frameNumber < 99999) {
    context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    context.fillText(
      "Will you be forever mine?",
      canvas.width / 2,
      canvas.height / 2
    );
    opacity += 0.01;
  }

  if (frameNumber >= 3300 && frameNumber < 99999) {
    context.fillStyle = `rgba(255, 255, 255, ${secondOpacity})`;
    context.fillText(
      "If yes, please send me a ❤️ with a big YES!!!",
      canvas.width / 2,
      canvas.height / 2 + 50
    );
    secondOpacity += 0.01;
  }

  if (frameNumber >= 3600) {
    thirdOpacity += 0.01;
    showHeart();
  }
}

// Function to create and animate the heart dynamically
function showHeart() {
  if (!document.querySelector(".heart-container")) {
    const heartContainer = document.createElement("div");
    heartContainer.classList.add("heart-container");

    const heart = document.createElement("div");
    heart.classList.add("heart");

    heartContainer.appendChild(heart);
    document.body.appendChild(heartContainer);
  }
}

// Add heart animation styles dynamically
const style = document.createElement("style");
style.innerHTML = `
  .heart-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
  }

  .heart {
    width: 100px;
    height: 100px;
    background-color: red;
    position: relative;
    transform: rotate(-45deg);
    animation: heartbeat 1s infinite ease-in-out;
  }

  .heart::before,
  .heart::after {
    content: "";
    width: 100px;
    height: 100px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
  }

  .heart::before {
    top: -50px;
    left: 0;
  }

  .heart::after {
    left: 50px;
    top: 0;
  }

  @keyframes heartbeat {
    0% { transform: scale(1) rotate(-45deg); }
    50% { transform: scale(1.1) rotate(-45deg); }
    100% { transform: scale(1) rotate(-45deg); }
  }
`;
document.head.appendChild(style);

function draw() {
  context.putImageData(baseFrame, 0, 0);
  drawStars();
  updateStars();
  drawText();

  if (frameNumber < 99999) {
    frameNumber++;
  }
  window.requestAnimationFrame(draw);
}

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  baseFrame = context.getImageData(0, 0, window.innerWidth, window.innerHeight);
});

window.requestAnimationFrame(draw);
