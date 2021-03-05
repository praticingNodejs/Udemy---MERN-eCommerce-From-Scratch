import mongoose from 'mongoose';
import { logger } from './utils/logger.js';

mongoose.connect(process.env.MONGODB_URI, {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    logger.success('MongoDb connected');
});

mongoose.connection.on('error', error => {
    console.error(error);
    logger.fail('MongoDb error');
    process.exit();
})
