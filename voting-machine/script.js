const buttons = document.querySelectorAll("button[data-party]");
const counts = {
  A: document.getElementById("a"),
  B: document.getElementById("b"),
  C: document.getElementById("c"),
};

const votes = { A: 0, B: 0, C: 0 };

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const party = button.dataset.party;
    votes[party] += 1;
    counts[party].textContent = votes[party];
  });
});
