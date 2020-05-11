const bcryptjs = require('bcryptjs')


const otpValidator = async (otp1, otp2)=>{
    console.log('otp validator function')
    let promise = new Promise((resolve,reject)=>{
        bcryptjs.compare(otp1, otp2)
            .then(result=>{
                //console.log(result)
                resolve(result)
               
            })
            .catch(err=>{
                reject(err)
            })
    })
    const response = await promise;
    return response;
}


module.exports.validateOtp = async(otp, otps) => {
    console.log('validator function')
    for(let i=0; i<otps.length; i++){
        const result = await otpValidator(otp,otps[i])
        if(result){
            return otps[i]
        }
    }
}


 