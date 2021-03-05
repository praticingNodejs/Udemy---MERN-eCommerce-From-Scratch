// import env and config
import './env.js';
import './mongoose.js';

// import libs
import express from 'express';

import router from './routes/index.js';

const app = express();
// set router
router(app);

app.set('port', process.env.PORT || 5000);

export default app;
