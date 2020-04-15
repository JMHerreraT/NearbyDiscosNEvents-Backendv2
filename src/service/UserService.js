const UserDb = require('../bd/UserDb');

class UserService {

    static loginUser(request,response) {       
        UserDb.loginUser(request,response);        
    }
    
    static registerUser(request,response) {
        UserDb.registerUser(request,response);
    }

}

module.exports = UserService;