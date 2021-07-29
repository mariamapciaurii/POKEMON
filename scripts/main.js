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

//POKEMON FIGHT
async function getFightingPokemons(pokemonId1, pokemonId2) {
  const [firstPokemonResponse, secondPokemonResponse] = await Promise.all([
    fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonId1),
    fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonId2),
  ]);

  const pokemon1 = await firstPokemonResponse.json();
  const pokemon2 = await secondPokemonResponse.json();

  return [pokemon1, pokemon2];
}

//MAKE NORMAL DATA FROM RESPONSE
function makeData(pokemon) {
  //POK MODEL
  let pokObject = {
    id: 0,
    base_experience: 0,
    height: 0,
    name: "",
    weight: 0,
    stats: [],
  };

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

  return pokObject;
}

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

//MAIN APP START
function startPokemonApp(pokemonId) {
  //GET POKEMON
  getPokemon(pokemonId).then((pokemon) => {
    pokemon; // fetched pokemon

    //CALL MAKE DATA TO MAKE DATA 
    let normPokemon = makeData(pokemon);

    //GET STRONGEST STAT OF CURRENT POKEMON
    let strongest = strongestStat(normPokemon);

    console.log("Pokemon", normPokemon);
    console.log("Strongest stat of pokemon", strongest);
  });
}

//POKEMON FIGHT START
function startPokemonFight(pokemonId1, pokemonId2) {
  getFightingPokemons(pokemonId1, pokemonId2)
    .then(([pokemon1, pokemon2]) => {
      pokemon1; // fetched pokemon1
      pokemon2; // fetched pokemon2

      let normPokemon1 = this.makeData(pokemon1);
      let normPokemon2 = this.makeData(pokemon2);

      let firstPokemonAttack = 0;
      let secondPokemonAttack = 0;

      let firstPokemonWeight = pokemon1.weight;
      let secondPokemonWeight = pokemon2.weight;

      normPokemon1.stats.forEach((stat) => {
        if (stat.name === "attack") {
          firstPokemonAttack = stat.base_stat;
        }
      });

      normPokemon2.stats.forEach((stat) => {
        if (stat.name === "attack") {
          secondPokemonAttack = stat.base_stat;
        }
      });

      let index = 0;
      while (firstPokemonWeight > 0 || secondPokemonWeight > 0) {
        if (index % 2 === 0) {
          if (firstPokemonWeight <= 0) {
            console.log(
              "SECOND WINS , NAME - ",
              normPokemon2.name,
              secondPokemonWeight
            );
            break;
          }

          firstPokemonWeight = firstPokemonWeight - secondPokemonAttack;
        }

        if (index % 2 !== 0) {
          if (secondPokemonWeight <= 0) {
            console.log(
              "FIRST WINS , NAME - ",
              normPokemon1.name,
              firstPokemonWeight
            );
            break;
          }

          secondPokemonWeight = secondPokemonWeight - firstPokemonAttack;
        }

        index++;
      }
    })
    .catch((error) => {
      // /pokemon1 or /pokemon2 request failed
    });
}

startPokemonApp(6);
startPokemonFight(2, 12);




function solve(str) {
  while (str.includes("(")) {
    str = str.replace(/\d?\((\w*)\)/, (b, a) => a.repeat(+b[0] || 1));
  }
  console.log("Solved String", str);
  return str;
}

solve("3(ab)");
solve("2(a3(b))");
