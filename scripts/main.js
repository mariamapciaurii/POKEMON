//TASK N1
//GET ALL POKEMONS
async function getPokemons() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon");
  const pokemons = await response.json();
  return pokemons;
}

//GET SPECIFIC POKEMON
async function getPokemon(id) {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + id);
  const pokemon = await response.json();
  return pokemon;
}

//POK MODEL
let pokObject = {
  id: 0,
  base_experience: 0,
  height: 0,
  name: "",
  weight: 0,
  stats: [],
};

//MAKE DATA FROM RESPONSE
function makeData(pokemon) {
  pokObject.id = pokemon.id;
  pokObject.base_experience = pokemon.base_experience;
  pokObject.height = pokemon.height;
  pokObject.name = pokemon.name;
  pokObject.weight = pokemon.weight;

  pokemon.stats.forEach((stat) => {
    //STAT MODEL
    let statObj = {
      name: "",
      base_stat: 0,
    };

    statObj.name = stat.stat.name;
    statObj.base_stat = stat.base_stat;

    pokObject.stats.push(statObj);
  });
}


//TASK N2
//GET STRONGEST STAT
function strongestStat(pokemon) {
  let maxBaseStat = 0;

  //   console.log("pokemon", pokemon);
  if (pokemon.stats) {
    pokemon.stats.forEach((stat) => {
      if (stat.base_stat > maxBaseStat) {
        maxBaseStat = stat.base_stat;
      }
    });
  }

  return maxBaseStat;
}

//MAIN START APP
function startPokemonApp(pokemonId) {
  //GET POKEMON
  getPokemon(pokemonId).then((pokemon) => {
    pokemon; // fetched pokemon

    //CALL MAKE DATA TO MAKE DATA , LOL
    makeData(pokemon);

    //GET STRONGEST STAT OF CURRENT POKEMON
    const strongest = strongestStat(pokemon);

    console.log("Pokemon", pokemon);
    console.log("Strongest stat of pokemon", strongest);
  });
}

startPokemonApp(6);




//TASK N4
function solve(str) {
  while (str.includes("(")) {
    str = str.replace(/\d?\((\w*)\)/, (b, a) => a.repeat(+b[0] || 1));
  }
  console.log("Solved String", str);
  return str;
}

solve("3(ab)");
solve("2(a3(b))");
