import { checkUserLogin } from './authentication.process.js';

export const login = async (req, res) => {
    const { email, password } = req.body;

    // check user login
    const { statusCode, message, data } = await checkUserLogin({ email, password });

    return res.status(statusCode).send({ statusCode, message, data })
};
