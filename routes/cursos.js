/*
    Ruta: /api/cursos
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const {
	getCursos,
	crearCurso,
	actualizarCurso,
    borrarCurso,
	getCursoById,
	getCursosByCiclo,
} = require('../controllers/cursos');

const {
	validarJWT,
	validarDIRECTOR_ROLE,	
} = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getCursos);

router.post(
	'/',
    [   validarJWT,
        validarDIRECTOR_ROLE,
        check('codigo', 'El código es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('facultad', 'La facultad es obligatorio').not().isEmpty(),
        check('escuela', 'La escuela es obligatoria').not().isEmpty(),				
		check('ciclo', 'El cilo es obligatorio').not().isEmpty(),
		check('planEstudios', 'El plan de estudios es obligatorio').not().isEmpty(),
		validarCampos,
	],
	crearCurso
);

router.put(
	'/:id',
	[
		validarJWT,		
		check('codigo', 'El código es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('facultad', 'La facultad es obligatorio').not().isEmpty(),
        check('escuela', 'La escuela es obligatoria').not().isEmpty(),				
		check('ciclo', 'El cilo es obligatorio').not().isEmpty(),	
		check('planEstudios', 'El plan de estudios es obligatorio').not().isEmpty(),
		validarCampos,
	],
	actualizarCurso
);

router.delete('/:id', [validarJWT, validarDIRECTOR_ROLE], borrarCurso);

router.get('/id/:id', validarJWT, getCursoById);
router.get('/ciclo/:ciclo', validarJWT, getCursosByCiclo);

module.exports = router;
