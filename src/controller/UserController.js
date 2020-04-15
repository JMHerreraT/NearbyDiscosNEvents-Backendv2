const UserValidator = require('../validator/UserValidator');
const UserService = require('../service/UserService');
const LoggerUtils = require('../helpers/utils/LoggerUtils');
class UserController {

    static loginUser(request,response) {  
        LoggerUtils.info(request.body);
        LoggerUtils.info("API usuario/login has been called.");
        try {
            var result = UserValidator.validateLoginUser(request.body);            
                       
            if(result.status == 200) {
                result = UserService.loginUser(request,response);
            } else {
                LoggerUtils.error(result);
                response.status(result.status);               
                response.send(result); 
            }
          } catch (error) {
            LoggerUtils.error(error);
            const result = {status:500,success:false,message:error.message};
            response.status(result.status);            
            response.send(result);
            
          }       
        
        
        

    }

    static registerUser(request,response) {  
        LoggerUtils.info(request.body);
        LoggerUtils.info("API usuario/registro has been called.");
        try {
            var result = UserValidator.validateRegisterUser(request.body);            
                       
            if(result.status == 200) {
                result = UserService.registerUser(request,response);
            } else {
                LoggerUtils.error(result);
                response.status(result.status);               
                response.send(result); 
            }
          } catch (error) {
            LoggerUtils.error(error);
            const result = {status:500,success:false,message:error.message};
            response.status(result.status);            
            response.send(result);
            
          }       
    }

}

module.exports = UserController;