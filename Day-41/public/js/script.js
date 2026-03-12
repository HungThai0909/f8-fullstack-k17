const loginForm = document.querySelector("#loginForm");

loginForm?.addEventListener("submit", function (e) {
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();
  const clientError = document.querySelector("#clientError");
  const serverError = document.querySelector("#serverError");

  clientError.style.display = "none";

  const emailInput = document.querySelector("#email");
  const passwordInput = document.querySelector("#password");
  const emailError = document.querySelector("#emailError");
  const passwordError = document.querySelector("#passwordError");

  if (!email || !password) {
    e.preventDefault();
    clientError.style.display = "block";
    serverError?.style && (serverError.style.display = "none");

    if (!email) {
      emailInput.classList.add("is-invalid");
      emailError.style.display = "block";
    }
    if (!password) {
      passwordInput.classList.add("is-invalid");
      passwordError.style.display = "block";
    }
  }
  emailInput.addEventListener("input", () =>
    emailInput.classList.remove("is-invalid"),
  );
  passwordInput.addEventListener("input", () =>
    passwordInput.classList.remove("is-invalid"),
  );
});
