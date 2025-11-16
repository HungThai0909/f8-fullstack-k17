const form = document.querySelector("#register");
const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const confirmationInput = document.querySelector("#confirmation");

function showError(input, message) {
  const parent = input.parentElement.parentElement;
  const checkIcon = input.nextElementSibling;
  const errorIcon = checkIcon.nextElementSibling;

  checkIcon.classList.add("hidden");
  errorIcon.classList.remove("hidden");

  input.classList.add("border-red-500");
  input.classList.remove("border-gray-300");

  let errorMessage = parent.querySelector(".error-message");
  if (!errorMessage) {
    errorMessage = document.createElement("span");
    errorMessage.classList.add(
      "error-message",
      "text-red-500",
      "text-sm",
      "mt-1"
    );
    parent.appendChild(errorMessage);
  }
  errorMessage.textContent = message;
}

function showSuccess(input) {
  const parent = input.parentElement.parentElement;
  const checkIcon = input.nextElementSibling;
  const errorIcon = checkIcon.nextElementSibling;

  checkIcon.classList.remove("hidden");
  errorIcon.classList.add("hidden");

  input.classList.remove("border-red-500");
  input.classList.add("border-gray-300");

  const errorMessage = parent.querySelector(".error-message");
  if (errorMessage) {
    errorMessage.remove();
  }
}

function validateUsername() {
  const value = usernameInput.value.trim();

  if (value === "") {
    showError(usernameInput, "Username cannot be blank");
    return false;
  } else {
    showSuccess(usernameInput);
    return true;
  }
}

function validateEmail() {
  const value = emailInput.value.trim();

  if (value === "") {
    showError(emailInput, "Please enter valid email address");
    return false;
  } else if (!isValidEmail(value)) {
    showError(emailInput, "Please enter valid email address");
    return false;
  } else {
    showSuccess(emailInput);
    return true;
  }
}

function isValidEmail(email) {
  const regex = /.+@.+\..+/;
  return regex.test(email);
}

function validatePassword() {
  const value = passwordInput.value;
  if (value === "") {
    showError(passwordInput, "Password cannot be blank");
    return false;
  } else {
    showSuccess(passwordInput);
    return true;
  }
}

function validateConfirmation() {
  const value = confirmationInput.value;
  const passwordValue = passwordInput.value;

  if (value === "") {
    showError(confirmationInput, "Password confirmation required");
    return false;
  } else if (value !== passwordValue) {
    showError(confirmationInput, "Password does not match");
    return false;
  } else {
    showSuccess(confirmationInput);
    return true;
  }
}

usernameInput.addEventListener("input", validateUsername);
usernameInput.addEventListener("blur", validateUsername);

emailInput.addEventListener("input", validateEmail);
emailInput.addEventListener("blur", validateEmail);

passwordInput.addEventListener("input", validatePassword);
passwordInput.addEventListener("blur", validatePassword);

confirmationInput.addEventListener("input", validateConfirmation);
confirmationInput.addEventListener("blur", validateConfirmation);

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const isUsernameValid = validateUsername();
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  const isConfirmationValid = validateConfirmation();
  const isFormValid =
    isUsernameValid && isEmailValid && isPasswordValid && isConfirmationValid;

  if (isFormValid) {
    alert("Account created successfully!");
  }
});
