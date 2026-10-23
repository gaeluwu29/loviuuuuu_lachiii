const startDate = new Date(2024, 1, 22); 

function updateTimer() {
  const now = new Date();
  const diff = now - startDate;

  // Cálculos de tiempo
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  // Inserción en el DOM
  const daysEl = document.getElementById('timerDays');
  const hoursEl = document.getElementById('timerHours');
  const minutesEl = document.getElementById('timerMinutes');
  const secondsEl = document.getElementById('timerSeconds');

  if (daysEl && hoursEl && minutesEl && secondsEl) {
    daysEl.textContent = days;
    hoursEl.textContent = hours < 10 ? '0' + hours : hours;
    minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
    secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
  }
}

updateTimer();
setInterval(updateTimer, 1000);


// ==========================================
// MÓDULO BOTÓN EXPLOSIÓN DE AMOR
// ==========================================

const loveBtn = document.getElementById('loveExplosionBtn');

if (loveBtn) {
  loveBtn.addEventListener('click', (e) => {
    // Lista de variaciones de emojis para diversificar la explosión
    const heartIcons = ['❤️', '💖', '💕', '💗', '✨', '🌸', '💘'];
    const particleCount = 20; // Cantidad de corazones por clic

    // Obtenemos las coordenadas del centro del botón o punto del clic
    const rect = loveBtn.getBoundingClientRect();
    const originX = e.clientX || (rect.left + rect.width / 2);
    const originY = e.clientY || (rect.top + rect.height / 2);

    for (let i = 0; i < particleCount; i++) {
      const heart = document.createElement('span');
      heart.className = 'floating-heart';
      
      // Selección aleatoria de emoji y tamaño
      heart.textContent = heartIcons[Math.floor(Math.random() * heartIcons.length)];
      const size = Math.random() * 16 + 18; // Entre 18px y 34px
      heart.style.fontSize = `${size}px`;
      heart.style.left = `${originX}px`;
      heart.style.top = `${originY}px`;

      document.body.appendChild(heart);

      // Dirección física: Disparo en abanico con ángulo aleatorio hacia arriba
      const angle = (Math.random() * 140 - 160) * (Math.PI / 180); // Ángulo entre -20° y -160°
      const velocity = Math.random() * 180 + 100; // Distancia del impulso
      const destinationX = Math.cos(angle) * velocity;
      const destinationY = Math.sin(angle) * velocity;
      const rotation = (Math.random() - 0.5) * 360;

      // Animación usando Web Animations API
      const animation = heart.animate([
        {
          transform: 'translate(-50%, -50%) scale(0.3) rotate(0deg)',
          opacity: 1
        },
        {
          transform: `translate(calc(-50% + ${destinationX}px), calc(-50% + ${destinationY}px)) scale(1.2) rotate(${rotation}deg)`,
          opacity: 0.9,
          offset: 0.7
        },
        {
          transform: `translate(calc(-50% + ${destinationX}px), calc(-50% + ${destinationY + 40}px)) scale(0.8) rotate(${rotation + 40}deg)`,
          opacity: 0
        }
      ], {
        duration: Math.random() * 400 + 800, // Duración entre 0.8s y 1.2s
        easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)'
      });

      // Limpieza automática del elemento en el DOM tras la animación
      animation.onfinish = () => {
        heart.remove();
      };
    }
  });
}

/* ==========================================
   MÓDULO POLAROIDS
   ========================================== */

const polaroidModal = document.getElementById('polaroidModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const polaroidCloseBtn = document.getElementById('polaroidCloseBtn');

// Abrir una foto
function openPolaroid(imgSrc, titleText, descText) {
    if (!polaroidModal || !modalImg || !modalTitle || !modalDesc) {
        console.error('Error: faltan elementos del modal de polaroids.');
        return;
    }

    // Actualizar contenido
    modalImg.src = imgSrc;
    modalImg.alt = titleText;
    modalTitle.textContent = titleText;
    modalDesc.textContent = descText;

    // Mostrar modal
    polaroidModal.classList.add('is-open');
    polaroidModal.setAttribute('aria-hidden', 'false');

    // Bloquear desplazamiento de la página de fondo
    document.body.style.overflow = 'hidden';

    // Avisar en consola si la imagen no existe
    modalImg.onerror = function () {
        console.error('No se pudo cargar la imagen:', imgSrc);
    };
}

// Cerrar modal
function closePolaroid() {
    if (!polaroidModal) return;

    polaroidModal.classList.remove('is-open');
    polaroidModal.setAttribute('aria-hidden', 'true');

    document.body.style.overflow = '';
}

// Cerrar con la X
if (polaroidCloseBtn) {
    polaroidCloseBtn.addEventListener('click', closePolaroid);
}

// Cerrar al hacer clic en el fondo oscuro
if (polaroidModal) {
    polaroidModal.addEventListener('click', function (event) {
        if (event.target === polaroidModal) {
            closePolaroid();
        }
    });
}

// Cerrar con Escape
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && polaroidModal?.classList.contains('is-open')) {
        closePolaroid();
    }
});

// ==========================================
// MÓDULO POST-ITS DIGITALES
// ==========================================

const postits = document.querySelectorAll('.postit');

postits.forEach(postit => {
  postit.addEventListener('click', () => {
    // Agrega una pequeña animación rápida de balanceo
    postit.style.transition = 'transform 0.1s ease';
    postit.style.transform = 'scale(1.15) rotate(5deg)';
    
    setTimeout(() => {
      postit.style.transform = 'scale(1.1) rotate(0deg)';
      postit.style.transition = 'transform 0.3s ease';
    }, 150);
  });
});

// ==========================================
// MÓDULO CARTA 3D
// ==========================================

const envelope = document.getElementById('loveEnvelope');

if (envelope) {
    envelope.addEventListener('click', () => {
        envelope.classList.toggle('open');
    });
}

// ==========================================
// MÓDULO NUESTRO CIELO (MAPA ESTELAR)
// ==========================================

// Lista de recuerdos / estrellas especiales (coordenadas X,Y en porcentaje de 0 a 100)

const starMemories = [
  {
    x: 15, y: 20,
    date: "22 de febrero de 2024",
    title: "El comienzo de todo ✨",
    story: "Todo comenzó con un simple «Holaaaaaaap >:D». Nunca imaginé que aquella conversación terminaría convirtiéndose en una de las coincidencias más bonitas de mi vida."
  },
  {
    x: 38, y: 12,
    date: "25 de febrero de 2024",
    title: "Las primeras palabras bonitas 💙",
    story: "«Nooo encerio es muy bonito hablar contigo ☺️». Quizá no imaginabas cuánto llegaría a atesorar esas palabras, pero para mí se convirtieron en un recuerdo digno de guardar para siempre."
  },
  {
    x: 62, y: 22,
    date: "Finales de febrero de 2024",
    title: "El gancho y el agua 💧",
    story: "Aquí comenzó el coqueteo: yo tirándote el gancho y recordándote que tomaras agua. JAJAJA. Entre bromas y pequeñas muestras de preocupación, nuestra historia empezó a tomar forma."
  },
  {
    x: 83, y: 15,
    date: "Febrero de 2024",
    title: "Nuestro fanfic de Guns N' Roses 🎸",
    story: "Compartimos una historia inspirada en Guns N' Roses, entre música, imaginación y bromas. Sin darnos cuenta, estábamos construyendo otro pequeño mundo que nos pertenecía a los dos."
  },
  {
    x: 82, y: 43,
    date: "Marzo de 2024",
    title: "De la pantalla al mundo real 🌙",
    story: "Llegó el momento de vernos en persona. Ya no éramos solamente mensajes en una pantalla: ahora podíamos compartir el mismo espacio y crear recuerdos juntos."
  },
  {
    x: 57, y: 48,
    date: "9 de marzo de 2024",
    title: "So Happy Together 🎶",
    story: "Te dediqué una canción de The Turtles para expresar lo bonito que había sido conocerte. Me respondiste que era muy bonita y que habías olvidado que te gustaba. Desde entonces, esa canción también guarda un pedacito de nosotros."
  },
  {
    x: 31, y: 43,
    date: "11 de marzo de 2024",
    title: "Nuestro primer abrazo 🫂",
    story: "Ese abrazo fue espectacular. A veces, un solo instante basta para convertirse en uno de esos recuerdos que quisieras volver a sentir una y otra vez."
  },
  {
    x: 15, y: 63,
    date: "14 de marzo de 2024",
    title: "Un futuro contigo 🌌",
    story: "Mientras imaginaba cómo sería mi vida dentro de diez años, tú estabas ahí. «Con eso ya lo tendría todo». No necesitaba tener resuelto cada detalle del futuro para saber que compartirlo contigo lo haría especial."
  },
  {
    x: 78, y: 82,
    date: "Hoy y siempre",
    title: "Mi lugar seguro 🏡",
    story: "Gracias por hacer que cada día 22 y cada instante a tu lado valgan totalmente la pena."
  }
];


const canvas = document.getElementById('starCanvas');

if (canvas) {
  const ctx = canvas.getContext('2d');
  let width, height;
  let backgroundStars = [];

  // Redimensionar canvas manteniendo resolución limpia
  function resizeCanvas() {
    const container = canvas.parentElement;
    width = container.clientWidth;
    height = container.clientHeight;
    canvas.width = width;
    canvas.height = height;
    generateBackgroundStars();
  }

  // Genera estrellitas pequeñas estáticas de fondo
  function generateBackgroundStars() {
    backgroundStars = [];
    for (let i = 0; i < 120; i++) {
      backgroundStars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.2,
        alpha: Math.random() * 0.7 + 0.2
      });
    }
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Bucle de animación del cielo
  function drawSky() {
    ctx.clearRect(0, 0, width, height);

    // 1. Dibujar estrellas de fondo
    backgroundStars.forEach(star => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
      ctx.fill();
    });

    // 2. Dibujar líneas de constelación uniendo las estrellas interactivas
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(162, 200, 255, 0.25)';
    ctx.lineWidth = 1;
    for (let i = 0; i < starMemories.length - 1; i++) {
      const p1X = (starMemories[i].x / 100) * width;
      const p1Y = (starMemories[i].y / 100) * height;
      const p2X = (starMemories[i + 1].x / 100) * width;
      const p2Y = (starMemories[i + 1].y / 100) * height;
      ctx.moveTo(p1X, p1Y);
      ctx.lineTo(p2X, p2Y);
    }
    ctx.stroke();

    // 3. Dibujar estrellas interactivas especiales
    const time = Date.now() * 0.003;
    starMemories.forEach((star, index) => {
      const px = (star.x / 100) * width;
      const py = (star.y / 100) * height;
      
      // Efecto de titileo suave (pulsación)
      const pulse = Math.sin(time + index) * 2 + 5;

      // Resplandor exterior
      const gradient = ctx.createRadialGradient(px, py, 0, px, py, pulse * 2);
      gradient.addColorStop(0, 'rgba(180, 215, 255, 1)');
      gradient.addColorStop(0.5, 'rgba(100, 160, 255, 0.4)');
      gradient.addColorStop(1, 'rgba(100, 160, 255, 0)');

      ctx.beginPath();
      ctx.arc(px, py, pulse * 2, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Centro brillante
      ctx.beginPath();
      ctx.arc(px, py, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    });

    requestAnimationFrame(drawSky);
  }

  drawSky();

  // Detección de clics en las estrellas del Canvas
  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    starMemories.forEach(star => {
      const px = (star.x / 100) * width;
      const py = (star.y / 100) * height;

      // Radio de colisión para facilitar el toque en celulares (20px alrededor)
      const distance = Math.hypot(clickX - px, clickY - py);
      if (distance < 20) {
        showStarStory(star);
      }
    });
  });

  // Modal handlers
  const skyModal = document.getElementById('skyModal');
  const skyCloseBtn = document.getElementById('skyCloseBtn');

  function showStarStory(star) {
    document.getElementById('starDate').textContent = star.date;
    document.getElementById('starTitle').textContent = star.title;
    document.getElementById('starStory').textContent = star.story;
    skyModal.style.display = 'flex';
  }

  if (skyCloseBtn) {
    skyCloseBtn.addEventListener('click', () => {
      skyModal.style.display = 'none';
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === skyModal) {
      skyModal.style.display = 'none';
    }
  });
}
// ==========================================
// MÓDULO CUPONERA DEL AMOR
// ==========================================

function flipCoupon(cardElement) {
  if (cardElement) {
    cardElement.classList.toggle('flipped');
  }
}

/* ==========================================
   GENERADOR DEL CIELO CÓSMICO
   ========================================== */

(function createCosmicBackground() {
  // Evita crear el fondo dos veces
  if (document.getElementById("cosmic-background")) return;

  const sky = document.createElement("div");
  sky.id = "cosmic-background";
  sky.setAttribute("aria-hidden", "true");

  // Estrellas pequeñas
  for (let i = 0; i < 100; i++) {
    const star = document.createElement("span");
    star.className = "cosmic-star";

    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.setProperty(
      "--duration",
      `${3 + Math.random() * 5}s`
    );
    star.style.setProperty(
      "--delay",
      `${Math.random() * -8}s`
    );

    // Algunas estrellas serán un poco más grandes
    const size = Math.random() < 0.12 ? 3 : 1.5;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    sky.appendChild(star);
  }

  // Luciérnagas azuladas
  for (let i = 0; i < 9; i++) {
    const firefly = document.createElement("span");
    firefly.className = "firefly";

    firefly.style.left = `${5 + Math.random() * 90}%`;
    firefly.style.top = `${15 + Math.random() * 75}%`;
    firefly.style.setProperty(
      "--duration",
      `${8 + Math.random() * 8}s`
    );
    firefly.style.setProperty(
      "--delay",
      `${Math.random() * -15}s`
    );

    sky.appendChild(firefly);
  }

  document.body.prepend(sky);
})();
