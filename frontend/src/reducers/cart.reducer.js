import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
} from '../constants/cart.constant';

const initState = {
    cartItems: [],
};

export const cartReducer = (state = initState, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            // check if exist item in state (by Id)
            const existItem = state.cartItems.find(x => x.productId === item.productId);

            // if yes, return with the new one, else push in the array
            return existItem ? {
                ...state,
                cartItems: state.cartItems.map(x => x.productId === existItem.productId ? item : x)
            } : {
                ...state,
                cartItems: [...state.cartItems, item]
            };
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.productId !== action.payload.productId)
            }
        default:
            return state;
    }
};
