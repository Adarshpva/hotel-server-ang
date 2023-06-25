// automatically load env file to our app
require('dotenv').config()

// import express
const express = require('express')

// iport cors
const cors = require('cors')


// import connection 
require('./services/db')

// to store port number
const PORT = 3000

// const { json } = require('express')
const logic = require('./services/logic')

// import jsonwebtoken
const jwt=require('jsonwebtoken')

// create server using express
const server = express()

// use cors in server app
server.use(cors({
    origin:'http://localhost:4200'
}))

// use express.json() - to parse json content
server.use(express.json())


// route localhost:3000
server.get('/',(req,res)=>{
    res.status(200).json('Room server started!!!')
})

// setup port for server app
server.listen(PORT,()=>{
    console.log(`Room app started at port  ${PORT}`);
})



// BANK SERVER SIDE -request reolving
// middleware for verifying token to check user is logined or not
const jwtMiddleware=(req,res,next)=>{
    console.log('JWTMiddleware=Router Specific');
//    get token from request heeader 
const token = req.headers['verify-token']
console.log(token);
try{
// verify token - verify()
const data = jwt.verify(token,'superpowerkey12345')
console.log(data);
// to get login username
req.currentUname = data.loginUname
// to process client request
next()
}catch{
res.status(401).json({message:"please log in"})
}
}

// register from client - post 

server.post('/register',(req,res)=>{
    console.log('Inside register api');
    console.log(req.body);

    // call register function of logic
    logic.register(req.body.uname,req.body.password,req.body.mobile)
    .then((result)=>{
        // response send to client
   res.status(result.statusCode).json(result)
    })



})

// login
server.post('/login',(req,res)=>{
    console.log('Inside login api');
    console.log(req.body);
    // call login logic
    logic.login(req.body.uname,req.body.password)
    .then((result)=>{
        // response send to client
   res.status(result.statusCode).json(result)
    })

})




// deletemyaccount
server.delete('/delete-my-account',jwtMiddleware,(req,res)=>{
    console.log('Inside deleteMyAccount api');
    logic.deleteMyAccount(req.currentUsername)
    .then((result)=>{
        // response send to client
        res.status(result.statusCode).json(result)
    })
})