const mongoose = require('mongoose')
const DB = process.env.DATABASE

mongoose.connect(DB,{
         useUnifiedTopology:true,
         useNewUrlParser:true
}).then(()=>{
    console.log('Mongodb Atlas connected successfully...');
}).catch((err)=>{
    console.log(err);
})

//  create a model/scheme/collection for storing data in db  

const User = mongoose.model('User',{
    uname:String,
    password:String,
    mobile:Number


})

// export the collection
module.exports={
    User
}