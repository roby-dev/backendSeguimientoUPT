const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res) => {
	const desde = Number(req.query.desde) || 0;

	const [usuarios, total] = await Promise.all([
		Usuario.find({}, 'nombres apellidos email role imagen',{sort:{apellidos:1}}).skip(desde).limit(10),
		Usuario.countDocuments(),
	]);

	res.status(200).json({
		ok: true,
		usuarios: usuarios,
		total,
	});
};

const getAllUsers = async(req=request,res=response) =>{
	const usuarios = await Usuario.find({}, 'nombres apellidos email role imagen',{sort:{apellidos:1}});
	res.status(200).json({
		ok:true,
		usuarios
	});
};

const getUsuarioById = async (req,res=response) =>{
	const id = req.params.id;

	try {
		const usuario = await await Usuario.findById(id);				
		
		res.json({
			ok: true,
			usuario,
		});
	} catch (error) {
		console.log(error);
		res.json({
			ok: false,
			msg: 'Hable con el admin',
		});
	}
};

const crearUsuario = async (req, res = response) => {
	const { email, password } = req.body;

	try {
		const existeEmail = await Usuario.findOne({ email });

		if (existeEmail) {
			return res.status(400).json({
				ok: false,
				msg: 'El correo está registrado',
			});
		}

		const usuario = new Usuario(req.body);

		//Encriptar contraseña
		const salt = bcrypt.genSaltSync();
		usuario.password = bcrypt.hashSync(password, salt);

		//guardar Usuario
		await usuario.save();

		const token = await generarJWT(usuario.id);

		res.json({
			ok: true,
			token,
			usuario,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Error inesperado',
		});
	}
};

const actualizarUsuario = async (req, res = response) => {
	//TODO: VAlidar token y comprobar si  es el usuario correcto

	const uid = req.params.id;

	try {
		const usuarioDB = await Usuario.findById(uid);
		if (!usuarioDB) {
			return res.status(404).json({
				ok: false,
				msg: 'No existe un usuario por ese ID',
			});
		}

		//Actualizaciones
		const { password, ...campos } = req.body;
		
		if (usuarioDB.email != req.body.email) {
			const existeEmail = await Usuario.findOne({ email: req.body.email });
			if (existeEmail) {
				return res.status(400).json({
					ok: false,
					msg: 'Ya existe un usuario con ese email, Ups',
				});
			}
		}		

		const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

		res.status(200).json({
			ok: true,
			msg: 'Usuario actualizado correctamente',
			usuario: usuarioActualizado,
        });
        
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Error inesperado',
		});
	}
};

const comprobarPassword = async (req=request,res=response)=>{
	const {password,uid}=req.body;
	const _id=uid;
	const id = req.uid;


	const usuarioDB = await Usuario.findById({_id});
		if (!usuarioDB) {
			return res.status(404).json({
				ok: false,
				msg: 'No existe usuario',
			});
		}

	if(id!=usuarioDB._id){
			return res.status(404).json({
				ok:false,
				msg:"No tienes permisos"
			});
		}
	
		//verificar contraseña
	const validPassword = bcrypt.compareSync(password, usuarioDB.password);
	if (!validPassword) {
		return res.status(400).json({
			ok: false,
			msg: 'Contraseña no válida',
		});
	}

	res.status(200).json({
		ok: true,
		msg: 'Contraseña válida',
	});
}


const cambiarPassword = async (req=request,res=response)=>{
	const {pass1,uid}=req.body;
	var password;
	const _id=uid;
	const id = req.uid;


	const usuarioDB = await Usuario.findById({_id});
		if (!usuarioDB) {
			return res.status(404).json({
				ok: false,
				msg: 'No existe usuario',
			});
		}

	if(id!=usuarioDB._id){
			return res.status(404).json({
				ok:false,
				msg:"No tienes permisos"
			});
		}
	
		const salt = bcrypt.genSaltSync();
		usuarioDB.password = bcrypt.hashSync(pass1, salt);		

		const usuarioActualizado = await Usuario.findByIdAndUpdate(id, usuarioDB, { new: true });4

		res.status(200).json({
			ok: true,
			msg: 'Usuario actualizado correctamente',
			usuario: usuarioActualizado,
        });
}


const borrarUsuario = async (req = request, res = response) => {
	const uid = req.params.id;
	const id = req.uid;

	try {
		const usuarioDB = await Usuario.findById(uid);
		if (!usuarioDB) {
			return res.status(404).json({
				ok: false,
				msg: 'No existe un usuario por ese ID',
			});
		}

		if(id==uid){
			return res.status(404).json({
				ok:false,
				msg:"No puedes borrarte a ti mismo"
			});
		}

		await Usuario.findByIdAndDelete(uid);

		res.status(200).json({
			ok: true,
			msg: 'Usuario Eliminado',
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: 'Error interno RAA',
		});
	}
};

module.exports = {
	getUsuarios,
	crearUsuario,
	actualizarUsuario,
	borrarUsuario,
	getUsuarioById,
	getAllUsers,
	comprobarPassword,
	cambiarPassword
};


