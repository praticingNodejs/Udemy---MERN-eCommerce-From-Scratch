import { User } from '../../models/user.model.js';
import { accessToken } from '../../utils/token.js';

export const get = async (filter = {}) => {
    const response = {
        statusCode: 200,
        message: 'Get user successful',
        data: {},
    };

    try {
        const user = await User.find(filter).select('-password');
        response.data = user;
    } catch (error) {
        response.statusCode = 500;
        response.message = error.message;
    }

    return response;
};

export const createNewUser = async (data) => {
    const response = {
        statusCode: 200,
        message: 'Register new user successful',
        data: {},
    };

    try {
        const user = await User.findOne({
            email: data.email,
        });

        if (user) {
            return {
                statusCode: 400,
                message: 'User existed',
                data: {},
            };
        }
        console.log(data)
        const newUser = await User.create({
            name: data.name,
            email: data.email,
            password: data.password,
        })

        response.data = {
            accessToken: accessToken(newUser._id),
            user: newUser,
        };
    } catch (error) {
        response.statusCode = 500;
        response.message = error.message;
    }

    return response;
};
