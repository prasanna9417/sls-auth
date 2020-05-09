const CryptoJS = require("crypto-js")
const axios = require('axios')
const {token_verifier_url, oauth_consumer_key, oauth_consumer_secret, verify_credentials_url} = require('../config/twitterAuthConfig')
const {generateRandom, date2Epoch} = require('./helper')


const hmac_hash = (oauth_base_string,oauth_signing_key) => {
    const hash = CryptoJS.HmacSHA1(oauth_base_string, oauth_signing_key)
    const hashInBase64 = CryptoJS.enc.Base64.stringify(hash)
    console.log('hash',hashInBase64)
    var hashSignature = encodeURIComponent(hashInBase64)
    console.log(hashSignature)
    return hashSignature
}


module.exports.verifyToken = async(oauth_token, oauth_verifier) => {
    console.log('verify token function')
    const url = `${token_verifier_url}?oauth_token=${oauth_token}&oauth_verifier=${oauth_verifier}`
    console.log(url)
    let promise = new Promise((resolve, reject) => {
        axios.post(url)
            .then(response => {
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



module.exports.getUserDetails = async(authorization_header) => {
    console.log('get user details function')
    const url = `${verify_credentials_url}?include_email=true`
    console.log(url)
    let promise = new Promise((resolve, reject) => {
        axios.get(url, {
            headers:{
                'Authorization': authorization_header
            }
        })
            .then(response => {
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


module.exports.getAuthorizationHeader = (oauth_token, oauth_token_secret) => {
    console.log('get authorization header function')
    const oauth_nonce = generateRandom()
    console.log(oauth_nonce)
    const oauth_timestamp = date2Epoch()
    console.log(oauth_timestamp)
    const http = 'GET'
    const url = verify_credentials_url
    console.log(url)
    const parameter_string = `include_email=true&oauth_consumer_key=${oauth_consumer_key}&oauth_nonce=${oauth_nonce}&oauth_signature_method=HMAC-SHA1&oauth_timestamp=${oauth_timestamp}&oauth_token=${oauth_token}&oauth_version=1.0`
    const oauth_base_string = `${http}&${encodeURIComponent(url)}&${encodeURIComponent(parameter_string)}`
    console.log(oauth_base_string)
    
    const oauth_signing_key = `${encodeURIComponent(oauth_consumer_secret)}&${encodeURIComponent(oauth_token_secret)}`
    console.log(oauth_signing_key)


    const oauth_signature = hmac_hash(oauth_base_string, oauth_signing_key)
    
    const authorization_header = `OAuth oauth_consumer_key="${oauth_consumer_key}",oauth_nonce="${oauth_nonce}",oauth_signature_method="HMAC-SHA1",oauth_timestamp="${oauth_timestamp}",oauth_signature="${oauth_signature}",oauth_token="${oauth_token}",oauth_version="1.0"`
    return authorization_header
}

module.exports.extractTokens = (token_data) => {
    const tokens = token_data.split('&')
    const new_oauth_token = tokens[0].split('=')[1]
    const oauth_token_secret = tokens[1].split('=')[1]
    const new_tokens = {new_oauth_token, oauth_token_secret}
    return new_tokens
}
