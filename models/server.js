const express = require("express");
const cors = require("cors");

const { dbConnection } = require("../database/config");

//const app = express();

class Server {
	//Crear el servidor
	constructor() {
		this.app = express(); //Cuando se ejecute el servidor se creara la aplicacion de express como una propiedad.
		this.port = process.env.PORT; //Para definir el puerto y especificarlo de manera mas facil
		this.usuariosPath = "/api/usuarios";

		//CONECTAR A LA BASE DE DATOS
		this.conectarDB();

		///MIDDLEWARES
		this.middlewares();

		//Rutas de mi aplicacion
		this.routes(); //Cuando se ejecute despues manda a llamar el metodo rutas
	}

	async conectarDB() {
		await dbConnection();
	}

	//Funcion que se ejecuta antes de llamar ya sea un controlador o seguir con la ejecucion de las peticiones
	middlewares() {
		//Cors
		this.app.use(cors());

		// Lectura y Parseo del body
		this.app.use(express.json());

		//Directorio publico
		this.app.use(express.static("public"));
	}

	routes() {
		this.app.use(this.usuariosPath, require("../routes/usuarios")); //Path que ahora se va a utilizar
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log("Corriendo en el puerto: ", this.port);
		});
	}
}

module.exports = Server;
