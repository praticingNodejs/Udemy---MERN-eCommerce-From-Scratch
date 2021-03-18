import { Order } from '../../models/order.model.js';

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
        console.log(error)
        response.statusCode = 500;
        response.message = error.message;
    }

    return response;
};
