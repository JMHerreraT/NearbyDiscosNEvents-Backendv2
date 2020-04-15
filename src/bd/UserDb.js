const QueryConstants = require('.././constants/QueryConstants');
const connectionConfig = require('../helpers/bd/connection/connectionConfig');

class UserDb {
    
    static loginUser(payload,response) {
        let connection;
        //const password = CryptographyUtils.encryptAES(process.env.SHA_KEY, `${payload.passUsuario}`);
        // const password = CryptoJS.SHA384(payload.passUsuario);
        
        
        const request = {
          accion: "login",
          idPersona: 0,
          primerNombre: "",
          segudoNombre: "",
          primerApellido: "",
          segundoApellido: "",
          nombreCompleto: "",
          tipoDocumento: 0,
          numeroDocumento: "",
          fechaNacimiento: "1900-01-01",
          edad: 0,
          numeroCelular: 0,
          direccion: "",
          genero: "",
          idUsuario: 0, 
          nomUsuario: "",
          passUsuario: "",       
          email: "",
          origen: 0, 
          estadoUsuario: 1,
        }
  
        const params = {
          accion: request.accion,
          idPersona: request.idPersona,
          primerNombre: request.primerNombre,
          segudoNombre: request.segudoNombre,
          primerApellido: request.primerApellido,
          segundoApellido: request.segundoApellido,
          nombreCompleto: request.nombreCompleto,
          tipoDocumento: request.tipoDocumento,
          numeroDocumento: request.numeroDocumento,
          fechaNacimiento: request.fechaNacimiento,
          edad: request.edad,
          numeroCelular: request.numeroCelular,
          direccion: request.direccion,
          genero: request.genero,
          idUsuario: request.idUsuario,
          nomUsuario: payload.body.nomUsuario,
          passUsuario: payload.body.passUsuario,
          email: request.email,
          origen: request.origen, 
          estadoUsuario: request.estadoUsuario,
        };  
    try {
       

        if(payload.body.key == process.env.API_KEY) {    
            
            try {
                payload.getConnection( async (error, conn) => {                  
                    var query = QueryConstants.FUNCIONES_USUARIO;      
                    var queryBinded = connectionConfig._bindQueryParams(conn,query,params);    
                        try {
                            
                            conn.query(queryBinded, async (err,rows,fields) => {                
                                
                                if (err) { 
                                    const   result = {status:500,success:true, message:err.message}; 
                                    response.status(result.status);
                                    response.send(result);
                                } else {
                                    if(rows.length > 0) {   
                                        const   result = {status:200,success:true, message:rows[0]};                                                            
                                        response.status(result.status);
                                        response.send(result);
                                    } else {
                                        const result = {status:500,success:false, message:"Empty"}                                                            
                                        response.status(result.status);
                                        response.send(result);
                                    }
                                }
                            });
                            
                        } catch (error) {
                            console.log("error", error);
                            const result = {status:500,success:false, message:error.message}
                            response.status(result.status);
                            response.send(result);
                            
                        }          
                });
            } catch (error) {
                LoggerUtils.error(error);
                result.message = error.message;                
                response.status(result.status);
                response.send(result);
                
            }
               
            
        }


      } catch (error) {
        var result = {
            status: 500,
            success: false,
            message: "",
          };
          result.status = 500;
          result.success = false;
          result.message = error.message;
          response.status(result.status);
          response.send(result);          
      }

    }

    static async registerUser(payload,response) {
        let connection;
        const fullName = payload.body.primerNombre.concat(" ").concat(payload.body.segudoNombre).concat(" ").concat(payload.body.primerApellido).concat(" ").concat(payload.body.segundoApellido);
        // const pwdStr = payload.body.passUsuario;
        // const password = CryptoJS.SHA384(pwdStr);
        const params = {
          accion: "registrar",
          idPersona: 0,
          primerNombre: payload.body.primerNombre,
          segudoNombre: payload.body.segudoNombre,
          primerApellido: payload.body.primerApellido,
          segundoApellido: payload.body.segundoApellido,
          nombreCompleto: fullName,
          tipoDocumento: payload.body.tipoDocumento,
          numeroDocumento: payload.body.numeroDocumento,
          fechaNacimiento: payload.body.fechaNacimiento,
          edad: payload.body.edad,
          numeroCelular: payload.body.numeroCelular,
          direccion: payload.body.direccion,
          genero: payload.body.genero,
          idUsuario: 0,
          nomUsuario: payload.body.nomUsuario,
          passUsuario: payload.body.passUsuario,
          email: payload.body.email,
          origen: payload.body.origen, 
          estadoUsuario: 1,
        };
        const target = {
            message: null,
        }

        try {
       

            if(payload.body.key == process.env.API_KEY) {    
                
                try {
                    payload.getConnection( async (error, conn) => {                  
                        var query = QueryConstants.FUNCIONES_USUARIO;      
                        var queryBinded = connectionConfig._bindQueryParams(conn,query,params);    
                            try {
                                
                                conn.query(queryBinded, async (err,rows,fields) => {                
                                    
                                    if (err) { 
                                        const   result = {status:500,success:true, message:err.message}; 
                                        response.status(result.status);
                                        response.send(result);
                                    } else {                                        
                                        if(rows.affectedRows >= 1) {   
                                            const   result = {status:200,success:true, message:"Usuario creado correctamente"};                                                            
                                            response.status(result.status);
                                            response.send(result);
                                        } else {
                                            const result = {status:500,success:false, message:"Empty"}                                                            
                                            response.status(result.status);
                                            response.send(result);
                                        }
                                    }
                                });
                                
                            } catch (error) {
                                console.log("error", error);
                                const result = {status:500,success:false, message:error.message}
                                response.status(result.status);
                                response.send(result);
                                
                            }          
                    });
                } catch (error) {
                    LoggerUtils.error(error);
                    result.message = error.message;                
                    response.status(result.status);
                    response.send(result);
                    
                }
                   
                
            }
    
    
          } catch (error) {
            var result = {
                status: 500,
                success: false,
                message: "",
              };
              result.status = 500;
              result.success = false;
              result.message = error.message;
              response.status(result.status);
              response.send(result);          
          }

    }
}

module.exports = UserDb;