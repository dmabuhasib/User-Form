import express from 'express'
import data from './data.js'
import dotenv from 'dotenv' 
import mongoose from 'mongoose';
import seedRouter from './routes/seedRoutes.js';
import sectorRouter from './routes/sectorRoutes.js';
import userRouter from './routes/userRoutes.js';
 
dotenv.config()
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('connected to db')
}).catch((err) => { 
  console.log(err.message) 
}) 
const app = express () 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

app.use('/api/seed', seedRouter);
app.use('/api/sectors' , sectorRouter)  
app.use('/api' , userRouter)  

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
  });
 
app.listen(port, () => {
    console.log(`server is running at http://localhost:${port} `)
})