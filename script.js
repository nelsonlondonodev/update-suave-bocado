// Script para inicializar Lucide Icons
// Se ejecuta después de que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
});

// Script para el menú móvil
document.addEventListener("DOMContentLoaded", () => {
  // Reemplazamos getElementById con querySelector
  const mobileMenuButton = document.querySelector("#mobile-menu-button");
  const mobileMenu = document.querySelector("#mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });

    // Opcional: Cerrar menú al hacer clic en un enlace (para desplazamiento suave,
    // aunque en un sitio multipágina redirigirá) - querySelectorAll ya se usaba
    document.querySelectorAll("#mobile-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }
});

// Script para el manejo de idiomas
document.addEventListener("DOMContentLoaded", () => {
  const languageButtons = document.querySelectorAll(
    "#language-switcher .lang-button"
  );
  const body = document.body;
  const siteTitle = document.querySelector("title"); // querySelector ya se usaba
  // Reemplazamos getElementById con querySelector
  const chatInputEs = document.querySelector("#chat-input");
  const chatInputEn = document.querySelector("#chat-input-en");
  // querySelector ya se usaba
  const botMessageInitial = document.querySelector(
    '.message.bot span[lang="es"]'
  );
  const botMessageInitialEn = document.querySelector(
    '.message.bot span[lang="en"]'
  );
  // Reemplazamos getElementById con querySelector
  const dynamicMessageBar = document.querySelector("#dynamic-message-bar");

  // Función para cambiar el idioma
  window.changeLanguage = function (lang) {
    body.setAttribute("data-lang", lang); // setAttribute es correcto

    // Actualiza la clase 'active' en los botones de idioma - classList es correcto
    languageButtons.forEach((button) => {
      if (button.getAttribute("data-lang") === lang) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });

    // Actualizar el título de la página en la pestaña del navegador - textContent es correcto
    const titleEs = document.querySelector('title[lang="es"]');
    const titleEn = document.querySelector('title[lang="en"]');
    if (siteTitle && titleEs && titleEn) {
      if (lang === "es") {
        siteTitle.textContent = titleEs.textContent;
      } else if (lang === "en") {
        siteTitle.textContent = titleEn.textContent;
      }
    }

    // Configura la visibilidad de los inputs de chat según el idioma - style.display es correcto
    if (chatInputEs)
      chatInputEs.style.display = lang === "es" ? "block" : "none";
    if (chatInputEn)
      chatInputEn.style.display = lang === "en" ? "block" : "none";

    // Asegura que los mensajes existentes en el chat se muestren en el idioma correcto - style.display es correcto
    document
      .querySelectorAll("#chat-body .message")
      .forEach((messageElement) => {
        const spanEs = messageElement.querySelector('span[lang="es"]');
        const spanEn = messageElement.querySelector('span[lang="en"]');
        if (spanEs)
          spanEs.style.display =
            lang === "es"
              ? messageElement.classList.contains("bot") ||
                (messageElement.classList.contains("user") &&
                  spanEs.textContent.trim() !== "")
                ? "block"
                : "none"
              : "none";
        if (spanEn)
          spanEn.style.display =
            lang === "en"
              ? messageElement.classList.contains("bot") ||
                (messageElement.classList.contains("user") &&
                  spanEn.textContent.trim() !== "")
                ? "block"
                : "none"
              : "none";
      });

    // *** Actualizar el mensaje visible en la barra dinámica al cambiar de idioma ***
    if (dynamicMessageBar && dynamicMessageBar.messagesData) {
      const currentMessageIndex = parseInt(
        dynamicMessageBar.dataset.currentMessageIndex || 0
      );
      const messageData = dynamicMessageBar.messagesData[currentMessageIndex];
      if (messageData) {
        // Limpiamos el contenido existente
        dynamicMessageBar.textContent = ""; // Usamos textContent para limpiar de forma segura

        // Creamos y añadimos los spans de nuevo usando createElement y appendChild
        const spanEs = document.createElement("span");
        spanEs.setAttribute("lang", "es");
        spanEs.textContent = messageData.es;

        const spanEn = document.createElement("span");
        spanEn.setAttribute("lang", "en");
        spanEn.textContent = messageData.en;

        dynamicMessageBar.appendChild(spanEs);
        dynamicMessageBar.appendChild(spanEn);

        // Asegurar visibilidad según el idioma actual - style.display es correcto
        if (lang === "es") {
          if (spanEn) spanEn.style.display = "none";
          if (spanEs) spanEs.style.display = "inline"; // Usamos inline para texto dentro de un div
        } else {
          if (spanEs) spanEs.style.display = "none";
          if (spanEn) spanEn.style.display = "inline";
        }
      }
    }

    // Guarda el idioma seleccionado en localStorage - localStorage es correcto
    localStorage.setItem("preferredLanguage", lang);
  };

  // Al cargar la página, verifica si hay un idioma guardado en localStorage
  const savedLanguage = localStorage.getItem("preferredLanguage");
  const initialLang = savedLanguage || body.lang || "es"; // Usa guardado, si no el del body, si no 'es'
  changeLanguage(initialLang); // Aplica el idioma inicial

  // Añade listeners a los botones de idioma - addEventListener es correcto
  languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const lang = button.getAttribute("data-lang");
      changeLanguage(lang);
    });
  });

  // Asegurar visibilidad inicial del mensaje del bot si existe - style.display es correcto
  if (botMessageInitial && botMessageInitialEn) {
    const currentLang = body.getAttribute("data-lang") || "es";
    if (currentLang === "es") {
      botMessageInitialEn.style.display = "none";
      botMessageInitial.style.display = "block";
    } else {
      botMessageInitial.style.display = "none";
      botMessageInitialEn.style.display = "block";
    }
  }
});

// Script para la funcionalidad básica del Chatbot (frontend)
document.addEventListener("DOMContentLoaded", () => {
  // Reemplazamos getElementById con querySelector
  const chatWidget = document.querySelector("#chatbot-widget");
  const chatHeader = document.querySelector("#chat-header");
  const toggleChatButton = document.querySelector("#toggle-chat");
  const chatBody = document.querySelector("#chat-body");
  const chatInput = document.querySelector("#chat-input"); // Input en español
  const chatInputEn = document.querySelector("#chat-input-en"); // Input en inglés
  const sendButton = document.querySelector("#send-button");
  const body = document.body; // Document.body es correcto

  // Guardamos los SVG como strings para asignarlos a innerHTML (esto es aceptable para SVG estáticos controlados)
  const chatIconSvg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
  const minusIconSvg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus"><line x1="5" x2="19" y1="12" y2="12"/></svg>';

  // Alternar visibilidad del chat - addEventListener es correcto
  if (chatHeader && chatWidget && toggleChatButton) {
    chatHeader.addEventListener("click", () => {
      chatWidget.classList.toggle("collapsed"); // classList es correcto
      // Cambiar el icono del botón al expandir/colapsar - Usamos innerHTML para el SVG (controlado y estático)
      if (chatWidget.classList.contains("collapsed")) {
        toggleChatButton.innerHTML = chatIconSvg;
      } else {
        toggleChatButton.innerHTML = minusIconSvg;
      }
      // Inicializar íconos de Lucide si cambian
      lucide.createIcons();
    });
  }

  // Función para añadir un mensaje al chat
  function addMessage(messageText, sender, lang) {
    // Usamos createElement para crear el elemento del mensaje
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender); // classList es correcto

    if (sender === "user") {
      // Usamos createElement y textContent para el mensaje del usuario
      const span = document.createElement("span");
      span.setAttribute("lang", lang); // setAttribute es correcto
      span.textContent = messageText; // textContent es seguro para texto plano
      messageElement.appendChild(span); // appendChild es correcto
    } else {
      // Bot message (simulated) - Usamos createElement y textContent para los spans
      const botResponseEs = "¿En qué más puedo ayudarte?";
      const botResponseEn = "How else can I assist you?";

      const spanEs = document.createElement("span");
      spanEs.setAttribute("lang", "es");
      spanEs.textContent = botResponseEs;

      const spanEn = document.createElement("span");
      spanEn.setAttribute("lang", "en");
      spanEn.textContent = botResponseEn;

      messageElement.appendChild(spanEs);
      messageElement.appendChild(spanEn);

      // Asegurar visibilidad del idioma correcto para el mensaje del bot simulado - style.display es correcto
      const currentLang = body.getAttribute("data-lang") || "es";
      const botSpanEs = messageElement.querySelector('[lang="es"]'); // querySelector es correcto
      const botSpanEn = messageElement.querySelector('[lang="en"]'); // querySelector es correcto
      if (currentLang === "es") {
        if (botSpanEn) botSpanEn.style.display = "none";
        if (botSpanEs) botSpanEs.style.display = "block";
      } else {
        if (botSpanEs) botSpanEs.style.display = "none";
        if (botSpanEn) botSpanEn.style.display = "block";
      }
    }

    if (chatBody) {
      chatBody.appendChild(messageElement); // appendChild es correcto
      // Hacer scroll automático hacia abajo - scrollTop es correcto
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }

  // Evento al enviar mensaje (botón o Enter) - handleSendMessage es correcto
  function handleSendMessage() {
    const currentLang = body.getAttribute("data-lang") || "es";
    const inputElement = currentLang === "es" ? chatInput : chatInputEn;
    const userMessage = inputElement ? inputElement.value.trim() : ""; // value y trim son correctos

    if (userMessage) {
      // Añadir el mensaje del usuario
      addMessage(userMessage, "user", currentLang);

      if (inputElement) inputElement.value = ""; // value es correcto

      // *** SIMULACIÓN DE RESPUESTA DE LA IA (EN UN CASO REAL, ESTO IRÍA A UN BACKEND) ***
      setTimeout(() => {
        // setTimeout es correcto
        addMessage("", "bot", currentLang); // Llama con cadena vacía, la función genera el texto multilingüe simulado
      }, 1000);
    }
  }

  if (sendButton) {
    sendButton.addEventListener("click", handleSendMessage); // addEventListener es correcto
  }

  // Listener para la tecla Enter en ambos inputs (español e inglés) - addEventListener es correcto
  if (chatInput) {
    chatInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        handleSendMessage();
      }
    });
  }
  if (chatInputEn) {
    chatInputEn.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        handleSendMessage();
      }
    });
  }
});

// --- Script para filtrar productos por categoría de galería (Solo relevante en productos-galeria.html) ---
document.addEventListener("DOMContentLoaded", () => {
  // querySelectorAll ya se usaba
  const galleryItems = document.querySelectorAll(".gallery-item");
  const productCards = document.querySelectorAll(".product-card");
  // Reemplazamos getElementById con querySelector
  const showAllButton = document.querySelector("#show-all-products");

  // Si no encontramos los elementos de galería o productos, salimos del script
  if (galleryItems.length === 0 || productCards.length === 0) {
    return;
  }

  // Función para filtrar los productos
  function filterProducts(category) {
    productCards.forEach((card) => {
      // getAttribute es correcto
      const cardCategory = card.getAttribute("data-category");

      if (category === "all" || cardCategory === category) {
        card.style.display = "block"; // style.display es correcto
      } else {
        card.style.display = "none"; // style.display es correcto
      }
    });
  }

  // Añadir event listeners a cada ítem de la galería - addEventListener es correcto
  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      // getAttribute es correcto
      const selectedCategory = item.getAttribute("data-category");
      if (selectedCategory) {
        filterProducts(selectedCategory);
        // Opcional: Desplazarse a la sección de productos después de filtrar - getElementById -> querySelector, scrollIntoView es correcto
        const productosSection = document.querySelector("#productos");
        if (productosSection) {
          productosSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // Añadir event listener al botón "Mostrar Todos" - addEventListener es correcto
  if (showAllButton) {
    showAllButton.addEventListener("click", () => {
      filterProducts("all"); // Llama a la función de filtro con 'all'
    });
  }
});
// --- Fin Script para filtrar productos ---

// --- Script para la barra de mensajes dinámicos ---
document.addEventListener("DOMContentLoaded", () => {
  // Reemplazamos getElementById con querySelector
  const dynamicMessageBar = document.querySelector("#dynamic-message-bar");
  const body = document.body; // Document.body es correcto

  // Solo ejecutar este script si el elemento de la barra existe
  if (!dynamicMessageBar) {
    return;
  }

  // Lista de mensajes (en ambos idiomas)
  const messages = [
    {
      es: "¡Bienvenido/a a Suave bocado Repostería!",
      en: "Welcome to Suave bocado Bakery!",
    },
    {
      es: "Haz tus pedidos con al menos 1 día de anticipación.",
      en: "Place your orders at least 1 day in advance.",
    },
    {
      es: "Recoge tu pedido directamente en nuestra tienda en Envigado.",
      en: "Pick up your order directly at our store in Envigado.",
    },
    {
      es: "¡Síguenos en nuestras redes sociales!",
      en: "Follow us on our social media!",
    },
    // Puedes añadir más mensajes aquí
  ];

  let currentMessageIndex = 0;
  let messageInterval;
  const messageDuration = 5000; // Tiempo en milisegundos que se muestra cada mensaje (ej: 5 segundos)

  // Guardamos la lista de mensajes en el elemento para que la función changeLanguage acceda a ella
  dynamicMessageBar.messagesData = messages;
  // Guardamos el índice actual también
  dynamicMessageBar.dataset.currentMessageIndex = currentMessageIndex;

  // Función para mostrar el mensaje actual
  function displayCurrentMessage() {
    const currentLang = body.getAttribute("data-lang") || "es";
    const message = messages[currentMessageIndex];

    if (message) {
      // *** Reemplazamos innerHTML con createElement y textContent ***
      dynamicMessageBar.textContent = ""; // Limpiamos el contenido existente de forma segura

      const spanEs = document.createElement("span"); // Creamos el span para español
      spanEs.setAttribute("lang", "es");
      spanEs.textContent = message.es; // Establecemos el texto de forma segura

      const spanEn = document.createElement("span"); // Creamos el span para inglés
      spanEn.setAttribute("lang", "en");
      spanEn.textContent = message.en; // Establecemos el texto de forma segura

      dynamicMessageBar.appendChild(spanEs); // Añadimos el span de español
      dynamicMessageBar.appendChild(spanEn); // Añadimos el span de inglés

      // Asegurar visibilidad según el idioma actual - style.display es correcto
      // querySelector es correcto para encontrar los spans recién creados
      const displayedSpanEs = dynamicMessageBar.querySelector('[lang="es"]');
      const displayedSpanEn = dynamicMessageBar.querySelector('[lang="en"]');

      if (currentLang === "es") {
        if (displayedSpanEn) displayedSpanEn.style.display = "none";
        if (displayedSpanEs) displayedSpanEs.style.display = "inline"; // Usamos inline para texto dentro de un div
      } else {
        if (displayedSpanEs) displayedSpanEs.style.display = "none";
        if (displayedSpanEn) displayedSpanEn.style.display = "inline";
      }
    }
    // Actualizamos el índice guardado en el elemento
    dynamicMessageBar.dataset.currentMessageIndex = currentMessageIndex; // dataset es correcto
  }

  // Función para ir al siguiente mensaje
  function showNextMessage() {
    currentMessageIndex++;
    if (currentMessageIndex >= messages.length) {
      currentMessageIndex = 0; // Vuelve al principio
    }
    displayCurrentMessage();
  }

  // Iniciar la rotación de mensajes
  function startMessageRotation() {
    // Mostrar el primer mensaje inmediatamente
    displayCurrentMessage();
    // Luego, iniciar el intervalo para rotar los mensajes
    messageInterval = setInterval(showNextMessage, messageDuration); // setInterval es correcto
  }

  // Detener la rotación de mensajes
  function stopMessageRotation() {
    clearInterval(messageInterval); // clearInterval es correcto
  }

  // Iniciar la rotación cuando el DOM esté listo
  startMessageRotation();

  // Opcional: Pausar la rotación al pasar el ratón sobre la barra - addEventListener es correcto
  dynamicMessageBar.addEventListener("mouseenter", stopMessageRotation);
  dynamicMessageBar.addEventListener("mouseleave", startMessageRotation);

  // La lógica de actualización del mensaje al cambiar de idioma ya fue integrada
  // en la función changeLanguage en el bloque de manejo de idiomas.
});
// --- Fin Script para la barra de mensajes dinámicos ---

// --- Script específico del carrusel para index.html ---
document.addEventListener("DOMContentLoaded", () => {
  let slideIndex = 0;
  let carouselInterval; // Variable para almacenar el ID del intervalo

  // querySelectorAll ya se usaba
  const slides = document.querySelectorAll("#inicio .carousel-slide");
  // Reemplazamos getElementById con querySelector
  const prevButton = document.querySelector("#carousel-prev");
  const nextButton = document.querySelector("#carousel-next");

  // Solo ejecutar este script si los elementos del carrusel existen (es decir, en index.html)
  if (slides.length === 0) {
    return;
  }

  const totalSlides = slides.length; // Definimos totalSlides aquí después de la verificación

  // Función para mostrar una slide específica
  function showSlide(index) {
    // Asegura que el índice esté dentro del rango
    if (index >= totalSlides) {
      slideIndex = 0;
    } else if (index < 0) {
      slideIndex = totalSlides - 1;
    } else {
      slideIndex = index;
    }

    // Oculta todas las slides - classList es correcto
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });

    // Muestra la slide actual - classList es correcto
    slides[slideIndex].classList.add("active");

    // Reinicia el intervalo automático después de un cambio manual
    resetInterval(); // Llamada a función interna, correcto
  }

  // Función para avanzar al siguiente slide (usada por el botón y el intervalo)
  function nextSlide() {
    showSlide(slideIndex + 1); // Llamada a función interna, correcto
  }

  // Función para retroceder al slide anterior (usada por el botón)
  function prevSlide() {
    showSlide(slideIndex - 1); // Llamada a función interna, correcto
  }

  // Función para iniciar o reiniciar el intervalo automático
  function startInterval() {
    stopInterval(); // Asegura que no haya múltiples intervalos corriendo
    carouselInterval = setInterval(nextSlide, intervalTime); // setInterval es correcto
  }

  // Función para detener el intervalo automático
  function stopInterval() {
    clearInterval(carouselInterval); // clearInterval es correcto
  }

  // Función para reiniciar el intervalo (detiene el actual e inicia uno nuevo)
  function resetInterval() {
    stopInterval();
    startInterval();
  }

  // Añadir event listeners a los botones (si existen) - addEventListener es correcto
  if (prevButton && nextButton) {
    prevButton.addEventListener("click", prevSlide);
    nextButton.addEventListener("click", nextSlide);
  }

  // Inicia el carrusel automático al cargar la página
  showSlide(slideIndex); // Muestra la primera slide
  startInterval(); // Inicia el ciclo automático

  // Opcional: Pausar el carrusel al pasar el ratón sobre él - addEventListener es correcto
  const carouselContainer = document.querySelector(
    "#inicio .carousel-container"
  ); // querySelector es correcto
  if (carouselContainer) {
    carouselContainer.addEventListener("mouseenter", stopInterval);
    carouselContainer.addEventListener("mouseleave", startInterval);
  }
});
// --- Fin Script específico del carrusel ---
