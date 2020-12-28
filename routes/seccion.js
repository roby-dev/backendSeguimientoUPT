/*
    Medicos
    Ruta: 'api/seccion'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, validarDIRECTOR_ROLE } = require('../middlewares/validar-jwt');

const {
	getSecciones,
	crearSeccion,
	actualizarSeccion,
	borrarSeccion,
	getSeccionById,
	getSeccionesByDocente,
	getSeccionesByCurso
} = require('../controllers/seccion');

const router = Router();

router.get('/', validarJWT, getSecciones);
router.post(
	'/',
	[
		validarJWT,
		validarDIRECTOR_ROLE,
		check('nombre', 'El nombre de la seccion es es necesario').not().isEmpty(),
		check('curso', 'El id del curso debe ser valido').isMongoId(),
		check('usuario', 'El id del usuario debe ser valido').isMongoId(),
		validarCampos,
	],
	crearSeccion
);
router.put(
	'/:id',
	[
		validarJWT,
		validarDIRECTOR_ROLE,
		check('nombre', 'El nombre de la seccion es necesario').not().isEmpty(),
		check('curso', 'El curso es requerido').not().isEmpty(),
		check('usuario', 'El docente es requerido').not().isEmpty(),
		validarCampos,
	],
	actualizarSeccion
);
router.delete('/:id', validarJWT,validarDIRECTOR_ROLE,borrarSeccion);
router.get('/:id', validarJWT, getSeccionById);
router.get('/docente/:id', validarJWT, getSeccionesByDocente);
router.get('/curso/:id', validarJWT, getSeccionesByCurso);


module.exports = router;
