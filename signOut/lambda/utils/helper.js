 
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

module.exports.filterTokens = (tokens,token) =>{
    const newTokens = tokens.filter(item=> {
        return item !== token
    })
    return newTokens
}

module.exports.date2Epoch = () => {
    const date = new Date();
    const timeStamp = Math.floor(date.getTime()/1000.0)
    return timeStamp
}