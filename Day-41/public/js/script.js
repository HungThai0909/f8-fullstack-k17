const loginForm = document.querySelector('#loginForm');

loginForm?.addEventListener('submit', function (e) {
  const email    = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();
  const clientError = document.querySelector('#clientError');
  const serverError = document.querySelector('#serverError');

  clientError.style.display = 'none';

  if (!email || !password) {
    e.preventDefault();
    clientError.style.display = 'block';
    serverError?.style && (serverError.style.display = 'none');
  }
});