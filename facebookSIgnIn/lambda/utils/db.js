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

module.exports.createUser = async(user, id,token) => {
    console.log('create user function')
    const randomPassword = generateRandomPassword()
    console.log(randomPassword)
    const password =  await encryption(randomPassword)
    console.log(password)
    const  params = {
        TableName:table,
        Item:{
            "id": id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email":  user.email,
            "password": password,
            "tokens":[token],
            "created_at": date2Epoch(),
            "updated_at": date2Epoch(),
            "auth_id": user.id,
            "primary_auth_type":"facebook-oauth2"
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

module.exports.findByAuthTypeAndId = async (id) => {
    console.log('find by auth type and id function')
    const params = {
        TableName : table,
        IndexName : "primary_auth_type-index",
        KeyConditionExpression: "primary_auth_type = :auth",
        FilterExpression: "auth_id = :id",
        ExpressionAttributeValues: {
            ":auth": "facebook-oauth2",
            ":id": id
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


module.exports.createUserWithoutEmail = async(id,first_name,last_name,auth_id,token) => {
    console.log('create user without email function')
    const  params = {
        TableName:table,
        Item:{
            "id": id,
            "first_name": first_name,
            "last_name": last_name,
            "auth_id":  auth_id,
            "tokens":[token],
            "created_at": date2Epoch(),
            "updated_at": date2Epoch(),
            "primary_auth_type":"facebook-oauth2"
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