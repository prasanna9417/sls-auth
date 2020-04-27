const validator = require('validator')
 
module.exports.userSignUpValidator = (user) => {
    let err_msg= []
    console.log(user, typeof user)
    if(!user.email && !user.password && !user.first_name && !user.last_name){
        err_msg.push({error:"all fields are empty"})
        return err_msg
    }else if(!user.email){
        err_msg.push({error:"email should be included"})
        return err_msg
    }else if(!user.password){
        err_msg.push({error:"password should be included"})
        return err_msg
    }else if(!validator.isEmail(user.email)){
        err_msg.push({error:"enter valid email id"})
        return err_msg
    }else if(user.password.length<6 || user.password.length > 128){
        err_msg.push({error:"password length should be between 6 and 128"})
        return err_msg
    }else if(!user.first_name){
        err_msg.push({error:"first name should be included"})
        return err_msg
    }else if(!user.last_name){
        err_msg.push({error:"last name should be included"})
        return err_msg
    }
    return err_msg
}


 

 