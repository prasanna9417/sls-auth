const bcryptjs = require('bcryptjs')


const otpValidator = async (otp1, otp2)=>{
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


const otps = [
'$2a$10$tf9opi2agoEFWrsovS.yuukICd/SCKB1XqbkhXiDxwMQ8Xpqa5AZO',
'$2a$10$tf9opi2agoEFWrsovS.yuukICd/SCKB1XqbkhXiDxwMQ8Xpqa5AZL',
'$2a$10$tf9opi2agoEFWrsovS.yuukICd/SCKB1XqbkhXiDxwMQ8Xpqa5AZ'

]


const validateOtp = async(otp, otps) => {
    for(let i=0; i<otps.length; i++){
        const r = await otpValidator(otp,otps[i])
        if(r){
            return otps[i]
        }
    }
}
 
const result = async() => {
    const r = await validateOtp('221416', otps)
    console.log(r)
}

result()

