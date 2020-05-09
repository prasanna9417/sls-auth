const {buildIAMPolicy, validateGoogleToken} = require('./utils')
 

module.exports.googleOAuth2 = async (event, context, callback) =>{
    const token = event.authorizationToken;
    const arn = event.methodArn
    console.log('token')  
    try{
        const user = await validateGoogleToken(token)
        const id = user.sub
        const authorizerContext = {user:JSON.stringify(user) }
        const effect = 'allow'
        // Return an IAM policy document for the current endpoint
        const policyDocument = buildIAMPolicy(id, effect, arn , authorizerContext);
        callback(null, policyDocument);
    }catch(err){
        callback('Unauthorized'); // Return a 401 Unauthorized response
    }
 
}
