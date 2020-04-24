const {findByIdAndToken} = require("../utils/db")
const {validateToken } = require("../utils/helper")


module.exports.authenticate = async(token) => {
    const tokenData = validateToken(token)
    console.log(tokenData)
    if(tokenData){
        const {sub} = tokenData
        try{
            const userData = await findByIdAndToken(sub,token)
            console.log(userData)
            if(userData.Count ===  1){
                user = userData.Items[0]
                console.log('authenticate ends')
                return { status:200, body:{user:user, token:token} }
            } else if(userData.Count===0){
                return {status:401, error:'unauthorized access'}
            }
        }catch(err){
            return {status:401, error:err}
        }
        
    }else{
        return {status:401, error:'unauthorized access'}
    }
}

 