const generateBtn = document.getElementById("generateBtn");
const resultEl = document.getElementById("result");
const grid = document.getElementById("grid");
const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");

let currentNumbers = [];

function getRandomNumber() {
  return Math.floor(Math.random() * 20) + 1;
}

function generateNumbers() {
  const boxes = Array.from(grid.querySelectorAll(".box"));
  currentNumbers = boxes.map(() => getRandomNumber());
  guessInput.value = "";
  resultEl.textContent = "Enter a number and click Guess.";
  resultEl.style.color = "#cbd5f5";

  boxes.forEach((box, index) => {
    box.textContent = "?";
    box.dataset.number = currentNumbers[index];
    box.classList.remove("match", "miss", "reveal");
  });
}

generateBtn.addEventListener("click", generateNumbers);
guessBtn.addEventListener("click", () => {
  const guess = Number(guessInput.value);
  if (!guess || guess < 1 || guess > 20) {
    resultEl.textContent = "Enter a number between 1 and 20.";
    resultEl.style.color = "#fecaca";
    return;
  }

  const boxes = Array.from(grid.querySelectorAll(".box"));
  let matched = false;

  boxes.forEach((box) => {
    const value = Number(box.dataset.number);
    box.classList.remove("match", "miss", "reveal");
    if (value === guess) {
      matched = true;
      box.textContent = value;
      box.classList.add("match", "reveal");
    } else {
      box.classList.add("miss");
    }
  });

  if (matched) {
    resultEl.textContent = `You guessed ${guess}! Matched cards revealed.`;
    resultEl.style.color = "#86efac";
  } else {
    resultEl.textContent = "No match. Try again!";
    resultEl.style.color = "#fecaca";
  }
});

guessInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    guessBtn.click();
  }
});
