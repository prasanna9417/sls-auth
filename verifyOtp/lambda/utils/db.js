const {docClient, table} = require('../config/awsConfig')
const {date2Epoch} = require('./helper')

module.exports.findByMobile = async(mobile) => {
    console.log("find by mobile  funciton", mobile)
    const  params = {
        TableName: table,
        IndexName : "mobile-index",
        KeyConditionExpression: "mobile = :mobile",
        ExpressionAttributeValues: {
            ":mobile": mobile,
             
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
    console.log("mobile funciton ends")
    return response;
}


module.exports.updateOTP = async(id,otps)=>{
    console.log("update otp funciton")
    console.log(id,otps)
    const params = {
        TableName:table,
        Key:{
            "id": id
        },
        UpdateExpression: "set otps = :otps, updated_at = :time",
        ExpressionAttributeValues:{
            ":otps": otps,
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
    console.log("update otp funciton ends")
    return response;
}


module.exports.updateAddToken = async(id,token) => {
    console.log('update token function')
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
    console.log('update token function ends')
    return response;
}