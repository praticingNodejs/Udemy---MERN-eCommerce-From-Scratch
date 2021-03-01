import express from 'express'
import products from './src/data/products.js'

const app = express()

app.get('/api', (req, res) => {
    res.send('Hello Mtfk...')
})

app.get('/api/products', (req, res) => {
    res.json(products)
})

app.get('/api/products/:id', (req, res) => {
    const product = products.find(({ _id }) => _id === req.params.id)
    res.json(product)
})

app.listen(5000, () => {
    console.log('Server running at port 5000')
})
