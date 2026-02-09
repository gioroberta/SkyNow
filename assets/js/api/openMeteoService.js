// assets/js/api/openMeteoService.js

const WEATHER_CODE_MAP = {
  0: "céu limpo",
  1: "principalmente limpo",
  2: "parcialmente nublado",
  3: "nublado",
  45: "neblina",
  48: "neblina com gelo",
  51: "garoa fraca",
  53: "garoa moderada",
  55: "garoa intensa",
  61: "chuva fraca",
  63: "chuva moderada",
  65: "chuva forte",
  71: "neve fraca",
  73: "neve moderada",
  75: "neve intensa",
  80: "pancadas de chuva fracas",
  81: "pancadas de chuva moderadas",
  82: "pancadas de chuva fortes",
  95: "trovoadas",
  96: "trovoadas com granizo fraco",
  99: "trovoadas com granizo forte",
};

/**
 * Busca latitude/longitude a partir do nome da cidade
 */
async function buscarCoordenadas(cidade) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    cidade
  )}&count=1&language=pt&format=json`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Erro ao acessar o serviço de geolocalização.");
  }

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error("Cidade não encontrada. Tente outro nome.");
  }

  const { latitude, longitude, name, country, admin1 } = data.results[0];

  return {
    latitude,
    longitude,
    cidade: name,
    estado: admin1, // 👈 aqui vem “Pernambuco”
    pais: country,
  };
}

/**
 * Busca o clima atual (current_weather) a partir de coordenadas
 */
async function buscarClimaAtual({ latitude, longitude }) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Erro ao acessar o serviço de clima.");
  }

  const data = await response.json();

  if (!data.current_weather) {
    throw new Error("Não foi possível obter o clima atual.");
  }

  return data.current_weather;
}

/**
 * Função principal usada pelo app: recebe cidade e devolve
 * um objeto já pronto para ser exibido na UI.
 */
export async function buscarClimaPorCidade(cidade) {
  const coords = await buscarCoordenadas(cidade);
  const current = await buscarClimaAtual(coords);

  const descricao =
    WEATHER_CODE_MAP[current.weathercode] || "condição não identificada";

  return {
    cidade: coords.cidade,
    estado: coords.estado, // passa o estado
    pais: coords.pais,
    temperatura: current.temperature,
    vento: current.windspeed,
    direcaoVento: current.winddirection,
    codigoClima: current.weathercode,
    descricao,
    horario: current.time,
  };
}
