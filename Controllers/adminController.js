const admins=require('../Models/adminModel')
const jwt=require('jsonwebtoken')


exports.adminRegister = async(req, res) => {

    const { username, email, password } = req.body
    console.log('inside register function');


    try{
        const existingAdmin=await admins.findOne({email})
    if(existingAdmin){
       res.status(401).json("User Already Exist!!")
    }
    else{
       const newAdmin=new admins({
        username,email,password,profile:""
       })
       await newAdmin.save()
       res.status(201).json(newAdmin)
    }
    }
    catch(err){
        res.status(404).json(err)
    }
   
}


exports.adminLogin=async(req,res)=>{
    const {email,password}=req.body

    try{
        const existingUser=await admins.findOne({email,password})

        if(existingUser){
           
            const token=jwt.sign({email:existingUser.email,username:existingUser.username,userId:existingUser._id},process.env.secret_key)
            const rest={token,user:existingUser.username}
            console.log(token);
            res.status(200).json(rest)
        }
        else{
            res.status(404).json("Invalid username or password!!")
        }
    }
   catch(err){
     res.status(404).json(err)
   }
}