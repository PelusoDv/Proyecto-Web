
const slideBtns = document.querySelectorAll(".slidebtn");
const sliders = document.querySelectorAll(".slide");
let actual = 0;
let intervalo;
let posicion = 0;
const productos = document.querySelectorAll(".product-element")
const total = productos.length -1;

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
    btn.addEventListener("click", (event) =>{
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

document.addEventListener('DOMContentLoaded', () => {
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
    let puntoFijo = 0;

    function establecerPunto() {
        if(window.innerWidth >= 980) {
            puntoFijo = barraDesk ? barraDesk.offsetHeight : 0;
        } else {
            puntoFijo = barraMov ? barraMov.offsetHeight : 0; 
        }
    }
    establecerPunto();

    // Función que se ejecuta cada vez que el usuario hace scroll
    const manejarScroll = () => {
        // window.scrollY (o window.pageYOffset) es la distancia en píxeles que hemos bajado
        if (window.scrollY >= puntoFijo) {
            // El usuario ha pasado el punto de fijación
            barraDesk.classList.add('scroll');
            barraMov.classList.add('scroll');
        } else {
            // El usuario está por encima o regresó al punto de fijación
            barraDesk.classList.remove('scroll');
            barraMov.classList.remove('scroll');
        }
    };

    // Agregar el listener al evento scroll
    window.addEventListener('scroll', manejarScroll);

    // Recalcular el punto fijo si la ventana cambia de tamaño
    window.addEventListener('resize', establecerPuntoFijo);
    
    // Ejecutarlo una vez al cargar la página (por si recargan en medio del scroll)
    manejarScroll();
});