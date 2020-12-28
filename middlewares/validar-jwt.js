const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = (req, res, next) => {
	//Leer Token

	const token = req.header('x-token');
	if (!token) {
		return res.status(401).json({
			ok: false,
			msg: 'No hay token en la peticion',
		});
	}
	try {
		const { uid } = jwt.verify(token, process.env.JWT_SECRET);

		req.uid = uid;
		next();
	} catch (error) {
		return res.status(401).json({
			ok: false,
			msg: 'Token no valido',
		});
	}
};

const validarDIRECTOR_ROLE = async (req, res, next) => {
	const uid = req.uid;

	try {
		const usuarioDB = await Usuario.findById(uid);
		if (!usuarioDB) {
			return res.status(404).json({
				ok: false,
				msg: 'Usuario no existe',
			});
		}

		if (usuarioDB.role !== 'DIRECTOR_ROLE') {
			return res.status(403).json({
				ok: false,
				msg: 'No tiene permisos',
			});
		}

		next();
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Hablec on administrador',
		});
	}
};

const validarDIRECTOR_ROLE_o_MismoUsuario = async (req, res, next) => {
	const uid = req.uid;

	const id = req.params.id;

	try {
		const usuarioDB = await Usuario.findById(uid);
		if (!usuarioDB) {
			return res.status(404).json({
				ok: false,
				msg: 'Usuario no existe',
			});
		}

		if (usuarioDB.role === 'DIRECTOR_ROLE' || uid === id) {
			next();
		} else {
			return res.status(403).json({
				ok: false,
				msg: 'No tiene permisos',
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Hablec on administrador',
		});
	}
};

module.exports = {
	validarJWT,
	validarDIRECTOR_ROLE,
	validarDIRECTOR_ROLE_o_MismoUsuario,
};
