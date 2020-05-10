const {token_uri, email_uri, user_uri} = require('../config/linkedinAuthConfig')
const axios = require('axios')

module.exports.getAccessToken =  async(code) => {
    console.log('get access token function')
    const url = `${token_uri}&code=${code}`
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

module.exports.getEmail = async(accessToken) => {
    console.log(' get email function')
    const url = email_uri
    let promise = new Promise((resolve, reject) => {
        axios.get(url,{
            headers:{
                'Authorization': `Bearer ${accessToken}`
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

module.exports.getName = async(accessToken) => {
    console.log(' get name function')
    const url = user_uri
    let promise = new Promise((resolve, reject) => {
        axios.get(url,{
            headers:{
                'Authorization': `Bearer ${accessToken}`
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


 