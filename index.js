
//loads .env file content into process.env by default
require('dotenv').config()
const express=require("express")
const cors=require('cors')
const router=require('./Routes/routes')
require('./DB/connection')



//creating server instance
const fitServer=express()

//configuring cors into server
fitServer.use(cors())

//configuring json conversion on server
fitServer.use(express.json())

//configuring routes

fitServer.use(router)

//serving uploaded files to client side
fitServer.use('/uploads',express.static('./uploads'))


//calling listen method to implement listen mode for server to run
const PORT=4000
fitServer.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
})

fitServer.get('/',(req,res)=>{
    res.status(200).send("<h1>The get request Hit successfully</h1>")
})