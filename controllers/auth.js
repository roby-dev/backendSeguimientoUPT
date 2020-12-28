const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { getMenuFrontEnd,pushSeccionesIntoMenu,getSecciones } = require('../helpers/menu-frontend');


const login = async (req = request, res = response) => {
	const { email, password } = req.body;

	try {
		const usuarioDB = await Usuario.findOne({ email });

		if (!usuarioDB) {
			return res.status(404).json({
				ok: false,
				msg: 'No existe Email',
			});
		}

		//verificar contraseña
		const validPassword = bcrypt.compareSync(password, usuarioDB.password);
		if (!validPassword) {
			return res.status(400).json({
				ok: false,
				msg: 'Contraseña no valida',
			});
		}

		//Generar Token

		const token = await generarJWT(usuarioDB.id);

		res.status(200).json({
			ok: true,
			token,
			menu: getMenuFrontEnd(usuarioDB.role),
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: 'Hable con administrador',
		});
	}
};


const renewToken = async (req, res = response) => {
	const uid = req.uid;
	
	//generar token
	const token = await generarJWT(uid);

	//Obtener usuario por UID
	const usuarioDB = await Usuario.findById(uid);
	if (!usuarioDB) {
		return res.status(404).json({
			ok: false,
			msg: 'Usuario no encontrado',
		});
	}

	let menu = getMenuFrontEnd(usuarioDB.role);

	res.json({
		ok: true,
		token,
		usuarioDB,
		menu: menu		
	});
};

module.exports = {
	login,	
	renewToken,
};
