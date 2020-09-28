import { ADD_ITEM, REMOVE_ITEM } from '../actions/types';

export function addItem(item, total){
    return {
        type: ADD_ITEM,
        payload: {
            item,
            total
        }
    }
}

export function removeItem(item, total){
    return {
        type: REMOVE_ITEM,
        payload: {
            item,
            total
        }
    }
}