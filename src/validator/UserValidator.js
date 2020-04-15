const Joi = require('@hapi/joi');
const HttpConstants = require('../constants/HttpConstants');
const ErrorConstants = require('../constants/ErrorConstants');
class UserValidator {
    static _validate(schema, payload) {
        const response = {
            status: 200,
            success: true,
            message: "",
        };
        const validation = schema.validate(payload, {
            allowUnknown: true,
            abortEarly: false,
            language: ErrorConstants.VALIDATION_MESSAGES
        });

        if (validation.error) {
            const messagesError = [];
            validation.error.details.forEach((value) => {
            messagesError.push(value.message);
            });

            response.status = HttpConstants.BAD_REQUEST_STATUS.code;
            response.success = false;
            response.message = messagesError;
            
        }
        return response;
    }

  static validateObtainUser(request){
    const schema = Joi.object().keys({
      key: Joi.required(),  
      idPersona: Joi.required(),
      numeroDocumento: Joi.string().required(),      
    });
    const validator = schema.validate(schema,request);
    return validator;
  }

  static validateLoginUser(request) {
    const schema = Joi.object().keys({   
      key: Joi.required(),  
      nomUsuario: Joi.string().required(),
      passUsuario: Joi.string().required(),
    });
    const validator = this._validate(schema,request);
    return validator;
  }

  static validateRegisterUser(request){
    const schema = Joi.object().keys({  
      key: Joi.required(),    
      primerNombre: Joi.string().required(),
      segudoNombre: Joi.string().required(),
      primerApellido: Joi.string().required(),
      segundoApellido: Joi.string().required(),
      tipoDocumento: Joi.string().required(),
      numeroDocumento: Joi.string().required(),
      fechaNacimiento: Joi.date().required(),
      edad: Joi.required(),
      numeroCelular: Joi.required(),
      direccion: Joi.string().required(),
      genero: Joi.string().required(),      
      nomUsuario: Joi.string().required(),
      passUsuario: Joi.string().required(),
      email: Joi.string().required(),
      origen: Joi.required(),       
    });
    const validator = this._validate(schema,request);
    return validator;
  }

  static validateUpdateUser() {
    const schema = Joi.object().keys({
      idPersona: Joi.required(),
      primerNombre: Joi.string().required(),
      segudoNombre: Joi.string().required(),
      primerApellido: Joi.string().required(),
      segundoApellido: Joi.string().required(),
      tipoDocumento: Joi.required(),
      numeroDocumento: Joi.string().required(),
      fechaNacimiento: Joi.date().required(),
      numeroCelular: Joi.required(),
      direccion: Joi.string().required(),
      genero: Joi.required(),
      nomUsuario: Joi.string().required(),
      email: Joi.string().required(),
      estadoUsuario: Joi.required(),
    });
    const validator = this._validate(schema,request);
    return validator;
  }

  static validateDeleteUser(request){
    const schema = Joi.object().keys({     
      idPersona: Joi.required(),
      nomUsuario: Joi.string().required(),      
    });
    const validator = this._validate(schema,request);
    return validator;
  }

  static validateChangeUserStatus(request){
    const schema = Joi.object().keys({
      idPersona: Joi.required(),
      idEstado: Joi.required(),
    });
    const validator = this._validate(schema,request);
    return validator;
  }

}

module.exports = UserValidator;