


//função p/ pegar deixar o texto em caixa pequena
function getElement(element) {
    return document.querySelector(element);
}

// elecionando Elements
let btn = document.querySelector('.search-button');
let input = document.querySelector('.search-input');
let cards = document.querySelector('.pokemon');


const baseUrl = `https://pokeapi.co/api/v2/pokemon/`

function consumirApi(url, name) {
    fetch(url + name)
        .then(response => response.json())
        .then(data => {
            let pokemon = data
            createCard(data)
                .catch(err => console.log(err));
        })
}

function createCard (pokemon) {
    cards.innerHTML = `
      <div class="pokemon-picture">
        <img src="${pokemon.sprites.back_default}" alt="Sprite of ${pokemon.name}">
      </div>
      <div class="pokemon-info">
          <h1 class="name">Name: ${pokemon.name}</h1>
          <h2 class="number">Nº ${pokemon.id}</h2>
          <h3 class="type">Type: ${pokemon.types.map(item => item.type.name).toString()}</h3>
          <h3 class="skill">Skills: ${pokemon.moves.map(item => ' ' + item.move.name).toString()}</h3>
          <h3 class="weight">Weight: ${pokemon.weight  / 10}kg</h3>
          <h3 class="height">Height: ${pokemon.height  / 10}m</h3>
      </div>`;
    return cards;
  }
  
  // Função que faz a chamada das principais funções e inicia o app
  function startApp(pokeName) {
    requestPokeInfo(baseUrl, pokeName);
  
    setTimeout(function () {
        container.innerHTML = createCard();
    }, 2000);
  }

btn.addEventListener('click', event => {
    event.preventDefault();
    pokeName = input.value.toLowerCase();
    /* A api só aceita nomes minusculos, então vamos usar a função toLowerCase para garantir que nenhuma letra maiuscula seja passada. */
    consumirApi(baseUrl, pokeName)
});
