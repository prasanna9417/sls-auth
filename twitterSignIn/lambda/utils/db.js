const {docClient, table} = require('../config/awsConfig')
const {date2Epoch, encryption, generateRandomPassword} = require('./helper')
const pick = require('lodash/pick')

module.exports.findByEmailId = async (email) => {
    const params = {
        TableName : table,
        IndexName : "email-index",
        KeyConditionExpression: "email = :email",
        ExpressionAttributeValues: {
            ":email": email
        }
    
    };
    const  queryObjectPromise = docClient.query(params).promise()
    let promise = new Promise((resolve, reject) => {
        queryObjectPromise
            .then(data=>{
                //console.log(data)
                resolve(data)
            })
            .catch(err=>{
                console.log("err",err)
                reject(err)
            })
    });
    const response = await promise;
    return response;

}


module.exports.findByUserName = async (user_name) => {
    const params = {
        TableName : table,
        IndexName : "user_name-index",
        KeyConditionExpression: "user_name = :user_name",
        ExpressionAttributeValues: {
            ":user_name": user_name
        }
    
    };
    const  queryObjectPromise = docClient.query(params).promise()
    let promise = new Promise((resolve, reject) => {
        queryObjectPromise
            .then(data=>{
                //console.log(data)
                resolve(data)
            })
            .catch(err=>{
                console.log("err",err)
                reject(err)
            })
    });
    const response = await promise;
    return response;

}

module.exports.createUserWithoutEmail = async(id,name,token) => {
    console.log('create user without email function')
    const  params = {
        TableName:table,
        Item:{
            "id": id,
            "user_name": name,
            "tokens":[token],
            "created_at": date2Epoch(),
            "updated_at": date2Epoch(),
            "otps": [],
            "primary_auth_type":"twitter-oauth2"
        }
    };
    const  putObjectPromise = docClient.put(params).promise()
    let promise = new Promise((resolve, reject) => {
        putObjectPromise
            .then(data=>{
                console.log('created')
                const userCreated = pick(params.Item, ['id', 'email', 'first_name', 'last_name', 'created_at'])
                resolve(userCreated)
            })
            .catch(err=>{
                console.log("err",err)
                reject(err)
            })
    });
    const response = await promise;
    return response;
 
}

module.exports.createUser = async(id,name,email,token) => {
    console.log('create user function')
    const randomPassword = generateRandomPassword()
    console.log(randomPassword)
    const password =  await encryption(randomPassword)
    console.log(password)
    const  params = {
        TableName:table,
        Item:{
            "id": id,
            "user_name": name,
            "email":  email,
            "password": password,
            "tokens":[token],
            "created_at": date2Epoch(),
            "updated_at": date2Epoch(),
            "otps": [],
            "primary_auth_type":"twitter-oauth2"
        }
    };
    const  putObjectPromise = docClient.put(params).promise()
    let promise = new Promise((resolve, reject) => {
        putObjectPromise
            .then(data=>{
                console.log('created')
                const userCreated = pick(params.Item, ['id', 'email', 'first_name', 'last_name', 'created_at'])
                resolve(userCreated)
            })
            .catch(err=>{
                console.log("err",err)
                reject(err)
            })
    });
    const response = await promise;
    return response;
 
}

module.exports.updateAddToken = async(id,token) => {
    const  params = {
        TableName: table,
        Key: {
          "id": id
        },
        UpdateExpression: "SET tokens = list_append(tokens, :tokenVal), updated_at = :time",
        ExpressionAttributeValues: {
          ":tokenVal": [token],
          ":time": date2Epoch()
        },
        ReturnValues: "UPDATED_NEW"
      }
    const  updateObjectPromise = docClient.update(params).promise()
    let promise = new Promise((resolve, reject) => {
        updateObjectPromise
            .then(data=>{
                console.log(data)
                resolve(true)
            })
            .catch(err=>{
                console.log("err",err)
                reject(err)
            })
    });
    const response = await promise;
    return response;
}
