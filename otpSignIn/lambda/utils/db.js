const {docClient, table} = require('../config/awsConfig')
const {date2Epoch} = require('./helper')

module.exports.updateAddOTP = async(id,otp) => {
    const  params = {
        TableName: table,
        Key: {
          "id": id
        },
        UpdateExpression: "SET otps = list_append(otps, :otpVal), updated_at = :time",
        ExpressionAttributeValues: {
          ":otpVal": [otp],
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

module.exports.findByMobile = async (mobile) => {
    console.log('find by mobile function')
    const params = {
        TableName : table,
        IndexName : "mobile-index",
        KeyConditionExpression: "mobile = :mobile",
        ExpressionAttributeValues: {
            ":mobile": mobile
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