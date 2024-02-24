const pokemonList = document.getElementById("pokemoList");
const loadMoreButton = document.getElementById("loadMoreButtton");
const maxRecords = 151;
const limit = 10;
let offset = 0;


function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons
      .map(
        (pokemon) => 
        `
          <a class="Container" href="detailsPokemon.html?id=${pokemon.number}">
            <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span> 
            <div class="detail">
              <ol class="types">
                ${pokemon.types
                  .map((type) => `<li class="type ${type}">${type}</li>`)
                  .join("")}
              </ol>
              <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
            </li>
          </a>
          `
      )
      .join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset,limit);

loadMoreButton.addEventListener('click',()=>{
  offset +=limit

  const qtdRecordWithNextPage = offset+limit;
  if(qtdRecordWithNextPage>= maxRecords){
    const newLimit = maxRecords - offset
    loadPokemonItens(offset,newLimit)
    loadMoreButton.parentElement.removeChild(loadMoreButton)
  }else{
    loadPokemonItens(offset,limit)
  }

  
})
