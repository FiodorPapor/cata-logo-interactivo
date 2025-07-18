// Variables globales y selectores
const productosKey = 'productos';
let productos = [];

const form = document.querySelector('.formulario-producto');
const listaProductos = document.getElementById('lista-productos');
const btnCrearCatalogo = document.getElementById('crearCatalogo');
const tooltip = document.querySelector('.detalle-tooltip');
const tooltipCard = tooltip?.querySelector('.detalle-card');

// Utilidades
function guardarProductos() {
  localStorage.setItem(productosKey, JSON.stringify(productos));
}

function cargarProductos() {
  const data = localStorage.getItem(productosKey);
  productos = data ? JSON.parse(data) : [];
}

function limpiarFormulario() {
  form.reset();
}

function mostrarFeedback(msg, tipo = 'error') {
  alert(msg);
}

function getImagenValida(url) {
  if (!url || url.trim() === '') return '';
  try {
    new URL(url);
    return url;
  } catch {
    return '';
  }
}

function generarId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

// Renderizado de productos agregados
function renderizarProductos() {
  listaProductos.innerHTML = '';
  const productosSection = document.getElementById('productosSection');
  if (productos.length === 0) {
    if (productosSection) productosSection.style.display = 'none';
    btnCrearCatalogo.disabled = true;
    return;
  } else {
    if (productosSection) productosSection.style.display = '';
  }
  productos.forEach((prod) => {
    const item = document.createElement('div');
    item.className = 'producto-item';
    item.style.animation = 'fadeInSlide 0.35s cubic-bezier(.4,0,.2,1)';
    // Nombre
    const contNombre = document.createElement('span');
    contNombre.className = 'producto-nombre';
    contNombre.textContent = prod.nombre;
    // Precio
    const contPrecio = document.createElement('span');
    contPrecio.className = 'producto-precio';
    contPrecio.textContent = `$${Number(prod.precio).toFixed(2)}`;
    // Acciones
    const acciones = document.createElement('span');
    acciones.className = 'producto-acciones';
    // Info
    const info = document.createElement('span');
    info.className = 'icono info btn-info';
    info.setAttribute('tabindex', '0');
    info.setAttribute('aria-label', 'Ver detalles');
    info.innerHTML = `<svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="8.5" stroke="#222" stroke-width="1.1"/><rect x="9.1" y="8.5" width="1.8" height="5.2" rx="0.9" fill="#222"/><rect x="9.1" y="5.2" width="1.8" height="1.8" rx="0.9" fill="#222"/></svg>`;
    info.addEventListener('mouseenter', e => { if (!tooltipFixed) mostrarTooltip(prod, info); });
    info.addEventListener('mouseleave', e => { if (!tooltipFixed) ocultarTooltip(); });
    info.addEventListener('click', e => { mostrarTooltip(prod, info, false, true); });
    info.addEventListener('touchstart', e => {
      e.preventDefault();
      mostrarTooltip(prod, info, true);
    });
    // Eliminar
    const eliminar = document.createElement('span');
    eliminar.className = 'icono eliminar btn-eliminar';
    eliminar.setAttribute('tabindex', '0');
    eliminar.setAttribute('aria-label', 'Eliminar producto');
    eliminar.innerHTML = `<svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="5.5" y1="5.5" x2="14.5" y2="14.5" stroke="#222" stroke-width="1.1" stroke-linecap="round"/><line x1="14.5" y1="5.5" x2="5.5" y2="14.5" stroke="#222" stroke-width="1.1" stroke-linecap="round"/></svg>`;
    eliminar.addEventListener('click', () => eliminarProducto(prod.id));
    acciones.appendChild(info);
    acciones.appendChild(eliminar);
    item.appendChild(contNombre);
    item.appendChild(contPrecio);
    item.appendChild(acciones);
    listaProductos.appendChild(item);
  });
  btnCrearCatalogo.disabled = productos.length === 0;
}

// Tooltip de detalles
let tooltipTimeout = null;
let tooltipFixed = false;

function mostrarTooltip(prod, anchor, isTouch = false, fixed = false) {
  const prevTooltip = anchor.parentElement.querySelector('.tooltip-producto');
  if (prevTooltip) prevTooltip.remove();
  const imagenValida = getImagenValida(prod.imagen);
  let imagenHTML = '';
  if (imagenValida) {
    imagenHTML = `<img src="${imagenValida}" alt="Imagen producto" class="tooltip-imagen">`;
  }
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip-producto visible';
  tooltip.innerHTML = `
    <button class="tooltip-cerrar" title="Cerrar">&times;</button>
    ${imagenHTML}
    <div class="detalle-nombre">${prod.nombre}</div>
    <div class="detalle-precio">$${Number(prod.precio).toFixed(2)}</div>
    <button class="btn-agregar">Agregar al carrito</button>
  `;
  tooltip.querySelector('.tooltip-cerrar').onclick = () => tooltip.remove();
  anchor.parentElement.appendChild(tooltip);
}

function ocultarTooltip() {
  document.querySelectorAll('.tooltip-producto').forEach(t => t.remove());
}
function cerrarTooltipTouch(e) {
  if (!tooltip.contains(e.target)) ocultarTooltip();
}

function eliminarProducto(id) {
  productos = productos.filter(p => p.id !== id);
  guardarProductos();
  renderizarProductos();
}

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const nombre = form.nombre.value.trim();
  const precio = parseFloat(form.precio.value);
  const imagen = form.imagen.value.trim();
  const descripcion = form.descripcion.value.trim();
  if (!nombre) return mostrarFeedback('El nombre es obligatorio.');
  if (productos.some(p => p.nombre.toLowerCase() === nombre.toLowerCase()))
    return mostrarFeedback('Ya existe un producto con ese nombre.');
  if (isNaN(precio) || precio <= 0) return mostrarFeedback('El precio debe ser mayor a 0.');
  if (descripcion.length > 200) return mostrarFeedback('La descripción es muy larga.');
  const producto = {
    id: generarId(),
    nombre,
    precio,
    imagen: imagen.trim(),
    descripcion
  };
  productos.push(producto);
  guardarProductos();
  renderizarProductos();
  limpiarFormulario();
});

btnCrearCatalogo.addEventListener('click', function() {
  if (productos.length > 0) {
    window.open('catalogo.html', '_blank');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  cargarProductos();
  renderizarProductos();
  const iconBtn = document.querySelector('.input-icon-btn');
  const fileInput = document.querySelector('.input-file-image');
  const urlInput = document.getElementById('imagen');
  if (iconBtn && fileInput && urlInput) {
    iconBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
      const file = fileInput.files && fileInput.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(ev) {
          urlInput.value = ev.target.result;
        };
        reader.readAsDataURL(file);
      }
      fileInput.value = '';
    });
  }
}); 