import { FETCH_RESTAURANTS, FETCH_MENU } from '../actions/types'

const initialeState = {
    data: []
}

const restaurantReducer = (state=initialeState, action) => {
    switch(action.type) {
        case FETCH_RESTAURANTS:
            return {
                ...state,
                data: action.payload
            }        
        default:
            return state;
    }
}

export default restaurantReducer;