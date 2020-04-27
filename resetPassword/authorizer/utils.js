const jwt = require('jsonwebtoken');
const {docClient, table,} = require('./config/awsConfig')

module.exports.validateToken = (token, authSign) => {
  try{
      const tokenData = jwt.verify(token, authSign)
      return tokenData
  }catch(err){
      let error = false
      return error
  }
}

  
module.exports.buildIAMPolicy = (userId, effect, resource, context) => {
  const policy = {
    principalId: userId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource,
        },
      ],
    },
    context,
  };

  return policy;
};

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
