
const { v4: uuidv4 } = require('uuid')
const random = uuidv4()
const client_id = '86mwacmqtxhrey'
const redirect_uri = 'http://localhost:3000'
const scope = encodeURIComponent('r_emailaddress,r_liteprofile')
console.log(scope)
 
const url = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&scope=${scope}&client_id=${client_id}&redirect_uri=${redirect_uri}&state=${random}`

console.log(url)



// AQQCv8bgV6NvABGmWRRHqCM2rA-Q7TjSt7hAKg94Ued2x4BkcNoE6psQwa9MiQPXQ0oJvcZMIuV826J6GiMvanEBL2iHkkCYW8LadA9HPFhtiRkQ9-JhNW2BW1fTTi_igbolRZuVHpfOIxwETSK7RcZi1ztbjQ9YgEJAeL6-L--vV1awt9xFTb8umNciUA 