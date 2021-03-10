import * as product from './product.process.js';

export const list = async (req, res) => {
    const { status, data } = await product.listProduct();

    return res.status(status).send(data);
};

export const detail = async (req, res) => {
    const { status, data } = await product.listProduct({ _id: req.params.id });

    // if search by _id, require existed record
    // if not, throw Error
    if (!data.length) {
        return res.status(404).send({
            status: 'Not found',
            message: 'Record not found'
        });
    }

    return res.status(status).send(data[0]);
};
