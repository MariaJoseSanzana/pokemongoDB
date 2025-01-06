const { connectPokeDB, connectUserDB } = require('./repository/db');
const express = require('express');
const userRoutes = require('./routes/user.routes');
const pokemonRoutes = require('./routes/pokemon.routes');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/pokemon', pokemonRoutes);

app.use((req, res) => {
  res.status(404).send('<h1>Ruta no encontrada</h1>');
});

const startServer = async () => {
  try {
    await connectPokeDB();
    await connectUserDB();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Mi API Pokédex corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1); 
  }
};

startServer();