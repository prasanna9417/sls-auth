const {verifyToken, getAuthorizationHeader, getUserDetails, extractTokens} = require('./utils/twitterAuth')
const {findByEmailId, createUserWithoutEmail, createUser, updateAddToken, findByUserName} = require('./utils/db')
const {apiResponse,generateRandomId, generateToken} = require('./utils/helper')

module.exports.signIn = async (event) => {
    console.log(event.body)
    const {oauth_token, oauth_verifier} = JSON.parse(event.body)
    console.log(oauth_token, oauth_verifier)
    try{
        const token_data = await verifyToken(oauth_token, oauth_verifier)
        console.log(token_data)
        const {new_oauth_token, oauth_token_secret} = extractTokens(token_data)
        console.log(new_oauth_token, oauth_token_secret)
        const authorization_header = getAuthorizationHeader(new_oauth_token, oauth_token_secret)
        console.log(authorization_header)
        const userDetails = await getUserDetails(authorization_header)
        console.log(userDetails)
        const email = userDetails.email
        const name = userDetails.screen_name
        console.log(name)
        console.log('email',email)
        if(email){
            console.log('email exist')
            const userData = await findByEmailId(email)
            console.log(userData)
            if(userData.Count===1){
                console.log('user exist')
                const checkedUser = userData.Items[0]
                console.log(checkedUser)
                const payload = {sub: checkedUser.id, first_name: checkedUser.first_name, last_name: checkedUser.last_name, email: checkedUser.email }
                console.log(payload)
                const token = generateToken(payload)
                const tokenUpdated = await updateAddToken(checkedUser.id, token)
                const response =  apiResponse(200, { access_token: token})
                return response  
            }else if(userData.Count===0){
                console.log('user dosent exist')
                const random = generateRandomId()
                const id = `twitter-oauth2|${random}`
                const payload = {sub: id, user_name:name, email:email }
                const token = generateToken(payload)
                const userCreated= await createUser(id,name,email,token)
                const response =  apiResponse(200, { access_token: token})
                return response
            }
        }else{
            console.log('email dosent exist')
            const userData =  await findByUserName(name)
            if(userData.Count===1){
                console.log('user exist')
                const checkedUser = userData.Items[0]
                console.log(checkedUser)
                const payload = {sub: checkedUser.id, name: checkedUser.name}
                console.log(payload)
                const token = generateToken(payload)
                const tokenUpdated = await updateAddToken(checkedUser.id, token)
                const response =  apiResponse(200, { access_token: token})
                return response  
            }else if(userData.Count===0){
                console.log('user dosent exist')
                const random = generateRandomId()
                const id = `twitter-oauth2|${random}`
                const payload = {sub: id, user_name: name}
                const token = generateToken(payload)
                const userCreated= await createUserWithoutEmail(id,name,token)
                const response =  apiResponse(200, { access_token: token})
                return response
 
            }
        }

    }catch(err){
        const response =  apiResponse(400, { error: 'Unauthorised'})
        return response
    }
 
}