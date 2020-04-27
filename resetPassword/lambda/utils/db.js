const {docClient, table} = require('../config/awsConfig')
const {date2Epoch} = require('./helper')

module.exports.updatePassword = async(id,password)=>{
    console.log(id,password)
    const params = {
        TableName:table,
        Key:{
            "id": id
        },
        UpdateExpression: "set password = :password, updated_at= :time",
        ExpressionAttributeValues:{
            ":password": password,
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
    return response;
}

 