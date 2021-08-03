//CREAR ARCHIVOS Y EXPORTARLAS
const { Response, response } = require('express');


const usuariosGet = (req = request, res = response) => {

    const { q, nombre = 'No name', edad } = req.query;

    res.json({
        msg: 'get API - Controlador',
        q,
        nombre,
        edad
    });
}

const usuarioPost = (req, res) => {

    const {nombre, edad} = req.body;

    res.json({
        msg: 'post API - Controlador',
        nombre, 
        edad
    });
}

const usuariosPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'put API - Controlador',
        id
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - Controlador'
    });
}

const usuariosDelete = (req, res) => {
    res.json({
        msg: 'delete API - Controlador'
    });
}

module.exports = {
    usuariosGet,
    usuarioPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}