// Renderizado de productos del catálogo
async function cargarProductosAPI() {
  const contenedor = document.getElementById('productos-api');
  if (!contenedor) return;
  contenedor.innerHTML = '<div style="text-align:center;color:#b3b3b3;padding:2em;">Cargando productos...</div>';
  try {
    const resp = await fetch('https://dummyjson.com/products?limit=12');
    const data = await resp.json();
    let productosLocales = JSON.parse(localStorage.getItem('productos') || '[]');
    const todos = [...productosLocales, ...data.products];
    contenedor.innerHTML = '';
    const grid = document.createElement('div');
    grid.className = 'catalogo-grid';
    todos.forEach(producto => {
      const card = document.createElement('div');
      card.className = 'producto-card';
      const img = producto.thumbnail || producto.imagen || '';
      const nombre = producto.nombre || producto.title || '';
      const precio = producto.price || producto.precio || '';
      card.innerHTML = `
        <img src="${img}" alt="${nombre}" class="producto-img" style="background:#f5f6fa;">
        <div class="producto-nombre">${nombre}</div>
        <div class="producto-precio">$${precio}</div>
        <div class="producto-btns">
          <button class="btn-agregar" data-id="${producto.id || ''}" data-nombre="${nombre}" data-precio="${precio}" data-img="${img}">Agregar al carrito</button>
        </div>
      `;
      grid.appendChild(card);
      card.onclick = e => {
        if (!card.querySelector('.btn-agregar').contains(e.target)) {
          abrirModal({
            nombre,
            precio,
            imagen: img,
            descripcion: producto.description || producto.descripcion || ''
          });
        }
      };
    });
    contenedor.appendChild(grid);
    contenedor.querySelectorAll('.btn-agregar').forEach(btn => {
      btn.addEventListener('click', e => {
        let producto;
        if (btn.getAttribute('data-id')) {
          const id = btn.getAttribute('data-id');
          producto = todos.find(p => (p.id || '') == id);
        } else {
          producto = {
            nombre: btn.getAttribute('data-nombre'),
            precio: btn.getAttribute('data-precio'),
            imagen: btn.getAttribute('data-img'),
            cantidad: 1
          };
        }
        if (!producto) return;
        let carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
        carrito.push({
          id: producto.id || undefined,
          nombre: producto.title || producto.nombre,
          precio: producto.price || producto.precio,
          imagen: producto.thumbnail || producto.imagen,
          cantidad: 1
        });
        localStorage.setItem('carrito', JSON.stringify(carrito));
        updateCarritoContador();
        btn.textContent = 'Agregado!';
        btn.disabled = true;
        setTimeout(() => {
          btn.textContent = 'Agregar al carrito';
          btn.disabled = false;
        }, 1200);
      });
    });
  } catch (err) {
    contenedor.innerHTML = '<div style="color:#c00;text-align:center;padding:2em;">Error al cargar productos.</div>';
  }
}

function updateCarritoContador() {
  const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
  const contador = document.getElementById('carritoContador');
  const total = carrito.reduce((acc, p) => acc + (Number(p.cantidad) || 1), 0);
  if (contador) {
    contador.textContent = total;
    contador.style.display = total > 0 ? '' : 'none';
  }
}

// Búsqueda y filtro en el catálogo

const buscarBtn = document.getElementById('buscarBtn');
const searchContainer = document.getElementById('searchContainer');
const searchInput = document.getElementById('searchInput');
const closeSearch = document.getElementById('closeSearch');
const productosApi = document.getElementById('productos-api');
let productosFiltrados = [];

buscarBtn.addEventListener('click', () => {
  searchContainer.style.display = 'flex';
  searchInput.value = '';
  searchInput.focus();
});
closeSearch.addEventListener('click', () => {
  searchContainer.style.display = 'none';
  renderFiltrado('');
});
searchInput.addEventListener('input', e => {
  const val = e.target.value.trim().toLowerCase();
  renderFiltrado(val);
});
function renderFiltrado(filtro) {
  const cards = productosApi.querySelectorAll('.producto-card');
  cards.forEach(card => {
    const nombre = card.querySelector('.producto-nombre')?.textContent?.toLowerCase() || '';
    const desc = card.querySelector('.producto-precio')?.textContent?.toLowerCase() || '';
    if (!filtro || nombre.includes(filtro) || desc.includes(filtro)) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

// Acceso rápido al carrito
const carritoIcon = document.getElementById('carritoIcon');
if (carritoIcon) {
  carritoIcon.addEventListener('click', () => {
    window.location.href = 'carrito.html';
  });
}

// Delegación de clic en tarjetas de producto
productosApi.addEventListener('click', function(e) {
  const card = e.target.closest('.producto-card');
  if (card && !e.target.classList.contains('btn-agregar')) {
    const nombre = card.querySelector('.producto-nombre')?.textContent || '';
    const precio = card.querySelector('.producto-precio')?.textContent.replace('$','') || '';
    const img = card.querySelector('.producto-img')?.getAttribute('src') || '';
    const desc = card.querySelector('.producto-nombre')?.getAttribute('data-desc') || '';
    abrirModal({ nombre, precio, imagen: img, descripcion: desc });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  cargarProductosAPI();
  updateCarritoContador();
});

// Sombra y sticky toolbar
window.addEventListener('scroll', function() {
  const toolbar = document.getElementById('toolbar');
  if (!toolbar) return;
  if (window.scrollY > 4) {
    toolbar.classList.add('toolbar-shadow');
  } else {
    toolbar.classList.remove('toolbar-shadow');
  }
}); 