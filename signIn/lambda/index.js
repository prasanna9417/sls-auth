const {userSignInValidator, validatePassword} = require('./utils/validator')
const {findByEmailId, updateAddToken} = require('./utils/db')
const {generateToken, apiResponse} = require('./utils/helper')
 
module.exports.signIn = async (event) => {
 
    const user = JSON.parse(event.body)
    const {email} = user
    const errors = userSignInValidator(user)
    //console.log(errors,"errors list")
    if(errors.length===0){
        //console.log("error lenght 0")
        try{
            const userData = await findByEmailId(email)
            console.log(userData)
            if(userData.Count===1){
                const checkedUser = userData.Items[0]
                //console.log("validatePassword")
                const isValidated = await validatePassword(user.password, checkedUser.password)
                
                if(isValidated) {
                    const payload = {
                        sub: checkedUser.id,
                        first_name:checkedUser.first_name,
                        last_name: checkedUser.last_name,
                        email:checkedUser.email
                    }
                        
                    const token = generateToken(payload)    
                    console.log(token)
                    const tokenUpdated = await updateAddToken(checkedUser.id,token)
                    const response = apiResponse(200,{accessToken:token})
                    return response
    
                }else {
                    const response = apiResponse(400,{error:'invalid email / password '} )
                    return response
                }
                    
            }else if(userData.Count===0){
                const response = apiResponse(400,{error:'invalid email / password '} )
                return response
            }
    
        }catch(err){
            const response = apiResponse(400, err)
            return response
                
        }

    }else if(errors.length>0){
        const response = apiResponse(400, errors)
        return response
    }  
 
}
