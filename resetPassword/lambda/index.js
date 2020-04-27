const {updatePassword} = require('./utils/db')
const {encryption, apiResponse, validatePassword} = require('./utils/helper')


module.exports.resetPassword = async(event) => {
    
    //console.log(event)
    //console.log(event.requestContext.authorizer)
    const {user} = event.requestContext.authorizer
    const {id} = JSON.parse(user)
    console.log(event.body)
    const {password} = JSON.parse(event.body)
    console.log(password)
    const error = validatePassword(password)
    if(error.length === 0 ){
        try{
            const encryptedPassword =  await encryption(password)
            console.log(encryptedPassword)
            const passwordUpdated = await updatePassword(id,encryptedPassword)
            console.log(passwordUpdated)
            const response = apiResponse(200, {message: 'password changed'})   
            return response   
        }catch(err){
            const response = apiResponse(400, {error: err})   
            return response   
        }
    }else if(error.length >0){
        const response = apiResponse(400, {error: "password length should be between 6 and 128"})   
        return response   
    }
}