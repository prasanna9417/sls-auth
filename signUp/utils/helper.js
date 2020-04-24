const { v4: uuidv4 } = require('uuid')
const bcryptjs = require('bcryptjs')

module.exports.generateRandom = () =>{
    const random = uuidv4()
    return random
}


module.exports.encryption = async (password)=>{
    let promise = new Promise((resolve, reject) => {
        bcryptjs.genSalt(10)
        .then(function (salt) {
            bcryptjs.hash(password, salt)
                .then(function (encryptedPassword) {
                    resolve(encryptedPassword)
                })
        })
    });
    const response = await promise;
    return response;
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


module.exports.date2Epoch = () => {
    const date = new Date();
    const timeStamp = Math.floor(date.getTime()/1000.0)
    return timeStamp
}