import express from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import userRoutes from './routes/users';

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

// //for testing express initially
// app.get("/api/test", (req,res)=> {
// res.json({message:"hello from express"})
// })

app.use("/api/users", userRoutes)

app.listen(8000, ()=>{
    console.log("server running on local;host:8000")
})