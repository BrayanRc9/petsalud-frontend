const BASE_URL = 'https://petsalud-backend.onrender.com/api';
const token = localStorage.getItem('token');

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-cita');
  const tabla = document.getElementById('tabla-citas').querySelector('tbody');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const mascota = document.getElementById('mascotas').value;
      const fecha = document.getElementById('FechaCita').value;
      const sucursal = document.getElementById('Sucursal').value;

      const res = await fetch(`${BASE_URL}/citas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ mascota, fecha, sucursal })
      });

      const data = await res.json();
      if (res.ok) {
        alert('Cita agendada');
        form.reset();
        obtenerCitas();
      } else {
        alert(data.msg || 'Error al agendar');
      }
    });

    async function obtenerCitas() {
      const res = await fetch(`${BASE_URL}/citas`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const citas = await res.json();
      tabla.innerHTML = '';
      citas.forEach(cita => {
        const row = `<tr>
          <td>${cita.mascota}</td>
          <td>${cita.fecha}</td>
          <td>${cita.sucursal}</td>
        </tr>`;
        tabla.innerHTML += row;
      });
    }

    obtenerCitas();
  }
});
