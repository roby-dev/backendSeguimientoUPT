const { Schema, model } = require('mongoose');

const PlanEstudiosSchema = Schema({
        codigo:{
            type:String,
            unique:true,
            required:true,
        },        
		descripcion: {
			type: String,
            required: true,	
            unique:true		
        },        
});

PlanEstudiosSchema.method('toJSON', function () {
	const { __v, ...object } = this.toObject();
	return object;
});

module.exports = model('PlanEstudios', PlanEstudiosSchema);