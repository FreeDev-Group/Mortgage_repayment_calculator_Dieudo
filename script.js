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

