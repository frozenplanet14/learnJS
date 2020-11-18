const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;
const L_SEATS_KEY = 'selectedSeats';
const L_MOVIE_KEY = 'movie';

// update selected ticket count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  localStorage.setItem(L_SEATS_KEY, JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = `$${selectedSeatsCount * ticketPrice}`;
}

// populate UI
function populateUI() {
  let localMovie = localStorage.getItem(L_MOVIE_KEY);
  if (localMovie) {
    movieSelect.selectedIndex = +localMovie;
    ticketPrice = +movieSelect.value;
  }
  
  let localSeats = localStorage.getItem(L_SEATS_KEY);
  if (localSeats) {
    localSeats = JSON.parse(localSeats);
    localSeats.forEach(index => seats[index].classList.add('selected'));
  }
  
  updateSelectedCount();
}

populateUI();

// Movie select event
movieSelect.addEventListener('change', e => {
  const val = e.target.value;
  localStorage.setItem(L_MOVIE_KEY, e.target.selectedIndex);
  ticketPrice = +val;
  updateSelectedCount();
});

// seat click event
container.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});



