import express from 'express';
import * as product from '../controllers/product/product.handler.js';

const router = express.Router();

export default (prefix) => {
    // prefix path for products
    prefix.use('/products', router);

    // @desc Fetch all products
    // @route GET /api/products
    // @access Public
    router.get('/', product.list);

    router.get('/:id', product.detail);
}
