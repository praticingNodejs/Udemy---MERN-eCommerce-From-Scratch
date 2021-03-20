import express from 'express';
import * as authentication from '../controllers/authentication/authentication.handler.js';
import * as order from '../controllers/order/order.handler.js';

const router = express.Router();

export default (prefix) => {
    // prefix path for users
    prefix.use('/order', authentication.verifyToken, router);

    // @desc Get order detail
    // @route GET /order/:id
    // @access Bearer Authentication
    router.get('/:id', order.getOrder);

    // @desc Create new order
    // @route POST /order
    // @access Bearer Authentication
    router.post('/', order.addOrderItems);

    // @desc Update an order to paid
    // @route PUT /order/:id/pay
    // @access Bearer Authentication
    router.put('/:id/pay', order.updateOrderToPay);
}
