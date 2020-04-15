const express = require ('express');
const app = express();
const {mysql} = require ('mysql');
const myConnection = require('express-myconnection');
const bodyParser = require('body-parser');
const publicDir = (__dirname + '/public');
const ErrorConstants = require('../../../constants/ErrorConstants');
const HttpConstants = require('../../../constants/HttpConstants');
const Logger = require('../../../helpers/utils/LoggerUtils');
class connectionConfig {

    /**
     * Get config connection.
     * @override
     */
    static getConfig(){       
        const dbconfig = {  
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            host: process.env.DB_HOST,
            database: process.env.DB_DATABASE,
          };
          return dbconfig;       
    }

    /**
     * Get config connection.
     * @override
     */
    static _bindQueryParams(connection,sql, bindParams){

        try {
            let bindSql =`${sql}`;
            Object.keys(bindParams).forEach((tp) => {
                const value = connection.escape(bindParams[tp]);                
                // bindSql = bindSql.replace(/*new RegExp(`: ${tp}`, 'g')*/':'+[tp], value);
                bindSql = bindSql.replace(new RegExp(`:${tp}`, 'g'), value);
            });
            return bindSql;
        } catch(error) {
            Logger.error(error);
            const result = {status: HttpConstants.INTERNAL_SERVER_ERROR_STATUS.code, success: false, message: HttpConstants.INTERNAL_SERVER_ERROR_STATUS.description}
            return result;
        }
    }

    /**
     * Get config connection.
     * @override
     */
    static _executeQuery(connection,query){
           connection.query(query, (err,rows,fields) => {                
                let result = {"message":""};     
                if (err) { 
                    result.message = err.message;                                                           
                } else {
                    if(rows.length > 0) {   
                        result.message = rows;
                    } else {
                        result.message = "Empty";
                } 
            }               
                return result;
            });
    }

    /**
   * Execute SQL Statement.
   * @param {Object} config - Configuration of Database Connection.
   * @param {string} config.connection - Database Connection.
   * @param {(Object|string)} config.statement - SQL Statement.
   * @param {Object} [config.bindParams] - The query parameters.
   * @param {Object} [config.target] - The object where the query result is linked.
   * @return {Object|Object[]} Query result.
   */
    static executeSQLStatement(payload,query,params) {
        try {           
                 payload.getConnection( (error, conn) => {                              
                    let bindSql =`${query}`;
                    Object.keys(params).forEach((tp) => {
                        const value = conn.escape(params[tp]);                
                        // bindSql = bindSql.replace(/*new RegExp(`: ${tp}`, 'g')*/':'+[tp], value);
                        bindSql = bindSql.replace(new RegExp(`:${tp}`, 'g'), value);
                    });
                    conn.query(bindSql, (err,rows,fields) => {                
                        let result = {"message":""};     
                        if (err) { 
                            result.message = err.message;                                                           
                        } else {
                            if(rows.length > 0) {   
                                result.message = rows[0];
                            } else {
                                result.message = "Empty";
                        } 
                    }        
                        
                           
                        return JSON.stringify(result);
                    });
                                                         
                });             
        } catch (error) {
            Logger.error(error);
            const result = {status: HttpConstants.INTERNAL_SERVER_ERROR_STATUS.code, success: false, message: HttpConstants.INTERNAL_SERVER_ERROR_STATUS.description}
            return result;
        }
        
        
    }

}


module.exports = connectionConfig;