import React, { Component } from 'react'
import {Redirect} from 'react-router';
import axios from 'axios';
import classes from './css/Login.module.css'

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            redirectToReferrer : false
        }
    }

    login = () => {
        axios.post('https://food-power.glitch.me/login', {username: 'deeps', password: 'pass'})
        .then(res => {            
            localStorage.setItem('userAuthenticated', true)
            this.setState({redirectToReferrer: true});
        })
    }

    render() {
        const {redirectToReferrer} = this.state

        if(redirectToReferrer === true){
            return <Redirect to="/protected"/>
        }

        return (
            <div className={classes.loginWrapper}>
                <h2>You must login to checkout</h2>
                <button onClick={this.login}>Login</button>
            </div>
        )
    }
}

export default Login
