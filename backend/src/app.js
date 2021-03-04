import './env.js';
import './mongoose.js';

import express from 'express';
import products from './data/products.data.js';

const app = express();

app.set('port', process.env.PORT || 5000);

app.get('/api', (req, res) => {
    res.send('Hello Mtfk...');
});

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find(({ _id }) => _id === req.params.id);
    res.json(product);
});

export default app;
