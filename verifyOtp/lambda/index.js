const {findByMobileAndOTP, updateOTP, updateAddToken} = require('./utils/db')
const {filterOTP, generateToken, apiResponse} = require('./utils/helper')
 

module.exports.handler = async (event) => {
  const {mobile,otp} =  JSON.parse(event.body)
 
    try{
        const userData = await findByMobileAndOTP(mobile,otp)
        console.log(userData)
        if(userData.Count === 1){
            console.log('user found')
            const user = userData.Items[0]
            const {id,otps} = user
            console.log(id, otp)
            const newOTPs = filterOTP(otps,otp)
            console.log(newOTPs)
            const otpUpdated = updateOTP(id,newOTPs)
            const payload = {
                sub: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email
            }
            const token = generateToken(payload)    
            console.log(token)
            const tokenUpdated = await updateAddToken(id,token)
            const response = apiResponse(200,{accessToken:token})
            return response

        }else if(userData.Count===0){
            const response =  apiResponse(401, { error: 'unauthorized access'})
            return response
        }
    }catch(err){
        const response =  apiResponse(401, { error: err})
        return response
    }

};



 