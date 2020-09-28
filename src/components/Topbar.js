import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../logo.svg'
import classes from './css/Topbar.module.css'

function Topbar(){
    return (
        <div className={classes.navbarWrapper}>
            <div className={classes.navLeft}>
                <img src={logo} alt={"logo"}></img>
                <h3 className={classes.navElements}>React Restaurant</h3>
            </div>
            <div className={classes.navRight}>
                <Link to="/" className={classes.navElements}>Home</Link>    
            </div>
        </div>
    )
}

export default Topbar;