import express from 'express';
import productRoute from './product.route.js';
import userRoute from './user.route.js';

const router = express.Router();

export default (app) => {
    // prefix path
    app.use('/api', router);

    router.get('/', (req, res) => res.send('Hello Mtfk...'));

    // product routing
    productRoute(router);

    // user routing
    userRoute(router);
}
