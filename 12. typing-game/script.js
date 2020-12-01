const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endGameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words for the game
const words = [
  'sign',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving',
];

// Init word
let randomWord;

// Init score
let score = 0;

// Inint time
let time = 10;

let difficulty = localStorage.getItem('difficulty') || 'medium';
difficultySelect.value = difficulty;

// Focus on text on start
text.focus();

// start counting down
const timeInterval = setInterval(updateTime, 1000);

function updateTime() {
  time--;
  timeEl.innerHTML = `${time}s`;
  if (time === 0) {
    clearInterval(timeInterval);
    // end game
    gameOver();
  }
}

function gameOver() {
  endGameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p> Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
  `;
  endGameEl.style.display = 'flex';
}

// generate random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// initialize
addWordToDOM();

// Event listener
text.addEventListener('input', (e) => {
  const typedText = e.target.value;

  if (typedText === randomWord) {
    addWordToDOM();
    updateScore();

    // clear
    e.target.value = '';

    if (difficulty === 'hard') {
      time += 2;
    } else if (difficulty === 'medium') {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
});

// settings btn click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// difficulty changes
settingsForm.addEventListener('change', (e) => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});
