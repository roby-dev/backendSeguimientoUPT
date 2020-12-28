const { Schema, model } = require('mongoose');

const ResumenSchema = Schema({
		observaciones: {
			type: String,
			required: true,			
        },
        cumple:{
            type:Boolean,
            required:true,
        },       
    }
);

ResumenSchema.method('toJSON', function () {
	const { __v, ...object } = this.toObject();
	return object;
});

module.exports = model('Registro', ResumenSchema);