// this is needed to importing expressjs into our application.
const express = require('express')
// including our config file
const appConfig = require('./config/appConfig')
// including fs
const fs = require('fs')
// including mongoose library
const mongoose = require('mongoose')
// creating an instance or creating application instance.
const app = express()
// for body parameters
const bodyParser = require('body-parser')
// for cookie's input here its optional
const cookieParser = require('cookie-parser')
// importing middleware error handlers
const globalErrorHandler = require('./middlewares/appErrorHandler')
// importing middleware routeLogger
const customRouteLogger = require('./middlewares/routeLogger')
// importing helmet
var helmet = require('helmet')
// importing http
const http = require('http')
// importing logger
const logger = require('./libs/loggerLib')


// middlewares for taking body parameters
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// optional if using cookies for input but it is highly not recommended
app.use(cookieParser());

// global error handle for our app
app.use(globalErrorHandler.generalErrorHandler);
// global route logger for our app
app.use(customRouteLogger.globalRouteLogger);
// using helmet as application level middleware
app.use(helmet());


// including Blog.js through bootstrap we can do it through require as well
let modelsPath = './models'
fs.readdirSync(modelsPath).forEach(function (file) {
    // if the file has .js extension only
    if (~file.indexOf('.js')) {
        // just importing the Blog.js file,we can do it by just require as well
        require(modelsPath+'/'+file)
    }
})


// another way of reading the function of another folder and file(i.e routes folder) or we can do it by including require
// routesPath has routes folder path
let routesPath = './routes'
// reading directory of routes folder one by one
fs.readdirSync(routesPath).forEach(function (file) {
    // if the file has .js extension only
    if (~file.indexOf('.js')) {
        console.log("including the following file");
        console.log(routesPath + '/' + file);
        let route = require(routesPath + '/' + file)
        route.setRouter(app);
    }
})

// this middleware of not found is to be there after routes are initialized or it will throw not found to all routes which we have declared as well.
// 404 handler after route only
app.use(globalErrorHandler.routeNotFoundHandler);


// if we give /hello then our application will run on http://localhost:3000/hello, app.get('/', (req, res) => res.send('Hello World!'))

// listening the server on port 3000 (our local server)
// app.listen(appConfig.port, () => {
//     console.log('Example app listening on port 3000!');

//     // creating the mongoDB connection here
//     // if mongoose less than 5th version
//     // let db = mongoose.connect(appConfig.db.uri, { useMongoClient: true});
//     let db = mongoose.connect(appConfig.db.uri, { useNewUrlParser: true });


// })

// instead of listening the server through app,we are listening through http which is the best way to create in nodeJs
// this is known as event base programming through nodeJs
const server = http.createServer(app)
// start listening to the http server
console.log(appConfig);
server.listen(appConfig.port)
// now we are listening to few events,one will handle the error and one will handle the listen
server.on('error',onError)
server.on('listening',onListening)

// event listener for HTTP server "error" event
function onError(error){

    if(error.syscall !== 'listen'){
        logger.error(error.code +' not equal listen','serverOnErrorHandler',10);
        throw error;
    }

    // handle specific listen errors with friendly messages
    switch(error.code){
        case 'EACCES':
            logger.error(error.code + ':elavated privileges required', 'serverOnErrorHandler', 10)
            process.exit(1)
            break
        case 'EADDRINUSE':
            logger.error(error.code + ':port is already in use.', 'serverOnErrorHandler', 10)
            process.exit(1)
            break
        default:
            logger.error(error.code + ':some unknown error occured', 'serverOnErrorHandler', 10)
            throw error
    }

}

// event listener for HTTP server "listening" event.
function onListening() {
    var addr = server.address()
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    ('Listening on ' + bind)
    logger.info('server listening on port' + addr.port, 'serverOnListeningHandler', 10)
    // creating the mongoDB connection here
    // if mongoose less than 5th version
    // let db = mongoose.connect(appConfig.db.uri, { useMongoClient: true});
    let db = mongoose.connect(appConfig.db.uri, { useNewUrlParser: true })
}

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
    // application specific logging, throwing an error, or other logic here
})



// handling moongoose connection
mongoose.connection.on('error', function (err) {
    console.log("database connection error");
    console.log(err);
});

// handling mongoose success event
mongoose.connection.on('open', function (err) {
    if (err) {
        console.log("database error");
        console.log(err);
    }
    else {
        console.log("database connection open success");
    }
});