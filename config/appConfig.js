let appConfig = {};

appConfig.port = 3000;
appConfig.allowedCorsOrigin = "*"; //allow all domains to access it.
appConfig.env = "dev"; //development environment
appConfig.db = {
    // connecting to: mongodb://127.0.0.1:27017 port where we are connected on and blogAppDB is the database name
    // 127.0.0.1 is a local host address
    uri: 'mongodb://127.0.0.1:27017/blogAppDB',
}
appConfig.appVersion = '/api/v1';


// to export the data in other files of the application,we can include this by require statement
module.exports = {
    port: appConfig.port,
    allowedCorsOrigin: appConfig.allowedCorsOrigin,
    env: appConfig.env,
    db: appConfig.db,
    appVersion: appConfig.appVersion
}