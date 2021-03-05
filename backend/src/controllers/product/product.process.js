import { Product } from '../../models/product.model.js';
import { logger } from '../../utils/logger.js';

export const listProduct = async (filter = {}) => {
    const response = {
        status: 200,
        message: 'Showing list products',
        data: {}
    };

    try {
        const products = await Product.find(filter);
        response.data = products;

        logger.success('Get list success');
        logger.log(products);
    } catch (err) {
        logger.fail(err.message);

        // return status code and message
        response.status = 500;
        response.message = err.message;
    }

    return response;
};
