import express from 'express';
import * as authentication from '../controllers/authentication/authentication.handler.js';
import * as order from '../controllers/order/order.handler.js';

const router = express.Router();

export default (prefix) => {
    // prefix path for users
    prefix.use('/order', authentication.verifyToken, router);

    // @desc Create new order
    // @route POST /order
    // @access Bearer Authentication
    router.post('/', order.addOrderItems);

    // @desc Update user profile
    // @route PUT /users/profile
    // @access Bearer Authentication
    // router.put('/profile/:id', user.updateProfile);
}
