const diet=require('../Models/dietModel')

//AddDiet

exports.addDiet=async(req,res)=>{
   const userId=req.payload
   const {title,category,description}=req.body
   const image=req.file.filename
   console.log(title,category,description,userId,image);
   try{
    const existingDiet=await diet.findOne({ title })
    if(existingDiet){
     res.status(406).json("Project already Added!!")
    }
    else{
     const newDiet=new diet({
         title,category,description,image,userId
     })
     await newDiet.save()
     res.status(200).json(newDiet)
    }
   
   }
   catch(err){
    console.log(err);
    res.status(401).json(err)
   }
 
}

exports.allDiets=async(req,res)=>{
    try{
        const result=await diet.find()
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


exports.removeDiet=async(req,res)=>{
    const {did}=req.params
    try{
        const result=await diet.findByIdAndDelete({_id:did})
        res.status(200).json(result)
    }
    catch(err){
        console.log(err);
         res.status(406).json(err)
    }
   
}

exports.editDiet=async(req,res)=>{
    const {title,category,description,image}=req.body
    const userId=req.payload
    const dietImage=req.file?req.file.filename:image
    const {did}=req.params
  
    try{
      const updateDiet=await diet.findByIdAndUpdate({_id:did},{title,category,description,image:dietImage,userId},{new:true})
      await updateDiet.save()
    
      res.status(200).json(updateDiet)
    }
   catch(err){
      console.log(err);
      res.status(406).json(err)
   }
  }