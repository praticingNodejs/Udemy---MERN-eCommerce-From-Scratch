import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cart.constant';

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`);

    // 1. first it will call the action (defined in reducer)
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            productId: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty: parseInt(qty, 10)
        },
    });

    // 2. then it will set the item after proceed in reducer to local storage
    // getState() will get entire state from local storage
    // get the cartItems after set from previous action then
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
    // 1. call action remove item in reducer
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: {
            productId: id
        },
    });

    // now it has been removed by filter
    // 2. set the state after filter to the localStorage
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
