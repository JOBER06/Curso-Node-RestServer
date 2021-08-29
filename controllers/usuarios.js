//CREAR ARCHIVOS Y EXPORTARLAS
const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario"); //Es un estandar poner la U mayuscula para cuando se crean instancias.

const usuariosGet = async (req = request, res = response) => {
	const { limite = 5, desde = 0 } = req.query;
	const query = { estado: true };

	const [total, usuarios] = await Promise.all([
		// Respuesta coleccion de promesas
		Usuario.countDocuments(query),
		Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
	]);

	res.json({
		total,
		usuarios,
		// total,
		// usuarios,
	});
};

const usuarioPost = async (req, res) => {
	const { nombre, correo, password, rol } = req.body;
	const usuario = new Usuario({ nombre, correo, password, rol });

	// Encriptar la contraseña
	const salt = bcryptjs.genSaltSync(); //Encripta por vueltas
	usuario.password = bcryptjs.hashSync(password, salt); //Encriptarlo en una sola via

	// Guardar en BD
	await usuario.save();

	res.json({
		usuario,
	});
};

const usuariosPut = async (req, res = response) => {
	const { id } = req.params;
	const { _id, password, google, correo, ...resto } = req.body; //Desestructuro todo lo que no necesito

	// TODO validar contra base de datos
	if (password) {
		// Encriptar la contraseña
		const salt = bcryptjs.genSaltSync(); //Encripta por vueltas
		resto.password = bcryptjs.hashSync(password, salt); //Encriptarlo en una sola via
	}

	// Actualizar registro
	const usuario = await Usuario.findByIdAndUpdate(id, resto);

	res.json(usuario);
};

const usuariosPatch = (req, res = response) => {
	res.json({
		msg: "patch API - Controlador",
	});
};

const usuariosDelete = async (req, res) => {
	const { id } = req.params;

	//Borrar fisicamente - No recomendado
	//const usuario = await Usuario.findByIdAndDelete(id);

	//Cambiar estado del usuario
	const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

	res.json(usuario);
};

module.exports = {
	usuariosGet,
	usuarioPost,
	usuariosPut,
	usuariosPatch,
	usuariosDelete,
};
