const fs = require('fs');

const Usuario = require('../models/usuario');
const borrarImagen = (path) => {
	if (fs.existsSync(path)) {
		//BorrarImagenANteriror
		fs.unlinkSync(path);
	}
};

const actualizarImagen = async (tipo, id, nombreArchivo) => {
	let pathViejo = '';
	
			const usuario = await Usuario.findById(id);
			if (!usuario) {
				console.log('Usuario no existe en este ID');
				return false;
			}

			pathViejo = `./uploads/usuarios/${usuario.imagen}`;
			borrarImagen(pathViejo);

			usuario.imagen = nombreArchivo;
			await usuario.save();
			return true;		
};


module.exports = {
	actualizarImagen,
};
