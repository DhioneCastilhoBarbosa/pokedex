
const $card = document.getElementById("CardPokemonDetails")


function convertPokeApiDetailToPokemon(pokeDetail){
  const pokemon = new Pokemon()
  pokemon.number = pokeDetail.id
  pokemon.name = pokeDetail.name

  const types = pokeDetail.types.map((typeSlot)=> typeSlot.type.name)
  const [type] = types
  pokemon.types = types
  pokemon.type = type
  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

  const baseStats = pokeDetail.stats.map((statsSlot)=>statsSlot.base_stat)
  const[baseStat] = baseStats
  pokemon.baseStats = baseStats
  pokemon.baseStat = baseStat


  const stats = pokeDetail.stats.map((statsSlot)=>statsSlot.stat.name)
  const[stat] = stats
  pokemon.stats = stats
  pokemon.stat = stat


  return pokemon
}

function redirectPage()
{
  window.location= "index.html"
}

async function getPokemon(DetailsPokemonID)
{
  const url = `http://pokeapi.co/api/v2/pokemon/${DetailsPokemonID}`
  const data = await fetch(url)
              .then(res => res.json()).then(convertPokeApiDetailToPokemon)
  console.log(data)

  insertCardDetailHtml(generateCard(data))
  
  
}

function generateCard(pokemon){
  const skills ={
    "attack": "AtK",
    "hp": "Hp",
    "defense": "Def",
    "special-attack": "Sp.Atk",
    "special-defense":"Sp.Def",
    "speed":"Speed"
  }
  return `
  <section class="content">
    <h1>Pokedex</h1>
    <div class="containerPokemDetails ${pokemon.type}" >
   
  <button type="button" onclick="redirectPage()">
    <i class="ph ph-arrow-left">
  </i></button>

      <div class="pokemoInformation">
        <span class="name">${pokemon.name}</span>
        <span class="number">#${pokemon.number}</span>
      </div>

      <div class="pokemonInDetail">
        <img src="${pokemon.photo}" alt="">
        <ol class="types">
        ${pokemon.types
          .map((type) => `<li class="type ${type}">${type}</li>`)
          .join("")}
        </ol>

        <div class="containerDetail">
          <div>
            <ol class="stats">
              ${pokemon.stats.map(item=> 
                `<li class="nameStats"> ${item}</li>`).join("")}
            </0l>
          </div>
          <div >

            <ol class="stats">
            ${pokemon.baseStats.map(item=> 
              `<li>
              <progress class="progress" value= ${item} max="100"></progress>
              ${item}
              </li>`).join("")}
                
            </ol>
          </div>
        </div>
      </div>

      </div>

      </section>
  `
  
}

function insertCardDetailHtml(cardDetailsContent){
  $card.innerHTML = cardDetailsContent

}

window.addEventListener('load',()=>{
  const [_,pokemonId] = window.location.search.split("=");
  getPokemon(pokemonId)
})