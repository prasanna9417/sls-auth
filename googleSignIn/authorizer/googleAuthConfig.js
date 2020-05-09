const {OAuth2Client} = require('google-auth-library')
const clientId = "543804089315-pjje1pbnov5618b4j1tfgtnl2ed6jqhk.apps.googleusercontent.com"

const googleClient = new OAuth2Client(clientId)

module.exports={
    googleClient: googleClient,
    googleClientId: clientId
}