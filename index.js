import express from "express";
import mongoose from "mongoose"
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import productRouter from './routes/product.route.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app = express()
dotenv.config()

const connect =  async () => {
    try {
        await mongoose.connect( process.env.MONGO)
     console.log('db connected')
     } catch (error) {
         console.log(error)
     }
}
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from localhost:5173
    credentials: true, // Allow credentials (cookies)
  }));
  
// Use the user router
app.use(express.json())
app.use(cookieParser())



app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use((err,req,res,next) => {
const errorStatus = err.status || 500
const errorMessage = err.message || 'something went wrong'
return res.status(errorStatus).send(errorMessage)
})

app.listen(8000, () => {
    connect()
    console.log('conected')
})