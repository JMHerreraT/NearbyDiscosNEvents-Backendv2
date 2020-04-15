/**
 * RESTFul Services NodeJS
 * @author: Jorge Herrera
 * Update: 07/04/2020
 */
require('dotenv').config();
const express = require ('express');
const app = express();
const mysql = require ('mysql');
const myConnection = require('express-myconnection');
const bodyParser = require('body-parser');
const {getConfig} = require('./src/helpers/bd/connection/connectionConfig');
const routes = require('./src/helpers/routes/index');
/**
 * @param publicDir: Directorio publico para almacenar imagenes
 */
const publicDir = (__dirname + '/public');

app.use(express.static(publicDir));
app.use(myConnection(mysql, getConfig(), 'pool'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); 

app.use("/", routes);

app.listen(process.env.PORT, () => {
    console.log("Backend running on port "+process.env.PORT);    
})
