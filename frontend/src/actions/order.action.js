import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
} from '../constants/order.constant';
import axios from 'axios';

export const createOrder = (order) => async (dispatch) => {
    try {
        const token = localStorage.getItem('jwt');

        dispatch({ type: ORDER_CREATE_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        };
        console.log(order)
        // first layer data is from axios
        const { data: { data } } = await axios.post('/api/order', order, config);

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data,
        });

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};
