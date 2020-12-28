const { Schema, model } = require('mongoose');

const RegistroSchema = Schema({
		porcentajeAvance: {
			type: String,
			required: true,			
        },
        cumple:{
            type:Boolean,
            required:true,
        },
        grabacion:{
            type:Boolean,
            required:true,
        },
        lectura:{
            type:Boolean,
            required:true,
        },
        linkVideo:{
            type:Boolean,
            required:true,
        },
        guiaLab:{
            type:Boolean,
            required:true,
        },
        ppt:{
            type:Boolean,
            required:true,
        },
        otro:{
            type:Boolean,
            required:true,
        },
        foro:{
            type:Boolean,
            required:true,
        },
        evaluacion:{
            type:Boolean,
            required:true,
        },
        practicas:{
            type:Boolean,
            required:true,
        },
        porcentajeCumplimiento:{
            type:String,
            required:true,
        },
        cumplio:{
            type:String,
            required:true,
        },
        observacion:{
            type:String,
            required:true,
        },        
        seguimiento:{
            required:true,
            type:Schema.Types.ObjectId,
            ref:'Seguimiento',
        },         
        usuario:{
            required:true,
            type:Schema.Types.ObjectId,
            ref:'Usuario',
        } 
    }
);

RegistroSchema.method('toJSON', function () {
	const { __v, ...object } = this.toObject();
	return object;
});

module.exports = model('Registro', RegistroSchema);