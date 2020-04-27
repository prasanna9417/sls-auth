const {generateToken, apiResponse} = require('./utils/helper')
const {sendforgotPasswordEmail} = require('./utils/ses')
const {findByEmailId} = require('./utils/db')

module.exports.forgotPassword = async (event)=>{
     
    const {email} = JSON.parse(event.body)
    console.log(email)
    try{
        const userData = await findByEmailId(email)
        console.log(userData)
        if(userData.Count===1){
            const payload = { email :email}
            const token = generateToken(payload)
            console.log('token generated')
            await sendforgotPasswordEmail(email,token)
            const response = apiResponse(200,{error:"Password reset link sent to mail"})
            return response
        }else if(userData.Count === 0){
            const response = apiResponse(400,{error:"User with mail id does not exists"})
            return response
        }
    }catch (err) {
        const response = apiResponse(400,err)
        return response
    }

 
}