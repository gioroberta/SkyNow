# ☁️ SkyNow

Aplicativo web de clima em tempo real com interface moderna, fundo animado e layout responsivo.  
Desenvolvido com HTML, CSS, JavaScript e a API Open-Meteo.

---

## 🚀 Sobre o projeto

O SkyNow é um aplicativo web simples e intuitivo para consulta do clima atual de qualquer cidade.
Ele consome dados da Open-Meteo API e apresenta as informações de forma clara, visualmente agradável e dinâmica.

O projeto foi estruturado com foco em:

- organização de código
- boas práticas de front-end
- experiência do usuário
- responsividade para dispositivos móveis

---

## 🌤️ Funcionalidades

- Busca de clima por cidade
- Exibição de cidade, estado e país
- Temperatura atual
- Velocidade e direção do vento
- Horário local da medição
- Fundo dinâmico que muda conforme a condição climática
- Animações suaves e transições
- Interface com Glassmorphism
- Layout totalmente responsivo (mobile e desktop)

---

## 🖼️ Prévia

Imagem de prévia do projeto disponível em:
assets/img/preview.png

---

## 🧠 Tecnologias utilizadas

- HTML5
- CSS3
  - Flexbox e Grid
  - Media Queries
  - Animações e gradientes
  - Glassmorphism
- JavaScript (ES Modules – import/export)
  - fetch
  - async/await
  - Manipulação do DOM
- Open-Meteo API
  - Geocoding
  - Current Weather

---

## 📂 Estrutura do projeto

skynow/
│
├── index.html
├── README.md
│
├── assets/
│ ├── css/
│ │ └── style.css
│ ├── img/
│ │ └── preview.png
│ └── js/
│ ├── main.js
│ ├── api/
│ │ └── openMeteoService.js
│ └── ui/
│ └── domHandlers.js

---

## 🔧 Como executar o projeto

1. Clone o repositório:
   git clone https://github.com/SEU_USUARIO/skynow.git

2. Abra o projeto no VS Code

3. Execute com Live Server:
   - Clique com o botão direito em index.html
   - Selecione "Open with Live Server"

ATENÇÃO:
O uso do Live Server é necessário para o funcionamento correto dos módulos JavaScript
(ES Modules – import/export).

---

## ☁️ API utilizada

Este projeto utiliza a Open-Meteo API, que fornece dados meteorológicos gratuitos
e sem necessidade de autenticação.

Documentação oficial:
https://open-meteo.com/

---

## 📌 Próximas melhorias

- Previsão para os próximos dias
- Detecção automática de localização
- Ícones animados por condição climática
- Versão PWA instalável
- Modo noturno automático

---

## ✨ Autora

Desenvolvido por Giovanna Roberta  
Estudante de Análise e Desenvolvimento de Sistemas,
com foco em desenvolvimento web e boas práticas de front-end.

---

## 📄 Licença

Este projeto está sob a licença MIT.
