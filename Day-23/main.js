const form = document.querySelector("#register");
const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const confirmationInput = document.querySelector("#confirmation");

const touched = {
  username: false,
  email: false,
  password: false,
  confirmation: false,
};

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

function hideIcons(input) {
  const checkIcon = input.nextElementSibling;
  const errorIcon = checkIcon.nextElementSibling;

  checkIcon.classList.add("hidden");
  errorIcon.classList.add("hidden");
}

function validateUsername() {
  const value = usernameInput.value.trim();

  if (!touched.username) {
    return true;
  }

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

  if (!touched.email) {
    return true;
  }

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
  const regex = /^[\w\.-]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(email);
}

function validatePassword() {
  const value = passwordInput.value;

  if (!touched.password) {
    return true;
  }

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

  if (!touched.confirmation) {
    return true;
  }

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

usernameInput.addEventListener("input", function () {
  if (usernameInput.value.length > 0) {
    touched.username = true;
  }
  validateUsername();
});

usernameInput.addEventListener("blur", validateUsername);

emailInput.addEventListener("input", function () {
  if (emailInput.value.length > 0) {
    touched.email = true;
  }
  validateEmail();
});

emailInput.addEventListener("blur", validateEmail);

passwordInput.addEventListener("input", function () {
  if (passwordInput.value.length > 0) {
    touched.password = true;
  }
  validatePassword();
});

passwordInput.addEventListener("blur", validatePassword);

confirmationInput.addEventListener("input", function () {
  if (confirmationInput.value.length > 0) {
    touched.confirmation = true;
  }
  validateConfirmation();
});

confirmationInput.addEventListener("blur", validateConfirmation);

form.addEventListener("submit", function (e) {
  e.preventDefault();

  touched.username = true;
  touched.email = true;
  touched.password = true;
  touched.confirmation = true;

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

usernameInput.focus();
