const weightInput = document.getElementById("weight");
const heightInput = document.getElementById("height");
const resultEl = document.getElementById("result");
const calcBtn = document.getElementById("calcBtn");

function calculateBMI() {
  const weight = Number(weightInput.value);
  const heightCm = Number(heightInput.value);

  if (!weight || !heightCm) {
    resultEl.textContent = "Please enter both weight and height.";
    return;
  }

  const heightM = heightCm / 100;
  const bmi = weight / (heightM * heightM);
  resultEl.textContent = `Your BMI is: ${bmi.toFixed(2)}`;
}

calcBtn.addEventListener("click", calculateBMI);
