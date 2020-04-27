const bcryptjs = require('bcryptjs')
 
module.exports.userSignInValidator = (user) => {
    let err_msg= []
    console.log(user)
    if(!user.email && !user.password){
        err_msg.push({error:"email and password are empty"})
        return err_msg
    }else if(!user.email){
        err_msg.push({error:"email should be included"})
        return err_msg
    }else if(!user.password){
        err_msg.push({error:"password should be included"})
        return err_msg
    }
    return err_msg
}

module.exports.validatePassword = async (password1, password2)=>{
    let promise = new Promise((resolve,reject)=>{
        bcryptjs.compare(password1, password2)
            .then(result=>{
                //console.log(result)
                resolve(result)
               
            })
            .catch(err=>{
                reject(err)
            })
    })
    const response = await promise;
    return response;
}


 
