const { response, request } = require('express');
const curso = require('../models/curso');

const Curso = require('../models/curso');

const getCursos = async (req=request, res=response) => {	

	const [cursos, total] = await Promise.all([
		Curso.find({}, 'codigo facultad escuela nombre ciclo planEstudios estado',{sort:{codigo:1}}).populate('planEstudios','codigo'),
		Curso.countDocuments(),
	]);

	res.json({
		ok: true,
		cursos: cursos		
	});


	// const crs = await Curso.find();
	// let curse;
	// crs.forEach(async element => {
	// 	console.log(element._id);				
	// 	const actualizar = {
	// 		codigo : element.codigo,
	// 		nombre : element.nombre,
	// 		facultad : element.facultad,
	// 		escuela: element.escuela,
	// 		ciclo: element.ciclo,
	// 		planEstudios: element.planEstudios,
	// 		estado:'OBLIGATORIO',
	// 	};
	// 	const cursoActualizado = await Curso.findByIdAndUpdate(element._id,actualizar, { new: true });
	// });
};

const getCursosByCiclo = async (req, res) => {	
	const ciclo = req.params.ciclo;

	const cursos = await Curso.find({ciclo:ciclo},'codigo facultad escuela nombre ciclo planEstudios estado',{sort:{codigo:1}}).populate('planEstudios','codigo');			

	res.status(200).json({
		ok: true,
		cursos: cursos,		
	});
};


const getCursoById = async (req, res = response) => {
	const id = req.params.id;
	try {
		const curso = await await Curso.findById(id).populate('planEstudios','codigo');			
		res.json({
			ok: true,
			curso,
		});
	} catch (error) {
		console.log(error);
		res.json({
			ok: false,
			msg: 'Hable con el admin',
		});
	}
};

const crearCurso = async (req=request, res = response) => {	

	

	const { nombre,codigo } = req.body;

	try {
        const existeCurso = await Curso.findOne({ nombre });
		const existeCodigo = await Curso.findOne({ codigo });
		
		for(var key in req.body){
			if(req.body.hasOwnProperty(key)){
				req.body[key]=req.body[key].toString().toUpperCase();
			}
		}

		if (existeCurso) {
			return res.status(400).json({
				ok: false,
				msg: 'El curso ya está registrado',
			});
        }
        
        if (existeCodigo) {
			return res.status(400).json({
				ok: false,
				msg: 'El codigo del curso ya está registrado',
			});
		}

		const curso = new Curso(req.body);

		//guardar Usuario
		await curso.save();

		res.json({
			ok: true,			
			curso,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Error inesperado',
		});
	}
};

const actualizarCurso = async (req, res = response) => {
	//TODO: VAlidar token y comprobar si  es el usuario correcto
	for(var key in req.body){
		if(req.body.hasOwnProperty(key)){
			req.body[key]=req.body[key].toString().toUpperCase();
		}
	}
	const uid = req.params.id;

	try {
		const cursoDB = await Curso.findById(uid);
		if (!cursoDB) {
			return res.status(404).json({
				ok: false,
				msg: 'No existe un curso por ese ID',
			});
		}

		//Actualizaciones
		const { nombre,codigo, ...campos } = req.body;

		if (cursoDB.nombre != nombre) {
			const existeCurso = await Curso.findOne({ nombre: nombre });
			if (existeCurso) {
				return res.status(400).json({
					ok: false,
					msg: 'Ya existe un curso con ese nombre, Ups',
				});
			}
        }		
        
        if (cursoDB.codigo != codigo) {
			const existeCodigo = await Curso.findOne({ codigo: codigo });
			if (existeCodigo) {
				return res.status(400).json({
					ok: false,
					msg: 'Ya existe ese codigo para un curso, Ups',
				});
			}
		}		

		const cursoActualizado = await Curso.findByIdAndUpdate(uid, req.body, { new: true });

		res.status(200).json({
			ok: true,
			msg: 'Curso actualizado correctamente',
			curso: cursoActualizado,
        });
        
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Error inesperado',
		});
	}
};

const borrarCurso = async (req = request, res = response) => {
	const uid = req.params.id;

	try {
		const cursoDB = await Curso.findById(uid);
		if (!cursoDB) {
			return res.status(404).json({
				ok: false,
				msg: 'No existe un curso por ese ID',
			});
		}

		await Curso.findByIdAndDelete(uid);

		res.status(200).json({
			ok: true,
			msg: 'Curso Eliminado',
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: 'Error interno RAA',
		});
	}
};

module.exports = {
	getCursos,
	crearCurso,
	actualizarCurso,
    borrarCurso,
	getCursoById,
	getCursosByCiclo
};


