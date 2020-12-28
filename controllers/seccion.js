const { response,request } = require('express');
const curso = require('../models/curso');
const Seccion = require('../models/seccion');

const getSecciones = async (req, res = response) => {
	const secciones = await Seccion.find()
		.populate('curso', 'codigo nombre')
		.populate('usuario', 'nombres apellidos');

	
	res.json({
		ok: true,
		secciones,
	});
};

const getSeccionById = async (req, res = response) => {
	const id = req.params.id;
	try {
		const seccion = await Seccion.findById(id)
		.populate('curso', 'codigo nombre')
		.populate('usuario', 'nombres apellidos');
		
		seccion.usuario.uid=seccion.usuario._id;

		if(!seccion){
			return res.json({
				ok:false,
				msg:'No existe seccion',
			});
		}


		res.json({
			ok: true,
			seccion,
		});
	} catch (error) {
		console.log(error);
		res.json({
			ok: false,
			msg: 'Hable con el admin',
		});
	}
};

const getSeccionesByDocente = async (req=request,res=response) => {
	const id = req.params.id;	
		try {
			const secciones = await Seccion.find({usuario:id})
			.populate('curso', 'codigo nombre')
			.populate('usuario', 'nombres apellidos');

			if(!secciones.length>0){
				return res.json({
					ok:false,
					msg:'No existe docente registrado en alguna sección',
				});
			}

			res.json({
				ok: true,
				docente: secciones[0].usuario.nombres + ' ' + secciones[0].usuario.apellidos,
				secciones,
				total:secciones.length,
			});

		} catch (error) {
			console.log(error);
			res.json({
				ok: false,
				msg: 'Hable con el admin',
			});
		}
	
};


const getSeccionesByCurso = async (req=request,res=response) => {
	const id = req.params.id;	
		try {
			const secciones = await Seccion.find({curso:id})			
			.populate('usuario', 'nombres apellidos');

			if(!secciones.length>0){
				return res.json({
					ok:false,
					msg:'No existe curso registrado en alguna sección',
				});
			}

			res.json({
				ok: true,				
				secciones,
				total:secciones.length,
			});

		} catch (error) {
			console.log(error);
			res.json({
				ok: false,
				msg: 'Hable con el admin',
			});
		}
	
};

const crearSeccion = async (req, res = response) => {

	const { nombre } = req.body;

	const existeNombre = await Seccion.findOne({ nombre });

		if (existeNombre) {
			return res.status(400).json({
				ok: false,
				msg: 'El nombre de esa sección ya está registrado.',
			});
		}


	const seccion = new Seccion(req.body);	

	try {
		const seccionDB = await seccion.save();
		res.json({
			ok: true,
			medico: seccionDB,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: 'Hable con el admin',
		});
	}
};

const actualizarSeccion = async (req, res = response) => {	
	const id = req.params.id;

	try {
		const seccionDB = await Seccion.findById(id);
		if (!seccionDB) {
			return res.status(404).json({
				ok: false,
				msg: 'No se encontró sección',
			});
		}		

		const seccionActualizado = await Seccion.findByIdAndUpdate(id, req.body, { new: true });

		res.json({
			ok: true,
			seccionActualizado,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Habvle con elñ admin',
		});
	}
};

const borrarSeccion = async (req, res = response) => {
	const id = req.params.id;

	try {
		const seccionDB = await Seccion.findById(id);

		if (!seccionDB) {
			return res.status(404).json({
				ok: false,
				msg: 'No se encontró seccion',
			});
		}

		await Seccion.findByIdAndDelete(id);

		res.json({
			ok: true,
			msg: 'Sección eliminado',
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Habvle con elñ admin',
		});
	}
};

module.exports = {
	getSecciones,
	crearSeccion,
	actualizarSeccion,
	borrarSeccion,
	getSeccionById,
	getSeccionesByDocente,
	getSeccionesByCurso
};
