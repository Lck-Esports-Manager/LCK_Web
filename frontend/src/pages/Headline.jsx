import React from 'react';
import { NavLink } from "react-router-dom";
import "./Headline.css";
import logo from '../images/logo.png';

const actStyle = {
    color: "rgb(255, 219, 161)",
    fontSize: 25
};

export default function Headline() {
    // componentWillUpdate = (prevProps, prevState) => {
    //     return console.log("렌더링 직전!");
    // }
    return (
        <header>
            <div className='inner'>
                <NavLink to="/"><img src={logo} alt="Home" /></NavLink>
                <ul>
                    <li><NavLink activeStyle={actStyle} to="/league">League</NavLink></li>
                    <li><NavLink activeStyle={actStyle} to="/team">Team management</NavLink></li>
                    <li><NavLink activeStyle={actStyle} to="/player">Players</NavLink></li>
                    <li><NavLink activeStyle={actStyle} to="/login">Login</NavLink></li>
                </ul>
            </div>
            <div className="top">
                <div className="top-inner">
                    <div className="title">
                        LCK Esports Manager
                    </div>
                </div>
            </div>
        </header>
    );
}