import * as mongoose from 'mongoose';

const ParkSchema = new mongoose.Schema({
  konum: String,
  kapasite: Number,
  bos: Number
});

export default mongoose.model('Park', ParkSchema);