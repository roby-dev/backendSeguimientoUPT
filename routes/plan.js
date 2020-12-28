/*
    Ruta: /api/cursos
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const {
	getPlanes,
	crearPlan,
	actualizarPlan,
    borrarPlan,
	getPlanById,	
} = require('../controllers/plan');

const {
	validarJWT,
	validarDIRECTOR_ROLE,	
} = require('../middlewares/validar-jwt');

const router = Router();

router.get('/:desde?', validarJWT, getPlanes);

router.post(
	'/',
    [   validarJWT,
        validarDIRECTOR_ROLE,
        check('codigo', 'El código es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripción es obligatoria').not().isEmpty(),        
		validarCampos,
	],
	crearPlan
);

router.put(
	'/:id',
	[
		validarJWT,
        validarDIRECTOR_ROLE,
        check('codigo', 'El código es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripción es obligatoria').not().isEmpty(),        
		validarCampos,
	],
	actualizarPlan
);

router.delete('/:id', [validarJWT, validarDIRECTOR_ROLE], borrarPlan);

router.get('/id/:id', validarJWT, getPlanById);

module.exports = router;
