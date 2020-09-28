import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import fetchRestaurants from '../actions/restaurantsAction';
import Card from './Card'
import classes from './css/Restaurants.module.css'

class Restaurants extends Component {
    constructor(props){
        super(props);
        
    }


    componentWillMount() {
        this.props.fetchRestaurants();
    };           

    render() {
        const restaurantItems = this.props.restaurants.map(r => (            
            <Fragment key={r.id}>
                <Card
                    id={r.id}
                    name={r.name}                                    
                    cuisine={r.cuisines.join(', ')}
                    rating={r.avgRating}
                    deliveryTime={r.deliveryTime}
                    costForTwo={r.costForTwoString}
                    imgUrl={r.cloudinaryImageId}
                />
            </Fragment>                           
        ));
        return (
            <div>
                <div className={classes.searchBar}>
                    <label>Search</label>
                    <input type="text" value="search"></input>
                </div>
                <div className={classes.menuWrapper}>
                    {restaurantItems}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    restaurants: state.restaurants.data
});

export default connect(mapStateToProps, { fetchRestaurants })(Restaurants);


