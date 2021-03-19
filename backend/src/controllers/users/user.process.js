import { User } from '../../models/user.model.js';
import { accessToken } from '../../utils/token.js';
import { logger } from '../../utils/logger.js';

export const createNewUser = async (data) => {
    const response = {
        statusCode: 201,
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
        logger.fail(error.message);

        response.statusCode = 500;
        response.message = error.message;
    }

    return response;
};

export const updateUser = async ({ _id, data }) => {
    const response = {
        statusCode: 200,
        message: 'Update user successful',
        data: {},
    };

    try {
        if (data.email) {
            const user = await User.findOne({ email: data.email });
            if (user) {
                return {
                    statusCode: 400,
                    message: 'Email existed',
                    data: {},
                };
            }
        }



        const updatedUser = await User.findOneAndUpdate({ _id }, data, { new: true });
        if (!updatedUser) {
            return {
                statusCode: 404,
                message: 'User not existed',
                data: {},
            };
        }

        response.data = updatedUser;
    } catch (error) {
        logger.fail(error.message);

        response.statusCode = 500;
        response.message = error.message;
    }

    return response;
};
