const mongoose = require('mongoose');

const connectPokeDB = async () => {
  try {
    const connection = await mongoose.connect('mongodb://localhost:27017/clase-4');
    console.log("Conexión exitosa a la base de datos 'clase-4'");
    return connection;
  } catch (error) {
    console.error("Error al conectar a MongoDB (clase-4):", error);
    process.exit(1); 
  }
};

const connectUserDB = async () => {
  try {
    const connection = mongoose.createConnection('mongodb://localhost:27017/clase-usuarios');
    console.log("Conexión exitosa a la base de datos 'clase-usuarios'");
    return connection;
  } catch (error) {
    console.error("Error al conectar a MongoDB (clase-usuarios):", error);
    process.exit(1);
  }
};

module.exports = { connectPokeDB, connectUserDB };