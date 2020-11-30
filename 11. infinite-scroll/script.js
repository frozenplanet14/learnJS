// https://jsonplaceholder.typicode.com/posts?_limit=3&_page=2
const postContainer = document.getElementById('post-container');
const loading = document.getElementById('loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;

async function getPosts(params) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  const data = await res.json();

  return data;
}

// show posts in dom
async function showPosts() {
  const posts = await getPosts();

  posts.forEach((post) => {
    const elem = document.createElement('div');
    elem.classList.add('post');
    elem.innerHTML = `
      <div class="number">${post.id}</div>
      <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
      </div>
    `;
    postContainer.appendChild(elem);
  });
}

// show loading and fetch more post
async function showLoading() {
  if (!loading.classList.contains('show')) {
    loading.classList.add('show');
    page += 1;
    await showPosts();
    loading.classList.remove('show');
  }
}

function filterPosts(evt) {
  const filterText = evt.target.value.toUpperCase();

  const posts = document.querySelectorAll('.post');

  posts.forEach((post) => {
    const title = post.querySelector('.post-title').innerText.toUpperCase();
    const body = post.querySelector('.post-body').innerText.toUpperCase();

    if (title.indexOf(filterText) > -1 || body.indexOf(filterText) > -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
}

// load initial posts
showPosts();

// event listenser

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

filter.addEventListener('input', filterPosts);
