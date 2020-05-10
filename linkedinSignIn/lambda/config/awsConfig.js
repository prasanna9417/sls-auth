const aws= require("aws-sdk");
 
aws.config.update({
    region: 'us-east-1',
});

const docClient = new aws.DynamoDB.DocumentClient()
const table = 'auth-table'

module.exports = {
    docClient: docClient,
    table: table
}

 