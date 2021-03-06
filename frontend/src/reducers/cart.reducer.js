import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_RESET_ITEM,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cart.constant';

const initState = {
    cartItems: [],
    shippingAddress: {},
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
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload,
            }
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload,
            }
        case CART_RESET_ITEM:
            return initState
        default:
            return state;
    }
};
