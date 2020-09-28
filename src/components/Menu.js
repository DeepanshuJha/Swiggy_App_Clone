import React, { Component, Fragment } from 'react'
import { addItem, removeItem } from '../actions/cartActions'
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import Cart from './Cart'
import classes from './css/Menu.module.css';

class Menu extends Component {
    constructor(props){
        super(props);
        this.state={
            id: this.props.location.state.id,
            name: '',
            cuisine:'',
            address:'',
            rating:'',
            deliveryTime:'',
            costForTwo:'',
            imgUrl:'',
            loginStatus: false                                  
        }
    }

    setRestaurant = () => {
        let res = this.props.restaurant.filter((data) => data.id === this.state.id);
        this.setState({ name: res[0].name });    
        this.setState({ cuisine: res[0].cuisines.join(', ') });
        this.setState({ address: res[0].address})
        this.setState({ rating: res[0].avgRating });
        this.setState({ deliveryTime: res[0].deliveryTime });
        this.setState({ costForTwo: parseInt(res[0].costForTwo) / 100 });
        this.setState({ imgUrl: res[0].cloudinaryImageId });
    }

    componentWillMount() {
        this.setRestaurant();      
    }       

    addItemCart = (item, cost) => {
        this.props.addItem(item, this.props.cartTotal + cost);
    }

    removeItemCart = (id, cost) => {
        if(this.props.cart.length > 0){
            let idx = -1;
            for(let i = 0; i < this.props.cart.length; i++){
                if(this.props.cart[i].id === id){
                    idx = i;
                    break;
                }
            }            
            if(idx > -1){
                this.props.cart.splice(idx, 1);               
                this.props.removeItem(this.props.cart, this.props.cartTotal - cost);
            }
        }
    }

    checkout = () => {        
        this.setState({loginStatus: true});
    }

    render() {   
        
        const { loginStatus } = this.state;
        if(loginStatus === true){
            return <Redirect to="/protected"/>
        }

        const menuItems = this.props.menu.map((menu) => (
            <Fragment key={menu.id}>
                <div className={classes.menuItemWrapper}>
                    <div className={classes.menuItemdesc}>
                        <div className={classes.ribbon}>
                            <span className={classes.vegRibbon}>
                                {menu.veg && <p><img src="/assets/veg.jpg" alt=""/></p>}
                                {!menu.veg && <p><img src="/assets/nonveg.png" alt=""/></p>}                        
                            </span>
                            <span className={classes.bestSellerRibbon}>
                                {menu.bestseller && <p>Best Seller</p>}        
                            </span>
                        </div>
                        <div className={classes.menuItemName}>
                            <p>{menu.name}</p>
                        </div>
                        <div className={classes.menuItemCost}>
                            <p> ₹ {menu.cost}</p>
                        </div>
                        <div className={classes.menuItemList}>
                            {
                                (menu.description.length > 0) && 
                                <p>
                                    {menu.description.join(', ')}
                                </p>
                            }
                        </div>
                    </div>
                    <div className={classes.menuItemAdd}>
                        <img 
                            src={menu.imgUrl}
                            alt="Sorry..yummy food"
                            width="128"
                            height="108"
                        />
                        <div className={classes.menuBtns}>
                            <button onClick={() => this.addItemCart(menu, parseInt(menu.cost))}>+</button>
                            <div className={classes.removeItem}>
                                <button onClick={() => this.removeItemCart(menu.id, parseInt(menu.cost))}>-</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        ))
        return (
            <div>   
                <div className={classes.menuHeader}>                   
                    <div className={classes.menuImg}>
                        <img 
                            src={'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/' + this.state.imgUrl} 
                            alt="Sorry..yummy food"
                            width="264"
                            height="165"
                        />
                    </div>
                    <div className={classes.menuInfo}>
                        <h2>{this.state.name}</h2>
                        <p>{this.state.cuisine}</p>                        
                        <p>{this.state.address}</p>
                        <br></br>
                        <div className={classes.menuSpecs}>
                            <div className={classes.menuSpecsItems}>
                                <div>
                                    {this.state.rating}
                                </div>
                                <div>
                                    500+ Rating
                                </div>
                            </div>
                            <div className={classes.menuSpecsItems}>
                                <div>
                                    {this.state.deliveryTime} mins
                                </div>
                                <div>
                                    Delivery Time
                                </div>
                            </div>
                            <div className={classes.menuSpecsItems}>
                                <div>
                                    ₹{this.state.costForTwo}
                                </div>
                                <div>
                                    Cost For Two
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.menuOffer}>
                        <div className={classes.Offer}>OFFER</div>
                        <div className={classes.offerItems}>
                            <span className={classes.offerImg}></span>
                            <div className={classes.offerConent}>
                            40% off up to ₹80 + ₹30 Paytm cashback | Use code SWIGGYIT
                            </div>
                        </div>
                        <div className={classes.offerItems}>
                            <span className={classes.offerImg}></span>
                            <div className={classes.offerConent}>
                            20% off up to ₹300 on orders above ₹600 | Use code PARTY
                            </div>
                        </div>
                    </div>
                </div> 
                <div className={classes.menuSection}>
                    <div className={classes.menuCategory}>
                        <ul>
                            <li className={classes.activeCategory}>Recommended</li>
                            <li>Combos</li>
                            <li>Snacks</li>
                            <li>Starters</li>
                            <li>Main Course</li>
                            <li>Desserts</li>
                            <li>Special Combos</li>
                        </ul>
                    </div>
                    <div className={classes.menuList}>
                        <div className={classes.menuListHeader}>
                            <h2>Recommended</h2>
                            {menuItems.length} items
                        </div>
                        {menuItems}
                    </div> 
                    <div className={classes.cartWrapper}>
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
                                <button onClick={this.checkout}>Checkout</button>
                            </div>
                        }
                    </div>
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

export default connect(mapStateToProps, { addItem, removeItem })(Menu);
