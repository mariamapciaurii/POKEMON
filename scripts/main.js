//GET ALL POKEMONS
async function getPokemon(id) {
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