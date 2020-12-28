require('dotenv').config();
const path = require('path');

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();
//CORS
app.use(cors());

//Lectura yparseo del Body
app.use(express.json());

//Base de Datos
dbConnection();

//direcotrio Publico

app.use(express.static('public'));

//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/cursos', require('./routes/cursos'));
app.use('/api/seccion', require('./routes/seccion'));
app.use('/api/plan', require('./routes/plan'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/upload', require('./routes/uploads'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/silabo',require('./routes/silabo'))

//lo ultimo
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

const server = app.listen(process.env.PORT, () => {    
	console.log('Servidor corriendo en puerto ' + process.env.PORT);
});

const io=require('socket.io')(server,{
	cors:{
		origin:"*",
		methods:["GET","POST"]
	}
});

io.on('connection',(socket)=>{
	console.log('Socket: client connected');	

	socket.on('cargarSecciones',(id)=>{
		io.emit("seccionesCargadas",id);	
	});	
});
