import * as BPromise from 'bluebird';
BPromise.promisifyAll(require('mongoose'));
const mongoose = require('mongoose');
mongoose.Promise  = BPromise;

export default mongoose.connect(process.env.MONGODB_URI.trim(), {
  useMongoClient: true,
});
