import mongoose from 'mongoose';

const sectorSchema = new mongoose.Schema({
  sectors: { type: String },
  sectorItems: [
    {
      sectorItem: { type: String },
      subSectorItems: [
        {
          subSectorItem: { type: String },
        },
      ],
    },
  ],
});

const Sectors = mongoose.model('Sectors', sectorSchema);
export default Sectors;
