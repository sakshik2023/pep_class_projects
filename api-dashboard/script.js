const loadBtn = document.getElementById("loadBtn");
const cardsEl = document.getElementById("cards");
const statusEl = document.getElementById("status");
const countEl = document.getElementById("count");
const emptyEl = document.getElementById("empty");

const API_URL = "https://jsonplaceholder.typicode.com/posts?_limit=9";

function setStatus(text) {
  statusEl.textContent = text;
}

function setCount(value) {
  countEl.textContent = value;
}

function clearCards() {
  cardsEl.innerHTML = "";
}

function renderCards(posts) {
  const fragment = document.createDocumentFragment();

  posts.forEach((post) => {
    const card = document.createElement("article");
    card.className = "card";

    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = `Post #${post.id}`;

    const title = document.createElement("h3");
    title.textContent = post.title;

    const body = document.createElement("p");
    body.textContent = post.body;

    card.append(badge, title, body);
    fragment.append(card);
  });

  cardsEl.append(fragment);
}

async function loadData() {
  loadBtn.disabled = true;
  setStatus("Loading...");
  setCount("0");
  clearCards();

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Network error");
    }
    const posts = await response.json();
    renderCards(posts);
    setCount(posts.length.toString());
    setStatus("Loaded");
  } catch (error) {
    setStatus("Failed");
    cardsEl.innerHTML = "<div class=\"empty\">Could not load data. Try again.</div>";
  } finally {
    loadBtn.disabled = false;
  }
}

loadBtn.addEventListener("click", loadData);
