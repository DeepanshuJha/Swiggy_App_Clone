import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import classes from './css/Cart.module.css'

class Cart extends Component {
    constructor(props){
        super(props);
        this.state={
            id:props.id,
            veg: props.veg,
            name: props.name,
            cost: props.cost
        }
    }
    render() {        
        return (
            <div className={classes.cartWrapper}>
                <div className={classes.cartItemInfo}>
                    <div>
                        {this.state.veg && 
                            <p><img src="/assets/veg.jpg" alt=""/></p>
                        }
                        {!this.state.veg && 
                            <p><img src="/assets/nonveg.png" alt=""/></p>
                        }                    
                    </div>                
                    <div>
                        <p>{this.state.name}</p>
                    </div>
                </div>
                <div>
                    <p>₹ {this.state.cost}</p>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    restaurant: state.restaurants.data,
    menu: state.menu.data,
    cart: state.cart
});

export default connect(mapStateToProps, null)(Cart);