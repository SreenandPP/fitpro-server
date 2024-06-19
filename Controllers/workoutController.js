const workouts=require('../Models/workoutModel')

//Addworkout

exports.addWorkouts=async(req,res)=>{
   const userId=req.payload
   const {title,category,description}=req.body
   const image=req.file.filename
   console.log(title,category,description,userId,image);
   try{
    const existingWorkout=await workouts.findOne({ title })
    if(existingWorkout){
     res.status(406).json("Project already Added!!")
    }
    else{
     const newWorkout=new workouts({
         title,category,description,image,userId
     })
     await newWorkout.save()
     res.status(200).json(newWorkout)
    }
   
   }
   catch(err){
    console.log(err);
    res.status(401).json(err)
   }
 
}

exports.allWorkouts=async(req,res)=>{

    try{
       
        const result=await workouts.find()
        if(result){
         res.status(200).json(result)
        }
        else{
            res.status(401).json("No workouts available")
        }
    }
    catch(err){
      console.log(err);
      res.status(406).json(err)
    }
  
}

//for edit workout

exports.editWorkout=async(req,res)=>{
  const {title,category,description,image}=req.body
  const userId=req.payload
  const workoutImage=req.file?req.file.filename:image
  const {wid}=req.params

  try{
    const updateWorkout=await workouts.findByIdAndUpdate({_id:wid},{title,category,description,image:workoutImage,userId},{new:true})
    await updateWorkout.save()
  
    res.status(200).json(updateWorkout)
  }
 catch(err){
    console.log(err);
    res.status(406).josn(err)
 }
}

exports.removeWorkout=async(req,res)=>{
    const {wid}=req.params
    try{
        const result=await workouts.findByIdAndDelete({_id:wid})
        res.status(200).json(result)
    }
    catch(err){
        console.log(err);
         res.status(406).json(err)
    }
   
}



