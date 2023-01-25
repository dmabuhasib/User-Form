import express from 'express'
import path from 'path'
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

const _dirname = path.resolve()
app.use(express.static(path.join(_dirname, '/frontend/build')))
app.get('*', (req, res) => res.sendFile(path.join(_dirname, '/frontend/build/index.html')))
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
  });
 
app.listen(port, () => {
    console.log(`server is running at http://localhost:${port} `)
})