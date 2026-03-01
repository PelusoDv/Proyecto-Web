/*const { log } = require("console");
const e = require("cors");*/

const slideBtns = document.querySelectorAll(".slidebtn");
const sliders = document.querySelectorAll(".slide");
const loginModal = document.getElementById("loginModal");
const productModal = document.getElementById("productModal");
const contProductos = document.querySelector(".cafes")
const modlabtn = document.querySelector(".modalbtn");
const inputs = document.querySelectorAll("#loginForm input");
let actual = 0;
let intervalo;

function mostrarSlide(index) {
    sliders.forEach(slide => {
        [...slide.children].forEach(hijo => hijo.classList.remove("activo")); // [...slide.children].forEach(hijo => hijo.classList.add("inactivo"));
        slide.style.opacity = "0";
        slide.style.zIndex = "0";
    });

    const slideActivo = sliders[index];
    [...slideActivo.children].forEach(hijo => hijo.classList.add("activo"));
    slideActivo.style.opacity = "1";
    slideActivo.style.zIndex = "1";
}

mostrarSlide(actual);

function intervaloInicio() {
    clearInterval(intervalo);
    intervalo = setInterval(() => {
        actual = (actual + 1) % sliders.length; // reinicia automáticamente al final
        mostrarSlide(actual);
    }, 6000);
}

intervaloInicio();

slideBtns.forEach(btn => {
    btn.addEventListener("click", (event) => {
        event.preventDefault()
        const id = btn.getAttribute("href").slice(1);
        const scrollY = window.scrollY; // guarda posición actual

        location.hash = id;
        window.scrollTo(0, scrollY);

        sliders.forEach(slide => {
            [...slide.children].forEach(hijo => hijo.classList.remove("activo"));
            slide.style.opacity = "0";
            slide.style.zIndex = "0";
        });

        const target = document.getElementById(id);
        [...target.children].forEach(hijo => hijo.classList.add("activo"));
        target.style.opacity = "1";
        target.style.zIndex = "1";

        actual = (id[6]) - 1
        intervaloInicio()
    });
});

// 1. Selecciona el botón y el menú
const menuButton = document.querySelector('.hamb-bar button');
const menuList = document.querySelector('.hamb-menu');

// 2. Define la función para alternar la clase 'open'
const toggleMenu = () => {
    // La clase 'open' es la que hace visible el menú en el CSS
    menuList.classList.toggle('open');
};

// 3. Asigna el evento de clic al botón
menuButton.addEventListener('click', (event) => {
    event.stopPropagation(); // Previene que el clic llegue al listener del documento (Paso 3)
    toggleMenu();
});

// Función para cerrar el menú
const closeMenu = () => {
    if (menuList.classList.contains('open')) {
        menuList.classList.remove('open');
        menuButton.textContent = '≡';
        menuButton.setAttribute('aria-expanded', 'false');
    }
};

document.addEventListener('click', (event) => {
    // Verifica si el clic ocurrió FUERA del contenedor de navegación (`.hamb-bar`)
    if (menuList.classList.contains('open') && !menuList.contains(event.target)) {
        closeMenu();
    }
});

const barraDesk = document.querySelector('.top-bar');
const barraMov = document.querySelector('.hamb-bar');
// Establecer el punto de fijación inicial
puntoFijo = window.innerWidth >= 980 ? barraDesk.offsetHeight + 15 : barraMov.offsetHeight + 15;
// Recalcular el punto de fijación cada vez que la ventana cambia de tamaño
window.addEventListener("resize", () => {
    puntoFijo = window.innerWidth >= 980 ? barraDesk.offsetHeight + 15 : barraMov.offsetHeight + 15;
});

// Función que se ejecuta cada vez que el usuario hace scroll
const manejarScroll = () => {
    // window.scrollY (o window.pageYOffset) es la distancia en píxeles que hemos bajado
    if (window.scrollY >= puntoFijo) {
        // El usuario ha pasado el punto de fijación
        barraDesk.classList.add('scroll');
        barraDesk.style.opacity = "1";
        barraMov.classList.add('scroll');
        barraMov.style.opacity = "1";
    } else {
        // El usuario está por encima o regresó al punto de fijación
        barraDesk.classList.remove('scroll');
        barraMov.classList.remove('scroll');
    }
};

// Ejecutarlo una vez al cargar la página (por si recargan en medio del scroll)
manejarScroll();

// Agregar el listener al evento scroll
window.addEventListener('scroll', manejarScroll);

// Codigo para controlar el modal de login
// Función para abrir el modal
function openModal(modal) {
    modal.classList.remove("hidden");
}

// Función para cerrar el modal
function closeModal(modal) {
    modal.classList.add("hidden");
}

// Evento para cerrar el modal si se hace clic fuera de él
window.addEventListener("click", function (event) {
    if (event.target === loginModal || event.target === productModal) { // Asegura que el clic fue en el fondo de algun modal
        closeModal(event.target);
        // Si se estaba editando un producto, al cerrar el modal se borra esa información 
        // para evitar conflictos si se vuelve a abrir el modal para agregar un nuevo producto
        if (localStorage.getItem("productoEditando")) {
            localStorage.removeItem("productoEditando");
        }
        // Al cerrar el modal de edición, se limpian los campos para evitar que queden datos del producto editado al agregar un nuevo producto
        document.getElementById("productName").value = "";
        document.getElementById("productImageUrl").value = "";
        document.getElementById("productHoverImageUrl").value = "";
        document.getElementById("productLinkUrl").value = "";
    }
});

// Evento para abrir el modal de login al hacer clic en el botón
document.querySelectorAll(".logbtn").forEach(btn => {
    btn.addEventListener("click", () => openModal(loginModal));
});

// Evento para cerrar el modal al hacer clic en el botón de cerrar
document.querySelectorAll(".close-button").forEach(btn => {
    btn.addEventListener("click", (event) => {
        const modal = event.target.closest(".modal");
        closeModal(modal);
        // Si se estaba editando un producto, al cerrar el modal se borra esa información 
        // para evitar conflictos si se vuelve a abrir el modal para agregar un nuevo producto
        if (localStorage.getItem("productoEditando")) {
            localStorage.removeItem("productoEditando");
        }
        // Al cerrar el modal de edición, se limpian los campos para evitar que queden datos del producto editado al agregar un nuevo producto
        document.getElementById("productName").value = "";
        document.getElementById("productImageUrl").value = "";
        document.getElementById("productHoverImageUrl").value = "";
        document.getElementById("productLinkUrl").value = "";
    });
});

// codigo relacionadas con el usuario logeado
function logout() {
    localStorage.removeItem("usuarioLogueado");
    location.reload();
}

// Codigo encargado del manejo de productos y roles de usuario
let productos = [];
document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Hacer una solicitud al servidor para obtener los productos
        const response = await fetch("/productos");
        productos = await response.json();

        // Renderizar los productos en el HTML
        renderProductos(productos);
        editarProductoModal();
        agregarProductoModal();
        eliminarProducto();
        // Llamar a la función para manejar los roles después de cargar los productos
        manejoDeRoles();

        console.log("Productos:", productos);
    } catch (error) {
        console.error("Error al obtener productos:", error);
    }
});

// Función para renderizar los productos en el HTML
function renderProductos(productos) {
    productos.forEach(producto => {
        // Creamos el contenedor de cada producto
        const card = document.createElement("div");
        card.dataset.id = producto._id;; // Asignamos el ID del producto al dataset del elemento para facilitar su acceso luego
        card.classList.add("product-element");

        // Creamos un contenedor para los botones de admin (editar y eliminar)
        const adminBtns = document.createElement("div");
        adminBtns.classList.add("adminbtns");
        adminBtns.classList.add("undisplayed"); // Ocultamos los botones por defecto, se mostrarán solo si el usuario es admin

        // Creamos el botón de editar
        const editButton = document.createElement("button");
        const editImg = document.createElement("img");
        editImg.src = "/assets/edit.png";
        editImg.alt = "Boton de editar producto";
        editImg.title = "Editar producto";
        editButton.classList.add("edit-btn");
        editButton.appendChild(editImg);

        // Creamos el botón de eliminar
        const deleteButton = document.createElement("button");
        const deleteImg = document.createElement("img");
        deleteImg.src = "/assets/delete.png";
        deleteImg.alt = "Boton de eliminar producto";
        deleteImg.title = "Eliminar producto";
        deleteButton.classList.add("delete-btn");
        deleteButton.appendChild(deleteImg);

        // Agregamos los botones al contenedor de admin
        adminBtns.appendChild(editButton);
        adminBtns.appendChild(deleteButton);
        // Agregamos los botones de admin a la tarjeta del producto
        card.appendChild(adminBtns);

        // Creamos el enlace que envuelve la imagen y el título
        const link = document.createElement("a");
        link.href = producto.linkUrl;
        link.classList.add("product-image-link");

        // Creamos la imagen del producto
        const img = document.createElement("img");
        img.src = producto.imageUrl;
        img.alt = producto.name + " Molido o en Grano";

        // Creamos el título del producto
        const title = document.createElement("h3");
        title.classList.add("product-title");
        title.textContent = producto.name;

        // Armamos la tarjeta del producto, agregando la imagen y el título al enlace, y luego el enlace a la tarjeta
        link.appendChild(img);
        link.appendChild(title);
        // Agregamos el enlace (que contiene la imagen y el título) a la tarjeta del producto
        card.appendChild(link);

        // Finalmente, agregamos la tarjeta al contenedor de productos en el HTML
        contProductos.appendChild(card);
    });
};

// Modificaciones en al cargar de la página si hay un usuario logueado
const usuarioGuardado = localStorage.getItem("usuarioLogueado");
function manejoDeRoles() {
    if (usuarioGuardado) {
        const usuario = JSON.parse(usuarioGuardado);
        console.log("Sesión activa:", usuario.name);

        // Cambiar botón login a logout
        document.querySelectorAll(".logbtn").forEach(btn => {
            btn.innerHTML = "<p>LogOut</p>";
        });

        // Cambiar el título del modal
        document.querySelector(".modalTitle").textContent = "Hasta la proxima, " + usuario.name + "!";

        // Ocultar los inputs del formulario
        inputs.forEach(input => {
            input.classList.add("undisplayed");
        });

        // Cambiar el botón del modal para cerrar sesión
        modlabtn.textContent = "Cerrar Sesión";
        modlabtn.addEventListener("click", logout);

        // Modificaciones específicas según el rol del usuario
        if (usuario.role == "admin") { // Si el usuario es admin
            document.querySelectorAll(".adminbtns").forEach(div => {
                div.classList.remove("undisplayed"); // Mostrar los botones de editar y eliminar productos
                document.querySelector(".add-btn").classList.remove("undisplayed"); // Mostrar el botón de agregar producto
            });
        }
        if (usuario.role == "user") { // Si el usuario es un cliente común
            let mensaje = document.createElement("h4");
            mensaje.textContent = "Oferta exclusiva para usuarios registrados: 10% de descuento en tu próxima compra!";
            document.querySelector(".central > hr").after(mensaje);
            mensaje.classList.add("oferta");
        }
    }
}

// Funciones para manejar el modal de agregar/editar productos (solo para admin)
const confirmBtn = productModal.querySelector(".confirmbtn");
const modalTitle = productModal.querySelector(".modalTitle");

function editarProductoModal() {
    // Evento para el botón de editar producto
    document.querySelectorAll(".edit-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            openModal(productModal);
            const idProducto = btn.closest(".product-element").dataset.id; // Obtenemos el ID del producto desde el dataset del elemento, que se asignó al renderizar los productos
            localStorage.setItem("productoEditando", idProducto); // Guardamos el ID del producto que se está editando en localStorage para usarlo luego en el formulario de edición
            // Modificamos el modal para que se adapte a la edición de productos
            confirmBtn.textContent = "Confirmar Cambios";
            modalTitle.textContent = "Editar Producto";
            try {
                fetch(`/producto/${idProducto}`) // Hacemos una solicitud al servidor para obtener los datos del producto a editar
                    .then(res => res.json())
                    .then(producto => {
                        (document.getElementById("productName")).value = producto.name;
                        (document.getElementById("productImageUrl")).value = producto.imageUrl;
                        (document.getElementById("productHoverImageUrl")).value = producto.hoverImageUrl;
                        (document.getElementById("productLinkUrl")).value = producto.linkUrl;
                    });
            } catch (error) {
                console.error("Error:", error);
            }
        });
    });
}

function agregarProductoModal() {
    // Creamos un boton para agregar un producto nuevo
    const addButton = document.createElement("button");
    const addImg = document.createElement("img");
    addImg.src = "/assets/more.png";
    addImg.alt = "Boton de agregar producto";
    addImg.title = "Agregar nuevo producto";
    addButton.classList.add("add-btn");
    addButton.classList.add("undisplayed"); // Por defecto lo ocultamos, se mostrará solo si el usuario es admin
    addButton.appendChild(addImg);

    // Agregamos el botón al contenedor de productos
    document.querySelector(".cafes").appendChild(addButton);

    // Evento para el botón de agregar producto
    addButton.addEventListener("click", () => {
        openModal(productModal);
        // Modificamos el modal para que se adapte al agregar productos
        confirmBtn.textContent = "Guardar Cambios";
        modalTitle.textContent = "Agregar Nuevo Producto";
    });
}

function eliminarProducto() {
    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", async () => {
            const card = btn.closest(".product-element");
            const id = card.dataset.id; // Obtenemos el ID del producto desde el dataset del elemento
            try {
                const response = await fetch(`/eliminar-producto/${id}`, {
                    method: "DELETE"
                });
                if (!response.ok) {
                    throw new Error("Error al eliminar");
                }

                // Eliminar visualmente sin recargar
                card.remove();
                console.log("Producto eliminado correctamente");
            } catch (error) {
                console.error("Error:", error);
            }
        });
    });
}