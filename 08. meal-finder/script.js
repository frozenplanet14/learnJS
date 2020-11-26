const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const mealsEl = document.getElementById('meals');
const resultHeading = document.getElementById('result-heading');
const singleMealEl = document.getElementById('single-meal');

// search for the meal
function searchMeal(e) {
  e.preventDefault();

  // clear single meal
  singleMealEl.innerHTML = '';

  // Get search text
  const searchText = search.value.trim();
  if (!searchText) {
    return;
  }
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
    .then((res) => res.json())
    .then(({ meals }) => {
      // console.log(meals);
      resultHeading.innerHTML = `<h2>Search results for '${searchText}':</h2>`;
      if (meals === null) {
        resultHeading.innerHTML = `<p>There are no search results. Try again!</p>`;
      } else {
        mealsEl.innerHTML = meals
          .map(
            (meal) => `
          <div class="meal">
            <img alt="${meal.strMeal}" src="${meal.strMealThumb}" />
            <div class="meal-info" data-mealID="${meal.idMeal}">
              <h3>${meal.strMeal}</h3>
            </div>
          </div>
        `
          )
          .join('');
        search.value = '';
      }
    });
}

// fetch meal by id
function getMealById(id) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then(({ meals }) => addMealToDOM(meals[0]));
}

// fetch random meal
function getRandomMeal() {
  // clear meal and heading
  resultHeading.innerHTML = ``;
  mealsEl.innerHTML = ``;
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then(({ meals }) => addMealToDOM(meals[0]));
}

// add fetched meal to dom
function addMealToDOM(meal) {
  const ingredients = [];
  for (let i = 1; i < 21; i++) {
    const ingre = meal[`strIngredient${i}`],
      mea = meal[`strMeasure${i}`];
    if (ingre) {
      ingredients.push(`${ingre} - ${mea}`);
    } else {
      break;
    }
  }

  singleMealEl.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map((ingre) => `<li>${ingre}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
}

// Event Listener
submit.addEventListener('submit', searchMeal);
random.addEventListener('click', getRandomMeal);

mealsEl.addEventListener('click', (e) => {
  const mealInfo = e
    .composedPath()
    .find((item) => item.classList && item.classList.contains('meal-info'));
  if (mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealid');
    getMealById(mealID);
  }
});
