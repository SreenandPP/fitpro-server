const multer=require('multer')

const storage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    filename:(req,file,callback)=>{
        callback(null,`Img-${Date.now()}-${file.originalname}`)
    }
})


const fileFilter=(req,file,callback)=>{
      if(file.mimetype=="image/jpg" ||file.mimetype=="image/jpeg" || file.mimetype=="image/png" || file.mimetype=="image/gif"){
        callback(null,true)
      }
      else{
        callback(null,false)
        return callback(new Error("Please upload file with following extensions (jpg,jpeg,png or gif) only !!"))
      }
}

const multerConfig=multer({
    storage,fileFilter
})


module.exports=multerConfig