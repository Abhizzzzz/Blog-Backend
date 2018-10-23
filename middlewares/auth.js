// security,creating a password to access our application

const logger = require('./../libs/loggerLib')
const response = require('./../libs/response')


let isAuthenticated = (req,res,next) =>{
    // checking for the authToken
    if(req.params.authToken || req.query.authToken || req.header('authToken')){
        // checking the value of authToken
        if(req.params.authToken == 'Abhizzzzz' || req.query.authToken == 'Abhizzzzz' || req.header('authToken') == 'Abhizzzzz'){
            req.user = {
                userName: 'Abhizzzzz'
            }
            next();
        }
        else{
            logger.error('Incorrect authentication token','Authentication middleware',5);
            let apiResponse = response.generate(true,'Incorrect authentication token',403,null)
            res.send(apiResponse);
        }
    }
    else{
        logger.error('Authentication Token Missing', 'Authentication Middleware', 5)
        let apiResponse = response.generate(true, 'Authentication Token Is Missing In Request', 403, null)
        res.send(apiResponse)
    }
}


module.exports = {
    isAuthenticated: isAuthenticated
}