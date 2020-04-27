const bcryptjs = require('bcryptjs')

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


module.exports.encryption = async (password)=>{
    let promise = new Promise((resolve, reject) => {
        bcryptjs.genSalt(10)
        .then(function (salt) {
            bcryptjs.hash(password, salt)
                .then(function (encryptedPassword) {
                    resolve(encryptedPassword)
                })
                .catch(err=>{
                    reject(err)
                })
        })
        .catch(err=>{
            reject(err)
        })
    });
    const response = await promise;
    return response;
}


module.exports.date2Epoch = () => {
    const date = new Date();
    const timeStamp = Math.floor(date.getTime()/1000.0)
    return timeStamp
}



module.exports.validatePassword = (password) => {
    let err_msg = []
    if(password.length<6 || password.length > 128){
        err_msg.push({error:"password length should be between 6 and 128"})
        return err_msg
    }else{
        return err_msg
    }
}