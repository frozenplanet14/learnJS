const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiURL = `https://api.lyrics.ovh`;

async function searchSongs(searchText, url) {
  try {
    const promise = await fetch(url || `${apiURL}/suggest/${searchText}`);
    const response = await promise.json();
    showData(response);
  } catch (e) {
    console.log(e);
  }
}

function showData({ data, next, prev }) {
  const output = data.reduce(
    (acc, song) =>
      acc +
      `
    <li>
      <span><strong>${song.artist.name}</strong> - ${song.title}</span>
      <button class="btn" data-artist="${song.artist.name}" data-title="${song.title}">Get Lyrics</button>
    </li>
  `,
    ''
  );

  result.innerHTML = `
    <ul class="songs">
      ${output}
    </ul>
  `;

  more.innerHTML = `
    ${
      prev
        ? `<button class="btn" onclick="getMoreSongs('${prev}')">Prev</button>`
        : ''
    }
    ${
      next
        ? `<button class="btn" onclick="getMoreSongs('${next}')">Next</button>`
        : ''
    }
  `;
}

function getMoreSongs(url) {
  searchSongs(null, `https://cors-anywhere.herokuapp.com/${url}`);
}

async function getLyrics(artist, title) {
  try {
    const promise = await fetch(`${apiURL}/v1/${artist}/${title}`);
    let { lyrics } = await promise.json();
    lyrics = lyrics.replace(/(\r\n|\r|\n)/g, '<br />');

    result.innerHTML = `
    <h2><strong>${artist}</strong> - ${title}</h2>
    <span>${lyrics}</span>
    `;
    more.innerHTML = '';
  } catch (e) {
    console.log(e);
  }
}

// Event Listener
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  if (searchTerm) {
    searchSongs(searchTerm);
  } else {
    alert('Please type in a search term to fetch the song list');
  }
});

// Get lyrics button click
result.addEventListener('click', (e) => {
  const clickedEl = e.target;

  if (clickedEl.tagName === 'BUTTON') {
    const artist = clickedEl.getAttribute('data-artist');
    const title = clickedEl.getAttribute('data-title');
    getLyrics(artist, title);
  }
});
