const client_id = '86mwacmqtxhrey'
const client_secret = 'bpRp6DLUN37Re1Tv'
const redirect_uri = 'http://localhost:3000'
const token_uri = `https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}` 
const email_uri = `https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))`
const user_uri = 'https://api.linkedin.com/v2/me'


module.exports = {
    token_uri, 
    email_uri,
    user_uri
}

 