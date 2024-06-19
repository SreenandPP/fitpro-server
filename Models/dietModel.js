const mongoose=require('mongoose')


const dietSchema=new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }

})

const diet=mongoose.model('diet',dietSchema)

module.exports=diet