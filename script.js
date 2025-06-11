let loveCount = 0;
let currentSection = 0;
let musicPlaying = false;

// Criar corações flutuantes
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

// Criar corações continuamente
setInterval(createFloatingHeart, 800);

// Função para começar a jornada
function startJourney() {
  document.getElementById("welcome").style.display = "none";
  showNextSection();
}

// Mostrar próxima seção
function showNextSection() {
  const sections = ["section1", "section2", "section3", "final"];
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

// Aumentar contador de amor
function increaseLove() {
  loveCount += Math.floor(Math.random() * 100) + 100;
  document.getElementById("loveCounter").textContent =
    loveCount.toLocaleString();

  // Criar efeito de partículas
  createSparkles();
}

// Criar brilhos
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

// Mostrar mensagem
function showMessage(message) {
  alert(message);
}

// Controle de música (simulado)
function toggleMusic() {
  const icon = document.getElementById("musicIcon");
  if (musicPlaying) {
    icon.textContent = "🎵";
    musicPlaying = false;
  } else {
    icon.textContent = "🎶";
    musicPlaying = true;
    // Aqui você poderia adicionar áudio real
  }
}

// Animações de scroll (simuladas com timeout)
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      section.classList.add("visible");
    }
  });
});

// Efeitos especiais quando a página carrega
window.addEventListener("load", () => {
  setTimeout(() => {
    createSparkles();
  }, 2000);
});
