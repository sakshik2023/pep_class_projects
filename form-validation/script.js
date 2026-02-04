const form = document.getElementById("studentForm");
const nameInput = document.getElementById("name");
const courseInput = document.getElementById("course");
const regInput = document.getElementById("reg");
const ageInput = document.getElementById("age");
const termsInput = document.getElementById("terms");
const successEl = document.getElementById("success");

const nameError = document.getElementById("nameError");
const courseError = document.getElementById("courseError");
const regError = document.getElementById("regError");
const ageError = document.getElementById("ageError");
const genderError = document.getElementById("genderError");
const termsError = document.getElementById("termsError");

function clearErrors() {
  nameError.textContent = "";
  courseError.textContent = "";
  regError.textContent = "";
  ageError.textContent = "";
  genderError.textContent = "";
  termsError.textContent = "";
  successEl.textContent = "";
}

function validateForm() {
  clearErrors();
  let isValid = true;

  if (nameInput.value.trim().length < 3) {
    nameError.textContent = "Name must be at least 3 characters.";
    isValid = false;
  }

  if (!courseInput.value) {
    courseError.textContent = "Please select a course.";
    isValid = false;
  }

  const regPattern = /^REG-\d{4}$/i;
  if (!regPattern.test(regInput.value.trim())) {
    regError.textContent = "Registration format: REG-1234";
    isValid = false;
  }

  const age = Number(ageInput.value);
  if (!age || age < 16 || age > 60) {
    ageError.textContent = "Age must be between 16 and 60.";
    isValid = false;
  }

  const genderSelected = document.querySelector("input[name=\"gender\"]:checked");
  if (!genderSelected) {
    genderError.textContent = "Please select gender.";
    isValid = false;
  }

  if (!termsInput.checked) {
    termsError.textContent = "Please confirm the details.";
    isValid = false;
  }

  return isValid;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (validateForm()) {
    successEl.textContent = "Form submitted successfully!";
    form.reset();
  }
});
