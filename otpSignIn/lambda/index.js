 
const {findByMobile, updateAddOTP} = require('./utils/db')
const {generateRandom, apiResponse, sendSMS} = require('./utils/helper')
 
module.exports.otpSignIn = async (event) => {
 
    const {mobile} = JSON.parse(event.body)
    console.log(typeof mobile, mobile)
    if(mobile){ 
        try{
            const userData = await findByMobile(mobile)
            console.log(userData)
            if(userData.Count===1){
                const checkedUser = userData.Items[0]
                const {id} = checkedUser
                const otp = generateRandom()
                const otpUpdated= await updateAddOTP(id, otp)
                const sendOTP = await sendSMS(mobile,otp)
                console.log(sendOTP)
                const response = apiResponse(200,{message:'OTP send to your registered phone no'} )
                return response
                    
            }else if(userData.Count===0){
                const response = apiResponse(400,{error:'invalid mobile number'} )
                return response
            }
    
        }catch(err){
            const response = apiResponse(400, err)
            return response
                
        }

    }else{
        const response = apiResponse(400, {error: 'mobile number required'})
        return response
    }  
 
}
