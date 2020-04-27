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

const signInToken = jwt.sign({api:'auth-signin'}, "very-very-secret", {

    expiresIn: '60000'  

});

console.log(signInToken)

const signUpToken = jwt.sign({api:'auth-signup'}, "very-very-secret", {

    expiresIn: '60000'  

});

console.log(signUpToken)

const forgotPasswordToken = jwt.sign({api:'auth-forgotpassword'}, "very-very-secret", {

    expiresIn: '60000' 

});

console.log(forgotPasswordToken)




const validateToken = (token) => {
    try{
        const tokenData = jwt.verify(token, "very-very-secret")
        return tokenData
    }catch(err){
        let error = false
        return error
    }
}

 

const signInTokenValidated = validateToken(signInToken)
console.log(signInTokenValidated)

const signUpTokenValidated = validateToken(signUpToken)
console.log(signUpTokenValidated)

const forgotPasswordTokenValidated = validateToken(forgotPasswordToken)
console.log(forgotPasswordTokenValidated)