const { Schema, model } = require('mongoose');

const MensajeSchema = Schema({
		mensaje: {
			type: String,
			required: true,			
        },
        fecha:{
            type:Date,
            required:true,
        },
        visto:{
            type:Boolean,
            required:true,
        },
        emisor:{
            required:true,
            type:Schema.Types.ObjectId,
            ref:'Usuario',
        },
        receptor:{
            required:true,
            type:Schema.Types.ObjectId,
            ref:'Usuario',
        },	        
    },
    {
        collection: 'mensajes',
    }
);

MensajeSchema.method('toJSON', function () {
	const { __v, ...object } = this.toObject();
	return object;
});

module.exports = model('Mensaje', MensajeSchema);