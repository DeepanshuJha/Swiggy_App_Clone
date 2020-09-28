import React from 'react';
import { Redirect, Route } from 'react-router';

const PrivateRoute = ({ component: Component, ...rest}) => (
    <Route {...rest} render={(props) => {
        const userAuthenticated = localStorage.getItem('userAuthenticated');
        return userAuthenticated ? <Component {...props}/> : <Redirect to="/login"/>
    }}
    />
)

export default PrivateRoute;