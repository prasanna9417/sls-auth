const {docClient, table,} = require('../config/awsConfig')
const {date2Epoch} = require('./helper')

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