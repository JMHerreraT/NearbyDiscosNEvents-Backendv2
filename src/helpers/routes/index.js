const API_KEY = process.env.API_KEY;

const express = require ('express');
const router = express.Router();
const moment = require('moment');

const UsuariosController = require('../../controller/UserController');

/**
 * @function /usuario/login Funcion para obtener los datos del usuario al loguearse.
 * @author Jorge M. Herrera Tume
 * @copyright 2020
 */

router.post("/usuario/login", (request, response, next) => {
    UsuariosController.loginUser(request,response);   
 });

 router.post("/usuario/crear", async (request, response, next) => {    
    UsuariosController.registerUser(request,response);       
 });
 
 router.post("/usuario/actualizar", async (request, response, next) => {      
    UsuariosController.actualizarUsuario(request,response);       
 });
 
 router.post("/usuario/eliminar", async (request, response, next) => { 
    UsuariosController.eliminarUsuario(request,response);   
 });
 
 router.post("/usuario/estado/cambiar", async (request, response, next) => {      
    UsuariosController.cambiarEstadoUsuario(request,response);   
 });

module.exports = router;