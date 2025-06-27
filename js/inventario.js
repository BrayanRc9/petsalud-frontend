const BASE_URL = 'https://petsalud-backend.onrender.com/api';
const token = localStorage.getItem('token');

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-insumo');
  const tabla = document.getElementById('tabla-inventario');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nombre = document.getElementById('nombre').value;
      const cantidad = document.getElementById('cantidad').value;
      const unidad = document.getElementById('unidad').value;

      const res = await fetch(`${BASE_URL}/insumos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ nombre, cantidad, unidad })
      });

      if (res.ok) {
        alert('Insumo agregado');
        form.reset();
        cargarInsumos();
      }
    });

    async function cargarInsumos() {
      const res = await fetch(`${BASE_URL}/insumos`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      tabla.innerHTML = '';
      data.forEach(insumo => {
        const row = `<tr>
          <td>${insumo.nombre}</td>
          <td>${insumo.cantidad}</td>
          <td>${insumo.unidad}</td>
          <td>
            <button onclick="eliminarInsumo('${insumo._id}')">Eliminar</button>
          </td>
        </tr>`;
        tabla.innerHTML += row;
      });
    }

    cargarInsumos();
  }
});

async function eliminarInsumo(id) {
  const token = localStorage.getItem('token');
  await fetch(`${BASE_URL}/insumos/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  location.reload();
}
