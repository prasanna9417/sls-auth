 const {apiResponse, filterTokens} = require('./utils/helper')
const {updateTokens, findByEmailId} = require('./utils/db')

module.exports.signOut = async (event) => {
    console.log(event.requestContext.authorizer)
    const {token,user} = event.requestContext.authorizer
    console.log('signout function', user)
    try{
        const {email} = JSON.parse(user)
        console.log(email)
        const userData = await findByEmailId(email)
        console.log(userData)
        if(userData.Count===1){
            const {tokens,id} = userData.Items[0]
            //console.log(tokens)
            const newTokens = filterTokens(tokens,token)
            console.log(newTokens)
            const tokensUpdated = await updateTokens(id, newTokens)
            const response = apiResponse(200, {message: 'successfully logged out'})   
            return response   
        }else if(userData.Count===0){
            const response =  apiResponse(401, { error: 'unauthorized access'})
            return response
        }
 
    }catch(err){
        const response =  apiResponse(400, { error: err})
        return response
    }
}

