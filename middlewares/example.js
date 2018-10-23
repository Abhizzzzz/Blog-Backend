let exampleMiddlewares = (req,res,next) =>{
    // modified the request object which we can use in controller
    req.user = {
        'firstName': 'Abhishek',
        'lastName': 'Palwankar'
    }
    // it shifts the next function in order in routes
    next();
}

module.exports = {
    egMiddlewares: exampleMiddlewares
}