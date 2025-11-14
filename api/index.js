import express from 'express';
import connectDB from './Database/Config.js';
import dotenv from 'dotenv';
import userRoute from './Routes/userRoute.js';
import authRoute from './Routes/authRoute.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import postroute from './Routes/postRoute.js' ;
import commentRoutes from './Routes/commentRoute.js' ;
dotenv.config();

connectDB();



const app = express();

app.use(express.json());     
app.use(cookieParser())

app.use(cors({
  origin: "http://localhost:5000",  // your frontend URL
  credentials: true,                // allow cookies
}));

app.use('/api/user', userRoute);
app.use('/api/auth',authRoute)
app.use('/api/post',postroute)
app.use('/api/comment',commentRoutes)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀Server is running on port ${PORT}`);
});