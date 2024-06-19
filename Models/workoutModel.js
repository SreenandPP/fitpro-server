const mongoose=require('mongoose')


const wrokoutSchema=new mongoose.Schema({

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

const workouts=mongoose.model('workouts',wrokoutSchema)

module.exports=workouts