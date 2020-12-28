const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
	nombres: {
		type: String,
		required: true,
    },
    apellidos: {
		type: String,
		required: true,
	},
	imagen: {
		type: String,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		required: true,
		default: 'DOCENTE_ROLE',
	},
});

UsuarioSchema.method('toJSON', function () {
	const { __v, _id, password, ...object } = this.toObject();
	object.uid = _id;
	return object;
});

module.exports = model('Usuario', UsuarioSchema);
