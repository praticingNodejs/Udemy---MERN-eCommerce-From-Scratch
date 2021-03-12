import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { productReducer, productDetailReducer } from './reducers/product.reducer';
import { cartReducer } from './reducers/cart.reducer';
import { userLoginReducer } from './reducers/user.reducer';

const reducer = combineReducers({
    productList: productReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    user: userLoginReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
    },
    user: {
        userInfo: userInfoFromStorage
    },
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store
