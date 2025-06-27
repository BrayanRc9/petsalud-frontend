const BASE_URL = 'https://petsalud-backend.onrender.com/api';
const token = localStorage.getItem('token');

// Crear usuarios médicos/admin
document.getElementById('form-usuario').addEventListener('submit', async (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const rol = document.getElementById('rol').value;

  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email, password, rol })
  });

  const data = await res.json();
  alert(data.msg || 'Usuario creado');
  e.target.reset();
});

// Insumos
const tabla = document.querySelector('#tabla-inventario tbody');

document.getElementById('form-insumo').addEventListener('submit', async (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombreInsumo').value;
  const cantidad = document.getElementById('cantidad').value;
  const unidad = document.getElementById('unidad').value;

  await fetch(`${BASE_URL}/insumos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ nombre, cantidad, unidad })
  });

  e.target.reset();
  cargarInsumos();
});

async function cargarInsumos() {
  const res = await fetch(`${BASE_URL}/insumos`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const insumos = await res.json();
  tabla.innerHTML = '';
  insumos.forEach(i => {
    const row = `<tr>
      <td>${i.nombre}</td>
      <td>${i.cantidad}</td>
      <td>${i.unidad}</td>
      <td><button onclick="eliminarInsumo('${i._id}')">🗑️</button></td>
    </tr>`;
    tabla.innerHTML += row;
  });
}

async function eliminarInsumo(id) {
  await fetch(`${BASE_URL}/insumos/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  cargarInsumos();
}

document.addEventListener('DOMContentLoaded', cargarInsumos);
