import express from 'express';
import Sectors from '../models/sectorDataModel.js';

const sectorRouter = express.Router();
sectorRouter.get('/', async (req, res) => {
    const sectors = await Sectors.find();
    res.send(sectors);
  });

export default sectorRouter;  