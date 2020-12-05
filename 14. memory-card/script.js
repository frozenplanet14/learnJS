const cardsConatiner = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

// keep track of current card
let currentActiveCardIndex = 0;

// store DOM cards
const cardsEl = [];

// Store card data
const cardsData = getCardsData();
// const cardsData = [
//   {
//     question: 'What must a variable beigin with?',
//     answer: 'A letter, $ or _',
//   },
//   {
//     question: 'What is a variable?',
//     answer: 'Container for a piece of data',
//   },
//   {
//     question: 'Example of Case Sensitive Variable',
//     answer: 'thisIsAVariable',
//   },
// ];

// Create all cards
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

// Create a single card
function createCard({ question, answer }, index) {
  const card = document.createElement('div');
  card.classList.add('card');
  if (index === 0) {
    card.classList.add('active');
  }
  card.innerHTML = `
    <div class="inner-card">
      <div class="inner-card-front">
        <p>${question}</p>
      </div>
      <div class="inner-card-back">
        <p>${answer}</p>
      </div>
    </div>
  `;

  card.addEventListener('click', () => card.classList.toggle('show-answer'));

  cardsEl.push(card);

  cardsConatiner.appendChild(card);

  updateCurrentText();
}

// show number of cards
function updateCurrentText() {
  currentEl.innerText = `${currentActiveCardIndex + 1}/${cardsEl.length}`;
}

// get cards from local storage
function getCardsData() {
  return JSON.parse(localStorage.getItem('cards')) || [];
}

createCards();

function changePrevPage() {
  cardsEl[currentActiveCardIndex].className = 'card right';
  let tempIndex = currentActiveCardIndex;
  if (currentActiveCardIndex === 0) {
    tempIndex = cardsEl.length;
  }
  currentActiveCardIndex = tempIndex - 1;
  cardsEl[currentActiveCardIndex].className = 'card active';
  updateCurrentText();
}

function changeNextPage() {
  cardsEl[currentActiveCardIndex].className = 'card left';
  let tempIndex = currentActiveCardIndex + 1;
  if (tempIndex >= cardsEl.length) {
    tempIndex = 0;
  }
  currentActiveCardIndex = tempIndex;
  cardsEl[currentActiveCardIndex].className = 'card active';
  updateCurrentText();
}

// Event Listener
prevBtn.addEventListener('click', changePrevPage);
nextBtn.addEventListener('click', changeNextPage);
showBtn.addEventListener('click', () => addContainer.classList.add('show'));
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));
addCardBtn.addEventListener('click', () => {
  const question = questionEl.value.trim();
  const answer = answerEl.value.trim();
  if (question && answer) {
    const card = {
      question,
      answer,
    };
    cardsData.push(card);
    createCard(card, cardsData.length);
    localStorage.setItem('cards', JSON.stringify(cardsData));
    questionEl.value = '';
    answerEl.value = '';
  }
});

clearBtn.addEventListener('click', () => {
  localStorage.removeItem('cards');
  cardsConatiner.innerHTML = '';
  window.location.reload();
});
