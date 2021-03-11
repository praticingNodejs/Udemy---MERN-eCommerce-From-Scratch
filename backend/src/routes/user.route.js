import express from 'express';
import * as authentication from '../controllers/authentication/authentication.handler.js';
import * as user from '../controllers/users/user.handler.js';

const router = express.Router();

export default (prefix) => {
    // prefix path for users
    prefix.use('/users', authentication.verifyToken, router);

    // @desc Fetch user profile
    // @route GET /users/profile
    // @access Bearer Authentication
    router.get('/profile', user.getProfile)
}
