import { createOrder, getOrderById } from './order.process.js';

export const getOrder = async (req, res) => {
    const { statusCode, message, data } = await getOrderById(req.params.id);

    return res.status(statusCode).send({ statusCode, message, data })
};

export const addOrderItems = async (req, res) => {
    const { statusCode, message, data } = await createOrder(req.user, req.body);

    return res.status(statusCode).send({ statusCode, message, data })
};
