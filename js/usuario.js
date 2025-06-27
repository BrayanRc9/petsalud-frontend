const BASE_URL = 'https://petsalud-backend.onrender.com/api';
const token = localStorage.getItem('token');

document.addEventListener('DOMContentLoaded', () => {
  const descargarBtn = document.querySelector('.descargar');

  if (descargarBtn) {
    descargarBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const documento = document.getElementById('id').textContent;

      const res = await fetch(`${BASE_URL}/historias/${documento}/pdf`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!res.ok) {
        alert('Error al generar PDF');
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `historia-${documento}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  }
});
