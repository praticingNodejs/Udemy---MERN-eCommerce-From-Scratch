import * as product from './product.process.js';

export const list = async (req, res) => {
    const { status, data } = await product.listProduct();

    return res.status(status).send(data);
};
