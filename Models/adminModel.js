const mongoose=require('mongoose')

const adminSchema=new mongoose.Schema({
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
    }
})

const admins=mongoose.model('admins',adminSchema)

module.exports=admins