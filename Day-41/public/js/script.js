const loginForm   = document.querySelector('#loginForm');
const emailInput  = document.querySelector('#email');
const passInput   = document.querySelector('#password');
const clientError = document.querySelector('#clientError');
const serverError = document.querySelector('#serverError');

loginForm.addEventListener('submit', function (e) {
  const email    = emailInput.value.trim();
  const password = passInput.value.trim();

  clientError.style.display = 'none';

  if (!email || !password) {
    e.preventDefault();
    clientError.style.display = 'block';
    if (serverError) serverError.style.display = 'none';
  }
});