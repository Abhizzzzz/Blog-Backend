// general error handler

// importing libs
const response = require('./../libs/response')
let errorHandler = (err,req,res,next) =>{
    console.log("Application error handler called");
    console.log(err);
    let apiResponse = response.generate(true,'Some error occured at global level',500,null);
    res.send(apiResponse);
}
// not found handler
let notFoundHandler = (req,res,next) =>{
    console.log("404:Route notFoundHandler called");
    let apiResponse = response.generate(true,'Route not found in the application',404,null);
    res.status(404).send(apiResponse);
}

module.exports = {
    generalErrorHandler: errorHandler,
    routeNotFoundHandler: notFoundHandler
}