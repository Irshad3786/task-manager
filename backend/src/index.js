import express from 'express'
import dotenv from 'dotenv'
import mongoose from "mongoose";
import CreateAccountRoute from "./src/routes/CreateAccountRoute.js";
import SignInAccount from './src/routes/SignIn.js'
import Verificationstart from './src/routes/VerificationRoute.js'
import TaskRoute from './src/routes/TaskRoue.js'
import AllTasks from './src/routes/AllTasks.js'
import UpdateTaskRoute from './src/routes/UpdateTaskRoute.js'
import DeleteTaskRoute from './src/routes/DeleteTaskRoute.js'
import UserTaskRoute from './src/routes/UserTaskRoute.js'
import AllProjectsRoute from './src/routes/AllProjectsRoute.js'
import cors from 'cors'
import cookieParser from 'cookie-parser';





dotenv.config()
const app = express()

app.use(cors({
  origin:`${process.env.CLIENTURL}`,
  credentials: true, 
}))

app.use(cookieParser());


mongoose.connect(process.env.MONGOURL)
.then(()=>{
    console.log("mongodb connected successfully");
    
})
.catch((err)=>{
    console.log(err);
    
})





app.use(express.json())

app.use('/CreateAccount',CreateAccountRoute)
app.use('/SignIn',SignInAccount)
app.use('/GetVerify',Verificationstart)
app.use('/Task',TaskRoute)
app.use('/AllTasks',AllTasks)
app.use('/UpdateTask',UpdateTaskRoute)
app.use('/DeleteTask',DeleteTaskRoute)
app.use('/AddProject',UserTaskRoute)
app.use('/GetAllProjects',AllProjectsRoute)


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});