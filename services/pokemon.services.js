const Pokemon = require('../models/pokemon.model');

class PokemonServices {
  async getAllPokemons() {
    return await Pokemon.find();
  }

  async getPokemonById(id) {
    return await Pokemon.findOne({ number: id });
  }

  async createPokemon(pokemonData) {
    const pokemon = new Pokemon(pokemonData);
    return await pokemon.save();
  }

  async updatePokemon(id, pokemonData) {
    return await Pokemon.findOneAndUpdate(
      { number: id }, 
      pokemonData, 
      { new: true }
    );
  }

  async deletePokemon(id) {
    return await Pokemon.findOneAndDelete({ number: id });
  }
}

module.exports = PokemonServices;