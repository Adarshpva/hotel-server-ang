// import db.js
const db = require('./db')
// import jsonwebtoken
const jwt = require('jsonwebtoken')



// register
const register = (uname,password,mobile)=>{
    // llogic to resolve register (username,password,mobile)
    console.log('Inside register Logic');

    // check acno in db - findOne()- asynchronous function : promise
   return db.User.findOne({
        uname
    }).then((response)=>{
       console.log(response);
       if(response){
        // username already exist
        return{
            statusCode:401,
            message:"Account alredy exist..."
        }
       }
       else{
        // username is not in db so register it
        const newUser = new db.User({
        uname,
        password,
        mobile
        })
        // to  store newUser in mongodb

        newUser.save()
        // send response as register success
        return{
            statusCode:200,
            message:"register successfully"
        }
       }
    })
}


// loginlogic
const login =(uname,password)=>{
    console.log('inside login logic');
    // 1. check username and password in db
    return db.User.findOne({
        uname,
        password
    }).then((result)=>{
        if(result){
            // acno is present in db
            // generate token with payload as acno
            const token=jwt.sign({
                loginUname:uname
            },'superpowerkey12345')
            return{
            statusCode:200,
            message:"Login successfull...",
            // send usernme to client
            currentUser:result.uname,
            // send token to client
            token,
        }
    }
        else{
            // username is not present in db
            return{
                statusCode:404,
                message:"Invalid Username/password"
            }
        }
    })

}



// export
module.exports ={
    register,
    login

}