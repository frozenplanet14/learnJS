const toggle = document.getElementById('toggle');
const close = document.getElementById('close');
const open = document.getElementById('open');
const modal = document.getElementById('modal');

// toggle nav
toggle.addEventListener('click', () => {
  document.body.classList.toggle('show-nav');
});

function toggleModal() {
  modal.classList.toggle('show-modal');
}

// show / hide modal
open.addEventListener('click', toggleModal);
close.addEventListener('click', toggleModal);

// Hide modal on outside click
window.addEventListener('click', e => {
  if (e.target == modal) {
    toggleModal();
  }
});
