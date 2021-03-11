import axios from 'axios';
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,
} from '../constants/product.constant';

export const listProducts = () => async (dispatch) => {
    try {
        // send the action to the reducer
        // const action = { type: PRODUCT_LIST_REQUEST }; dispatch(action);
        // state in reducer will be updated dynamically based on action call
        dispatch({ type: PRODUCT_LIST_REQUEST });

        // after proceed the action from reducer -> fetch API using axios
        const { data } = await axios.get('/api/products');

        // then update the data to the payload using action PRODUCT_LIST_SUCCESS
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const getDetail = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAIL_REQUEST });

        const { data } = await axios.get(`/api/products/${id}`);

        dispatch({
            type: PRODUCT_DETAIL_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAIL_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

