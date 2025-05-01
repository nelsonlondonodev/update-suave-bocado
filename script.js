// Variables para elementos del DOM
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const languageSwitcher = document.getElementById("language-switcher");
const langButtons = languageSwitcher
  ? languageSwitcher.querySelectorAll(".lang-button")
  : []; // Manejar caso donde languageSwitcher no exista
const dynamicMessageBar = document.getElementById("dynamic-message-bar"); // Elemento de la barra de mensajes

// Estado del menú móvil
let isMobileMenuOpen = false;

// Función para mostrar/ocultar el menú móvil
function toggleMobileMenu() {
  isMobileMenuOpen = !isMobileMenuOpen;
  if (mobileMenu) {
    // Asegurarse de que mobileMenu existe
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
}

// Event Listener para el botón del menú móvil
if (mobileMenuButton) {
  mobileMenuButton.addEventListener("click", toggleMobileMenu);
}

// --- Lógica del Carrusel Principal (index.html) ---
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

// Event Listeners para los botones del carrusel principal
if (prevButton) {
  prevButton.addEventListener("click", goToPrevSlide);
}
if (nextButton) {
  nextButton.addEventListener("click", goToNextSlide);
}

// Inicializar el carrusel principal (mostrar la primera diapositiva)
// Solo inicializar si hay diapositivas en la página (es decir, si estamos en index.html)
if (slides.length > 0) {
  // Asegurarse de que todas las diapositivas, excepto la primera, estén ocultas inicialmente
  slides.forEach((slide, i) => {
    if (i !== 0) {
      slide.classList.add("hidden");
    } else {
      slide.classList.remove("hidden"); // Asegurar que la primera no esté oculta por defecto
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
  if (languageSwitcher) {
    // Asegurarse de que languageSwitcher existe
    langButtons.forEach((button) => {
      if (button.getAttribute("data-lang") === lang) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  }

  // Al cambiar de idioma, actualizamos el texto de la barra de mensajes al idioma correcto
  // para el mensaje actualmente visible.
  updateDynamicMessageBar(); // Llama a la función de actualización de la barra de mensajes

  // La función highlightActiveNav se llama al cargar la página, no es necesario en cada cambio de idioma
}

// Event Listeners para los botones de idioma
if (languageSwitcher) {
  // Asegurarse de que el languageSwitcher existe antes de añadir listeners
  langButtons.forEach((button) => {
    button.addEventListener("click", () => {
      changeLanguage(button.getAttribute("data-lang"));
    });
  });
}

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
    const isHomePageLink =
      linkPath === "index.html" || linkPath === "./index.html"; // Incluir "./index.html"
    const isCurrentPathRoot =
      currentPath === "/" ||
      currentPath === "/index.html" ||
      currentPath === "/index"; // Considerar varias formas de la raíz
    const isCurrentPathSpecific = currentPath.endsWith(linkPath); // Para otras páginas como productos-galeria.html

    if (
      (isCurrentPathRoot && isHomePageLink) ||
      (!isCurrentPathRoot && isCurrentPathSpecific)
    ) {
      link.classList.add("active-nav");
    }
  });
}

// --- Lógica específica para productos-galeria.html (Filtros de Galería/Productos) ---
// Ejecutar este código solo si estamos en productos-galeria.html
// Incluimos un chequeo más robusto para la ruta
const isProductsGalleryPage =
  window.location.pathname.endsWith("/productos-galeria.html") ||
  window.location.pathname.endsWith("/productos-galeria/") ||
  window.location.pathname.endsWith("/productos-galeria");

if (isProductsGalleryPage) {
  // Envuelve la lógica del DOMContentLoaded para asegurar que solo se ejecute en esta página
  document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-button");
    const galleryItems = document.querySelectorAll(".gallery-item");
    const productCards = document.querySelectorAll(".product-card");

    // Check if the elements exist on the page before adding event listeners
    if (
      filterButtons.length > 0 ||
      galleryItems.length > 0 ||
      productCards.length > 0
    ) {
      // Función para filtrar elementos (productos y galería)
      function filterItems(category) {
        galleryItems.forEach((item) => {
          const itemCategory = item.getAttribute("data-category");
          if (category === "all" || itemCategory === category) {
            item.style.display = ""; // Mostrar
          } else {
            item.style.display = "none"; // Ocultar
          }
        });

        productCards.forEach((card) => {
          const cardCategory = card.getAttribute("data-category");
          if (category === "all" || cardCategory === category) {
            card.style.display = ""; // Mostrar
          } else {
            card.style.display = "none"; // Ocultar
          }
        });
      }

      // Event Listeners para los botones de filtro
      filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const category = button.getAttribute("data-category");

          // Resaltar el botón activo
          filterButtons.forEach((btn) => {
            btn.classList.remove("bg-marca-complemento1");
            btn.classList.add("bg-white"); // Desactiva todos
          });
          button.classList.remove("bg-white");
          button.classList.add("bg-marca-complemento1"); // Activa el clicado

          // Aplicar el filtro
          filterItems(category);
        });
      });

      // Al cargar la página, aplicar el filtro 'all' por defecto
      const allButton = document.querySelector(
        '.filter-button[data-category="all"]'
      );
      if (allButton) {
        allButton.click(); // Simula el clic en el botón "Todos"
      } else {
        // Si no hay botón "Todos", asegúrate de que todos los elementos estén visibles
        filterItems("all"); // Llama a la función con categoría 'all'
      }
    }
  });
}

// --- Lógica del Carrusel de Reseñas (nosotros-resenas.html) ---
// Ejecutar este código solo si estamos en nosotros-resenas.html
const isAboutReviewsPage =
  window.location.pathname.endsWith("/nosotros-resenas.html") ||
  window.location.pathname.endsWith("/nosotros-resenas/") ||
  window.location.pathname.endsWith("/nosotros-resenas");

if (isAboutReviewsPage) {
  document.addEventListener("DOMContentLoaded", () => {
    // Obtener referencias a los elementos del carrusel de reseñas
    const reviewsCarousel = document.getElementById("reviews-carousel");
    const reviewSlides = reviewsCarousel
      ? reviewsCarousel.querySelectorAll(".review-slide")
      : []; // Asegurarse de que reviewsCarousel exista antes de buscar slides
    const reviewPrevButton = document.getElementById("review-prev");
    const reviewNextButton = document.getElementById("review-next");
    let currentReviewIndex = 0;

    // Solo inicializar la lógica del carrusel de reseñas si los elementos existen
    if (reviewsCarousel && reviewSlides.length > 0) {
      // Función para mostrar una diapositiva de reseña específica
      function showReview(index) {
        reviewSlides.forEach((slide, i) => {
          if (i === index) {
            slide.classList.remove("hidden"); // Aseguramos que la reseña esté visible
            slide.classList.add("active-review"); // Clase para controlar la transición en CSS
          } else {
            slide.classList.add("hidden"); // Ocultamos las otras reseñas
            slide.classList.remove("active-review");
          }
        });
      }

      // Función para ir a la diapositiva de reseña anterior
      function goToPrevReview() {
        currentReviewIndex =
          (currentReviewIndex - 1 + reviewSlides.length) % reviewSlides.length;
        showReview(currentReviewIndex);
      }

      // Función para ir a la diapositiva de reseña siguiente
      function goToNextReview() {
        currentReviewIndex = (currentReviewIndex + 1) % reviewSlides.length;
        showReview(currentReviewIndex);
      }

      // Event Listeners para los botones del carrusel de reseñas
      if (reviewPrevButton) {
        reviewPrevButton.addEventListener("click", goToPrevReview);
      }
      if (reviewNextButton) {
        reviewNextButton.addEventListener("click", goToNextReview);
      }

      // Inicializar el carrusel de reseñas (mostrar la primera reseña)
      // Ocultar todas las reseñas excepto la primera al cargar
      reviewSlides.forEach((slide, i) => {
        if (i !== 0) {
          slide.classList.add("hidden");
        } else {
          slide.classList.remove("hidden"); // Asegurar que la primera no esté oculta por defecto
        }
      });
      showReview(currentReviewIndex); // Mostrar la primera reseña y aplicar la clase active

      // Opcional: Auto-avance del carrusel de reseñas (descomentar si se desea)
      setInterval(goToNextReview, 7000); // Cambia de reseña cada 7 segundos (ajusta este valor)
    }
  });
}

// --- Lógica del Chatbot Widget ---
const chatbotWidget = document.getElementById("chatbot-widget");
const chatHeader = document.getElementById("chat-header");
const toggleChatButton = document.getElementById("toggle-chat");
const chatBody = document.getElementById("chat-body");
const chatInputEs = document.getElementById("chat-input");
const chatInputEn = document.getElementById("chat-input-en"); // Input en inglés
const sendButton = document.getElementById("send-button");

// Estado del chatbot
let isChatbotOpen = false;

// Iconos de Font Awesome para el toggle
const iconMinusClasses = ["fa-solid", "fa-minus"]; // Clases para el icono de cerrar
const iconMessageClasses = ["fa-solid", "fa-message"]; // Clases para el icono de abrir

// Asegurarse de que el botón tiene el icono correcto al inicio (colapsado)
// Solo hacer esto si el chatbot existe en la página actual
if (chatbotWidget) {
  const icon = toggleChatButton ? toggleChatButton.querySelector("i") : null;
  if (icon) {
    // Limpiar clases de iconos existentes (si las hubiera por error)
    icon.classList.remove(...iconMinusClasses, ...iconMessageClasses);
    // Añadir el icono de estado colapsado (empezamos con el icono de mensaje para abrir)
    icon.classList.add(...iconMessageClasses);
  }

  // Asegurarse de que el cuerpo del chat esté oculto inicialmente si la clase 'collapsed' está presente
  if (chatbotWidget.classList.contains("collapsed")) {
    const chatBody = chatbotWidget.querySelector("#chat-body");
    const chatInputArea = chatbotWidget.querySelector("#chat-input-area");
    if (chatBody) chatBody.style.display = "none";
    if (chatInputArea) chatInputArea.style.display = "none";
  }
}

// Función para mostrar/ocultar el chatbot
function toggleChatbot() {
  isChatbotOpen = !isChatbotOpen;
  if (chatbotWidget) {
    const icon = toggleChatButton ? toggleChatButton.querySelector("i") : null;
    const chatBody = chatbotWidget.querySelector("#chat-body");
    const chatInputArea = chatbotWidget.querySelector("#chat-input-area");

    if (isChatbotOpen) {
      chatbotWidget.classList.remove("collapsed");
      // Cambiar icono a 'menos' (cerrar)
      if (icon) {
        icon.classList.remove(...iconMessageClasses); // Usar spread syntax
        icon.classList.add(...iconMinusClasses); // Usar spread syntax
      }
      // Mostrar el cuerpo del chat y área de input
      if (chatBody) chatBody.style.display = "flex"; // O 'block' dependiendo de tu layout CSS
      if (chatInputArea) chatInputArea.style.display = "flex"; // O 'block'
    } else {
      chatbotWidget.classList.add("collapsed");
      // Cambiar icono a 'mensaje' (abrir)
      if (icon) {
        icon.classList.remove(...iconMinusClasses); // Usar spread syntax
        icon.classList.add(...iconMessageClasses); // Usar spread syntax
      }
      // Ocultar el cuerpo del chat y área de input
      if (chatBody) chatBody.style.display = "none";
      if (chatInputArea) chatInputArea.style.display = "none";
    }
  }
}

// Event Listener para el encabezado del chatbot (para colapsar/expandir)
// Solo añadir listener si el chatHeader existe (chatbot está en la página)
if (chatHeader) {
  chatHeader.addEventListener("click", toggleChatbot);
}

// --- Lógica del Chat (Ejemplo Básico) ---
// Esto es una simulación simple. La lógica real del chatbot sería mucho más compleja.

function sendMessage() {
  const currentLang = document.body.getAttribute("data-lang") || "es";
  const chatInput =
    currentLang === "es" && chatInputEs ? chatInputEs : chatInputEn; // Selecciona el input correcto

  if (!chatInput) return; // Salir si no se encuentra el input

  const userMessageText = chatInput.value.trim();

  if (userMessageText !== "") {
    // Crear y añadir el mensaje del usuario
    const userMessageDiv = document.createElement("div");
    userMessageDiv.classList.add("message", "user");
    userMessageDiv.textContent = userMessageText;
    if (chatBody) {
      chatBody.appendChild(userMessageDiv);
    }

    // Simular una respuesta del bot (muy básica)
    setTimeout(() => {
      const botMessageDiv = document.createElement("div");
      botMessageDiv.classList.add("message", "bot");

      let botResponse =
        "Lo siento, soy un bot de demostración y no puedo responder preguntas complejas aún. Por favor, visita nuestra página de Contacto si necesitas ayuda."; // Default ES response
      if (currentLang === "en") {
        botResponse =
          "I'm a demo bot and cannot answer complex questions yet. Please visit our Contact page if you need assistance."; // Default EN response
      }

      // Respuestas básicas según input (ejemplo)
      const lowerCaseMessage = userMessageText.toLowerCase();
      if (lowerCaseMessage.includes("hola")) {
        botResponse =
          currentLang === "es"
            ? "¡Hola! ¿En qué puedo ayudarte hoy?"
            : "Hello! How can I help you today?";
      } else if (
        lowerCaseMessage.includes("productos") ||
        lowerCaseMessage.includes("pasteles")
      ) {
        botResponse =
          currentLang === "es"
            ? "Puedes ver nuestros productos en la sección 'Productos y Galería'."
            : "You can see our products in the 'Products & Gallery' section.";
      } else if (
        lowerCaseMessage.includes("reseñas") ||
        lowerCaseMessage.includes("clientes") ||
        lowerCaseMessage.includes("reviews")
      ) {
        botResponse =
          currentLang === "es"
            ? "Puedes leer lo que dicen nuestros clientes en la sección de Reseñas."
            : "You can read what our customers say in the Reviews section.";
      } else if (
        lowerCaseMessage.includes("historia") ||
        lowerCaseMessage.includes("nosotros") ||
        lowerCaseMessage.includes("about") ||
        lowerCaseMessage.includes("story")
      ) {
        botResponse =
          currentLang === "es"
            ? "En la sección 'Nosotros y Reseñas' puedes conocer nuestra historia."
            : "In the 'About Us & Reviews' section, you can learn about our story.";
      } else if (
        lowerCaseMessage.includes("contacto") ||
        lowerCaseMessage.includes("ubicacion") ||
        lowerCaseMessage.includes("contact") ||
        lowerCaseMessage.includes("location")
      ) {
        botResponse =
          currentLang === "es"
            ? "Encuentra nuestra información de contacto en la página de Contacto."
            : "Find our contact information on the Contact page.";
      }
      // Añade más condiciones aquí para otras respuestas

      botMessageDiv.textContent = botResponse;
      if (chatBody) {
        chatBody.appendChild(botMessageDiv);
        // Desplazarse hacia abajo para ver el último mensaje
        chatBody.scrollTop = chatBody.scrollHeight;
      }
    }, 500); // Retraso de 500ms para la respuesta del bot

    // Limpiar el input
    chatInput.value = "";
  }
}

// Event Listener para el botón de enviar
// Solo añadir listener si el sendButton existe (chatbot está en la página)
if (sendButton) {
  sendButton.addEventListener("click", sendMessage);
}

// Event Listener para enviar mensaje al presionar Enter en el input
// Solo añadir listeners si los inputs existen (chatbot está en la página)
if (chatInputEs) {
  chatInputEs.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Evitar salto de línea en el input
      sendMessage();
    }
  });
}
if (chatInputEn) {
  chatInputEn.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Evitar salto de línea en el input
      sendMessage();
    }
  });
}

// --- Fin Lógica del Chat ---

// *** Bloque de Inicialización al cargar la página ***
// Se ejecuta cuando el DOM está completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  // Aseguramos que todo el DOM esté listo

  // 1. Inicializar idioma (lee de localStorage o usa por defecto)
  const savedLanguage = localStorage.getItem("selectedLanguage");
  const initialLang =
    savedLanguage || document.body.getAttribute("data-lang") || "es"; // Usa el idioma guardado si existe
  changeLanguage(initialLang); // Esto configura data-lang, actualiza botones y barra de mensajes con el idioma inicial

  // 2. Resaltar el enlace de navegación activo
  highlightActiveNav(); // Llama a la función aquí para que se ejecute al cargar

  // 3. Iniciar el intervalo de ciclado de mensajes
  // Limpiar cualquier intervalo existente primero
  if (messageInterval) {
    clearInterval(messageInterval);
  }
  // Solo iniciar el intervalo si hay mensajes dinámicos definidos
  if (dynamicMessages.es.length > 0) {
    messageInterval = setInterval(cycleMessages, 8000); // Cambia de mensaje cada 8 segundos
  }

  // La lógica del carrusel principal y del carrusel de reseñas,
  // así como la lógica de filtros, ya están envueltas en sus propios
  // condicionales (if checks) que verifican la existencia de los elementos
  // y dentro de este DOMContentLoaded listener.
  // No es necesario llamarlas explícitamente aquí de nuevo,
  // ya que su inicialización está al final de sus bloques condicionales.
}); // Fin del DOMContentLoaded listener

// No es necesario inicializar Font Awesome con una función como lucide.createIcons()
// La librería Font Awesome se carga y aplica automáticamente con el CSS.
