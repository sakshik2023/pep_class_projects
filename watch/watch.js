const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const dayEl = document.getElementById("day");
const tzEl = document.getElementById("timezone");

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function pad(value) {
  return value.toString().padStart(2, "0");
}

function updateTime() {
  const now = new Date();
  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());

  if (timeEl) timeEl.textContent = `${hours}:${minutes}:${seconds}`;
  if (dateEl) dateEl.textContent = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
  if (dayEl) dayEl.textContent = days[now.getDay()];
  if (tzEl) tzEl.textContent = Intl.DateTimeFormat().resolvedOptions().timeZone;
}

updateTime();
setInterval(updateTime, 1000);
