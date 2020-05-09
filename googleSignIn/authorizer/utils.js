const {googleClient, googleClientId} = require('./googleAuthConfig')


module.exports.validateGoogleToken = async(token) => {

    let promise = new Promise((resolve, reject) => {
        googleClient.verifyIdToken({ idToken: token, audience: googleClientId })
            .then(response=>{
                console.log(response.payload)
                resolve(response.payload)
            })
            .catch(err=>{
                console.log(err)
                reject(err)
            })
    });
    const response = await promise;
    return response;
}

  
module.exports.buildIAMPolicy = (userId, effect, resource, context) => {
    const policy = {
    principalId: userId,
    policyDocument: {
        Version: '2012-10-17',
        Statement: [
        {
            Action: 'execute-api:Invoke',
            Effect: effect,
            Resource: resource,
        },
        ],
    },
    context,
    };

    return policy;
};


 
 
 
 