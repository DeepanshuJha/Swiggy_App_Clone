import { combineReducers } from 'redux';
import restaurantReducer from './restaurantReducer'
import menuReducer from './menuReducer'
import cartReducer from './cartReducer';
import isLoggedReducer from './isLoggedReducer';

const rootReducer = combineReducers({
    restaurants: restaurantReducer,
    menu: menuReducer,
    cart: cartReducer,
    login: isLoggedReducer
});

export default rootReducer;