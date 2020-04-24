const {userSignUpValidator} = require('./utils/validator')
const {encryption, apiResponse} = require('./utils/helper')
const {findByEmailId, createUser} = require('./utils/db')
 

module.exports.signUp = async (event)=>{
     
    const user = JSON.parse(event.body)

    const {email} = user
    const errors = userSignUpValidator(user)
    
    if(errors.length===0){
        user.password = await encryption(user.password)
        console.log(user.password)
        try {
            const userData = await findByEmailId(email)
            console.log(userData)
            if(userData.Count===0){
                const userCreated = await createUser(user)
                const response = apiResponse(200, userCreated)
                console.log(response)
                return response
            
            }else if(userData.Count === 1){
                const response = apiResponse(400,{error:"User with mail id already exists"})
                return response
            }
        }catch (err) {
            const response = apiResponse(400,err)
            return response
        }

    }else if(errors.length>0){
        const response = apiResponse(400,errors)
        return response
    }
 
}