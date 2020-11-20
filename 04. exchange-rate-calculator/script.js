const currencyOne = document.getElementById('currency-one');
const currencyTwo = document.getElementById('currency-two');

const amount_one = document.getElementById('amount-one');
const amount_two = document.getElementById('amount-two');

const rate = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rates and update the DOM
function calculate() {
  const currency_one = currencyOne.value;
  const currency_two = currencyTwo.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
      const rateVal = data.rates[currency_two];
      rate.innerHTML = `1 ${currency_one} = ${currency_two} ${rateVal}`;
      amount_two.value = (rateVal * amount_one.value).toFixed(2);
    });
}


// Event Listeners

currencyOne.addEventListener('change', calculate);
currencyTwo.addEventListener('change', calculate);
amount_one.addEventListener('input', calculate);
amount_two.addEventListener('input', calculate);

swap.addEventListener('click', () => {
  const temp = currencyOne.value;

  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temp;
  calculate();
});

calculate();
