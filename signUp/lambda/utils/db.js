const {docClient, table,} = require('../config/awsConfig')
const {generateRandom, date2Epoch} = require('./helper')
const pick = require('lodash/pick')

module.exports.createUser = async(user) => {
    console.log('create user function')
    const random = generateRandom()
    console.log(random)
    const  params = {
        TableName:table,
        Item:{
            "id": random,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email":  user.email,
            "password": user.password,
            "tokens":[],
            "created_at": date2Epoch(),
            "updated_at": date2Epoch()
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