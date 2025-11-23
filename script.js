onload = () => {
  // Código existente para manejar la carga del cuerpo del HTML
  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded");
    clearTimeout(c);
  }, 1000);

  // Crear un botón para iniciar la reproducción de la música
  const playButton = document.createElement("button");
  playButton.className = "button__moon"; // Asignar clase al botón
  playButton.innerHTML = `<span class="button-text">Play</span>`; // Texto inicial
  document.body.appendChild(playButton);

  // Crear un elemento para el efecto de escalado
  const scaleEffect = document.createElement("div");
  scaleEffect.className = "scale-effect"; // Asignar clase al efecto
  document.body.appendChild(scaleEffect);

  // Estilos iniciales del botón
  const style = document.createElement("style");
  style.innerHTML = `
  .button__moon {
    position: fixed;
    top: 20px;
    right: 20px;
    width: 0; /* Tamaño inicial en 0*/
    height: 0; /* Tamaño inicial en 0*/
    border: none;
    border-radius: 50%; /* Circular */
    background: radial-gradient(circle at 30% 30%, rgba(174, 238, 225, 0.9), rgba(174, 238, 225, 0.3) 70%); /* Tono azul verdoso */
    color: white;
    font-weight: bold;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(5px);
    box-shadow: 0 0 20px rgba(174, 238, 225, 0.6), 0 0 40px rgba(174, 238, 225, 0.4); /* Efecto de brillo azul */
    z-index: 10; /* Asegura que esté encima de otros elementos */
    animation: expand 3s forwards, glow 1.5s infinite alternate 1s; /* Iniciar animación de brillo después de la expansión */
  }

  .scale-effect {
    position: fixed;
    width: 60px; /* Tamaño inicial */
    height: 60px; /* Tamaño inicial */
    border-radius: 50%; /* Circular */
    background: rgba(200, 200, 200, 0.5); /* Color gris claro */
    pointer-events: none; /* No interferir con otros elementos */
    transform: scale(0); /* Comienza en tamaño 0 */
    transition: transform 3s ease; /* Transición suave para escalado */
    z-index: 9; /* Detrás del botón de la luna */
    filter: blur(10px); /* Suavizar los bordes */
    animation: glow 1.5s infinite alternate; /* Añadir animación de brillo intermitente */
  }

    .scale-effect.active {
    transform: scale(2); /* Aumentar el tamaño cuando esté activo */
  }

    .button__moon:before {
    content: '';
    position: absolute;
    top: 10%;
    left: 10%;
    width: 80%;
    height: 80%;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2); /* Marca de luna muy sutil */
    filter: blur(3px);
    opacity: 0.5;
    z-index: -1; /* Detrás del botón */
  }

  .button__moon:hover {
    background: radial-gradient(circle at 30% 30%, rgba(174, 238, 225, 1), rgba(174, 238, 225, 0.5) 70%); /* Más brillante al pasar el ratón */
    box-shadow: 0 0 30px rgba(174, 238, 225, 1), 0 0 60px rgba(174, 238, 225, 0.5); /* Aumentar el brillo azul al pasar el ratón */
  }

  .button-text {
    opacity: 0.05; /* Casi imperceptible */
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.5); /* Sombra sutil en el texto */
    transition: opacity 0.3s ease; /* Suave transición */
  }

  @media (max-width: 600px) {
    .button__moon {
      width: 60px; /* Más pequeño en pantallas pequeñas */
      height: 60px;
    }
  }

  @media (min-width: 1200px) {
    .button__moon {
      width: 100px; /* Más grande en pantallas grandes */
      height: 100px;
    }
  }

  /* Animación para el brillo intermitente */
  @keyframes glow {
    0% {
      box-shadow: 0 0 20px rgba(174, 238, 225, 0.6), 0 0 40px rgba(174, 238, 225, 0.4);
    }
    100% {
      box-shadow: 0 0 30px rgba(174, 238, 225, 0.8), 0 0 60px rgba(174, 238, 225, 0.6);
    }
  }

  /* Nueva animación de expansión */
  @keyframes expand {
    0% {
      width: 0;
      height: 0;
      opacity: 0; /* Comienza invisible */
    }
    100% {
      width: 120px; /* Tamaño final */
      height: 120px; /* Tamaño final */
      opacity: 1; /* Totalmente visible */
    }

`;

document.head.appendChild(style);

// Manejar el movimiento del cursor
let timeout; // Variable para controlar el temporizador
document.addEventListener("mousemove", (event) => {
  // Obtener la posición del cursor
  const x = event.clientX;
  const y = event.clientY;

  // Actualizar la posición del efecto de escalado
  scaleEffect.style.left = `${x - scaleEffect.offsetWidth / 2}px`; // Centrar el efecto en el cursor
  scaleEffect.style.top = `${y - scaleEffect.offsetHeight / 2}px`; // Centrar el efecto en el cursor
  scaleEffect.classList.add("active"); // Activar el efecto de escalado

  // Reiniciar el escalado a 0 después de un corto período de inactividad
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    scaleEffect.classList.remove("active"); // Desactivar el efecto
  }, 200); // El tiempo que se mantendrá visible
});


  // Manejo de la reproducción automática de las canciones
  const songs = [

    "sounds/A thousand years.m4a",
    "sounds/In the end - remix.m4a",
    "sounds/Just the way you are.m4a",
    "sounds/See you again.weba",
    "sounds/Señorita.m4a",
    "sounds/Let me down slowly.m4a",
    "sounds/Mix.m4a",
    "sounds/Beautiful things.m4a",
    "sounds/Payphone.m4a",
    "sounds/Lovely.m4a",
    "sounds/Hymn for the weekend.m4a",
    "sounds/Stitches.m4a",
    "spunds/Everything i wanted.mp3"
  ];

  let currentSongIndex = Math.floor(Math.random() * songs.length); // Canción aleatoria al cargar
  let audioPlayer = new Audio(songs[currentSongIndex]); // Inicializar el reproductor con la canción aleatoria
  audioPlayer.volume = 1; // Ajusta el volumen
  let isPlaying = false;

  // Temporizador para la alerta al cargar la página
  const alertTimeout = setTimeout(() => {
    if (!isPlaying && audioPlayer.paused) {
      alert('Toca la luna');
    }
  }, 8000); // 8 segundos

  // Función para comenzar o detener la reproducción cuando el usuario haga clic en el botón
  playButton.addEventListener("click", () => {
    if (isPlaying) {
      audioPlayer.pause(); // Detener la música
      playButton.innerHTML = `<span class="button-text">Play</span>`; // Cambiar a 'Play'
      isPlaying = false;
    } else {
      audioPlayer.play(); // Reproducir la música
      playButton.innerHTML = `<span class="button-text">Stop</span>`; // Cambiar a 'Stop'
      isPlaying = true;

      // Limpiar el temporizador de la alerta al comenzar a reproducir
      clearTimeout(alertTimeout);
    }
  });

  // Cuando termine la canción, reproducir la siguiente en bucle
  audioPlayer.addEventListener("ended", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length; // Avanzar al siguiente
    audioPlayer.src = songs[currentSongIndex];
    audioPlayer.play();
  });
};
