const { Schema, model } = require('mongoose');

const CursoSchema = Schema({
        codigo:{
            type:String,
            unique:true,
            required:true,
        },        
		facultad: {
			type: String,
			required: true,			
        },
        escuela:{
            type:String,
            required:true,
        },
        nombre:{
            type:String,
            required:true,
            unique:true,
        },		
        ciclo:{
            type:Number,
            required:true
        },
        planEstudios:{
            required:true,
            type:Schema.Types.ObjectId,
            ref:'PlanEstudios',
        },
        estado:{
            type:String,
            required:true            
        }
});

CursoSchema.method('toJSON', function () {
	const { __v, ...object } = this.toObject();
	return object;
});

module.exports = model('Curso', CursoSchema);