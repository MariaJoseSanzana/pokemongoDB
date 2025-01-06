const express = require('express');
const PokemonServices = require('../services/pokemon.services');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

const pokemonService = new PokemonServices();

// Rutas públicas
router.get('/', async (req, res) => {
  try {
    const pokemons = await pokemonService.getAllPokemons();
    res.status(200).json(pokemons);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los Pokémon' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const numericId = Number(id);
    if (isNaN(numericId)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const pokemon = await pokemonService.getPokemonById(numericId);
    if (!pokemon) {
      return res.status(404).json({ error: 'Pokémon no encontrado' });
    }

    res.status(200).json(pokemon);
  } catch (error) {
    console.error('Error al obtener el Pokémon:', error);
    res.status(500).json({ error: 'Error al obtener el Pokémon' });
  }
});

// Rutas protegidas
router.post('/', authMiddleware, async (req, res) => {
  try {
    const pokemonData = req.body;
    const newPokemon = await pokemonService.createPokemon(pokemonData); 
    res.status(201).json(newPokemon);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el Pokémon' });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const pokemonData = req.body;
    
    const updatedPokemon = await pokemonService.updatePokemon(id, pokemonData);
    
    if (!updatedPokemon) {
      return res.status(404).json({ error: 'Pokémon no encontrado' });
    }
    res.status(200).json(updatedPokemon);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar el Pokémon' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPokemon = await pokemonService.deletePokemon(id);
    if (!deletedPokemon) {
      return res.status(404).json({ error: 'Pokémon no encontrado' });
    }
    res.status(200).json({ message: 'Pokémon eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el Pokémon' });
  }
});

module.exports = router;