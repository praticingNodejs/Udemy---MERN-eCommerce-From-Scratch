import {
    CART_ADD_ITEM,
} from '../constants/cart.constant';

const initState = {
    cartItems: [],
};

export const cartReducer = (state = initState, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            // check if exist item in state
            const existItem = state.cartItems.find(x => x.product === item.product);

            // if yes, return with the new one, else push in the array
            return existItem ? {
                ...state,
                cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
            } : {
                ...state,
                cartItems: [...state.cartItems, item]
            };
        default:
            return state;
    }
};
