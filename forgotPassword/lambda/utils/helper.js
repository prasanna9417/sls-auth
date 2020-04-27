const {authSign} = require('../config/authConfig')
const jwt  = require('jsonwebtoken')
 

module.exports.generateToken = (payload) => {
    const token = jwt.sign(payload, authSign, {
        expiresIn: '24h'
    })
    return token
}


module.exports.apiResponse = async(code,body) => {
    
    const response = {
        statusCode: code,
        headers: {
            'Access-Control-Allow-Origin': '*', // Required for CORS support to work
            'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
        },
        body: JSON.stringify(body),
    };
 
    return response;
 
}

 