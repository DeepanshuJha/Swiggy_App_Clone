import { FETCH_RESTAURANTS } from './types'

const fetchRestaurants = () => dispatch => {
    fetch('https://food-power.glitch.me/restaurants/')
    .then(res => res.json())
    .then(restaurants => dispatch({
        type: FETCH_RESTAURANTS,
        payload: restaurants.data
    }));
}

export default fetchRestaurants;

