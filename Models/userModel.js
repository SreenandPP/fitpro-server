const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    profile:{
        type:String
    },
    weight:{
        type:String
    },
    height:{
        type:String
    }
})

const users=mongoose.model('users',userSchema)

module.exports=users