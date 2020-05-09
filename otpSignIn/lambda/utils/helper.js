const axios = require('axios') 

module.exports.generateRandom = () => {
    console.log('random function')
    const random = Math.floor(Math.random()*1000000)
    console.log(random)
    return random

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

module.exports.sendSMS = async (phone_number, message) => {
    console.log('sms function')
    const promise = new Promise((resolve, reject) => {
      const encodedMessage = encodeURIComponent(message);
      axios.get(
        `https://api.msg91.com/api/sendhttp.php?route=4&sender=AUTOFX&message=${encodedMessage}&country=91&mobiles=${phone_number}&authkey=232733AwFZsFPJMnlF5b7aa560`
      )
        .then(res => {
          console.log(res.data);
          resolve(res.data);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
    const response = await promise;
    console.log('sms function ends')
    return response;
  };
