document.addEventListener("DOMContentLoaded", () => {
  // Inicializar Lucide Icons después de que el DOM esté cargado
  // Esto asegura que todos los elementos con data-lucide sean procesados.
  // Verifica si lucide está definido antes de intentar inicializar
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  } else {
    console.error("Lucide library not loaded. Icons will not be displayed.");
  }

  // --- Menú Móvil ---
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
      // Cambiar el icono del botón al abrir/cerrar el menú
      const menuIcon = mobileMenuButton.querySelector(".lucide");

      // Referenciar mobileMenu en lugar de chatWidget
      if (mobileMenu.classList.contains("hidden")) {
        // Si el menú está oculto (colapsado), mostrar ícono de menú
        menuIcon.dataset.lucide = "menu";
      } else {
        // Si el menú no está oculto (expandido), mostrar ícono de cerrar (x)
        menuIcon.dataset.lucide = "x";
      }
      // Re-inicializar íconos después de cambiar data-lucide, solo si lucide está disponible
      if (typeof lucide !== "undefined") {
        lucide.createIcons();
      }
    });

    // Opcional: Cerrar menú móvil al hacer clic en un enlace (útil si usas anclas o para consistencia)
    document.querySelectorAll("#mobile-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        const menuIcon = mobileMenuButton.querySelector(".lucide");
        menuIcon.dataset.lucide = "menu"; // Volver al ícono de menú
        // Re-inicializar íconos, solo si lucide está disponible
        if (typeof lucide !== "undefined") {
          lucide.createIcons();
        }
      });
    });
  }

  // --- Cambio de Idioma ---
  const languageButtons = document.querySelectorAll(
    "#language-switcher .lang-button"
  );
  const body = document.body;
  // Seleccionamos los inputs de chat por su ID (actualizados para la estructura final)
  const chatInputEs = document.getElementById("chat-input");
  const chatInputEn = document.getElementById("chat-input-en");

  // --- Barra de Mensajes Dinámicos ---
  const messageBar = document.getElementById("dynamic-message-bar"); // Obtenemos la referencia una vez
  // Definimos mensajes y índice fuera de la función updateMessageBar para persistir
  const messages = [
    {
      es: "¡Bienvenido a Suave Bocado Repostería!",
      en: "Welcome to Suave Bocado Bakery!",
    },
    { es: "Pedidos con 1 día de anticipación", en: "Orders with 1 day notice" },
    {
      es: "¡Pregunta por nuestros productos de temporada!",
      en: "Ask about our seasonal products!",
    },
    {
      es: "Endulza tu día con nuestras delicias artesanales",
      en: "Sweeten your day with our artisanal delights",
    },
    // Añade más mensajes aquí si lo deseas
  ];
  let currentMessageIndex = 0; // Inicializamos el índice aquí

  // Definimos la función updateMessageBar aquí, en un ámbito accesible
  function updateMessageBar() {
    // Solo ejecutamos la lógica si la barra de mensajes existe en esta página
    if (messageBar && messages.length > 0) {
      // Aseguramos que haya mensajes definidos
      const currentLang = document.body.getAttribute("data-lang") || "es"; // Obtener idioma actual
      // Limpiar contenido anterior
      messageBar.innerHTML = "";

      // Añadir el span de idioma correcto para el mensaje actual
      const messageSpan = document.createElement("span");
      messageSpan.lang = currentLang;
      // Accedemos al mensaje según el idioma actual
      messageSpan.textContent =
        messages[currentMessageIndex][currentLang] ||
        messages[currentMessageIndex]["es"]; // Fallback a español si el idioma no existe

      messageBar.appendChild(messageSpan);
    }
    // Si messageBar no existe o no hay mensajes, la función simplemente no hace nada.
  }

  // Función para cambiar el idioma (ahora llama a updateMessageBar correctamente)
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

    // Configura la visibilidad del input de chat según el idioma
    if (chatInputEs && chatInputEn) {
      if (lang === "es") {
        chatInputEs.style.display = "block"; // Mostrar input en español
        chatInputEn.style.display = "none"; // Ocultar input en inglés
        // Asegurar que el otro input esté vacío al cambiar de idioma
        chatInputEn.value = "";
      } else {
        chatInputEs.style.display = "none"; // Ocultar input en español
        chatInputEn.style.display = "block"; // Mostrar input en inglés
        // Asegurar que el otro input esté vacío al cambiar de idioma
        chatInputEs.value = "";
      }
    }

    // Guarda el idioma seleccionado en localStorage
    localStorage.setItem("preferredLanguage", lang);

    // Llama a la función para actualizar el mensaje de la barra al cambiar de idioma
    // Ahora updateMessageBar está definida en un ámbito accesible
    updateMessageBar();

    // Nota: El título de la página (<title>) se maneja mejor con el atributo lang en el HTML directamente,
    // como lo hemos implementado en los archivos, para sitios multipágina.
  }

  // Al cargar la página, verifica si hay un idioma guardado en localStorage
  const savedLanguage = localStorage.getItem("preferredLanguage");
  if (savedLanguage) {
    changeLanguage(savedLanguage); // Si hay uno guardado, úsalo
  } else {
    // Si no hay idioma guardado, usa el idioma por defecto definido en el HTML (lang="es")
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

  // --- Widget de Chatbot ---
  const chatWidget = document.getElementById("chatbot-widget");
  const chatHeader = document.getElementById("chat-header");
  const toggleChatButton = document.getElementById("toggle-chat");
  const chatBody = document.getElementById("chat-body");
  // Inputs ya seleccionados arriba: chatInputEs, chatInputEn
  const sendButton = document.getElementById("send-button");

  // Función para añadir un mensaje al chat
  function addMessage(messageText, sender) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    // El contenido del mensaje ya debe estar en el idioma correcto,
    // o gestionarse la traducción si se conecta a un backend real de IA.
    // Para esta simulación frontend, simplemente añadimos el texto.
    // Si el sender es 'bot', mostramos el mensaje bilingüe simulado
    if (sender === "bot") {
      const botResponseEs = "¿En qué más puedo ayudarte?";
      const botResponseEn = "How else can I assist you?";
      // Obtenemos el idioma actual del body para saber cuál mostrar inicialmente
      const currentLang = body.getAttribute("data-lang");
      // Usamos textContent para evitar problemas de inyección si el mensaje viniera de una fuente externa no controlada
      const responseText = currentLang === "es" ? botResponseEs : botResponseEn;
      messageElement.textContent = responseText; // Usamos textContent en lugar de innerHTML aquí
    } else {
      // Si el sender es 'user', asumimos que el messageText ya viene en el idioma del input usado
      messageElement.textContent = messageText; // Usamos textContent
    }

    if (chatBody) {
      chatBody.appendChild(messageElement);
      // Hacer scroll automático hacia abajo
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }

  // Manejar el envío de mensajes
  function handleSendMessage() {
    // Determinar el idioma actual y el input activo
    const currentLang = body.getAttribute("data-lang");
    const activeInput = currentLang === "es" ? chatInputEs : chatInputEn;
    const messageText = activeInput.value.trim();

    if (messageText) {
      // Añadir el mensaje del usuario
      addMessage(messageText, "user");

      // Aquí es donde integrarías la llamada a tu backend de IA.
      // Por ahora, simulamos una respuesta del bot.
      setTimeout(() => {
        addMessage("", "bot"); // La función addMessage ya añade el texto bilingüe simulado para el bot
      }, 500); // Simular un pequeño retraso para la respuesta del bot

      // Limpiar el input
      activeInput.value = "";
    }
  }

  // Alternar visibilidad del chat
  if (chatHeader && chatWidget && toggleChatButton) {
    chatHeader.addEventListener("click", () => {
      chatWidget.classList.toggle("collapsed");
      // Cambiar el icono del botón al expandir/colapsar
      const chatIconContainer = toggleChatButton; // El botón mismo contiene el ícono
      if (chatWidget.classList.contains("collapsed")) {
        // Si está colapsado, mostrar ícono de chat (message-square)
        // Usamos innerHTML aquí para insertar el SVG, es seguro en este contexto
        chatIconContainer.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
      } else {
        // Si está expandido, mostrar ícono de menos
        // Usamos innerHTML aquí para insertar el SVG
        chatIconContainer.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus"><line x1="5" x2="19" y1="12" y2="12"/></svg>';
      }
      // Re-inicializar íconos después de cambiar el SVG, solo si lucide está disponible
      if (typeof lucide !== "undefined") {
        lucide.createIcons();
      }
    });
  }

  // Listener para el botón de enviar mensaje
  if (sendButton) {
    sendButton.addEventListener("click", handleSendMessage);
  }

  // Listeners para la tecla Enter en ambos inputs (español e inglés)
  if (chatInputEs) {
    chatInputEs.addEventListener("keypress", (event) => {
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

  // --- Carrusel (solo en index.html) ---
  // Verificamos si estamos en index.html antes de inicializar el carrusel
  if (
    document.getElementById("inicio") &&
    document.querySelector(".carousel-container")
  ) {
    const carouselContainer = document.querySelector(".carousel-container");
    const slides = document.querySelectorAll(".carousel-slide");
    const prevButton = document.getElementById("carousel-prev");
    const nextButton = document.getElementById("carousel-next");
    let currentIndex = 0;

    // Función para mostrar una diapositiva específica
    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.remove("active");
        // Opcional: para carruseles con transiciones más complejas,
        // podrías necesitar manejar la visibilidad o el z-index aquí.
      });
      if (slides[index]) {
        // Asegurarse de que el índice es válido
        slides[index].classList.add("active");
      }
      currentIndex = index;
    }

    // Función para mostrar la siguiente diapositiva
    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    }

    // Función para mostrar la diapositiva anterior
    function prevSlide() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
    }

    // Inicializar el carrusel mostrando la primera diapositiva (ya tiene la clase 'active' en HTML)
    // showSlide(currentIndex); // No es estrictamente necesario si el primer slide ya tiene 'active'

    // Añadir listeners a los botones de navegación
    if (prevButton) {
      prevButton.addEventListener("click", prevSlide);
    }
    if (nextButton) {
      nextButton.addEventListener("click", nextSlide);
    }

    // Opcional: Autoplay del carrusel
    // setInterval(nextSlide, 5000); // Cambia de diapositiva cada 5 segundos
  }

  // --- Filtrado de Productos (solo en productos-galeria.html) ---
  // Verificamos si estamos en productos-galeria.html
  if (
    document.getElementById("productos") ||
    document.getElementById("galeria")
  ) {
    const showAllButton = document.getElementById("show-all-products");
    const productCards = document.querySelectorAll(".product-card"); // Selecciona las tarjetas de producto
    const galleryItems = document.querySelectorAll(".gallery-item"); // Selecciona los ítems de galería

    // NOTE: The filtering logic was commented out in previous versions.
    // If you add filter buttons (e.g., with data-filter attributes) to
    // productos-galeria.html, you'll need to uncomment and implement
    // the filtering logic here based on those buttons.

    if (showAllButton) {
      showAllButton.addEventListener("click", () => {
        // Lógica para mostrar todos los productos y elementos de galería
        productCards.forEach((card) => {
          card.style.display = ""; // o 'block', o lo que sea el display por defecto de la tarjeta
        });
        galleryItems.forEach((item) => {
          item.style.display = ""; // o el display por defecto del ítem
        });

        // Puedes añadir lógica para ocultar/mostrar botones de filtro específicos aquí si los tuvieras
      });
    }

    // Ejemplo (pseudo-código para filtro por categoría):
    /*
        const filterButtons = document.querySelectorAll('.filter-button'); // Asume que tienes botones con clase .filter-button
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter; // 'all', 'artesanales', 'cupcakes', etc.

                productCards.forEach(card => {
                    const category = card.dataset.category; // Asume que las tarjetas tienen data-category
                    if (filter === 'all' || category === filter) {
                        card.style.display = '';
                    } else {
                        card.style.display = 'none';
                    }
                });
                 galleryItems.forEach(item => {
                    const category = item.dataset.category; // Asume que los items de galería tienen data-category
                     if (filter === 'all' || category === filter) {
                        item.style.display = '';
                    } else {
                        item.style.display = 'none';
                    }
                 });
            });
        });
        */
  }

  // --- Lógica para el Creador de Invitaciones (Pendiente de implementación) ---
  // Verificamos si estamos en la página del creador de invitaciones
  // if (document.getElementById("creador-invitaciones")) {
  //     const invitationForm = document.getElementById('invitation-form');
  //     const invitationPreview = document.getElementById('invitation-preview');
  //     const templateOptions = document.querySelectorAll('.template-option');

  //      let selectedTemplate = null;

  //     // Lógica para seleccionar plantilla
  //     templateOptions.forEach(option => {
  //         option.addEventListener('click', () => {
  //             // Remover clase activa de todas las plantillas
  //             templateOptions.forEach(opt => opt.classList.remove('border-marca-acento1'));
  //             // Añadir clase activa a la plantilla seleccionada
  //             option.classList.add('border-marca-acento1');
  //             selectedTemplate = option.dataset.template;
  //             console.log('Plantilla seleccionada:', selectedTemplate);

  //             // Opcional: Actualizar vista previa básica con solo la plantilla seleccionada
  //             // invitationPreview.innerHTML = `<img src="./image/${selectedTemplate}.jpg" alt="Vista previa">`;
  //         });
  //     });

  //     // Manejar envío del formulario (requiere backend para generar la imagen)
  //     if (invitationForm) {
  //         invitationForm.addEventListener('submit', (event) => {
  //             event.preventDefault(); // Evitar el envío tradicional del formulario

  //             if (!selectedTemplate) {
  //                 alert('Por favor, selecciona una plantilla.');
  //                 return;
  //             }

  //             const eventDetails = {
  //                 type: document.getElementById('event-type').value,
  //                 name: document.getElementById('honored-name').value,
  //                 date: document.getElementById('event-date').value,
  //                 time: document.getElementById('event-time').value,
  //                 location: document.getElementById('event-location').value,
  //                 rsvp: document.getElementById('rsvp-info').value,
  //                 notes: document.getElementById('additional-notes').value,
  //                 template: selectedTemplate
  //             };

  //             console.log("Datos del evento a enviar al backend:", eventDetails);

  //             // Aquí iría la llamada al backend para generar la invitación.
  //             // Ejemplo (pseudo-código con fetch):
  //             /*
  //             fetch('/generate-invitation', { // La URL de tu endpoint de backend
  //                 method: 'POST',
  //                 headers: {
  //                     'Content-Type': 'application/json',
  //                 },
  //                 body: JSON.stringify(eventDetails),
  //             })
  //             .then(response => response.json())
  //             .then(data => {
  //                 if (data.success && data.imageUrl) {
  //                     // Mostrar la invitación generada en la vista previa
  //                     invitationPreview.innerHTML = `<img src="${data.imageUrl}" alt="Tu Invitación Generada" class="w-full h-auto">`;
  //                     // Opcional: Ofrecer botón de descarga
  //                     // alert('¡Invitación generada! Ahora puedes descargarla.');
  //                 } else {
  //                     alert('Error al generar la invitación: ' + data.error);
  //                 }
  //             })
  //             .catch((error) => {
  //                 console.error('Error:', error);
  //                 alert('Hubo un problema al conectar con el servidor.');
  //             });
  //             */

  //             // Simulación frontend (no genera imagen real, solo muestra un mensaje)
  //             invitationPreview.innerHTML = `<p class="text-green-600 font-bold"><span lang="es">Simulación: Datos listos para generar la invitación con la plantilla ${selectedTemplate}. Se necesita un backend para crear la imagen real.</span><span lang="en">Simulation: Data ready to generate the invitation with template ${selectedTemplate}. A backend is needed to create the actual image.</span></p>`;

  //         });
  //     }
  // }
}); // Fin de DOMContentLoaded

// Define funciones que necesitan ser accesibles globalmente o llamadas desde fuera de DOMContentLoaded si es necesario
// Por ahora, todas nuestras funciones se llaman dentro del DOMContentLoaded, así que no es estrictamente necesario definirlas fuera,
// pero es buena práctica para funciones más complejas o reutilizables.

// Ejemplo: Si addMessage necesitara ser llamada desde otra parte de tu código que no está dentro de DOMContentLoaded, la definirías aquí.
// function addMessage(messageText, sender) { ... }
// function handleSendMessage() { ... }
// function changeLanguage(lang) { ... }

// Las funciones del carrusel (showSlide, nextSlide, prevSlide) están encapsuladas dentro de la comprobación
// de si la página actual tiene carrusel, lo cual es adecuado.

// La inicialización de Lucide Icons también está encapsulada dentro de DOMContentLoaded, que es correcto.
