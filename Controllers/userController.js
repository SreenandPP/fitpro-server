const { request } = require('express');
const users=require('../Models/userModel')
const jwt=require('jsonwebtoken')

exports.userRegister = async(req, res) => {

    const { username, email, password } = req.body
    console.log('inside register function');


    try{
        const existingUser=await users.findOne({email})
    if(existingUser){
       res.status(401).json("User Already Exist!!")
    }
    else{
       const newUser=new users({
        username,email,password,profile:"",weight:"",height:""
       })
       await newUser.save()
       res.status(201).json(newUser)
    }
    }
    catch(err){
        res.status(404).json(err)
    }
   
}

//user login

exports.userLogin=async(req,res)=>{
    const {email,password}=req.body

    try{
        const existingUser=await users.findOne({email,password})

        if(existingUser){
            const secret_key="secretkey123"
            const token=jwt.sign({email:existingUser.email,username:existingUser.username,userId:existingUser._id},secret_key)
            const rest={token,user:existingUser.username,userDetails:existingUser}
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

exports.userUpdateProfile=async(req,res)=>{
    const userId=req.payload
    console.log(userId);
    const {username,password,email,weight,height,profile}=req.body
    const profileImage=req.file?req.file.filename:profile

    try{

        const updateUser=await users.findByIdAndUpdate({_id:userId},{username,password,email,weight,height,profile:profileImage},{new:true})
        await updateUser.save()
        res.status(200).json(updateUser)
    }
    catch(err){
        res.status(406).json(err)
    }

}