# pokemongoDB

Este proyecto es una API RESTful para gestionar Pokémon, incluyendo funcionalidades de autenticación de usuarios y la posibilidad de CRUD (crear, leer, actualizar, eliminar) para los Pokémon. La API está construida con Node.js, Express, MongoDB, y JWT para la autenticación.

Características
Gestión de Pokémon: CRUD completo para los Pokémon, con la opción de filtrarlos por ID o tipo.
Autenticación: Los usuarios pueden registrarse, iniciar sesión y acceder a rutas protegidas utilizando JWT (JSON Web Token).
Modelos de datos: Incluye modelos de Pokémon y usuarios utilizando Mongoose.
Rutas protegidas: Algunas rutas requieren autenticación para interactuar con los Pokémon (crear, actualizar, eliminar).
Tecnologías Utilizadas
Node.js: Plataforma de JavaScript para el backend.
Express: Framework para crear servidores web y gestionar rutas.
MongoDB: Base de datos NoSQL utilizada para almacenar los datos de los usuarios y los Pokémon.
JWT (JSON Web Tokens): Para la autenticación de usuarios y protección de rutas.
Mongoose: Biblioteca de modelado de objetos MongoDB para Node.js.

Requisitos
Instalación de lo siguiente:

Node.js (v14 o superior)
MongoDB (local o en un servicio de bases de datos como MongoDB Atlas)
npm (gestor de paquetes de Node.js)

Instalación
Clona el repositorio:
bash
Copiar código
git clone https://github.com/MariaJoseSanzana/pokemongoDB.git
cd pokemongoDB

Instala las dependencias:
bash
Copiar código
npm install
Configura las variables de entorno:

Crea un archivo .env en la raíz del proyecto y agrega las siguientes variables (ajustándolas según tu configuración):
env
Copiar código
JWT_SECRET_KEY=tu_clave_secreta
MONGO_URI_POKEMON=mongodb://localhost:27017/clase-4
MONGO_URI_USER=mongodb://localhost:27017/clase-usuarios

Inicia el servidor:
bash
Copiar código
npm start
El servidor se ejecutará en el puerto 3000 (o el puerto que hayas configurado).

Endpoints

Usuarios
POST /api/users/register: Registra un nuevo usuario.
Body: { "username": "nombre", "password": "contraseña" }
POST /api/users/login: Inicia sesión con un usuario existente y recibe un token JWT.
Body: { "username": "nombre", "password": "contraseña" }

Pokémon
GET /api/pokemon: Obtiene todos los Pokémon.
GET /api/pokemon/:id: Obtiene un Pokémon por su ID.
POST /api/pokemon (Protegido): Crea un nuevo Pokémon (requiere autenticación).
Body: { "number": 1, "name": "Pikachu", "type": "electric", "stats": { "hp": 35, "attack": 55, "defense": 40, "speed": 90 } }
PUT /api/pokemon/:id (Protegido): Actualiza un Pokémon existente por su ID (requiere autenticación).
Body: { "name": "Pikachu", "type": "electric", "stats": { "hp": 35, "attack": 55, "defense": 40, "speed": 90 } }
DELETE /api/pokemon/:id (Protegido): Elimina un Pokémon por su ID (requiere autenticación).

Cómo Funciona
Los usuarios pueden registrarse y obtener un token JWT para interactuar con rutas protegidas.
Los Pokémon están organizados en dos colecciones: pokemon y pokemonpg. La primera tiene los Pokémon tradicionales, y la segunda, los Pokémon de la región de "Pokémon Go".
Los usuarios autenticados pueden crear, actualizar y eliminar Pokémon a través de rutas protegidas que requieren un token JWT válido.
