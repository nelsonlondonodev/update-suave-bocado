// Variables para elementos del DOM
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const languageSwitcher = document.getElementById("language-switcher");
const langButtons = languageSwitcher.querySelectorAll(".lang-button");
const dynamicMessageBar = document.getElementById("dynamic-message-bar"); // Elemento de la barra de mensajes

// Estado del menú móvil
let isMobileMenuOpen = false;

// Función para mostrar/ocultar el menú móvil
function toggleMobileMenu() {
  isMobileMenuOpen = !isMobileMenuOpen;
  if (isMobileMenuOpen) {
    mobileMenu.classList.remove("hidden");
  } else {
    mobileMenu.classList.add("hidden");
  }
  // Si necesitas cambiar el icono, tendrías que acceder al <i>
  // dentro del mobileMenuButton y cambiar sus clases fa-solid.
  // const menuIcon = mobileMenuButton.querySelector('i.fa-solid');
  // if (isMobileMenuOpen) {
  //     menuIcon.classList.remove('fa-bars');
  //     menuIcon.classList.add('fa-times'); // O un icono de 'cerrar' de FA
  // } else {
  //     menuIcon.classList.remove('fa-times');
  //     menuIcon.classList.add('fa-bars');
  // }
}

// Event Listener para el botón del menú móvil
if (mobileMenuButton) {
  mobileMenuButton.addEventListener("click", toggleMobileMenu);
}

// --- Lógica del Carrusel ---
const slides = document.querySelectorAll(".carousel-slide");
const prevButton = document.getElementById("carousel-prev");
const nextButton = document.getElementById("carousel-next");
let currentSlideIndex = 0;

// Función para mostrar una diapositiva específica
function showSlide(index) {
  slides.forEach((slide, i) => {
    // Usando la clase hidden de Tailwind para ocultar en lugar de display: none
    if (i === index) {
      slide.classList.remove("hidden");
      slide.classList.add("active"); // Mantener la clase active para la transición CSS
    } else {
      slide.classList.add("hidden");
      slide.classList.remove("active");
    }
  });
}

// Función para ir a la diapositiva anterior
function goToPrevSlide() {
  currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
  showSlide(currentSlideIndex);
}

// Función para ir a la diapositiva siguiente
function goToNextSlide() {
  currentSlideIndex = (currentSlideIndex + 1) % slides.length;
  showSlide(currentSlideIndex);
}

// Event Listeners para los botones del carrusel
if (prevButton) {
  prevButton.addEventListener("click", goToPrevSlide);
}
if (nextButton) {
  nextButton.addEventListener("click", goToNextSlide);
}

// Inicializar el carrusel (mostrar la primera diapositiva)
if (slides.length > 0) {
  // Asegurarse de que todas las diapositivas, excepto la primera, estén ocultas inicialmente
  slides.forEach((slide, i) => {
    if (i !== 0) {
      slide.classList.add("hidden");
    }
  });
  showSlide(currentSlideIndex); // Asegurarse de que la primera diapositiva esté activa y visible
  // Optional: Auto-avance del carrusel (uncomment if desired)
  // Descomentamos la siguiente línea para habilitar el auto-avance
  setInterval(goToNextSlide, 5000); // Cambia de diapositiva cada 5 segundos (ajusta este valor si quieres que cambien más rápido o más lento)
}

// --- Lógica del Language Switcher ---

// Función para cambiar el idioma
function changeLanguage(lang) {
  document.body.setAttribute("data-lang", lang); // Actualiza el atributo data-lang en el body

  // Añadido para persistencia: Guardar el idioma seleccionado en Local Storage
  localStorage.setItem("selectedLanguage", lang);

  // Actualiza el estado activo de los botones
  langButtons.forEach((button) => {
    if (button.getAttribute("data-lang") === lang) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });

  // Al cambiar de idioma, actualizamos el texto de la barra de mensajes al idioma correcto
  // para el mensaje actualmente visible.
  updateDynamicMessageBar(); // Llama a la función de actualización de la barra de mensajes

  // Resaltar el enlace de navegación activo después de cambiar el idioma
  // (Aunque la página no cambie, el texto visible en el enlace sí podría,
  // pero la clase 'active-nav' ya está en el <a> correcto, así que no es estrictamente necesario aquí,
  // pero no hace daño si la función es eficiente).
  // highlightActiveNav(); // Se llama al cargar la página, no es necesario en cada cambio de idioma
}

// Event Listeners para los botones de idioma
langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    changeLanguage(button.getAttribute("data-lang"));
  });
});

// --- Lógica de la Barra de Mensajes Dinámicos Interactivos ---
// Mensajes para la barra dinámica (en ambos idiomas)
const dynamicMessages = {
  es: [
    "¡Pedidos personalizados para tus celebraciones!",
    "Hecho con amor, sabor y tradición.",
    "Descubre nuestras delicias artesanales.",
    "Endulza tu día con Suave Bocado.",
    "Repostería creativa en Envigado.",
    "¡Visítanos o haz tu pedido online!", // Agregamos un llamado a la acción
  ],
  en: [
    "Custom orders for your celebrations!",
    "Made with love, flavor, and tradition.",
    "Discover our artisanal delights.",
    "Sweeten your day with Suave Bocado.",
    "Creative baking in Envigado.",
    "Visit us or place your order online!", // Agregamos un llamado a la acción
  ],
};

let currentMessageIndex = 0;
let messageInterval; // Para almacenar el ID del temporizador de intervalo

// Obtener referencias a los nuevos botones de navegación de mensajes
const messagePrevButton = document.getElementById("message-prev");
const messageNextButton = document.getElementById("message-next");

// Función para actualizar el contenido de la barra de mensajes dinámicos
// Ahora actualiza el textContent basado en el índice y el idioma activo
function updateDynamicMessageBar() {
  if (dynamicMessageBar) {
    const esSpan = dynamicMessageBar.querySelector('#message-text [lang="es"]');
    const enSpan = dynamicMessageBar.querySelector('#message-text [lang="en"]');
    // No necesitamos el idioma actual aquí, ya que la función changeLanguage
    // se asegura de que el data-lang del body sea correcto, y el CSS
    // muestra el span adecuado. Solo actualizamos el contenido de ambos spans.

    if (esSpan && enSpan) {
      // Asegurarse de que el contenido de ambos spans esté actualizado con el mensaje actual
      esSpan.textContent = dynamicMessages.es[currentMessageIndex];
      enSpan.textContent = dynamicMessages.en[currentMessageIndex];
      // El CSS se encarga de la visibilidad
    }
  }
}

// Función para ciclar automáticamente entre los mensajes (usada por el intervalo)
function cycleMessages() {
  currentMessageIndex = (currentMessageIndex + 1) % dynamicMessages.es.length; // Usamos la longitud del array en español (deben ser iguales)
  updateDynamicMessageBar(); // Llama a la función de actualización para mostrar el siguiente mensaje
}

// Funciones para navegación manual de mensajes
function goToPrevMessage() {
  // Limpiar el intervalo automático al navegar manualmente
  if (messageInterval) {
    clearInterval(messageInterval);
  }
  currentMessageIndex =
    (currentMessageIndex - 1 + dynamicMessages.es.length) %
    dynamicMessages.es.length;
  updateDynamicMessageBar(); // Actualiza el contenido del mensaje

  // Reiniciar el intervalo después de una breve pausa para una mejor experiencia
  // Evita que el intervalo cambie inmediatamente el mensaje después del clic manual
  messageInterval = setInterval(cycleMessages, 8000); // Reiniciar intervalo (ajusta el tiempo si es necesario)
}

function goToNextMessage() {
  // Limpiar el intervalo automático al navegar manualmente
  if (messageInterval) {
    clearInterval(messageInterval);
  }
  currentMessageIndex = (currentMessageIndex + 1) % dynamicMessages.es.length;
  updateDynamicMessageBar(); // Actualiza el contenido del mensaje

  // Reiniciar el intervalo después de una breve pausa
  messageInterval = setInterval(cycleMessages, 8000); // Reiniciar intervalo (ajusta el tiempo si es necesario)
}

// Añadir Event Listeners para los botones de navegación de mensajes
if (messagePrevButton) {
  messagePrevButton.addEventListener("click", goToPrevMessage);
}
if (messageNextButton) {
  messageNextButton.addEventListener("click", goToNextMessage);
}

// --- Lógica para Resaltar el Enlace de Navegación Activo ---

function highlightActiveNav() {
  // Obtener la ruta actual de la URL (ej: "/productos-galeria.html" o "/")
  const currentPath = window.location.pathname;

  // Seleccionar todos los enlaces de navegación en el header (versión desktop y mobile)
  const navLinks = document.querySelectorAll("header nav a"); // Enlaces dentro de <nav> (desktop)
  const mobileNavLinks = document.querySelectorAll("#mobile-menu a"); // Enlaces dentro del menú móvil

  // Combinar ambas listas de enlaces para procesarlas juntas
  const allNavLinks = [...navLinks, ...mobileNavLinks];

  allNavLinks.forEach((link) => {
    const linkPath = link.getAttribute("href"); // Obtener la ruta del enlace (ej: "index.html")

    // Eliminar la clase 'active-nav' de todos los enlaces antes de añadirla al correcto
    link.classList.remove("active-nav");

    // Lógica para determinar si el enlace actual corresponde a la página actual
    // Consideramos la página de inicio ("index.html" o la raíz "/")
    const isHomePageLink = linkPath === "index.html";
    const isCurrentPageHomePage =
      currentPath === "/" || currentPath === "/index.html";

    if (isCurrentPageHomePage && isHomePageLink) {
      // Si la página actual es la de inicio Y el enlace es el de inicio
      link.classList.add("active-nav");
    } else if (!isCurrentPageHomePage && currentPath.endsWith(linkPath)) {
      // Si no es la página de inicio Y la ruta actual termina con la ruta del enlace
      // Esto funciona para "productos-galeria.html", "nosotros-resenas.html", etc.
      link.classList.add("active-nav");
    }
  });
}

// *** Bloque de Inicialización al cargar la página ***
// Se ejecuta cuando el DOM está completamente cargado

// 1. Inicializar idioma (lee de localStorage o usa por defecto)
const savedLanguage = localStorage.getItem("selectedLanguage");
const initialLang =
  savedLanguage || document.body.getAttribute("data-lang") || "es"; // Usa el idioma guardado si existe
changeLanguage(initialLang); // Esto configura data-lang, actualiza botones y barra de mensajes con el idioma inicial

// 2. Resaltar el enlace de navegación activo
highlightActiveNav(); // <-- Llama a la función aquí para que se ejecute al cargar

// 3. Iniciar el intervalo de ciclado de mensajes
if (messageInterval) {
  clearInterval(messageInterval);
}
messageInterval = setInterval(cycleMessages, 8000); // Cambia de mensaje cada 8 segundos

// --- CÓDIGO COMENTADO: Lógica del Chatbot Widget ---
/*
// ... (código comentado del chatbot que eliminamos previamente) ...
*/

// Ya no es necesario inicializar Font Awesome con una función como lucide.createIcons()
// La librería Font Awesome se carga y aplica automáticamente con el CSS.
