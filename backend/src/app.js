// import env and config
import './env.js';
import './mongoose.js';

// import libs
import express from 'express';
import morgan from 'morgan';

import middlewares from './middlewares/index.js';

import router from './routes/index.js';

const app = express();
app.use(morgan('dev'));

// set router
router(app);

// set middleware
middlewares(app);

app.set('port', process.env.PORT || 5000);

export default app;
