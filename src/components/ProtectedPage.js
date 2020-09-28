import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import Cart from '../components/Cart'
import classes from './css/ProtectedPage.module.css'
import { addItem, removeItem } from '../actions/cartActions'

class ProtectedPage extends Component {
    constructor(props){
        super(props);
        this.state={
            redirectToLogin: false,
            paid: false            
        }
    }

    logout = () => {
        localStorage.removeItem('userAuthenticated', false);
        this.setState({redirectToLogin: true})
    }

    pay = () => {
        this.setState({paid: true})
        this.props.cart.splice(0, this.props.cart.length);
        this.props.removeItem(this.props.cart, 0)
    }

    render() {

        const {redirectToLogin} = this.state
        if(redirectToLogin === true){            
            return <Redirect to="/login"/>
        }
        
        return (
            <div>
                <div className={classes.logout}>
                    <button onClick={this.logout}>Logout</button>
                </div>                
                <div className={classes.cartMainWrapper}>
                    <div className={classes.cartHeader}>
                        <h2>Cart</h2>
                        {this.props.cart.length > 0 && <p>{this.props.cart.length} ITEMS</p>}
                        {this.props.cart.length === 0 && <p>EMPTY CART</p>}
                    </div>
                    {
                        this.props.cart.map((item) => (
                            <Cart
                                id={item.id} 
                                veg={item.veg}
                                name={item.name}
                                cost={item.cost}
                            />
                        ))
                    }
                    <br></br>
                    {this.props.cart.length > 0 &&                         
                        <div className={classes.cartSection}>
                            <hr></hr>
                            <div className={classes.totalCostWrapper}>
                                <h2>Total</h2>
                                <h2>₹{this.props.cartTotal}</h2>
                            </div>
                            {
                                !this.state.paid && 
                                <button onClick={this.pay}>Pay</button>
                            }
                            {
                                this.state.paid && 
                                <div className={classes.success}>
                                    <img src="/assets/success.png" alt="Success" />
                                    <h2>Paid</h2>
                                </div>}
                        </div>
                    }
                </div>                
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    restaurant: state.restaurants.data,
    menu: state.menu.data,
    cart: state.cart.cartData,
    cartTotal: state.cart.total
});

export default connect(mapStateToProps, { addItem, removeItem })(ProtectedPage)
