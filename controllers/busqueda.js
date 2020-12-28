const { response } = require('express');
const Usuario = require('../models/usuario');
const Curso = require('../models/curso');
const Seccion = require('../models/seccion');

const getTodo = async (req, res = response) => {
	const busqueda = req.params.busqueda;
	const regex = new RegExp(busqueda, 'i');

	const [usuarios, medicos, hospitales] = await Promise.all([
		Usuario.find({ nombre: regex }),
		Medico.find({ nombre: regex }),
		Hospital.find({ nombre: regex }),
	]);

	res.json({
		ok: true,
		usuarios,
		medicos,
		hospitales,
	});
};

const getDocumentosColeccion = async (req, res = response) => {

	const tabla = req.params.tabla;
	const busqueda = req.params.busqueda;
	const regex = new RegExp(busqueda, 'i');
	let data = [];

	switch (tabla) {
		case 'cursos':
			data = await Curso.find({$or:[{ nombre: regex},{codigo:regex}]}, 'codigo facultad escuela nombre ciclo planEstudios estado',{sort:{codigo:1}}).populate('planEstudios','codigo');              
			break;
		case 'secciones':
			data = await Seccion.find({$or:[{nombre:regex}]})
            .populate('curso', 'codigo nombre')
            .populate('usuario', 'nombres apellidos');            
           break;
		case 'usuarios':
			data = await Usuario.find({$or:[{ nombres: regex},{apellidos:regex}]},'',{sort:{apellidos:1}});  
			return res.json({ok:true,resultados:data});
			break;
		default:
			return res.status(400).json({
				ok: false,
				msg: 'La tabla tiene que ser usuarios/secciones/cursos',
			});
			break;
	}

	res.json({
		ok: true,
		resultados: data,
	});
};

module.exports = {
	getTodo,
	getDocumentosColeccion,
};
