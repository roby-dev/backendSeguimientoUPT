const { response, request } = require('express');

const PlanEstudios = require('../models/plan');

const getPlanes = async (req, res) => {
	const desde = Number(req.query.desde) || 0;

	const [planes, total] = await Promise.all([
		PlanEstudios.find({}, 'codigo descripcion',{sort:{codigo:1}}).skip(desde).limit(10),
		PlanEstudios.countDocuments(),
	]);

	res.status(200).json({
		ok: true,
		planes: planes,
		total,
	});
};

const getPlanById = async (req, res = response) => {
	const id = req.params.id;
	try {
        const plan = await PlanEstudios.findById(id);		
        if(!plan){
            res.json({
                ok:false,
                msg:'No existe plan para ese id',
            });
        }
        
		res.json({
			ok: true,
			plan,
		});
	} catch (error) {
		console.log(error);
		res.json({
			ok: false,
			msg: 'Hable con el admin',
		});
	}
};

const crearPlan = async (req, res = response) => {
	const { codigo } = req.body;

	try {        
        const existeCodigo = await PlanEstudios.findOne({ codigo });

		if (existeCodigo) {
			return res.status(400).json({
				ok: false,
				msg: 'El plan ya está registrado',
			});
        }        
     

		const plan = new PlanEstudios(req.body);

		//guardar Usuario
		await plan.save();

		res.json({
			ok: true,			
			plan,
        });
        
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Error inesperado',
		});
	}
};

const actualizarPlan = async (req, res = response) => {
	//TODO: VAlidar token y comprobar si  es el usuario correcto

	const uid = req.params.id;

	try {
		const planDB = await PlanEstudios.findById(uid);
		if (!planDB) {
			return res.status(404).json({
				ok: false,
				msg: 'No existe un plan por ese ID',
			});
		}

		//Actualizaciones
		const { codigo, ...campos } = req.body;		
        
        if (planDB.codigo != codigo) {
			const existeCodigo = await PlanEstudios.findOne({ codigo: codigo });
			if (existeCodigo) {
				return res.status(400).json({
					ok: false,
					msg: 'Ya existe ese codigo para un plan, Ups',
				});
			}
		}		

		const planActualizado = await PlanEstudios.findByIdAndUpdate(uid, req.body, { new: true });

		res.status(200).json({
			ok: true,
			msg: 'Plan actualizado correctamente',
			curso: planActualizado,
        });
        
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Error inesperado',
		});
	}
};

const borrarPlan = async (req = request, res = response) => {
	const uid = req.params.id;

	try {
		const planDB = await PlanEstudios.findById(uid);
		if (!planDB) {
			return res.status(404).json({
				ok: false,
				msg: 'No existe un plan por ese ID',
			});
		}

		await PlanEstudios.findByIdAndDelete(uid);

		res.status(200).json({
			ok: true,
			msg: 'Plan Eliminado',
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: 'Error interno RAA',
		});
	}
};

module.exports = {
	getPlanes,
	crearPlan,
	actualizarPlan,
    borrarPlan,
	getPlanById,	
};


