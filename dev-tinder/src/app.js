import express from 'express'
import cookieParser from 'cookie-parser'
import { connectDB } from './configs/db.js';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import requestRouter from './routes/connectionRequest.route.js';
const app = express();
app.use(cookieParser())

// app.use(authCheck())

app.use(express.json()); // because when client sends data from json we need to parse it


connectDB().then(()=>   {
    console.log('connected with DB')
    app.listen(3009,()=>{
        console.log('Server running on port 3009')
    })
}).catch((e)=>{
    console.error('failed to connect with DB:', e.message)
    process.exit(1)
})
//auth routes
app.use('/auth',authRouter)

//profile routes
app.use('/user',userRouter)

app.use('/request',requestRouter)

