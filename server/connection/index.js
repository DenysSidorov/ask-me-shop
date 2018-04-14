import mongoose from 'mongoose';
import config from '../config';
mongoose.Promise = Promise;

// mongoose.set('debug', true);

mongoose.connect(config.mongoConnect.path, config.mongoConnect.config);

export default mongoose;
