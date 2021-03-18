import { createOrder } from './order.process.js';

export const addOrderItems = async (req, res) => {
    const { statusCode, message, data } = await createOrder(req.user, req.body);

    return res.status(statusCode).send({ statusCode, message, data })
};
