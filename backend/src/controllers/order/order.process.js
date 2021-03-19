import { Order } from '../../models/order.model.js';
import { logger } from '../../utils/logger.js';

export const getOrderById = async (id) => {
    const response = {
        statusCode: 200,
        message: 'Create order successful',
        data: {},
    };

    try {
        const order = await Order.findById(id)
            .populate({ path: 'user', select: 'name email' });

        if (!order) {
            return {
                statusCode: 404,
                message: 'Order not found',
                data: {},
            };
        }

        response.data = order;
    } catch (error) {
        logger.fail(error.message)
        response.statusCode = 500;
        response.message = error.message;
    }

    return response;
};

export const createOrder = async (user, data) => {
    const response = {
        statusCode: 200,
        message: 'Create order successful',
        data: {},
    };

    try {
        const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = data;

        if (!orderItems.length) {
            return {
                statusCode: 400,
                message: 'No items order',
                data: {},
            };
        }

        const order = new Order({
            orderItems,
            user: user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        response.data = await order.save();
    } catch (error) {
        logger.fail(error.message)
        response.statusCode = 500;
        response.message = error.message;
    }

    return response;
};
