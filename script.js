// Funcionalidad del chatbot
const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbotWindow = document.getElementById("chatbot-window");
const chatbotMessages = document.getElementById("chatbot-messages");
const chatbotButtonsContainer = document.getElementById("chatbot-buttons");
const chatbotInput = document.getElementById("chatbot-input");
const chatbotSend = document.getElementById("chatbot-send");

let backToMainButtonAdded = false; // Variable para controlar si el botón "Volver" ya fue agregado

chatbotToggle.addEventListener("click", () => {
  chatbotWindow.classList.toggle("hidden");
  if (!chatbotMessages.hasChildNodes()) {
    showWelcomeMessage(); // Mostrar mensaje de bienvenida cuando el chat se abre
  }
});

// Enviar un mensaje al hacer clic en "Enviar"
chatbotSend.addEventListener("click", () => {
  const userInput = chatbotInput.value.trim();
  if (userInput) {
    addMessage("Usuario", userInput);
    respondToUser(userInput);
    chatbotInput.value = "";
  }
});

// Función para agregar un mensaje al chat
function addMessage(sender, text) {
  const message = document.createElement("div");
  message.textContent = `${sender}: ${text}`;
  chatbotMessages.appendChild(message);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Mostrar mensaje de bienvenida
function showWelcomeMessage() {
  // Limpiar los mensajes anteriores antes de mostrar el nuevo mensaje
  chatbotMessages.innerHTML = ""; 

  const welcomeMessage = "¡Bienvenido! 😊 ¿En qué puedo ayudarte hoy?";
  addMessage("Chatbot", welcomeMessage);
  const options = [
    { text: "Recorridos", value: "recorridos" },
    { text: "Lugares", value: "lugares" },
    { text: "Transporte", value: "transporte" },
    { text: "Gastronomía", value: "gastronomia" },
    { text: "Más Información", value: "más información" },
    { text: "Personaliza tu recorrido", value: "personaliza tu recorrido" },
    { text: "Alojamientos", value: "alojamientos" },
    { text: "Eventos", value: "eventos" }
  ];
  createButtons(options);
  backToMainButtonAdded = false; // Reiniciar el control del botón
}

// Crear botones dinámicamente
function createButtons(options) {
  chatbotButtonsContainer.innerHTML = ""; // Limpiar botones anteriores
  options.forEach(option => {
    const button = document.createElement("button");
    button.classList.add("chatbot-option");
    button.setAttribute("data-option", option.value);
    button.textContent = option.text;
    chatbotButtonsContainer.appendChild(button);
  });

  const buttons = document.querySelectorAll(".chatbot-option");
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const selectedOption = button.getAttribute("data-option");
      respondToOption(selectedOption);
    });
  });
}

// Responder según la opción seleccionada
function respondToOption(option) {
  let response = "";

  switch (option) {
    case "recorridos":
      response = "Te sugiero visitar la Costanera y el Estadio Madre de Ciudades.";
      break;
    case "lugares":
      response = "Elige un lugar para conocer más sobre él:";
      const placesOptions = [
        { text: "Estadio Único", value: "estadio_unico" },
        { text: "Plaza Libertad", value: "plaza_libertad" },
        { text: "Catedral Basílica", value: "catedral_basilica" },
        { text: "Nodo Tecnológico", value: "nodo_tecnologico" },
        { text: "Plaza Añoranza", value: "plaza_añoranza" },
        { text: "Teatro 25 de Mayo", value: "teatro_25_mayo" }
      ];
      createButtons(placesOptions);
      break;
    case "transporte":
      response = "Elige uno de los siguientes medios de transporte:";
      const transportOptions = [
        { text: "Uber", value: "uber" },
        { text: "Colectivo", value: "colectivo" },
        { text: "Tren del Desarrollo", value: "tren" }
      ];
      createButtons(transportOptions);
      break;
    case "gastronomia":
      response = "Recomiendo probar empanadas, locro, y asado, ¡una delicia!";
      break;
    case "más información":
      response = "Puedo contarte sobre la historia o la cultura de Santiago del Estero.";
      break;
    case "personaliza tu recorrido":
      response = "Elige los puntos de interés y la duración para personalizar tu experiencia.";
      break;
    case "alojamientos":
      response = "Puedes encontrar alojamientos como hoteles y cabañas en lugares como la Costanera o Termas de Río Hondo.";
      break;
    case "eventos":
      response = "Algunos eventos importantes son el Festival Nacional de la Chacarera y el Carnaval de Santiago.";
      break;
    case "estadio_unico":
      response = "El Estadio Único Madre de Ciudades es el más grande de la provincia, con capacidad para 30,000 personas. Fue inaugurado en 2021 y se encuentra a orillas del Río Dulce.";
      break;
    case "plaza_libertad":
      response = "La Plaza Libertad es el corazón de la ciudad, rodeada de edificios históricos como la Catedral y el Centro Cultural del Bicentenario.";
      break;
    case "catedral_basilica":
      response = "La Catedral Basílica es un templo neoclásico y barroco que alberga la imagen de Nuestra Señora del Carmen, patrona de la diócesis.";
      break;
    case "nodo_tecnologico":
      response = "El Nodo Tecnológico es un centro de innovación y desarrollo ubicado en la ciudad, que promueve la investigación y la tecnología.";
      break;
    case "plaza_añoranza":
      response = "La Plaza Añoranza es un escenario al aire libre, ubicada cerca del Río Dulce, ideal para eventos culturales y recreativos.";
      break;
    case "teatro_25_mayo":
      response = "El Teatro 25 de Mayo, inaugurado en 1912, es un ícono cultural de la ciudad con capacidad para más de 700 personas y alberga eventos artísticos y culturales.";
      break;
    default:
      return; // No hacer nada si la opción no es válida
  }

  addMessage("Chatbot", response);

  // Agregar el botón "Volver a opciones principales" solo si no fue agregado antes
  if (!backToMainButtonAdded) {
    const backToMainButton = document.createElement("button");
    backToMainButton.textContent = "Volver a opciones principales";
    backToMainButton.classList.add("chatbot-option");
    backToMainButton.addEventListener("click", showWelcomeMessage); // Volver a mostrar las opciones principales

    chatbotButtonsContainer.appendChild(backToMainButton);
    backToMainButtonAdded = true; // Marcar que el botón ya ha sido agregado
  }
}

// Lógica del carrusel
const carousel = document.querySelector(".carousel-images");
const images = document.querySelectorAll(".carousel-images img");
let currentIndex = 0;

function moveCarousel() {
  currentIndex = (currentIndex + 1) % images.length; // Avanzar al siguiente índice
  const offset = -currentIndex * 100; // Calcular el desplazamiento en porcentaje
  carousel.style.transform = `translateX(${offset}%)`; // Mover el carrusel
}

// Mover el carrusel automáticamente cada 3 segundos
setInterval(moveCarousel, 3000);

