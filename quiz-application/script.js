const submitBtn = document.getElementById("submitBtn");
const resultEl = document.getElementById("result");

const answers = {
  q1: "Delhi",
  q2: "JavaScript",
  q3: "Library",
};

function calculateScore() {
  let score = 0;
  Object.keys(answers).forEach((key) => {
    const selected = document.querySelector(`input[name="${key}"]:checked`);
    if (selected && selected.value === answers[key]) {
      score += 1;
    }
  });
  resultEl.textContent = `Your Score: ${score} / 3`;
}

submitBtn.addEventListener("click", calculateScore);
