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

  const audio = document.getElementById("backgroundMusic");

  // Aguardar um pouco antes de tentar tocar
  setTimeout(() => {
    if (audio.readyState >= 2) {
      audio.play()
        .then(() => {
          document.getElementById("musicIcon").textContent = "🎶";
          musicPlaying = true;
          console.log("Auto-play funcionou");
        })
        .catch((error) => {
          console.log("Auto-play bloqueado pelo navegador:", error);
        });
    } else {
      console.log("Áudio ainda não está pronto para tocar.");
    }
  }, 500);

  showNextSection();
}

// Mostrar próxima seção
function showNextSection() {
  const sections = ["section1", "section2", "section3", "final"];
  if (currentSection < sections.length) {
    setTimeout(() => {
      document.getElementById(sections[currentSection]).classList.add("visible");
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
  document.getElementById("loveCounter").textContent = loveCount.toLocaleString();

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

// Controle de música
function toggleMusic() {
  const audio = document.getElementById("backgroundMusic");
  const icon = document.getElementById("musicIcon");

  if (musicPlaying) {
    audio.pause();
    icon.textContent = "🎵";
    musicPlaying = false;
    console.log("Música pausada");
  } else {
    if (audio.readyState >= 2) {
      audio.play()
        .then(() => {
          icon.textContent = "🎶";
          musicPlaying = true;
          console.log("Música tocando");
        })
        .catch((error) => {
          console.error("Erro ao reproduzir áudio:", error);
          alert("Erro ao tocar música. Verifique se o arquivo existe em: " + audio.src);
        });
    } else {
      console.log("Áudio ainda carregando...");
      alert("Música ainda carregando, tente novamente em alguns segundos!");

      audio.load();
      audio.addEventListener("canplay", function () {
        console.log("Áudio carregado e pronto");
      }, { once: true });
    }
  }
}

// Efeitos ao rolar a página
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      section.classList.add("visible");
    }
  });
});

// Efeitos ao carregar a página
window.addEventListener("load", () => {
  setTimeout(() => {
    createSparkles();
  }, 2000);
});
