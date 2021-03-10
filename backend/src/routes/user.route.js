import express from 'express';

const router = express.Router();

export default (prefix) => {
    // prefix path for users
    prefix.use('/users', router);

    router.get('/', (req, res) => res.send({ message: 'hihi' }))
}
