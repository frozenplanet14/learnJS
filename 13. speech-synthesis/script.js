const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
  {
    image: './img/drink.jpg',
    text: "I'm Thirsty",
  },
  {
    image: './img/food.jpg',
    text: "I'm Hungry",
  },
  {
    image: './img/tired.jpg',
    text: "I'm Tired",
  },
  {
    image: './img/hurt.jpg',
    text: "I'm Hurt",
  },
  {
    image: './img/happy.jpg',
    text: "I'm Happy",
  },
  {
    image: './img/angry.jpg',
    text: "I'm Angry",
  },
  {
    image: './img/sad.jpg',
    text: "I'm Sad",
  },
  {
    image: './img/scared.jpg',
    text: "I'm Scared",
  },
  {
    image: './img/outside.jpg',
    text: 'I want to Go Outside',
  },
  {
    image: './img/home.jpg',
    text: 'I want to Go Home',
  },
  {
    image: './img/school.jpg',
    text: 'I want to Go School',
  },
  {
    image: './img/grandma.jpg',
    text: 'I want to Go Grandmas',
  },
];

data.forEach(createBox);

// Create speech boxes
function createBox({ image, text }) {
  const box = document.createElement('div');

  box.classList.add('box');
  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;

  box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();

    // add active effect
    box.classList.add('active');
    setTimeout(() => {
      box.classList.remove('active');
    }, 800);
  });

  main.appendChild(box);
}

// Init speech synth
const message = new SpeechSynthesisUtterance();

// store voices
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement('option');
    option.value = voice.name;
    option.innerHTML = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}

function setTextMessage(text) {
  message.text = text;
}

function speakText() {
  speechSynthesis.speak(message);
}

// Event listener
toggleBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.toggle('show')
);

closeBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.remove('show')
);

voicesSelect.addEventListener('change', (e) => {
  message.voice = voices.find((voice) => voice.name === e.target.value);
});

readBtn.addEventListener('click', () => {
  const text = textarea.value.trim();
  if (text) {
    setTextMessage(text);
    speakText();
  }
});

// speechSynthesis.addEventListener('voiceschanged', getVoices);
if ('onvoiceschanged' in speechSynthesis) {
  speechSynthesis.onvoiceschanged = getVoices;
} else {
  getVoices();
}
