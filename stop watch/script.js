let startTime;
let elapsedTime = 0;
let timerInterval;
let laps = [];

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPause');
const lapResetBtn = document.getElementById('lapReset');
const resetBtn = document.getElementById('reset');
const lapsList = document.getElementById('laps');

function formatTime(time) {
  let hours = Math.floor(time / 3600000);
  let minutes = Math.floor((time % 3600000) / 60000);
  let seconds = Math.floor((time % 60000) / 1000);
  let milliseconds = time % 1000;

  hours = hours.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');
  seconds = seconds.toString().padStart(2, '0');
  milliseconds = milliseconds.toString().padStart(3, '0');

  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function startPause() {
  if (!startTime) {
    startTime = Date.now() - elapsedTime;
    startPauseBtn.textContent = 'Pause';
    timerInterval = setInterval(updateTime, 10);
  } else {
    startPauseBtn.textContent = 'Resume';
    clearInterval(timerInterval);
    startTime = null;
  }
}

function updateTime() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  display.textContent = formatTime(elapsedTime);
}

function lap() {
  if (startTime) {
    const lapTime = elapsedTime;
    const lapItem = document.createElement('li');
    lapItem.textContent = formatTime(lapTime);
    lapItem.classList.add('lap-item');
    lapsList.appendChild(lapItem);
    laps.push(lapTime);
  }
}

function reset() {
  clearInterval(timerInterval);
  startTime = null;
  elapsedTime = 0;
  display.textContent = formatTime(elapsedTime);
  startPauseBtn.textContent = 'Start';
  laps = [];
  lapsList.innerHTML = '';
}

startPauseBtn.addEventListener('click', startPause);
lapResetBtn.addEventListener('click', lap);
resetBtn.addEventListener('click', reset);
