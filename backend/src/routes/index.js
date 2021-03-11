import express from 'express';
import * as authentication from '../controllers/authentication/authentication.handler.js';
import productRoute from './product.route.js';
import userRoute from './user.route.js';

const router = express.Router();

export default (app) => {
    // prefix path
    app.use('/api', router);

    router.get('/', (req, res) => res.send('Hello Mtfk...'));

    router.post('/login', authentication.login);

    // product routing
    productRoute(router);

    // user routing
    userRoute(router);
}
