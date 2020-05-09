const axios  = require('axios')
const {facebookClientId, facebookClientSecret} = require('./facebookAuthConfig')


module.exports.getAccessToken = async() => {
    console.log('get access token function')
    const accessTokenLink = appLink = `https://graph.facebook.com/oauth/access_token?client_id=${facebookClientId}&client_secret=${facebookClientSecret}&grant_type=client_credentials`
    let promise = new Promise((resolve, reject) => {
        axios.get(accessTokenLink)
            .then(response=>{
                console.log(response.data)
                resolve(response.data.access_token)
            })
            .catch(err=>{
                console.log(err)
                reject(err)
            })
    });
    const response = await promise;
    return response;
}

module.exports.validateUserToken = async(userToken, accessToken) => {
    console.log('validate user token')
    const validateUserTokenLink = `https://graph.facebook.com/debug_token?input_token=${userToken}&access_token=${accessToken}`
    let promise = new Promise((resolve, reject) => {
        axios.get(validateUserTokenLink)
            .then(response=>{
                console.log(response.data)
                const user_id = response.data.data.user_id
                if(user_id){
                    resolve(user_id)
                }
                reject(false)
            })
            .catch(err=>{
                console.log(err)
                reject(err)
            })
    });
    const response = await promise;
    return response;
}

module.exports.getUserDetails = async(userId, userToken) => {
    console.log('get user details')
    const userDetailsLink = `https://graph.facebook.com/${userId}?fields=id,name,email,first_name,last_name&access_token=${userToken}`
    let promise = new Promise((resolve, reject) => {
        axios.get(userDetailsLink)
            .then(response=>{
                console.log(response.data)
                resolve(response.data)
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


 