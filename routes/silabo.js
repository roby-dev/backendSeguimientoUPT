/*
    Medicos
    Ruta: 'api/silabo'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, validarDIRECTOR_ROLE } = require('../middlewares/validar-jwt');

const {
    getSilaboById,
    getSilabos,
	crearSilabo,
	actualizarSilabo,
	borrarSilabus,
	getSilaboBySeccion
} = require('../controllers/silabo');

const router = Router();

router.get('/', validarJWT, getSilabos);
router.post(
	'/',
	[
		validarJWT,
		validarDIRECTOR_ROLE,
		check('seccion', 'La seccion es obligatoria').not().isEmpty(),
		check('semanas', 'Las semanas deben de ser obligatorias').not().isEmpty(),        
		validarCampos,
	],
	crearSilabo
);

router.put(
	'/:id',
	[
		validarJWT,
		validarDIRECTOR_ROLE,
		check('seccion', 'La seccion es obligatoria').not().isEmpty(),
		check('semanas', 'Las semanas deben de ser obligatorias').not().isEmpty(),        
		validarCampos,
	],
	actualizarSilabo
);

router.delete('/:id', validarJWT,validarDIRECTOR_ROLE,borrarSilabus);
router.get('/:id', validarJWT, getSilaboById);
router.get('/seccion/:id', validarJWT, getSilaboBySeccion);



module.exports = router;
