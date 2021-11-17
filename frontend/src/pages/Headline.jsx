import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import "./Headline.css";
import logo from '../images/logo.png';
import axios from 'axios';

const actStyle = {
    color: "rgb(255, 219, 161)",
    fontSize: 25
};

export default function Headline() {
    const [render, setRender] = useState(0);

    const logout = () => {
        axios.post('http://localhost:8000/api/rest-auth/logout/'
        ).then((response) => {
            console.log(response.data);
            alert(response.data.detail);
            window.localStorage.setItem('isLogin', 'false');
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('user');
            setRender(render + 1);
        }).catch((Error) => {
            console.log(Error.response);
        });
    }
    const warning_login = () => {
        alert('로그인이 필요한 서비스 입니다.');
    }

    return (
        <header>
            <div className='inner'>
                <NavLink to="/"><img src={logo} alt="Home" /></NavLink>
                <ul>
                    {
                        JSON.parse(window.localStorage.getItem('isLogin')) ?
                            <li><NavLink activeStyle={actStyle} to="/league">League</NavLink></li>
                            : <li><NavLink onClick={warning_login} to="/login">League</NavLink></li>
                    }
                    {
                        JSON.parse(window.localStorage.getItem('isLogin')) ?
                            <li><NavLink activeStyle={actStyle} to="/team">Team management</NavLink></li>
                            : <li><NavLink onClick={warning_login} to="/login">Team management</NavLink></li>
                    }
                    <li><NavLink activeStyle={actStyle} to="/player">Players</NavLink></li>
                    <li>
                        {
                            JSON.parse(window.localStorage.getItem('isLogin')) ?
                                <NavLink onClick={logout} to="/login">Logout</NavLink>
                                : <NavLink activeStyle={actStyle} to="/login">Login</NavLink>
                        }
                    </li>
                </ul>
            </div>
        </header>
    );
}