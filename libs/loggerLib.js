// to make logging format and remove console.log() which is synchronous i.e blocking in nature and can slow down our application.

const logger = require('pino')()
const moment = require('moment')

let captureError = (errorMessage,errorOrigin,errorLevel) =>{
    let currentTime  = moment(); // using moment format of time
    let errorResponse = {
        timestamp: currentTime,
        errorMessage: errorMessage,
        errorOrigin: errorOrigin,
        errorLevel: errorLevel
    }
    logger.error(errorResponse);
    return errorResponse;
}

let captureInfo = (message,origin,importance) =>{
    let currentTime  = moment(); // using moment format of time
    let infoMessage = {
        timestamp: currentTime,
        message: message,
        origin: origin,
        level: importance
    }
    logger.info(infoMessage);
    return infoMessage;
}

module.exports = {
    error: captureError,
    info: captureInfo
}