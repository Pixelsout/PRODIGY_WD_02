let intervalId;
let startTime = 0;
let elapsedTime = 0;
let timeRunning = false;
let lapTimes = [];

document.getElementById('start-button').addEventListener('click', startTimer);
document.getElementById('stop-button').addEventListener('click', stopTimer);
document.getElementById('reset-button').addEventListener('click', resetTimer);
document.getElementById('lap-button').addEventListener('click', lapTimer);

function startTimer() {
  if (!timeRunning) {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateTime, 10);
    timeRunning = true;
  }
}

function stopTimer() {
  clearInterval(intervalId);
  elapsedTime = Date.now() - startTime;
  timeRunning = false;
}

function resetTimer() {
  clearInterval(intervalId);
  elapsedTime = 0;
  startTime = 0;
  timeRunning = false;
  lapTimes = [];
  document.querySelector('.time').textContent = '00:00:00';
  document.getElementById('lap-times').innerHTML = '';
}

function lapTimer() {
  if (timeRunning) {
    let lapTime = elapsedTime;
    lapTimes.push(lapTime);
    let lapTimeString = formatTime(lapTime);
    let lapListItem = document.createElement('li');
    lapListItem.textContent = `Lap ${lapTimes.length}: ${lapTimeString}`;
    document.getElementById('lap-times').appendChild(lapListItem);
  }
}

function updateTime() {
  let currentTime = Date.now() - startTime;
  let minutes = Math.floor(currentTime / (1000 * 60) % 60);
  let seconds = Math.floor(currentTime / 1000 % 60);
  let milliseconds = Math.floor(currentTime % 1000 / 10);

  document.querySelector('.time').textContent =
    pad(minutes) + ':' + pad(seconds) + ':' + pad(milliseconds);
}

function formatTime(time) {
  let minutes = Math.floor(time / (1000 * 60) % 60);
  let seconds = Math.floor(time / 1000 % 60);
  let milliseconds = Math.floor(time % 1000 / 10);

  return pad(minutes) + ':' + pad(seconds) + ':' + pad(milliseconds);
}

function pad(number) {
  return ('0' + number).slice(-2);
}