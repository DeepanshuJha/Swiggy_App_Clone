import { ADD_ITEM, REMOVE_ITEM } from '../actions/types';

const initialState = {
    cartData: [],
    total: 0
}

const cartReducer = (state=initialState, action) => {
    switch(action.type) {
        case ADD_ITEM:
            return {
                ...state,
                cartData: [
                    ...state.cartData,
                    action.payload.item  
                ],
                total: action.payload.total
            }
        case REMOVE_ITEM:
            console.log(action.payload);
            return {
                ...state,
                cart: [...action.payload.item],
                total: action.payload.total                
            }
        default:
            return state;
    }
}

export default cartReducer