// Script para inicializar Lucide Icons
// Se ejecuta después de que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
});

// Script para el menú móvil
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });

    // Opcional: Cerrar menú al hacer clic en un enlace (para desplazamiento suave,
    // aunque en un sitio multipágina redirigirá)
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
  const siteTitle = document.querySelector("title"); // Selecciona la etiqueta title
  // Seleccionamos los inputs de chat por su ID
  const chatInputEs = document.getElementById("chat-input");
  const chatInputEn = document.getElementById("chat-input-en");

  // Función para cambiar el idioma
  function changeLanguage(lang) {
    body.setAttribute("data-lang", lang); // Cambia el atributo data-lang del body

    // Actualiza la clase 'active' en los botones de idioma
    languageButtons.forEach((button) => {
      if (button.getAttribute("data-lang") === lang) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });

    // Actualizar el título de la página en la pestaña del navegador (esto es opcional y requiere lógica para cada página)
    // Una alternativa es tener el título en el HTML de cada página y no cambiarlo dinámicamente así.
    // Para un sitio multipágina, es más común que el título se defina estáticamente en cada archivo HTML.
    // Por simplicidad aquí, mantendremos la lógica previa, pero ten en cuenta esta distinción.
    if (siteTitle) {
      const currentPage = window.location.pathname.split("/").pop(); // Obtiene el nombre del archivo actual
      let baseTitle = "Suave bocado Repostería - Envigado"; // Título base en español
      if (currentPage === "galeria.html") {
        baseTitle =
          lang === "es" ? "Galería - Suave bocado" : "Gallery - Suave bocado";
      } else if (currentPage === "productos.html") {
        baseTitle =
          lang === "es"
            ? "Productos - Suave bocado"
            : "Products - Suave bocado";
      } else if (currentPage === "reseñas.html") {
        baseTitle =
          lang === "es" ? "Reseñas - Suave bocado" : "Reviews - Suave bocado";
      } else if (currentPage === "acerca-de.html") {
        baseTitle =
          lang === "es"
            ? "Acerca de - Suave bocado"
            : "About Us - Suave bocado";
      } else if (currentPage === "contacto.html") {
        baseTitle =
          lang === "es" ? "Contacto - Suave bocado" : "Contact - Suave bocado";
      } else {
        // index.html o cualquier otra página
        baseTitle =
          lang === "es"
            ? "Suave bocado Repostería - Envigado"
            : "Suave bocado Bakery - Envigado";
      }
      siteTitle.textContent = baseTitle;
    }

    // Configura la visibilidad del input de chat según el idioma
    if (chatInputEs && chatInputEn) {
      if (lang === "es") {
        chatInputEs.style.display = "block"; // Mostrar input en español
        chatInputEn.style.display = "none"; // Ocultar input en inglés
      } else {
        chatInputEs.style.display = "none"; // Ocultar input en español
        chatInputEn.style.display = "block"; // Mostrar input en inglés
      }
    }

    // Guarda el idioma seleccionado en localStorage
    localStorage.setItem("preferredLanguage", lang);
  }

  // Al cargar la página, verifica si hay un idioma guardado en localStorage
  const savedLanguage = localStorage.getItem("preferredLanguage");
  if (savedLanguage) {
    changeLanguage(savedLanguage); // Si hay uno guardado, úsalo
  } else {
    // Si no hay idioma guardado, usa el idioma por defecto definido en el HTML (lang="es" en el body)
    const initialLang = body.lang || "es";
    body.setAttribute("data-lang", initialLang);
    // Asegura que el botón de idioma por defecto esté activo visualmente
    const defaultButton = document.querySelector(
      `#language-switcher .lang-button[data-lang="${initialLang}"]`
    );
    if (defaultButton) {
      defaultButton.classList.add("active");
    }
    // Configura la visibilidad inicial de los inputs de chat
    if (chatInputEs && chatInputEn) {
      if (initialLang === "es") {
        chatInputEs.style.display = "block";
        chatInputEn.style.display = "none";
      } else {
        chatInputEs.style.display = "none";
        chatInputEn.style.display = "block";
      }
    }
  }

  // Añade listeners a los botones de idioma
  languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const lang = button.getAttribute("data-lang");
      changeLanguage(lang);
    });
  });
});

// Script para la funcionalidad básica del Chatbot (frontend)
document.addEventListener("DOMContentLoaded", () => {
  const chatWidget = document.getElementById("chatbot-widget");
  const chatHeader = document.getElementById("chat-header");
  const toggleChatButton = document.getElementById("toggle-chat");
  const chatBody = document.getElementById("chat-body");
  const chatInput = document.getElementById("chat-input"); // Input en español
  const chatInputEn = document.getElementById("chat-input-en"); // Input en inglés
  const sendButton = document.getElementById("send-button");
  const body = document.body; // Necesario para obtener el idioma actual

  // Alternar visibilidad del chat
  if (chatHeader && chatWidget && toggleChatButton) {
    chatHeader.addEventListener("click", () => {
      chatWidget.classList.toggle("collapsed");
      // Cambiar el icono del botón al expandir/colapsar
      if (chatWidget.classList.contains("collapsed")) {
        toggleChatButton.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>'; // Ícono de chat
      } else {
        toggleChatButton.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus"><line x1="5" x2="19" y1="12" y2="12"/></svg>'; // Ícono de menos
      }
      // Inicializar íconos de Lucide si cambian
      lucide.createIcons();
    });
  }

  // Función para añadir un mensaje al chat
  // NOTA: En un sitio multipágina real, la lógica del chatbot
  // para comunicarse con un backend y obtener respuestas de la IA
  // sería más compleja y podría requerir un servidor.
  // Esta es una simulación básica del frontend.
  function addMessage(messageText, sender, lang) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    // Para simplificar la simulación en el frontend,
    // el mensaje del bot simulado incluirá ambos idiomas.
    // En un escenario real con backend, recibirías la respuesta
    // traducida o la traducirías en el frontend de forma más robusta.
    if (sender === "user") {
      messageElement.innerHTML = `<span lang="${lang}">${messageText}</span>`;
    } else {
      // bot message (simulated)
      const botResponseEs = "¿En qué más puedo ayudarte?";
      const botResponseEn = "How else can I assist you?";
      messageElement.innerHTML = `<span lang="es">${botResponseEs}</span><span lang="en">${botResponseEn}</span>`;
      // Asegurar visibilidad del idioma correcto para el mensaje del bot simulado
      const botSpanEs = messageElement.querySelector('[lang="es"]');
      const botSpanEn = messageElement.querySelector('[lang="en"]');
      if (lang === "es") {
        botSpanEn.style.display = "none";
        botSpanEs.style.display = "block";
      } else {
        botSpanEs.style.display = "none";
        botSpanEn.style.display = "block";
      }
    }

    if (chatBody) {
      chatBody.appendChild(messageElement);
      // Hacer scroll automático hacia abajo
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }

  // Evento al enviar mensaje (botón o Enter)
  function handleSendMessage() {
    const currentLang = body.getAttribute("data-lang") || "es";
    const inputElement = currentLang === "es" ? chatInput : chatInputEn;
    const userMessage = inputElement.value.trim();

    if (userMessage) {
      // Añadir el mensaje del usuario
      addMessage(userMessage, "user", currentLang);

      inputElement.value = ""; // Limpiar input

      // *** SIMULACIÓN DE RESPUESTA DE LA IA (EN UN CASO REAL, ESTO IRÍA A UN BACKEND) ***
      setTimeout(() => {
        addMessage("", "bot", currentLang); // Llama con cadena vacía, la función genera el texto multilingüe simulado
      }, 1000); // Simula un retraso de 1 segundo
    }
  }

  if (sendButton) {
    sendButton.addEventListener("click", handleSendMessage);
  }

  // Listener para la tecla Enter en ambos inputs (español e inglés)
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

// Script para el carrusel (SOLO DEBE IR EN INDEX.HTML) - No se incluye aquí en script.js
