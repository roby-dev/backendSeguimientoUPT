const { Schema, model } = require('mongoose');

const SeccionSchema = Schema(
	{
		nombre: {
			type: String,
			required: true,	
			unique:true,		
		},
		usuario: {
			required: true,
			type: Schema.Types.ObjectId,
			ref: 'Usuario',
        },
        curso:{
            required:true,
            type:Schema.Types.ObjectId,
            ref:'Curso',
        },
	},
	{
		collection: 'secciones',
	}
);

SeccionSchema.method('toJSON', function () {
	const { __v, ...object } = this.toObject();
	return object;
});

module.exports = model('Seccion', SeccionSchema);