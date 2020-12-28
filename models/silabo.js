const { Schema, model } = require('mongoose');

const SilaboSchema = Schema(
	{
		seccion:{
            required:true,
            type:Schema.Types.ObjectId,
            ref:'Seccion',
        },

        semanas:{
            required:true,
            type:String
        },
        
        conceptual:[{
            semana:{
                type:Number
                
            },
            contenidoConceptual:{
                type:String
              
            },        
        }],
        
        procedimental:[{
            semana:{
                type:Number
              
            },
            contenidoProcedimental:{
                type:String
               
            },        
        }],
	},
);

SilaboSchema.method('toJSON', function () {
	const { __v, ...object } = this.toObject();
	return object;
});

module.exports = model('Silabo', SilaboSchema);