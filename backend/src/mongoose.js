import mongoose from 'mongoose';

import { success, fail } from './utils/log-message.js';

mongoose.connect(process.env.MONGODB_URI, {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    const message = success('MongoDb connected');
    console.log(message);
});

mongoose.connection.on('error', error => {
    console.error(error);
    const message = fail('MongoDb error');
    console.log(message);
    process.exit();
})
