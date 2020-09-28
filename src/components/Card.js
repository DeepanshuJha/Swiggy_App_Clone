import React, { Component } from 'react'
import classes from './css/Card.module.css'
import { Redirect, Route } from 'react-router';

class Card extends Component{
    constructor(props){
        super(props);
        this.state={
            id:props.id,
            name: props.name,
            cuisine:props.cuisine,
            rating:props.rating,
            deliveryTime:props.deliveryTime,
            costForTwo:props.costForTwo,
            imgUrl:props.imgUrl,
            redirectToMenu:false
        }
    }

    isSelected = () => {
        this.setState({redirectToMenu: true});
    }

    render(){
        const {redirectToMenu} = this.state;
        if(redirectToMenu === true){
            return <Redirect to={{
                pathname: '/menu',
                state: {
                    id:this.state.id                    
                }    
            }}/>
        }
        return (
            <div className={classes.cardWrapper} onClick={this.isSelected}>
                <img 
                    src={'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/' + this.state.imgUrl} 
                    alt="Sorry..yummy food"
                />            
                <div className={classes.cardInfo}>
                    <h3>{this.state.name}</h3>
                    <p className={classes.cuisine}>{this.state.cuisine}</p>
                    <ul className={classes.foodMetrics}>
                        <li id={classes.foodRating} className={classes.foodItems}><img src="assets/star.png" alt="rating"/><span>{this.state.rating}</span></li>
                        <li className={classes.foodItems}>{this.state.deliveryTime} MINS</li>                        
                        <li className={classes.foodItems}>{this.state.costForTwo}</li>
                    </ul>
                </div>            
            </div>
        )
    }
}

export default Card