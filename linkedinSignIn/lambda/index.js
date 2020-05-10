const {apiResponse, generateToken, generateRandom} = require('./utils/helper')
const {getAccessToken, getEmail, getName} = require('./utils/linkedinAuth')
const {findByEmailId, findByAuthTypeAndId,createUser, createUserWithoutEmail,updateAddToken} = require('./utils/db')

module.exports.signIn = async (event) => {
    const {code} = JSON.parse(event.body)
    try{
        const {access_token} = await getAccessToken(code)
        console.log(access_token)
        const emailData = await getEmail(access_token)
        let email
        if(emailData.elements.length >0){
            email = emailData['elements'][0]['handle~']['emailAddress']
            console.log(email)
        }else if(emailData.elements.length === 0){
            email = false
            console.log(email)
        }
        if(email){
            console.log('email exist')
            const userData =  await findByEmailId(email)
            if(userData.Count===1){
                console.log('user exist')
                const checkedUser = userData.Items[0]
                console.log(checkedUser)
                let payload
                if(checkedUser.first_name && checkedUser.last_name){
                    payload = {sub: checkedUser.id, first_name: checkedUser.first_name, last_name: checkedUser.last_name, email: checkedUser.email }
                    console.log(payload)
                }else if(checkedUser.user_name){
                    payload = {sub: checkedUser.id, user_name: checkedUser.user_name, email: checkedUser.email }
                    console.log(payload)
                }
                const token = generateToken(payload)
                const tokenUpdated = await updateAddToken(checkedUser.id, token)
                const response =  apiResponse(200, { access_token: token})
                return response  
     
            }else if(userData.Count===0){
                console.log('user dosent exist')
                const random = generateRandom()
                const id = `linkedin-oauth2|${random}`
                const {localizedFirstName, localizedLastName} = await getName(access_token)
                const payload = {sub: id, first_name:localizedFirstName, last_name:localizedLastName, email:email }
                const token = generateToken(payload)
                const userCreated= await createUser(id,localizedFirstName, localizedLastName,email,token)
                const response =  apiResponse(200, { access_token: token})
                return response
            }
        }else{
            console.log('eamil doesnt exist')
            const {id, localizedFirstName, localizedLastName} = await getName(access_token)
            const userData = await findByAuthTypeAndId(id)
            if(userData.Count===1){
                console.log('user exist')
                const checkedUser = userData.Items[0]
                console.log(checkedUser)
                let payload
                if(checkedUser.first_name && checkedUser.last_name){
                    payload = {sub: checkedUser.id, first_name: checkedUser.first_name, last_name: checkedUser.last_name, email: checkedUser.email }
                    console.log(payload)
                }else if(checkedUser.user_name){
                    payload = {sub: checkedUser.id, user_name: checkedUser.user_name, email: checkedUser.email }
                    console.log(payload)
                }
                const token = generateToken(payload)
                const tokenUpdated = await updateAddToken(checkedUser.id, token)
                const response =  apiResponse(200, { access_token: token})
                return response  
     
            }else if(userData.Count===0){
                console.log('user dosent exist')
                const random = generateRandom()
                const user_id = `linkedin-oauth2|${random}`
                const payload = {sub: user_id, first_name:localizedFirstName, last_name:localizedLastName }
                const token = generateToken(payload)
                const userCreated= await createUserWithoutEmail(user_id,localizedFirstName, localizedLastName,id,token)
                const response =  apiResponse(200, { access_token: token})
                return response
            }
    
        }
    }catch(err){
        const response =  apiResponse(400, { error: 'Unauthorised'})
        return response
    }
   
 
}