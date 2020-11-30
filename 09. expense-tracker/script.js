const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransactions = [
//   { id: 1, text: 'Flower', amount: -20 },
//   { id: 2, text: 'Salary', amount: 300 },
//   { id: 3, text: 'Book', amount: -10 },
//   { id: 4, text: 'Camera', amount: 150 },
// ];

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions = localStorageTransactions || [];

// add transactions to dom list
function addTransactionDOM(transaction) {
  const isExpense = transaction.amount < 0;
  // Get sign
  const sign = isExpense ? '-' : '+';

  const item = document.createElement('li');

  // Add class based on value
  item.classList.add(isExpense ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span><button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">X</button>
  `;

  list.appendChild(item);
}

// Update the balance, income and expense
function updateValues() {
  const aggregate = transactions.reduce(
    (acc, curr) => {
      const key = curr.amount >= 0 ? 'income' : 'expense';
      return {
        ...acc,
        [key]: acc[key] + curr.amount,
      };
    },
    { income: 0, expense: 0 }
  );

  money_plus.innerHTML = `$${aggregate.income.toFixed(2)}`;
  money_minus.innerHTML = `$${aggregate.expense.toFixed(2) * -1}`;
  balance.innerHTML = `$${(aggregate.income + aggregate.expense).toFixed(2)}`;

  updateLocalStorage();
}

function addTransactionItem(e) {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount');
  } else {
    const transaction = {
      id: Date.now(),
      text: text.value,
      amount: Number(amount.value),
    };
    transactions.push(transaction);

    addTransactionDOM(transaction);
    updateValues();
    text.value = '';
    amount.value = '';
  }
}

function removeTransaction(id) {
  transactions = transactions.filter((tran) => tran.id !== id);
  init();
}

// update local storage transactions
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Init app
function init() {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

// Event listener
form.addEventListener('submit', addTransactionItem);
