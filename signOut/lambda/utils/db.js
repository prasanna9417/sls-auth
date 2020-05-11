const {docClient, table} = require('../config/awsConfig')
const {date2Epoch} = require('./helper')

module.exports.findByIdAndToken = async(id,token) => {
    console.log("find by id and token funciton")
    const  params = {
        TableName: table,
        KeyConditionExpression: "id = :id",
        FilterExpression: "contains(tokens, :tokenVal)",
        ExpressionAttributeValues: {
            ":id": id,
            ":tokenVal":  token
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
    console.log("token id funciton ends")
    return response;
}


module.exports.updateTokens = async(id,tokens)=>{
    console.log("update tokens funciton")
    console.log(id,tokens)
    const params = {
        TableName:table,
        Key:{
            "id": id
        },
        UpdateExpression: "set tokens = :tokens, updated_at = :time",
        ExpressionAttributeValues:{
            ":tokens": tokens,
            ":time": date2Epoch()
        },
        ReturnValues: "UPDATED_NEW"
    };
    const  updateObjectPromise = docClient.update(params).promise()
    let promise = new Promise((resolve, reject) => {
        updateObjectPromise
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
    console.log("update tokens funciton ends")
    return response;
}

module.exports.findById = async (id) => {
    const params = {
        TableName : table,
        KeyConditionExpression: "id = :id",
        ExpressionAttributeValues: {
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