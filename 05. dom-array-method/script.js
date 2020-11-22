const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBTn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

const DEFAULT_USER_COUNT = 3;
let data = [];

function addData(obj) {
  data = [...data, obj];
  updateDOM();
}

// fetch random user and add money
async function getRandomUser(count = 1) {
  try {
    const res = await fetch(`https://randomuser.me/api/?results=${count}`);
    const response = await res.json();
    
    response.results.forEach(({name}) => {
      const { first, last } = name;
      const newUser = {
        name: `${first} ${last}`,
        money: Math.floor(Math.random() * 1000000)
      };

      addData(newUser);
    });
  } catch (e) {
    console.log(e);
  }

}

// for (let i = 0; i < DEFAULT_USER_COUNT; i++) {
//   getRandomUser();
// }
getRandomUser(3);

// Format number as currency - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// update DOM
function updateDOM(providedData = data) {
  // Clear main div
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

  providedData.forEach(({name, money}) => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${name}</strong> ${formatMoney(money)}`;

    main.appendChild(element);
  });
}

// event listener for add user
addUserBtn.addEventListener('click', () => {
  getRandomUser();
});

// event listener for double amount
doubleBtn.addEventListener('click', () => {
  data = data.map(d => ({...d, money: d.money * 2}));
  updateDOM();
});

showMillionairesBTn.addEventListener('click', () => {
  data = data.filter(d => d.money >= 1000000);
  updateDOM();
});

sortBtn.addEventListener('click', () => {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
});

calculateWealthBtn.addEventListener('click', () => {
  const total = data.reduce((cumm, {money}) => cumm + money, 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(total)}</strong></h3>`;
  main.appendChild(wealthEl);
});