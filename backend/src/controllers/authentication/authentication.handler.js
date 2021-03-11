import { checkUserLogin } from './authentication.process.js';
import jwt from 'jsonwebtoken';

import { User } from '../../models/user.model.js';

export const verifyToken = async (req, res, next) => {
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findOne({ _id: decoded._id });
            if (!user) {
                return res.status(401).send({ statusCode: 401, message: 'Unauthorized', data: {} });
            }

            // assign to req params
            req.user = user;

            return next();
        }

        return res.status(401).send({ statusCode: 401, message: 'Unauthorized', data: {} });
    } catch (error) {
        return res.status(401).send({ statusCode: 401, message: 'Unauthorized', data: error });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    // check user login
    const { statusCode, message, data } = await checkUserLogin({ email, password });

    return res.status(statusCode).send({ statusCode, message, data })
};
