import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS,
    ORDER_DETAIL_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
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

        // first layer data is from axios
        const { data: { data } } = await axios.post('/api/order', order, config);

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const getOrderDetail = (orderId) => async (dispatch) => {
    try {
        const token = localStorage.getItem('jwt');

        dispatch({ type: ORDER_DETAIL_REQUEST });
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        };

        // first layer data is from axios
        const { data: { data } } = await axios.get(`/api/order/${orderId}`, config);

        dispatch({
            type: ORDER_DETAIL_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ORDER_DETAIL_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const payOrder = (orderId, paymentResult) => async (dispatch) => {
    try {
        const token = localStorage.getItem('jwt');

        dispatch({ type: ORDER_PAY_REQUEST });
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        };

        // first layer data is from axios
        const { data: { data } } = await axios.put(`/api/order/${orderId}/pay`, paymentResult, config);

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};
