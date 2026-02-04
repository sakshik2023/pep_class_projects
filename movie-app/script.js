const queryInput = document.getElementById("queryInput");
const searchBtn = document.getElementById("searchBtn");
const movieGrid = document.getElementById("movieGrid");
const statusEl = document.getElementById("status");

function setStatus(message) {
  statusEl.textContent = message;
}

function clearGrid() {
  movieGrid.innerHTML = "";
}

function createCard(show) {
  const card = document.createElement("article");
  card.className = "card";

  const img = document.createElement("img");
  img.src = show.image?.medium || "https://via.placeholder.com/300x420?text=No+Image";
  img.alt = show.name;

  const body = document.createElement("div");
  body.className = "card-body";

  const title = document.createElement("h3");
  title.textContent = show.name;

  const rating = document.createElement("span");
  rating.className = "badge";
  rating.textContent = `⭐ Rating: ${show.rating?.average ?? "N/A"}`;

  const meta = document.createElement("p");
  meta.textContent = `Type: ${show.type || "Show"} • Language: ${show.language || "-"}`;

  body.append(title, rating, meta);
  card.append(img, body);
  return card;
}

async function searchMovies() {
  const query = queryInput.value.trim();
  if (!query) {
    setStatus("Please enter a search term.");
    return;
  }

  setStatus("Loading movies...");
  clearGrid();

  try {
    const response = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`);
    const data = await response.json();

    if (!data.length) {
      setStatus("No results found.");
      return;
    }

    data.slice(0, 12).forEach((item) => {
      movieGrid.append(createCard(item.show));
    });

    setStatus(`Showing ${Math.min(data.length, 12)} results for “${query}”.`);
  } catch (error) {
    setStatus("Failed to load movies. Try again.");
  }
}

searchBtn.addEventListener("click", searchMovies);
queryInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchMovies();
  }
});
