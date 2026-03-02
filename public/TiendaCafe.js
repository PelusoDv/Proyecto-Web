/*const { log } = require("console");
const e = require("cors");*/

const slideBtns = document.querySelectorAll(".slidebtn");
const sliders = document.querySelectorAll(".slide");
const loginModal = document.getElementById("loginModal");
const productModal = document.getElementById("productModal");
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