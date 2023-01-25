import express from 'express';
import Sector from '../models/sectorDataModel.js'
import data from '../data.js';

const seedRouter = express.Router();
  
seedRouter.get('/', async (req, res) => {
  await Sector.remove({});
  const createdSector = await Sector.insertMany(data.sectorData);
  res.send({ createdSector }); 
});
export default seedRouter; 