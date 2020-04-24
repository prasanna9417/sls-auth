const {authenticate} = require('./middlewares/authenticate')
const {apiResponse, filterTokens} = require('./utils/helper')
const {updateTokens, findByEmailId} = require('./utils/db')

module.exports.signOut = async (event) => {
    
    const token = event.headers['x-auth']
    console.log('signout function', token)
    try{
        const res = await authenticate(token)
        console.log(res)
        if(res.status === 200){
            const {user,token} = res.body
            const {email} = user
            console.log(user,token,email)
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
                const response =  apiResponse(401, { error: 'user not found'})
                return response
            }
        }else if(res.status !== 200){
            const response = apiResponse(res.status, {error: res.error} )
            return response
        }
    }catch(err){
        const response =  apiResponse(400, { error: err})
        return response
    }
}

