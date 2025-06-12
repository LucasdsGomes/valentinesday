let loveCount = 0;
let currentSection = 0;
let musicPlaying = false;
let drawing = false;
let stars = [];
let lines = [];
let messageVisible = false;
const imgSadCat = "./assets/gato-triste.jpg";

// Initialize canvas
const canvas = document.getElementById("romanticCanvas");
const ctx = canvas.getContext("2d");

// Floating hearts functions
function createFloatingHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerHTML = "♥";
  heart.style.left = Math.random() * 100 + "%";
  heart.style.animationDelay = Math.random() * 6 + "s";
  heart.style.animationDuration = Math.random() * 3 + 4 + "s";
  document.getElementById("floating-hearts").appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 8000);
}

setInterval(createFloatingHeart, 800);

// Journey functions
function startJourney() {
  document.getElementById("welcome").style.display = "none";
  const audio = document.getElementById("backgroundMusic");

  setTimeout(() => {
    if (audio.readyState >= 2) {
      audio
        .play()
        .then(() => {
          document.getElementById("musicIcon").textContent = "🎶";
          musicPlaying = true;
        })
        .catch((error) => {
          console.log("Auto-play blocked:", error);
        });
    }
  }, 500);

  showNextSection();
}

function showNextSection() {
  const sections = ["section1", "section2", "section3", "section4", "final"];
  if (currentSection < sections.length) {
    setTimeout(() => {
      document
        .getElementById(sections[currentSection])
        .classList.add("visible");
      currentSection++;
      if (currentSection < sections.length) {
        setTimeout(showNextSection, 3000);
      }
    }, 1000);
  }
}

// Love counter functions
function increaseLove() {
  loveCount += Math.floor(Math.random() * 100) + 100;
  document.getElementById("loveCounter").textContent =
    loveCount.toLocaleString();
  createSparkles();
}

function createSparkles() {
  for (let i = 0; i < 10; i++) {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.style.left = Math.random() * 100 + "%";
    sparkle.style.top = Math.random() * 100 + "%";
    document.body.appendChild(sparkle);

    setTimeout(() => {
      sparkle.remove();
    }, 2000);
  }
}

// Music control
function toggleMusic() {
  const audio = document.getElementById("backgroundMusic");
  const icon = document.getElementById("musicIcon");

  if (musicPlaying) {
    audio.pause();
    icon.textContent = "🎵";
    musicPlaying = false;
  } else {
    if (audio.readyState >= 2) {
      audio
        .play()
        .then(() => {
          icon.textContent = "🎶";
          musicPlaying = true;
        })
        .catch((error) => {
          console.error("Audio error:", error);
        });
    } else {
      audio.load();
      audio.addEventListener(
        "canplay",
        function () {
          audio.play();
          icon.textContent = "🎶";
          musicPlaying = true;
        },
        { once: true }
      );
    }
  }
}

// Canvas functions
let backgroundStars = [];

// Cria estrelas de fundo aleatórias
function createBackgroundStars() {
  backgroundStars = [];
  const starCount = 100;

  for (let i = 0; i < starCount; i++) {
    backgroundStars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      alpha: Math.random() * 0.8 + 0.2,
    });
  }
}

// Desenha as estrelas de fundo
function drawBackgroundStars() {
  backgroundStars.forEach((star) => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
    ctx.fill();
  });
}

// Função para desenhar estrelas mais bonitas
function drawStar(x, y, radius, spikes, outerRadius, innerRadius) {
  let rot = (Math.PI / 2) * 3;
  let step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(x, y - outerRadius);

  for (let i = 0; i < spikes; i++) {
    x = x + Math.cos(rot) * outerRadius;
    y = y + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = x + Math.cos(rot) * innerRadius;
    y = y + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }

  ctx.lineTo(x, y - outerRadius);
  ctx.closePath();
  ctx.fillStyle = "#ffffff";
  ctx.fill();
}

// Função principal para desenhar a constelação
function drawConstellation() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackgroundStars();

  // Desenha as linhas de conexão
  ctx.strokeStyle = "rgba(255, 235, 59, 0.7)";
  ctx.lineWidth = 1.5;
  lines.forEach((line) => {
    ctx.beginPath();
    ctx.moveTo(line.x1, line.y1);
    ctx.lineTo(line.x2, line.y2);
    ctx.stroke();
  });

  // Desenha as estrelas da constelação
  stars.forEach((star) => {
    // Estrela principal (maior)
    drawStar(star.x, star.y, 5, 5, 8, 4);

    // Pequenas estrelas ao redor para efeito de brilho
    for (let i = 0; i < 3; i++) {
      const offsetX = (Math.random() - 0.5) * 15;
      const offsetY = (Math.random() - 0.5) * 15;
      const smallRadius = Math.random() * 2 + 1;
      drawStar(
        star.x + offsetX,
        star.y + offsetY,
        smallRadius,
        5,
        smallRadius * 1.6,
        smallRadius * 0.8
      );
    }

    // Texto com o nome
    ctx.fillStyle = "#ffeb3b";
    ctx.font = "bold 16px Arial";
    ctx.fillText(star.label, star.x + 12, star.y + 5);
  });
}

// Função para criar a constelação com o nome digitado
function createConstellation() {
  const nameInput = document.getElementById("constellationName");
  let name = nameInput.value.trim().toUpperCase();

  if (name === "") {
    name = "AMOR"; // Nome padrão se não for digitado nada
  }

  stars = [];
  lines = [];
  createBackgroundStars();

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(canvas.width, canvas.height) * 0.35;

  // Cria posições em forma de coração
  for (let i = 0; i < name.length; i++) {
    // Fórmula para posicionar em forma de coração
    const angle = (i / name.length) * 2 * Math.PI;
    const heartX = 16 * Math.pow(Math.sin(angle), 3);
    const heartY = -(
      13 * Math.cos(angle) -
      5 * Math.cos(2 * angle) -
      2 * Math.cos(3 * angle) -
      Math.cos(4 * angle)
    );

    // Ajusta a escala e posição
    const x = centerX + heartX * (radius / 16);
    const y = centerY + heartY * (radius / 16);

    stars.push({ x, y, label: name[i] });

    // Conecta as estrelas
    if (i > 0) {
      lines.push({ x1: stars[i - 1].x, y1: stars[i - 1].y, x2: x, y2: y });
    }
  }

  // Conecta a última estrela com a primeira para fechar o coração
  if (stars.length > 2) {
    lines.push({
      x1: stars[stars.length - 1].x,
      y1: stars[stars.length - 1].y,
      x2: stars[0].x,
      y2: stars[0].y,
    });
  }

  drawConstellation();
}

// Inicializa as estrelas de fundo quando a página carrega
window.addEventListener("load", createBackgroundStars);

function revealMessage() {
  if (messageVisible) return;
  messageVisible = true;
  const message = document.getElementById("secretMessage");
  message.textContent = "Você é meu universo, Minha Pequena ♥";
  message.style.animation = "fadeIn 1.5s forwards";
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  document.getElementById("secretMessage").textContent = "";
  stars = [];
  lines = [];
  messageVisible = false;
}

// Proposal functions
function sayYes() {
  createSparkles();
  createFloatingHeart();
}

let noButtonClicks = 0; // Variável global para contar os cliques

function moveNoButton() {
  noButtonClicks++; // Incrementa o contador

  // Se clicou mais de 3 vezes, mostra o alerta e esconde o botão
  if (noButtonClicks > 3) {
    const yesbutton = document.getElementById("yesbutton");
    const marryquest = document.getElementById("marryquest");
    const container = document.getElementById("imageContainer"); // Crie esse elemento no HTML
    container.innerHTML = `<p>Ah vc não quer casar cmg? blz entao</p><img src="${imgSadCat}" alt="Gato triste" style="max-width: 300px;">`;

    const botaoNo = document.getElementById("noButton");
    marryquest.style.display = "none"; // Esconde o texto
    botaoNo.style.display = "none"; // Esconde o botão
    yesbutton.style.display = "none";
    noButtonClicks = 0; // Reseta o contador
    return;
  }

  const button = document.getElementById("noButton");
  const container = button.parentElement;
  const containerRect = container.getBoundingClientRect();

  const maxX = containerRect.width - button.offsetWidth - 20;
  const maxY = containerRect.height - button.offsetHeight - 20;

  const randomX = Math.max(20, Math.floor(Math.random() * maxX));
  const randomY = Math.max(20, Math.floor(Math.random() * maxY));

  button.style.position = "absolute";
  button.style.left = randomX + "px";
  button.style.top = randomY + "px";
  button.style.animation = "shake 0.5s";
  setTimeout(() => (button.style.animation = ""), 500);

  // Atualiza o texto do botão para mostrar as tentativas restantes
  if (noButtonClicks > 1) {
    button.textContent = `Não (${4 - noButtonClicks} tentativas restantes)`;
  }
}

// Event listeners
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      section.classList.add("visible");
    }
  });
});

window.addEventListener("load", () => {
  setTimeout(() => {
    createSparkles();
  }, 2000);
});
