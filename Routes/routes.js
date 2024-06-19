const express=require('express')
const router=express.Router()

const userController=require('../Controllers/userController')
const adminController=require('../Controllers/adminController')
const workoutController=require('../Controllers/workoutController')
const jwtMiddle=require('../Middlewares/jwtMiddleware')
const multerConfig=require('../Middlewares/multerMiddleware')
const dietController=require('../Controllers/dietController')


router.post('/register',userController.userRegister)
router.post('/login',userController.userLogin)
router.post('/adminregister',adminController.adminRegister)
router.post('/adminlogin',adminController.adminLogin)
router.post('/addworkout',jwtMiddle,multerConfig.single('image'),workoutController.addWorkouts)
router.put('/editworkout/:wid',jwtMiddle,multerConfig.single('image'),workoutController.editWorkout)
router.get('/allworkouts',jwtMiddle,workoutController.allWorkouts)
router.delete('/delete-workout/:wid',jwtMiddle,workoutController.removeWorkout)
router.post('/adddiet',jwtMiddle,multerConfig.single('image'),dietController.addDiet)
router.get('/alldiets',jwtMiddle,dietController.allDiets)
router.put('/profile-update',jwtMiddle,multerConfig.single('profile'),userController.userUpdateProfile)
router.delete('/delete-diet/:did',jwtMiddle,dietController.removeDiet)
router.put('/editdiet/:did',jwtMiddle,multerConfig.single('image'),dietController.editDiet)




module.exports=router