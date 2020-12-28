const { response,request } = require('express');
const Silabo = require('../models/silabo');

const getSilabos = async (req, res = response) => {
	const silabos = await Silabo.find()
		.populate({path:'seccion',populate:{path:'usuario curso'}})
	
	res.json({
		ok: true,
		silabos,
	});
};

const getSilaboById = async (req, res = response) => {
	const id = req.params.id;
	try {
		const silabo = await Silabo.findById(id)
        .populate({path:'seccion',populate:{path:'usuario curso'}})

		if(!silabo){
			return res.json({
				ok:false,
				msg:'No existe silabo',
			});
		}

		res.json({
			ok: true,
			silabo,
        });
        
	} catch (error) {
		console.log(error);
		res.json({
			ok: false,
			msg: 'Hable con el admin',
		});
	}
};

// const getSeccionesByDocente = async (req=request,res=response) => {
// 	const id = req.params.id;	
// 		try {
// 			const secciones = await Seccion.find({usuario:id})
// 			.populate('curso', 'codigo nombre')
// 			.populate('usuario', 'nombres apellidos');

// 			if(!secciones.length>0){
// 				return res.json({
// 					ok:false,
// 					msg:'No existe docente registrado en alguna sección',
// 				});
// 			}

// 			res.json({
// 				ok: true,
// 				docente: secciones[0].usuario.nombres + ' ' + secciones[0].usuario.apellidos,
// 				secciones,
// 				total:secciones.length,
// 			});

// 		} catch (error) {
// 			console.log(error);
// 			res.json({
// 				ok: false,
// 				msg: 'Hable con el admin',
// 			});
// 		}
	
// };


const getSilaboBySeccion = async (req=request,res=response) => {
	const id = req.params.id;	
		try {
			const silabo = await Silabo.findOne({seccion:id})						

			if(!silabo){
				return res.json({
					ok:false,
					msg:'No existe contenido registrado epara esta seccion',
				});
			}

			res.json({
				ok: true,				
				silabo,			
			});

		} catch (error) {
			console.log(error);
			res.json({
				ok: false,
				msg: 'Hable con el admin',
			});
		}
	
};

const crearSilabo = async (req, res = response) => {

	const silabo = new Silabo(req.body);	

	try {
        const silaboDB = await silabo.save();
        
		res.json({
			ok: true,
			silabo:silaboDB
        });
        
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: 'Hable con el admin',
		});
	}
};

const actualizarSilabo = async (req, res = response) => {	
	const id = req.params.id;

	try {
		const silaboDB = await Silabo.findById(id);
		if (!silaboDB) {
			return res.status(404).json({
				ok: false,
				msg: 'No se encontró sección',
			});
		}		

		const silaboActualizado = await Silabo.findByIdAndUpdate(id, req.body, { new: true });

		res.json({
			ok: true,
			silaboActualizado,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Habvle con elñ admin',
		});
	}
};

const borrarSilabus = async (req, res = response) => {
	const id = req.params.id;

	try {
		const silabusDb = await Silabo.findById(id);

		if (!silabusDb) {
			return res.status(404).json({
				ok: false,
				msg: 'No se encontró seccion',
			});
		}

		await Silabo.findByIdAndDelete(id);

		res.json({
			ok: true,
			msg: 'Silabo eliminado',
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
    getSilaboById,
    getSilabos,
	crearSilabo,
	actualizarSilabo,
	borrarSilabus,
	getSilaboBySeccion
};
