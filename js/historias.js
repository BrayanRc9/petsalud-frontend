const BASE_URL = 'https://petsalud-backend.onrender.com/api';
const token = localStorage.getItem('token');

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nombreMascota = form.nombreMascota.value;
      const raza = form.raza.value;
      const edad = form.edad.value;
      const documento = document.getElementById('documentoMascota').value;
      const detalle = form.detalle.value;

      const res = await fetch(`${BASE_URL}/historias`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ nombreMascota, raza, edad, documento, detalle })
      });

      const data = await res.json();
      if (res.ok) {
        alert('Historia guardada');
        form.reset();
      } else {
        alert(data.msg || 'Error al guardar historia');
      }
    });
  }
});
