const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

// play and pause video
function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// update play pause icon
function updatePlayIcon() {
  play.innerHTML = `<i class="fa fa-${video.paused ? 'play' : 'pause'} fa-2x"></i>`;
}

// update progress & timestamp
function updateProgress() {
  progress.value = video.currentTime * 100 / video.duration;
  const mins = `0${Math.floor(video.currentTime / 60)}`.slice(-2);
  const secs = `0${Math.floor(video.currentTime % 60)}`.slice(-2);
  timestamp.innerHTML = `${mins}:${secs}`;
}

// set video progress
function setVideoProgress() {
  video.currentTime = (+progress.value * video.duration) / 100;
  updateProgress();
}

// stop video
function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

// Event Listeners
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);

stop.addEventListener('click', stopVideo);

progress.addEventListener('change', setVideoProgress);
