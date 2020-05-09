// const date2Epoch = (date) => {
//     //const date = new Date();
//     //const timestamp = Math.floor(date.getTime()/1000.0)
//     const epochValue = Math.floor(new Date(date).getTime() /1000.0);
//     return epochValue
// }

// const timeStamp = date2Epoch('Thu Apr 23 2020 14:01:22 GMT+0000 (Coordinated Universal Time')
// console.log(timeStamp)



// const epoch2Date = (timeStamp) => {
//     const date = new Date(timeStamp*1000);
//     return date
// }

// const date = epoch2Date(timeStamp)
// console.log(date)


// const jwt = require('jsonwebtoken') 

// const signInToken = jwt.sign({api:'auth-signin'}, "very-very-secret", {

//     expiresIn: '60000'  

// });

// console.log(signInToken)

// const signUpToken = jwt.sign({api:'auth-signup'}, "very-very-secret", {

//     expiresIn: '60000'  

// });

// console.log(signUpToken)

// const forgotPasswordToken = jwt.sign({api:'auth-forgotpassword'}, "very-very-secret", {

//     expiresIn: '60000' 

// });

// console.log(forgotPasswordToken)




// const validateToken = (token) => {
//     try{
//         const tokenData = jwt.verify(token, "very-very-secret")
//         return tokenData
//     }catch(err){
//         let error = false
//         return error
//     }
// }

 

// const signInTokenValidated = validateToken(signInToken)
// console.log(signInTokenValidated)

// const signUpTokenValidated = validateToken(signUpToken)
// console.log(signUpTokenValidated)

// const forgotPasswordTokenValidated = validateToken(forgotPasswordToken)
// console.log(forgotPasswordTokenValidated)


// const CLIENT_ID = "543804089315-pjje1pbnov5618b4j1tfgtnl2ed6jqhk.apps.googleusercontent.com"


// const {OAuth2Client} = require('google-auth-library');
// const client = new OAuth2Client(CLIENT_ID);

// const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjI4Yjc0MWU4ZGU5ODRhNDcxNTlmMTllNmQ3NzgzZTlkNGZhODEwZGIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNTQzODA0MDg5MzE1LXBqamUxcGJub3Y1NjE4YjRqMXRmZ3RubDJlZDZqcWhrLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNTQzODA0MDg5MzE1LXBqamUxcGJub3Y1NjE4YjRqMXRmZ3RubDJlZDZqcWhrLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA3NzA4MTc3MjQ3NzI1MTk2MzM3IiwiaGQiOiJhbnRzdGFjay5pbyIsImVtYWlsIjoicHJhc2FubmFAYW50c3RhY2suaW8iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IlVMTDM5MFJmX2hsT1ZjQ1pRbkxJUEEiLCJuYW1lIjoiUHJhc2FubmEgQmFsYWppIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS8tLXNvUjhkWkpBNjQvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQUEvQUFLV0pKUGoxMTRJb0pkQWVYTjBRSTMxb1pUQlB2VU1RUS9zOTYtYy9waG90by5qcGciLCJnaXZlbl9uYW1lIjoiUHJhc2FubmEgIiwiZmFtaWx5X25hbWUiOiJCYWxhamkiLCJsb2NhbGUiOiJlbi1HQiIsImlhdCI6MTU4ODAxNTExNiwiZXhwIjoxNTg4MDE4NzE2LCJqdGkiOiJiZTZiM2Y2ZThhYTM5M2U3MjBiM2E1NjVkZjBjYmU5YjFhNWE0NWI1In0.bk91rNpaquqVxH8l3wl5g5Hd_4hx4d7QSgN7aVkEFLiCqb77lLzMDogWKtIXJhHYIIh3yKdq_7svYWfDzCQmu-bq38twRR2H4RhT2YM848-BbmrRry91ReG2bPgLVhXieNQvLA8Wcaxvr2qswYBMPJJWutq9pDEtIQDkOEt6VaUi8nYxt2EEzKN4M8GbDV4Exft13dWVdiD6Hb5nJ7AXADKYBTvu1dTq28BidB4A4YpnPHpyfKqhKD0U2HiVM-jh8Z81R3l9oPtqiXSeHOh3dNeorqtYyo3Sln9zf_JPinss2-OHPn2PLvJPMz-tjewhGfZlm6Qx--esPaTOL76vPQ"


// client.verifyIdToken({ idToken: token, audience: CLIENT_ID })
//    .then(response=>{
//       console.log(response.payload)
//    })
//    .catch(err=>{
//       console.log(err)
//    })



// const axios = require('axios')

// const clientId = 550965442521996
// const clientSecret = "14d014504f32f88ac3dd71fb0a3820ba"

// const accessTokenLink = appLink = `https://graph.facebook.com/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`

// let accessToken

// const userToken = 'EAAH1GaN8K4wBAH2KvlyS4RfFvzyeYDDfhXRdIZBKr828GLZAJg4T6VaZAcCV9UEJTtZAuuJeWFgTHnKF8mhj1hQnmJxf3GFZAE8mUTDJZAFzaBvE45oSGF9MOFXvn0cR33ugpv4S1LzGmVOFihe9rvSjqT7RVTlDq5BRBi15Kmp2r2sLgJYcgnLgd1XLIIbYkZB1w7NgBDZB5AZDZD'

// axios.get(accessTokenLink)  
//     .then(response=>{
//         console.log(response.data)
//         accessToken = response.data.access_token
//         const debugLink = `https://graph.facebook.com/debug_token?input_token=${userToken}&access_token=${accessToken}`
//         axios.get(debugLink)
//             .then(response=>{
//                 console.log(response.data)
//                 const user_id = response.data.data.user_id
//                 console.log(user_id)
//                 const userDetailsLink = `https://graph.facebook.com/${user_id}?fields=id,name,email,first_name,last_name,hometown&access_token=${userToken}`
//                 //const userDetailsLink = `https://graph.facebook.com/v2.3/me?access_token=${userToken}&fields=name%2Cemail%2Cpicture&locale=en_US&method=get&pretty=0&sdk=joey&suppress_http_code=1`
//                 axios.get(userDetailsLink)
//                     .then(response=>{
//                         console.log(response.data)
//                     })
//                     .catch(err=>{
//                         console.log(err)
//                     })
//             })
//             .catch(err=>{
//                 console.log(err)
//             })
//     })
//     .catch(err=>{
//         console.log(err)
//     })

 
// var AWS = require("aws-sdk");

// AWS.config.update({
//   region: "us-east-1",
// });

// var docClient = new AWS.DynamoDB.DocumentClient();

 

// var params = {
//     TableName : "auth-table",
//     KeyConditionExpression: "mobile = :mobile",
 
//     ExpressionAttributeValues: {
//         ":mobile": 9791264254
//     }
// };

// docClient.query(params, function(err, data) {
//     if (err) {
//         console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
//     } else {
//         console.log("Query succeeded.");
//         data.Items.forEach(function(item) {
//             console.log(" -", item.year + ": " + item.title);
//         });
//     }
// });



const oauth_callback = encodeURIComponent('http://localhost:3000')

const { v4: uuidv4 } = require('uuid')
const oauth_nonce	 = uuidv4().replace(/[^a-zA-Z0-9]/g, '')
console.log(oauth_nonce	)

const oauth_consumer_key = 'aMBKD5pK1kSAoBFJXVNaG6SHx'

const date = new Date()
const oauth_timestamp = Math.floor(date.getTime()/1000.0)
console.log(oauth_timestamp)



const http = 'POST'

const url = 'https://api.twitter.com/oauth/request_token'

const parameter_string = `oauth_callback=${oauth_callback}&oauth_consumer_key=${oauth_consumer_key}&oauth_nonce=${oauth_nonce}&oauth_signature_method=HMAC-SHA1&oauth_timestamp=${oauth_timestamp}&oauth_version=1.0`

console.log(parameter_string)

const oauth_base_string = `${http}&${encodeURIComponent(url)}&${encodeURIComponent(parameter_string)}`

console.log(oauth_base_string)


const oauth_consumer_secret = 'g1jHd4u81A6Wt8EiV43hz1kYORUPiOeGsr3rjnBmnh4mJGmpRJ'

const oauth_signing_key = `${encodeURIComponent(oauth_consumer_secret)}&`
console.log(oauth_signing_key)

 
const CryptoJS = require("crypto-js")
const hash = CryptoJS.HmacSHA1(oauth_base_string, oauth_signing_key)
var hashInBase64 = CryptoJS.enc.Base64.stringify(hash)
console.log('hash',hashInBase64)

var hashSignature = encodeURIComponent(hashInBase64)
console.log(hashSignature)

const oauth_signature = hashSignature

 



const authorization_header = `OAuth oauth_nonce="${oauth_nonce}",oauth_callback="${oauth_callback}",oauth_signature_method="HMAC-SHA1",oauth_timestamp="${oauth_timestamp}",oauth_consumer_key="${oauth_consumer_key}",oauth_signature="${oauth_signature}",oauth_version="1.0"`

console.log(authorization_header)

