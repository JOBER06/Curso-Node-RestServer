//Importaciones de NODE primero
require('dotenv').config();

//Importaciones de terceros

//Importaciones mias
const Server = require('./models/server');

const server = new Server();    //Instancia

server.listen();