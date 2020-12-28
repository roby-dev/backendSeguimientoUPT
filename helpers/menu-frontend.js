const { response } = require('express');
const {
	getSeccionesByDocente,
} = require('../controllers/seccion');
const Seccion = require('../models/seccion');


const getMenuFrontEnd = (role) => {

    let menu = [];

    switch(role){
        case 'DIRECTOR_ROLE':
            menu = [
                {
                    titulo: 'Seguimiento',
                    icono: 'mdi mdi-gauge',
                    submenu: [
                        {
                            titulo: 'Inicio',
                            url: '/',
                        },                       
                        {
                            titulo: 'Actas',
                            url: 'actas',
                        },
                        {
                            titulo: 'Avances',
                            url: 'avance',
                        },
                    ],
                },
                {
                    titulo:'Mis Cursos',
                    icono:' mdi mdi-book',
                    submenu:[],
                },
                {
                    titulo: 'Gestión',
                    icono: 'mdi mdi-svg',
                    submenu: [
                        {
                            titulo:'Gestion de Contenidos',
                            url:'silabus'
                        },    
                        {
                            titulo: 'Gestión de Cursos',
                            url: 'cursos',
                        },           
                               
                        {
                            titulo:'Gestion de Secciones',
                            url:'secciones'
                        },
                       
                        {
                            titulo: 'Gestión de Usuarios',
                            url: 'usuarios',
                        }
                    ],
                },
                {
                    titulo: 'Productividad',
                    icono: 'mdi mdi-folder-lock-open',
                    submenu: [                        
                        {
                            titulo: 'Informes',
                            url: 'informes',
                        },
                        {
                            titulo: 'Mensajería',
                            url: 'mensajes',
                        },
                        {
                            titulo: 'Notificaciones',
                            url: 'notificaciones',
                        },
                    ],
                },
                {
                    titulo: 'Información',
                    icono: 'mdi mdi-information',
                    submenu: [
                        {
                            titulo: 'Ver información',
                            url: 'informacion',
                        },                        
                    ],
                }
            ];
            break;
            
        case 'SUPERVISOR_ROLE':

            menu = [
                {
                    titulo: 'Seguimiento',
                    icono: 'mdi mdi-gauge',
                    submenu: [
                        {
                            titulo: 'Inicio',
                            url: '/',
                        },                       
                        {
                            titulo: 'Avances',
                            url: 'avance',
                        },
                    ],
                }, 
                {
                    titulo:'Mis Cursos',
                    icono:' mdi mdi-book',
                    submenu:[],
                },
                {
                    titulo: 'Productividad',
                    icono: 'mdi mdi-folder-lock-open',
                    submenu: [
                        {
                            titulo: 'Mensajería',
                            url: 'mensajes',
                        },
                        {
                            titulo: 'Notificaciones',
                            url: 'notificaciones',
                        },
                    ],
                },
                {
                    titulo: 'Información',
                    icono: 'mdi mdi-information',
                    submenu: [
                        {
                            titulo: 'Ver información',
                            url: 'informacion',
                        },                        
                    ],
                }
            ];
            break;

        case 'DOCENTE_ROLE':
            menu = [
                {
                    titulo: 'Seguimiento',
                    icono: 'mdi mdi-gauge',
                    submenu: [
                        {
                            titulo: 'Inicio',
                            url: '/',
                        },
                    ],
                },
                {
                    titulo:'Mis Cursos',
                    icono:' mdi mdi-book',
                    submenu:[],
                },
                {
                    titulo: 'Productividad',
                    icono: 'mdi mdi-folder-lock-open',
                    submenu: [
                        {
                            titulo: 'Mensajería',
                            url: 'mensajes',
                        },
                    ],
                },
                {
                    titulo: 'Información',
                    icono: 'mdi mdi-information',
                    submenu: [
                        {
                            titulo: 'Ver información',
                            url: 'informacion',
                        },                        
                    ],
                }
            ];
            break;
    }
	return menu;
};




module.exports = { getMenuFrontEnd };
