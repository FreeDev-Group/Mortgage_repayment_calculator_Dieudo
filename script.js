const form = document.getElementById("mortgage-form");
const amountInput = document.getElementById("amount");
const termInput = document.getElementById("term");
const rateInput = document.getElementById("rate");
const typeInputs = document.querySelectorAll('input[name="type"]');

const monthlyEl = document.getElementById("monthly");
const totalEl = document.getElementById("total");

const emptyState = document.getElementById("empty-state");
const resultsBox = document.getElementById("results");

const clearBtn = document.querySelector(".clear-btn");




function showError(input, message) {
  const formGroup = input.closest(".form-group");
  formGroup.classList.add("error");
  formGroup.querySelector(".error-message").textContent = message;
}


function clearError(input) {
  const formGroup = input.closest(".form-group");
  formGroup.classList.remove("error");
  formGroup.querySelector(".error-message").textContent = "";
}


function getSelectedType() {
  let selected = null;
  typeInputs.forEach((radio) => {
    if (radio.checked) selected = radio.value;
  });
  return selected;
}


function formatCurrency(value) {
  return "£" + value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}


function validateForm() {
  let isValid = true;

  if (!amountInput.value) {
    showError(amountInput, "Completez ce champ svp");
    isValid = false;
  } else {
    clearError(amountInput);
  }

  if (!termInput.value) {
    showError(termInput, "Completez ce champ svp");
    isValid = false;
  } else {
    clearError(termInput);
  }

  if (!rateInput.value) {
    showError(rateInput, "Completez ce champ svp");
    isValid = false;
  } else {
    clearError(rateInput);
  }

  const selectedType = getSelectedType();
  if (!selectedType) {
    const group = typeInputs[0].closest(".form-group");
    group.classList.add("error");
    group.querySelector(".error-message").textContent =
      "Please select a mortgage type";
    isValid = false;
  } else {
    const group = typeInputs[0].closest(".form-group");
    group.classList.remove("error");
    group.querySelector(".error-message").textContent = "";
  }

  return isValid;
}

function calculateMortgage(amount, term, rate, type) {
  const monthlyRate = rate / 100 / 12;
  const months = term * 12;

  let monthly = 0;
  let total = 0;

  if (type === "repayment") {
    // formule classique
    monthly =
      (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    total = monthly * months;
  } else {
    // interest only
    monthly = amount * monthlyRate;
    total = monthly * months + amount;
  }

  return { monthly, total };
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!validateForm()) return;

  const amount = parseFloat(amountInput.value);
  const term = parseFloat(termInput.value);
  const rate = parseFloat(rateInput.value);
  const type = getSelectedType();

  const result = calculateMortgage(amount, term, rate, type);

  // Affichage
  monthlyEl.textContent = formatCurrency(result.monthly);
  totalEl.textContent = formatCurrency(result.total);

  emptyState.classList.add("hidden");
  resultsBox.classList.remove("hidden");
});


clearBtn.addEventListener("click", () => {
  form.reset();

  document.querySelectorAll(".form-group").forEach((group) => {
    group.classList.remove("error");
    const msg = group.querySelector(".error-message");
    if (msg) msg.textContent = "";
  });

  resultsBox.classList.add("hidden");
  emptyState.classList.remove("hidden");

  monthlyEl.textContent = "£0.00";
  totalEl.textContent = "£0.00";
});