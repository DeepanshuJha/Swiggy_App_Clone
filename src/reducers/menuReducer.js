import { FETCH_MENU } from '../actions/types';
import menuData from '../menuData/menuData'

const initialeState = {
    data: menuData
}

const menuReducer = (state=initialeState, action) => {
    switch(action.type) {
        case FETCH_MENU:
            return {
                ...state,
                data: action.payload
            }        
        default:
            return state;
    }
}

export default menuReducer