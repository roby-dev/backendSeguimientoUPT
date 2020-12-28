const path = require('path');
const fs = require('fs');

const { response, request } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');

const fileUpload = (req = request, res = response) => {
	const tipo = req.params.tipo;
	const id = req.params.id;

	const tiposValidos = ['usuarios'];
	if (!tiposValidos.includes(tipo)) {
		return res.status(400).json({
			ok: false,
			msg: 'No es un usuario.',
		});
	}

	if (!req.files || Object.keys(req.files).length === 0) {
		return res
			.status(400)
			.json({ ok: false, msg: 'No files were uploaded.' });
	}

	const file = req.files.imagen;

	const nombreCortado = file.name.split('.'); // separar
	const extensionArchivo = nombreCortado[nombreCortado.length - 1];

	//validar extenseion
	const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
	if (!extensionesValidas.includes(extensionArchivo)) {
		return res
			.status(400)
			.json({ ok: false, msg: 'No es extension valida.' });
	}

	//Generar el nombre del archivo
	const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

	//Path para guardar imagen
	const path = `./uploads/${tipo}/${nombreArchivo}`;

	//Mover la imagen
	file.mv(path, (err) => {
		if (err) {
			console.log(err);
			return res.status(500).json({
				ok: false,
				msg: 'Error al mover imagen',
			});
		}

		//Actualizar base de datos
		actualizarImagen(tipo, id, nombreArchivo);

		res.json({
			ok: true,
			msg: 'Archivo Subido',
			nombreArchivo,
		});
	});
};

const retornaImagen = (req = request, res = response) => {
	const tipo = req.params.tipo;
	const foto = req.params.foto;

	const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

	if (fs.existsSync(pathImg)) {
		res.sendFile(pathImg);
	} else {
		const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
		res.sendFile(pathImg);
	}
};

module.exports = {
	fileUpload,
	retornaImagen,
};

//var serveIndex = require('serve-index');
//app.use(express.static(__dirname + '/'))
//app.use('/uploads', serveIndex(__dirname + '/uploads'));
