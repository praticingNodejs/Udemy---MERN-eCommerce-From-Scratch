import { User } from '../../models/user.model.js';
import { accessToken } from '../../utils/token.js';

export const checkUserLogin = async ({ email, password }) => {
    const response = {
        statusCode: 200,
        message: 'Login successful',
        data: {}
    };

    try {
        const user = await User.findOne({ email });

        if (!user || !user.comparePassword(password)) {
            return {
                statusCode: 401,
                message: 'User not existed',
                data: {}
            }
        }

        response.data = {
            accessToken: accessToken(user._id),
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            }
        };
    } catch (error) {
        response.statusCode = 500
        response.message = error
    }

    return response;
};
