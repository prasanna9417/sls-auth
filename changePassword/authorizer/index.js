const {validateToken, buildIAMPolicy, findByIdAndToken} = require('./utils')
const {authSign} = require('./config/authConfig')
 

module.exports.handler = async (event, context, callback) => {
  const token = event.authorizationToken;
  const arn = event.methodArn
  console.log('token')
    // Verify JWT
    console.log('token to be verified')
    const tokenData = validateToken(token, authSign);
    console.log(tokenData)
    if(tokenData){
        const user = tokenData
        try{
            const id = user.sub   
            const userData = await findByIdAndToken(id,token)
            console.log(userData)
            if(userData.Count === 1){
                const user = userData.Items[0]
                const authorizerContext = {user:JSON.stringify(user) }
                const effect = 'allow'
                // Return an IAM policy document for the current endpoint
                const policyDocument = buildIAMPolicy(id, effect, arn , authorizerContext);
                callback(null, policyDocument);
            }else if(userData.Count===0){
                callback('Unauthorized'); // Return a 401 Unauthorized response
            }
        }catch(err){
            callback(err)
        }

    }else{

        callback('Unauthorized'); // Return a 401 Unauthorized response
    
    }
};



 