const nameInput = document.getElementById("name");
const balanceInput = document.getElementById("balance");
const amountInput = document.getElementById("amount");
const messageEl = document.getElementById("msg");
const createBtn = document.getElementById("createBtn");
const depositBtn = document.getElementById("depositBtn");
const withdrawBtn = document.getElementById("withdrawBtn");

let accountName = "";
let currentBalance = 0;

function updateMessage(text) {
  messageEl.textContent = text;
}

function createAccount() {
  accountName = nameInput.value.trim();
  currentBalance = Number(balanceInput.value);

  if (!accountName || Number.isNaN(currentBalance)) {
    updateMessage("Please enter a name and starting balance.");
    return;
  }

  updateMessage(`Account created for ${accountName}. Balance: ₹${currentBalance}`);
}

function deposit() {
  const amount = Number(amountInput.value);
  if (Number.isNaN(amount) || amount <= 0) {
    updateMessage("Enter a valid deposit amount.");
    return;
  }
  currentBalance += amount;
  updateMessage(`Deposited ₹${amount}. Balance: ₹${currentBalance}`);
}

function withdraw() {
  const amount = Number(amountInput.value);
  if (Number.isNaN(amount) || amount <= 0) {
    updateMessage("Enter a valid withdrawal amount.");
    return;
  }
  if (amount <= currentBalance) {
    currentBalance -= amount;
    updateMessage(`Withdrawn ₹${amount}. Balance: ₹${currentBalance}`);
  } else {
    updateMessage("Insufficient Balance!");
  }
}

createBtn.addEventListener("click", createAccount);
depositBtn.addEventListener("click", deposit);
withdrawBtn.addEventListener("click", withdraw);
