const aws= require("aws-sdk");
 
aws.config.update({
    region: 'us-east-1',
});

const sesClient =  new aws.SES()
const docClient = new aws.DynamoDB.DocumentClient()
const table = 'auth-table'
 
module.exports = {
    sesClient: sesClient,
    docClient: docClient,
    table: table
}

 
 