
const { v4: uuidv4 } = require('uuid')
const oauth_nonce	 = uuidv4().replace(/[^a-zA-Z0-9]/g, '')
console.log(oauth_nonce	)

const oauth_consumer_key = 'aMBKD5pK1kSAoBFJXVNaG6SHx'
const oauth_consumer_secret = 'g1jHd4u81A6Wt8EiV43hz1kYORUPiOeGsr3rjnBmnh4mJGmpRJ'

const date = new Date()
const oauth_timestamp = Math.floor(date.getTime()/1000.0)
console.log(oauth_timestamp)

const oauth_token = "945828337-EOZUe3ZZzDaFJu91iWn3esp30XpvPc3axidjFx3X"

const oauth_token_secret = "ZS3GIaLMT4xTcSp1nhovJAHwRbyImrbYiifo2HtUeNbUN"

const url = 'https://api.twitter.com/1.1/account/verify_credentials.json'

const parameter_string = `include_email=true&oauth_consumer_key=${oauth_consumer_key}&oauth_nonce=${oauth_nonce}&oauth_signature_method=HMAC-SHA1&oauth_timestamp=${oauth_timestamp}&oauth_token=${oauth_token}&oauth_version=1.0`

const oauth_base_string = `GET&${encodeURIComponent(url)}&${encodeURIComponent(parameter_string)}`

console.log(oauth_base_string)

const oauth_signing_key = `${encodeURIComponent(oauth_consumer_secret)}&${encodeURIComponent(oauth_token_secret)}`
console.log(oauth_signing_key)

const CryptoJS = require("crypto-js")
const hash = CryptoJS.HmacSHA1(oauth_base_string, oauth_signing_key)
var hashInBase64 = CryptoJS.enc.Base64.stringify(hash)
console.log('hash',hashInBase64)

var hashSignature = encodeURIComponent(hashInBase64)
console.log(hashSignature)

const oauth_signature = hashSignature

const authorization_header = `OAuth oauth_consumer_key="${oauth_consumer_key}",oauth_nonce="${oauth_nonce}",oauth_signature_method="HMAC-SHA1",oauth_timestamp="${oauth_timestamp}",oauth_signature="${oauth_signature}",oauth_token="${oauth_token}",oauth_version="1.0"`

console.log(authorization_header)
