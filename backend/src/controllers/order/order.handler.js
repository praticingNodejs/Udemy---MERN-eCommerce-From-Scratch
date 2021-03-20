import {
    getOrderById,
    getListOrderFilter,
    createOrder,
    updateOrder,
} from './order.process.js';
import { queryBuilder } from './order.validate.js';

export const getOrder = async (req, res) => {
    const { statusCode, message, data } = await getOrderById(req.params.id);

    return res.status(statusCode).send({ statusCode, message, data });
};

export const getListOrder = async (req, res) => {
    const filter = queryBuilder(req.query);
    const { statusCode, message, data } = await getListOrderFilter(filter);

    return res.status(statusCode).send({ statusCode, message, data });
};

export const addOrderItems = async (req, res) => {
    const { statusCode, message, data } = await createOrder(req.user, req.body);

    return res.status(statusCode).send({ statusCode, message, data });
};

export const updateOrderToPay = async (req, res) => {
    const updateData = {
        isPaid: true,
        paidAt: new Date(),
        paymentResult: {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        },
    };

    const { statusCode, message, data } = await updateOrder(req.params.id, updateData);

    return res.status(statusCode).send({ statusCode, message, data });
}
