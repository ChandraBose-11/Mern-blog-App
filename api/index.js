import express from 'express';
import connectDB from './Database/Config.js';
import dotenv from 'dotenv';
import userRoute from './Routes/userRoute.js';
dotenv.config();

connectDB();


const app = express();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀Server is running on port ${PORT}`);
});     

app.use('/api/user', userRoute);
