const mongoose = require('mongoose');

const pokemonPGSchema = new mongoose.Schema({
    number: { type: Number, unique: true, required: true },
    name: { type: String, required: true },
    type: { type: String, enum: ['fire', 'water', 'ghost', 'electric', 'normal'] },
    stats: { hp: Number, attack: Number, defense: Number, speed: Number },
    createdAt: { type: Date, default: Date.now },
});

const PokemonPG = mongoose.model('PokemonPG', pokemonPGSchema);

module.exports = PokemonPG;
