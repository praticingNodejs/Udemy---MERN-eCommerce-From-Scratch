import axios from 'axios';
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
} from '../constants/user.constant';

export const login = (email, password) => async (dispatch) => {
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
}
