import {
    createNewUser,
    updateUser,
} from './user.process.js';

export const register = async (req, res) => {
    const { statusCode, message, data } = await createNewUser(req.body);

    return res.status(statusCode).send({ statusCode, message, data });
};

export const getProfile = async (req, res) => {
    return res.status(200).send({ statusCode: 200, message: 'Get user successful', data: req.user });
};

export const updateProfile = async (req, res) => {
    // if missing information, assign the current user information
    const updateData = {
        name: req.body.name || req.user.name,
    };

    // only update email when email is different
    if (req.body.email !== req.user.email) {
        updateData.email = req.body.email;
    }

    const { statusCode, message, data } = await updateUser({ _id: req.params.id, data: updateData });

    return res.status(statusCode).send({ statusCode, message, data });
};
