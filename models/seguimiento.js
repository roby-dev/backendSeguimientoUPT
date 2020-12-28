const { Schema, model } = require('mongoose');

const SeguimientoSchema = Schema({
		unidad: {
			type: Number,
			required: true,			
        },
        semana:{
            type:Number,
            required:true,
        },
        fecha:{
            type:Date,
            required:true,
        },
        dictada:{
            type:Boolean,
            required:true,
        },
        numeroAsistentes:{
            type:Number,
            required:true,
        },
        contenidoConceptual:{
            type:String,
            required:true,
        },
        contenidoProcedimental:{
            type:String,
            required:true,
        },
        porcentaje:{
            type:String,
            required:true,
        },
        manejoPlataforma:{
            type:String,
            required:true,
        },
        recursosEmpleados:{
            type:String,
            required:true,
        },
        evaluacion:{
            type:String,
            required:true,
        },
        aprendizajeColaborativo:{
            type:String,
            required:true,
        },
        nivelParticipacion:{
            type:String,
            required:true,
        },
        asistenciaInicio:{
            type:Boolean,
            required:true,
        },
        asistenciaFin:{
            type:Boolean,
            required:true,
        },
        googleMeet:{
            type:Boolean,
            required:true,
        },
        otraHerramienta:{
            type:Boolean,
            required:true,
        },
        herramienta:{
            type:String,
            required:true,
        },
        duracionVideo:{
            type:String,
            required:true,
        },
        comentario:{
            type:String,
            required:true,
        },
        seccion:{
            required:true,
            type:Schema.Types.ObjectId,
            ref:'Seccion',
        },          
    }
);

SeguimientoSchema.method('toJSON', function () {
	const { __v, ...object } = this.toObject();
	return object;
});

module.exports = model('Seguimiento', SeguimientoSchema);