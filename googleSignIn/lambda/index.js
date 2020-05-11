const {apiResponse,generateRandom, generateToken} = require('./utils/helper')
const {findByEmailId, createUser, updateAddToken} = require('./utils/db')

module.exports.googleSignIn = async (event) => {
    console.log(event.requestContext.authorizer)
    const userObj = event.requestContext.authorizer.user
    console.log('google  login function', userObj)
    const user = JSON.parse(userObj)
    console.log(user)
    const id = user.id
    const email = user.email
    try{
        const userData = await findByEmailId(email)
        console.log(userData)
        if(userData.Count===1){
            console.log('user exist')
            const checkedUser = userData.Items[0]
            console.log(checkedUser)
            let payload
            if(checkedUser.first_name && checkedUser.last_name){
                payload = {sub: checkedUser.id, first_name: checkedUser.first_name, last_name: checkedUser.last_name, email: checkedUser.email }
                console.log(payload)
            }else if(checkedUser.user_name){
                payload = {sub: checkedUser.id, user_name: checkedUser.user_name, email: checkedUser.email }
                console.log(payload)
            }
            const token = generateToken(payload)
            const tokenUpdated = await updateAddToken(checkedUser.id, token)
            const response =  apiResponse(200, { access_token: token})
            return response  
        }else if(userData.Count===0){
            console.log('user dosent exist', user)
            const random = generateRandom()
            const id = `google-oauth2|${random}`
            const payload = {sub: id, first_name: user.first_name, last_name: user.first_name, email:user.email }
            const token = generateToken(payload)
            const userCreated= await createUser(user, id, token)
            const response =  apiResponse(200, { access_token: token})
            return response
        }
 
    }catch(err){
        const response =  apiResponse(400, { error: err})
        return response
    }
}

