// assets/js/main.js
import { buscarClimaPorCidade } from "./api/openMeteoService.js";
import {
  renderClima,
  mostrarErro,
  setLoading,
  limparEstado
} from "./ui/domHandlers.js";

const form = document.getElementById("city-form");
const input = document.getElementById("city-input");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const cidade = input.value.trim();
  if (!cidade) {
    mostrarErro("Digite o nome de uma cidade para continuar.");
    return;
  }

  limparEstado();
  setLoading(true);

  try {
    const dados = await buscarClimaPorCidade(cidade);
    renderClima(dados);
  } catch (error) {
    console.error(error);
    mostrarErro(error.message || "Não foi possível obter o clima agora.");
  } finally {
    setLoading(false);
  }
});
