import express from 'express';
import * as product from '../controllers/product/product.handler.js';

const router = express.Router();

export default (app) => {
    // prefix path
    app.use('/api', router);

    router.get('/', (req, res) => res.send('Hello Mtfk...'));

    // @desc Fetch all products
    // @route GET /api/products
    // @access Public
    router.get('/products', product.list);

    router.get('/products/:id', (req, res) => {
        // const product = products.find(({ _id }) => _id === req.params.id);
        // res.json(product);
    });
}
