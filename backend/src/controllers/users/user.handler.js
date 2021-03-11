import { get, createNewUser } from './user.process.js';

export const getProfile = async (req, res) => {
    return res.status(200).send({ statusCode: 200, message: 'Get user successful', data: req.user });
};

export const register = async (req, res) => {
    const { statusCode, message, data } = await createNewUser(req.body);

    return res.status(statusCode).send({ statusCode, message, data });
};
