const {buildIAMPolicy, getAccessToken, validateUserToken, getUserDetails} = require('./utils')
 

module.exports.facebookOAuth2 = async (event, context, callback) =>{
    const userToken = event.authorizationToken;
    const arn = event.methodArn
    console.log('token', userToken)  
    try{
        const accessToken = await getAccessToken()
        const userId = await validateUserToken(userToken, accessToken)
        const user = await getUserDetails(userId, userToken)
        const authorizerContext = {user:JSON.stringify(user) }
        const effect = 'allow'
        // Return an IAM policy document for the current endpoint
        const policyDocument = buildIAMPolicy(userId, effect, arn , authorizerContext);
        callback(null, policyDocument);
    }catch(err){
        callback('Unauthorized'); // Return a 401 Unauthorized response
    }
 
}
