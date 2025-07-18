#  Catálogo Interactivo de Productos o Servicios

Este proyecto permite a pequeños comercios, emprendedores y freelancers crear su propio catálogo web en pocos minutos, **sin conocimientos técnicos**, **sin backend**, y **sin pagar comisiones**.  
Los clientes pueden navegar el catálogo, agregar productos al carrito y enviar el pedido final por WhatsApp.

---

##  Objetivo

Ofrecer una solución simple, accesible y funcional para que cualquier persona pueda:

- Cargar sus productos o servicios.
- Generar automáticamente un catálogo web.
- Recibir pedidos por WhatsApp desde una página profesional.
- Gestionar el carrito de compras sin base de datos (localStorage).

---

##  Demo

👉 [🔗 Ver sitio publicado en Netlify](https://micatalago.netlify.app/)  
📁 [📂 Carpeta del proyecto en Google Drive](https://drive.google.com/drive/folders/1PLxTyIzJ_Jg0W4ZV8XaeosqINpoxtS1h?usp=drive_link)  
 [🔗 Repositorio en GitHub](https://github.com/FiodorPapor/cata-logo-interactivo)

---

## 🛠️ Tecnologías utilizadas

- ✅ HTML5 semántico
- ✅ CSS3 con Flexbox (responsive)
- ✅ JavaScript moderno (ES6+)
- ✅ API pública: [https://dummyjson.com/products](https://dummyjson.com/products)
- ✅ localStorage para persistencia del carrito
- ✅ Git & GitHub para control de versiones
- ✅ Netlify para hosting gratuito

---

## 🧩 Estructura del proyecto

```
catalogo-interactivo/
├── index.html         → Página principal con productos desde API
├── carrito.html       → Página con resumen del carrito
├── css/
│   └── style.css      → Estilos centralizados
├── js/
│   ├── catalogo.js    → Lógica de catálogo y fetch
│   └── formulario.js  → Lógica de carga de productos
├── assets/            → Imágenes e íconos
└── README.md          → Este archivo
```

---

## ⚙️ Funcionalidades implementadas

✅ **Consumo de API pública**  
→ Se usa `fetch()` con `async/await` para obtener productos desde `https://dummyjson.com/products`.

✅ **Renderizado dinámico de productos**  
→ Cada tarjeta incluye imagen, nombre, precio y botón “Agregar al carrito”.

✅ **Carrito funcional y persistente**  
→ Se agregan productos a `localStorage`. El carrito puede vaciarse o finalizarse.

✅ **Botones inteligentes**  
→ “Vaciar carrito” y “Finalizar compra” eliminan datos del `localStorage`.

✅ **Redirección final**  
→ Finalizar compra redirige al home (`index.html`).

✅ **Responsive y accesible**  
→ Compatible con móviles. Estructura semántica clara, navegación con teclado, buen contraste.

✅ **Código limpio y comentado**  
→ Código en español, sin pruebas ni funciones innecesarias.

---

## Cómo probarlo localmente

1. Cloná el repositorio:
   ```bash
   git clone https://github.com/FiodorPapor/cata-logo-interactivo.git
   ```
2. Abrí el archivo `index.html` con tu navegador.
3. Interactuá con el catálogo, agregá productos y navegá al carrito (`carrito.html`).

---

## Accesibilidad y SEO

- Uso de etiquetas semánticas (`<header>`, `<main>`, `<section>`, etc.).
- Imágenes con atributos `alt`.
- Contraste suficiente y navegación accesible.
- Estructura amigable para buscadores.

---

## Valor diferencial

- No requiere backend ni bases de datos.
- Funciona solo con HTML, CSS, JS y localStorage.
- Ideal para negocios pequeños o en zonas con baja conectividad.
- Escalable para futuras versiones SaaS o white-label.

---

##  Autor

Fiódor Paporotskiy 🇦🇷  
Proyecto final para el curso Talento Tech – Frontend Inicial  
📫 Contacto: fiodorpapor@gmail.com  
🔗 [LinkedIn](https://www.linkedin.com/in/tu-linkedin)  

---

##  Licencia

Este proyecto es de uso educativo y puede reutilizarse libremente con fines académicos o personales. 