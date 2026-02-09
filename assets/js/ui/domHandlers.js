// assets/js/ui/domHandlers.js

const body = document.body;
const app = document.querySelector(".app");

const weatherCard = document.getElementById("weather-card");
const cityNameEl = document.getElementById("city-name");
const descriptionEl = document.getElementById("description");
const temperatureEl = document.getElementById("temperature");
const windEl = document.getElementById("wind");
const windDirectionEl = document.getElementById("wind-direction");
const timeEl = document.getElementById("time");

const errorEl = document.getElementById("error-message");
const loaderEl = document.getElementById("loader");

/**
 * Renderiza os dados de clima no card principal
 */
export function renderClima(dados) {
  const {
    cidade,
    estado,
    pais,
    temperatura,
    descricao,
    vento,
    direcaoVento,
    horario,
    codigoClima,
  } = dados;

  const nomeFormatado = estado
    ? `${cidade} - ${estado}, ${pais}` // 👈 Caruaru - Pernambuco, Brasil
    : `${cidade}, ${pais}`;

  cityNameEl.textContent = nomeFormatado;
  descriptionEl.textContent = descricao;
  temperatureEl.textContent = Math.round(temperatura).toString();

  windEl.textContent = `${vento.toFixed(1)} km/h`;
  windDirectionEl.textContent = `${Math.round(direcaoVento)}°`;

  const hora = formatarHora(horario);
  timeEl.textContent = hora ? `${hora} (local)` : "--";

  aplicarTemaClima(codigoClima); // 

  errorEl.classList.add("hidden");
  weatherCard.classList.remove("hidden");
}

/**
 * Mostra mensagem de erro e esconde o card de clima
 */
export function mostrarErro(mensagem) {
  errorEl.textContent = mensagem;
  errorEl.classList.remove("hidden");
  weatherCard.classList.add("hidden");
}

/**
 * Controla o estado de loading
 */
export function setLoading(ativo) {
  if (ativo) {
    loaderEl.classList.remove("hidden");
    errorEl.classList.add("hidden");
    // Não escondo o card pra não dar flick, mas pode esconder se quiser
  } else {
    loaderEl.classList.add("hidden");
  }
}

/**
 * Limpa erros e esconde o card (usado antes de nova busca)
 */
export function limparEstado() {
  errorEl.textContent = "";
  errorEl.classList.add("hidden");
  weatherCard.classList.add("hidden");
}

function aplicarTemaClima(codigoClima) {
  body.classList.remove(
    "theme-clear",
    "theme-clouds",
    "theme-rain",
    "theme-storm",
    "theme-snow",
    "theme-fog"
  );

  let tema = "theme-clear"; // padrão

  if ([0, 1].includes(codigoClima)) {
    tema = "theme-clear";
  } else if ([2, 3].includes(codigoClima)) {
    tema = "theme-clouds";
  } else if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(codigoClima)) {
    tema = "theme-rain";
  } else if ([95, 96, 99].includes(codigoClima)) {
    tema = "theme-storm";
  } else if ([71, 73, 75].includes(codigoClima)) {
    tema = "theme-snow";
  } else if ([45, 48].includes(codigoClima)) {
    tema = "theme-fog";
  }

  body.classList.add(tema);
}


/* =========
   Helpers
   ========= */

function formatarHora(isoString) {
  try {
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return null;

    const horas = String(date.getHours()).padStart(2, "0");
    const minutos = String(date.getMinutes()).padStart(2, "0");
    return `${horas}:${minutos}`;
  } catch {
    return null;
  }
}

/* =========
   Parallax / Tilt do card
   ========= */

function initCardParallax() {
  if (!app || !weatherCard) return;

  const maxRotation = 8; // graus
  const maxTranslate = 10; // px

  app.addEventListener("mousemove", (event) => {
    // se o card não estiver visível, não anima
    if (weatherCard.classList.contains("hidden")) return;

    const rect = app.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const percentX = x / rect.width - 0.5; // -0.5 a 0.5
    const percentY = y / rect.height - 0.5;

    const rotateY = percentX * maxRotation * 2; // esquerda/direita
    const rotateX = -percentY * maxRotation * 2; // cima/baixo

    const translateX = percentX * maxTranslate;
    const translateY = percentY * maxTranslate;

    weatherCard.style.transform = `
      translate3d(${translateX}px, ${translateY}px, 0)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `;
    weatherCard.style.boxShadow = `0 22px 55px rgba(15, 23, 42, 0.95)`;
  });

  app.addEventListener("mouseleave", () => {
    weatherCard.style.transform =
      "translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg)";
    weatherCard.style.boxShadow = "";
  });
}

// inicializa assim que o módulo for carregado
initCardParallax();
