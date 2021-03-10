import { Product } from '../../models/product.model.js';
import { logger } from '../../utils/logger.js';

export const get = async (filter = {}) => {
    const response = {
        status: 200,
        data: {}
    };

    try {
        const products = await Product.find(filter);
        response.data = products;
    } catch (err) {
        logger.fail(err.message);

        // return status code and message
        response.status = 500;
    }

    return response;
};
