// this is our custom middleware to handle CORS code
// importing config file
const appConfig = require('./../config/appConfig')
// importing libs/timeLib
const time = require('./../libs/timeLib')
let requestIpLogger = (req,res,next) =>{
    // getting the clients remote address and remote port through inbuild methods
    let remoteIp = req.connection.remoteAddress + '://' + req.connection.remotePort;
    let realIp = req.headers['X-REAL-IP'];
    // logging the type of request(Post,Get,Put,Delete) through req.method and the clients remote address and the Url(Api) which is he requesting.
    // which is going to help us in troubleshooting or finding bugs
    console.log(req.method+' request made from '+remoteIp+' for route '+req.originalUrl+' on date-time '+time.now());
    // CORS configuration
    // this condition is for the pre request which browser makes to verify,what happens is when we request a api browser first sends OPTIONS request to the api to check the configuration of the api.
    if(req.method === 'OPTIONS'){
        console.log('!OPTIONS');
        var headers = {};
        header["Access-Control-Allow-Origin"] = "*"; //here we can provide a website domain or remote address which client will access the server
        header["Access-Control-Allow-Methods"] = "POST,PUT,GET,DELETE,OPTIONS";
        header["Access-Control-Allow-Credentials"] = false;
        header["Access-Control-Max-Age"] = '86400'; // 24 hours
        header["Access-Control-Allow-Headers"] = "X-Requested-With,X-HTTP-Method-Override,Content-Type,Accept";
        // we are sending the headers
        res.writeHead(200,headers);
        res.end();

    }
    else{
        res.header("Access-Control-Allow-Origin",appConfig.allowedCorsOrigin);
        res.header("Access-Control-Allow-Methods","POST,PUT,GET,DELETE,OPTIONS");
        res.header("Access-Control-Allow-Headers","X-Requested-With,Content-Type,Accept");

        next();
    }

} //end of requestIpLogger


module.exports = {
    globalRouteLogger: requestIpLogger
}