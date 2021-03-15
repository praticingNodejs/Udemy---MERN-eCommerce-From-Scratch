import axios from 'axios';
import {
    // user authentication
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,

    // user register
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    // user update profile
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,

    // user profile
    USER_DETAIL_REQUEST,
    USER_DETAIL_SUCCESS,
    USER_DETAIL_FAIL,
} from '../constants/user.constant';

export const login = ({ email, password }) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
        };

        // first layer data is from axios
        const { data: {
            data: {
                accessToken,
                user,
            }
        } } = await axios.post('/api/login', { email, password }, config);

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: user,
        });

        localStorage.setItem('userInfo', JSON.stringify(user));
        localStorage.setItem('jwt', accessToken);

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('jwt');

    dispatch({ type: USER_LOGOUT });
};

export const register = ({ email, password, name }) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
        };

        // first layer data is from axios
        const { data: {
            data: {
                accessToken,
                user,
            }
        } } = await axios.post('/api/register', { email, password, name }, config);

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: user,
        });

        // after register then login
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: user,
        });

        // set userInfo and jwt to localStorage
        localStorage.setItem('userInfo', JSON.stringify(user));
        localStorage.setItem('jwt', accessToken);

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const getUserDetail = (id) => async (dispatch) => {
    try {
        const token = localStorage.getItem('jwt');

        dispatch({ type: USER_DETAIL_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        };

        // first layer data is from axios
        const { data: { data } } = await axios.get(`/api/users/${id}`, config);

        dispatch({
            type: USER_DETAIL_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_DETAIL_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};


export const updateUserProfile = (user) => async (dispatch) => {
    try {
        const token = localStorage.getItem('jwt');

        dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        };

        // first layer data is from axios
        const { data: { data } } = await axios.put(`/api/users/profile/${user._id}`, user, config);

        // set user login again to get the new data from other component using userLogin.userInfo
        // ex: header
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });

        // same to user detail
        dispatch({
            type: USER_DETAIL_SUCCESS,
            payload: data,
        });

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data,
        });

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};
