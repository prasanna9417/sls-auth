const axios = require('axios')
// const oauth_token = 'KzxFVAAAAAABEJ4hAAABcfMxRoU'
// const oauth_verifier = 'sY05Yuu5Z4NUikyB1vNBBGXFsfGIjt8H'
// const url =`https://api.twitter.com/oauth/access_token?oauth_token=${oauth_token}&oauth_verifier=${oauth_verifier}`
// axios.post(url)
//     .then(response => {
//         console.log(response.data)
//     })
//     .catch(err=>{
//         console.log(err)
//     })


const data = 'oauth_token=945828337-EOZUe3ZZzDaFJu91iWn3esp30XpvPc3axidjFx3X&oauth_token_secret=ZS3GIaLMT4xTcSp1nhovJAHwRbyImrbYiifo2HtUeNbUN&user_id=945828337&screen_name=prasanna2794'

const data1 =  data.split('&')
console.log(data1)

const oauth_token = data1[0].split('=')[1]
console.log(oauth_token)

const oauth_token_secret = data1[1].split('=')[1]
console.log(oauth_token_secret)


ts