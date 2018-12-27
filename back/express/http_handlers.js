const util = require('util');

global.HttpHandler = {
    success: AnswerJSONSuccess,
    error: AnswerJSONError,
    failure: AnswerJSONFailure,
    unauthorized: AnswerJSONUnauthorized,
    
}


/**
 * Send back json to the client with 200 status code
 * A success parameter set to true and data in data field
 */
function AnswerJSONSuccess(response, message, data){
    const json_data = { "status": 0, "message": message, "data": data };
    response.json(json_data);    
}

/**
 * Send back json to the client with an error code (error from the server)
 * A success parameter set to false and data 
 */
function AnswerJSONError(response, message, data){
    response.json({ "status": 1, "message": message, "data": data});    
}

/**
 * Send back a json to the client with 200 status code
 * But a failure occured, for instance during model validation
 * Use this one when client sent wrong informations
 */
function AnswerJSONFailure(res, message, data){
    let json_data = { "status": -1, "message": message, "data": data};
    res.json(json_data);
}

/**
 * Send a response with given http code
 */
function AnswerJSONUnauthorized(res, message, data){
    let json_data = { "status": -2, "message": message, "data": data};
    //401 -> unauthorized
    res.status(401).json(json_data);
}

module.exports = HttpHandler;
