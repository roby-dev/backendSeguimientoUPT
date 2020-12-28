const { Schema, model } = require('mongoose');

const NotificacionSchema = Schema({
		mensaje: {
			type: String,
			required: true,			
        },
        fecha:{
            type:Date,
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
        collection: 'notificaciones',
    },
);

NotificacionSchema.method('toJSON', function () {
	const { __v, ...object } = this.toObject();
	return object;
});

module.exports = model('Mensaje', NotificacionSchema);