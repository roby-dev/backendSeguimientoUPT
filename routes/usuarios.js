/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const {
	getUsuarios,
	crearUsuario,
	actualizarUsuario,
	borrarUsuario,
	getUsuarioById,
	getAllUsers,
	comprobarPassword,
	cambiarPassword,
} = require('../controllers/usuarios');
const {
	validarJWT,
	validarDIRECTOR_ROLE,
	validarDIRECTOR_ROLE_o_MismoUsuario,
} = require('../middlewares/validar-jwt');

const router = Router();

router.get('/:desde?', validarJWT, getUsuarios);

router.post(
	'/',
	[
        check('nombres', 'Los nombre son obligatorios').not().isEmpty(),
        check('apellidos', 'Los nombre son obligatorios').not().isEmpty(),
        check('password', 'Contraseña obligatoria').not().isEmpty(),		
		check('email', 'Email es obligatorio').isEmail(),
		validarCampos,
	],
	crearUsuario
);

router.put(
	'/:id',
	[
		validarJWT,
		validarDIRECTOR_ROLE_o_MismoUsuario,
		check('nombres', 'Los nombres son obligatorio').not().isEmpty(),
		check('apellidos', 'Los apellidos son obligatorio').not().isEmpty(),
		check('email', 'El email es obligatorio').isEmail(),
		check('role', 'El role es obligatorio').not().isEmpty(),
		validarCampos,
	],
	actualizarUsuario
);

router.delete('/:id', [validarJWT, validarDIRECTOR_ROLE], borrarUsuario);
router.get('/id/:id', validarJWT,validarDIRECTOR_ROLE,validarDIRECTOR_ROLE_o_MismoUsuario, getUsuarioById);
router.get('/todo/all', validarJWT,validarDIRECTOR_ROLE,validarDIRECTOR_ROLE_o_MismoUsuario, getAllUsers);

router.post(
	'/comprobar',
	[
		validarJWT,
		validarDIRECTOR_ROLE_o_MismoUsuario,
		check('uid','Id obligatorio').not().isEmpty(),
		check('password','Password obligatoria').not().isEmpty(),
		validarCampos,
	],
	comprobarPassword);

router.post(
		'/cambiar',
		[
			validarJWT,
			validarDIRECTOR_ROLE_o_MismoUsuario,
			check('uid','Id obligatorio').not().isEmpty(),
			check('pass1','Password obligatoria').not().isEmpty(),
			validarCampos,
		],
		cambiarPassword);

module.exports = router;
