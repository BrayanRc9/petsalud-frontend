// js/auth.js
const BASE_URL = 'https://petsalud-backend.onrender.com/api';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('form-login');
  const registerForm = document.getElementById('form-register');
  const btnLogin = document.getElementById('btn-login');
  const btnRegister = document.getElementById('btn-register');

  // Alternar formularios
  btnLogin.addEventListener('click', () => {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
  });

  btnRegister.addEventListener('click', () => {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
  });

  // Login
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;

    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.token);
      window.location.href = 'usuario.html';
    } else {
      alert(data.msg || 'Error al iniciar sesión');
    }
  });

  // Registro
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = registerForm.nombre.value;
    const email = registerForm.email.value;
    const password = registerForm.password.value;

    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, password })
    });

    const data = await res.json();

    if (res.ok) {
      alert('Cuenta creada con éxito. Inicia sesión.');
      btnLogin.click();
      registerForm.reset();
    } else {
      alert(data.msg || 'Error al registrarse');
    }
  });
});