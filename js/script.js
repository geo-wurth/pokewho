const pokemonName = document.querySelector('.pokemonName');
const pokemonNumber = document.querySelector('.pokemonNumber');
const pokemonImage = document.querySelector('.pokemonImage');

const form = document.querySelector('.form');
const input = document.querySelector('.inputSearch');
const buttonVerify = document.querySelector('.btn-verify');
const buttonNext = document.querySelector('.btn-next');
const buttonTryAgain = document.querySelector('.btn-tryAgain');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = 'block';
    let pokemonNameModifier = data.name;

    pokemonNameModifier = pokemonNameCorrector(pokemonNameModifier);

    pokemonName.innerHTML = pokemonNameModifier;

    pokemonNumber.innerHTML = data.id;
    
    let imageUrl = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    
    if (!imageUrl) {
      imageUrl = `https://projectpokemon.org/images/normal-sprite/${pokemonNameModifier}.gif`;
    }

    pokemonImage.src = imageUrl;
    input.value = '';
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);

function pokemonNameCorrector(name){
  let names = {
    'toxtricity-amped': 'toxtricity',
    'enamorus-incarnate': 'enamorus',
    'basculegion-male': 'basculegion',
    'urshifu-single-strike': 'Urshifu',
    'morpeko-full-belly': 'morpeko',
    'indeedee-male': 'indeedee',
    'eiscue-ice': 'eiscue',
    'tapu-fini': 'tapufini',
    'tapu-koko': 'tapukoko',
    'tapu-lele': 'tapulele',
    'tapu-bulu': 'tapubulu',
    'sirfetchd': 'sirfetchd',
    'mr-rime': 'mr.rime'
  }

  let newName = names[name];

  if (newName == undefined){
    return name
  }else{
    return newName
  }
}