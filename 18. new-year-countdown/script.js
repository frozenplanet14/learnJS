const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const countdown = document.getElementById('countdown');
const loading = document.getElementById('loading');
const year = document.getElementById('year');

const comingYear = new Date().getFullYear() + 1;

// set coming year
year.innerHTML = comingYear;

const newYearTime = new Date(`January 01 ${comingYear} 00:00:00`);

function formatTime(time) {
  return `0${time}`.slice(-2);
}

function updateCountdown() {
  const currTime = new Date();
  const diff = newYearTime - currTime;
  days.innerHTML = Math.floor(diff / (1000 * 60 * 60 * 24));
  hours.innerHTML = formatTime(Math.floor((diff / (1000 * 60 * 60)) % 24));
  minutes.innerHTML = formatTime(Math.floor((diff / (1000 * 60)) % 60));
  seconds.innerHTML = formatTime(Math.floor((diff / 1000) % 60));
}

setTimeout(() => {
  loading.remove();
  countdown.style.display = 'flex';
}, 1000);

setInterval(updateCountdown, 1000);
