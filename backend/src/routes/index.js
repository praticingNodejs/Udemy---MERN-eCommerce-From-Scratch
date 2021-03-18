import express from 'express';
import * as authentication from '../controllers/authentication/authentication.handler.js';
import * as user from '../controllers/users/user.handler.js';
import productRoute from './product.route.js';
import userRoute from './user.route.js';
import orderRoute from './order.route.js';

const router = express.Router();

export default (app) => {
    // prefix path
    app.use('/api', router);

    router.get('/', (req, res) => res.send('Hello Mtfk...'));

    // @desc Login
    // @route POST /login
    // @access Public
    router.post('/login', authentication.login);

    // @desc Register
    // @route POST /register
    // @access Public
    router.post('/register', user.register);

    // product routing
    productRoute(router);

    // user routing
    userRoute(router);

    // order routing
    orderRoute(router);
}
