const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const tempEl = document.getElementById("temp");
const descEl = document.getElementById("desc");
const cityEl = document.getElementById("city");
const windEl = document.getElementById("wind");
const humidityEl = document.getElementById("humidity");
const historyList = document.getElementById("historyList");

const HISTORY_KEY = "weatherSearchHistory";

function getHistory() {
  const raw = localStorage.getItem(HISTORY_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveHistory(history) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

function updateHistory(city) {
  const history = getHistory().filter((item) => item.toLowerCase() !== city.toLowerCase());
  history.unshift(city);
  const trimmed = history.slice(0, 5);
  saveHistory(trimmed);
  renderHistory(trimmed);
}

function renderHistory(history) {
  if (!history.length) {
    historyList.textContent = "No recent searches.";
    return;
  }

  historyList.innerHTML = "";
  history.forEach((city) => {
    const item = document.createElement("button");
    item.className = "history__item";
    item.textContent = city;
    item.addEventListener("click", () => fetchWeather(city));
    historyList.appendChild(item);
  });
}

async function fetchWeather(city) {
  if (!city) return;

  try {
    descEl.textContent = "Loading...";
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      descEl.textContent = "City not found.";
      return;
    }

    const place = geoData.results[0];
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`;
    const weatherRes = await fetch(weatherUrl);
    const weatherData = await weatherRes.json();
    const current = weatherData.current;

    tempEl.textContent = `${Math.round(current.temperature_2m)}°C`;
    descEl.textContent = place.country ? `${place.name}, ${place.country}` : place.name;
    cityEl.textContent = place.name;
    windEl.textContent = `${current.wind_speed_10m} km/h`;
    humidityEl.textContent = `${current.relative_humidity_2m}%`;

    updateHistory(place.name);
  } catch (error) {
    descEl.textContent = "Unable to fetch weather.";
  }
}

searchBtn.addEventListener("click", () => {
  fetchWeather(cityInput.value.trim());
});

cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    fetchWeather(cityInput.value.trim());
  }
});

renderHistory(getHistory());
