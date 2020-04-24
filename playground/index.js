const date2Epoch = (date) => {

    //const date = new Date();
    //const timestamp = Math.floor(date.getTime()/1000.0)
    const epochValue = Math.floor(new Date(date).getTime() /1000.0);
    return epochValue
}

const timeStamp = date2Epoch('Thu Apr 23 2020 14:01:22 GMT+0000 (Coordinated Universal Time')
console.log(timeStamp)



const epoch2Date = (timeStamp) => {
    const date = new Date(timeStamp*1000);
    return date
}

const date = epoch2Date(timeStamp)
console.log(date)


const jwt = require('jsonwebtoken') 

const token = jwt.sign({email_id:'123@gmail.com'}, "Stack", {

    expiresIn: '365d' // expires in 365 days

});

console.log(token)



const validateToken = (token) => {
    try{
        const tokenData = jwt.verify(token, "Stack")
        return tokenData
    }catch(err){
        let error = false
        return error
    }
}

const tokenValidated = validateToken(token)
console.log(tokenValidated)