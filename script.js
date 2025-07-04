const celdas = document.querySelectorAll('.clickable');
const ventana = document.getElementById('ventana');
const mensajePopup = document.getElementById('mensajePopup');
const cerrar = document.getElementById('cerrar');
if (celdas && ventana && mensajePopup && cerrar) {
  celdas.forEach(celda => {
    celda.addEventListener('click', () => {
      const mensaje = celda.getAttribute('data-desc');
      mensajePopup.textContent = mensaje;
      ventana.style.display = 'block';
    });
  });
  cerrar.addEventListener('click', () => {
    ventana.style.display = 'none';
  });
}

// --- Click en Uniformes de Futbol Personalizados lleva al link ---
document.querySelectorAll('.clickable-link').forEach(td => {
  td.style.cursor = 'pointer';
  td.addEventListener('click', function() {
    const url = td.getAttribute('data-url');
    if (url) window.open(url, '_blank');
  });
  td.addEventListener('mouseover', function() {
    td.style.textDecoration = 'underline';
    td.style.color = '#04bd3b';
  });
  td.addEventListener('mouseout', function() {
    td.style.textDecoration = '';
    td.style.color = '';
  });
});

// --- Mostrar solo la sección seleccionada del menú ---
const navLinks = document.querySelectorAll('.menu a');
const secciones = document.querySelectorAll('main > section');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const hash = this.getAttribute('href');
    if (hash.startsWith('#')) {
      e.preventDefault();
      secciones.forEach(sec => {
        if ('#' + sec.id === hash) {
          sec.style.display = 'block';
        } else {
          sec.style.display = 'none';
        }
      });
      // Opcional: scroll al inicio del main
      document.querySelector('main').scrollIntoView({behavior: 'smooth'});
    }
  });
});
// Mostrar solo la sección de inicio al cargar
secciones.forEach(sec => {
  if (sec.id !== 'inicio') sec.style.display = 'none';
});

// Ordenar la tabla de conocimiento y experiencia de mayor a menor
function ordenarTablaConocimiento() {
  const tabla = document.getElementById('tabla-conocimiento');
  if (!tabla) return;
  const filas = Array.from(tabla.rows).slice(1); // Excluye encabezado
  filas.sort((a, b) => {
    const valA = parseFloat(a.cells[1].textContent);
    const valB = parseFloat(b.cells[1].textContent);
    return valB - valA;
  });
  filas.forEach(fila => tabla.appendChild(fila));
}
ordenarTablaConocimiento();

// Ordenar la tabla de manejo de programas de mayor a menor
function ordenarTablaProgramas() {
  const tabla = document.querySelector('table[border="1"]');
  if (!tabla) return;
  const filas = Array.from(tabla.rows).slice(1); // Excluye encabezado
  filas.sort((a, b) => {
    const valA = parseFloat(a.cells[1].textContent);
    const valB = parseFloat(b.cells[1].textContent);
    return valB - valA;
  });
  filas.forEach(fila => tabla.appendChild(fila));
}
ordenarTablaProgramas();

// Igualar altura de las tablas de la sección inicio
function igualarAlturaTablasInicio() {
  const tablas = document.querySelectorAll('#inicio .tablas-flex > div > table');
  let maxAlto = 0;
  tablas.forEach(tabla => {
    tabla.style.height = 'auto';
    if (tabla.offsetHeight > maxAlto) maxAlto = tabla.offsetHeight;
  });
  tablas.forEach(tabla => {
    tabla.style.height = maxAlto + 'px';
  });
}
window.addEventListener('load', igualarAlturaTablasInicio);
window.addEventListener('resize', igualarAlturaTablasInicio);

// Popup para descripción de programas
document.addEventListener('DOMContentLoaded', function() {
  const popup = document.getElementById('ventana');
  const popupContent = document.getElementById('contenidoPopup');
  const cerrar = document.getElementById('cerrar');
  document.querySelectorAll('.programa-popup, .conocimiento-popup').forEach(function(td) {
    td.style.cursor = 'pointer';
    td.addEventListener('click', function() {
      popupContent.textContent = td.getAttribute('data-desc');
      popup.style.display = 'block';
    });
  });
  if (cerrar) {
    cerrar.onclick = function() {
      popup.style.display = 'none';
    };
  }
  window.onclick = function(event) {
    if (event.target === popup) {
      popup.style.display = 'none';
    }
  };
});

// --- Efecto de scroll para el título "Productor Multimedia" ---
document.addEventListener('DOMContentLoaded', function() {
  const titulo = document.getElementById('titulo-animado');
  
  if (titulo) {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      const maxDesplazamiento = 300; // máximo desplazamiento a la derecha
      
      if (scrollPosition > 50) {
        // Calcular cuánto mover hacia la derecha
        const desplazamiento = Math.min(scrollPosition - 50, maxDesplazamiento);
        titulo.style.transform = `translateX(${desplazamiento}px)`;
        
        // También hacer el texto un poco más pequeño al moverse
        const escala = Math.max(0.7, 1 - (desplazamiento / maxDesplazamiento) * 0.3);
        titulo.style.fontSize = `${2.2 * escala}em`;
      } else {
        titulo.style.transform = 'translateX(0px)';
        titulo.style.fontSize = '2.2em';
      }
    });
  }
});

// --- Efecto de desplazamiento del título al hacer scroll ---
window.addEventListener('scroll', function() {
  const titulo = document.getElementById('titulo-animado');
  if (titulo) {
    if (window.scrollY > 100) {
      titulo.classList.add('scroll-activo');
    } else {
      titulo.classList.remove('scroll-activo');
    }
  }
});
