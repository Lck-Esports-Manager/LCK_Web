import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Login.css';
import axios from 'axios';
import Maintitle from './components/Maintitle';

axios.defaults.withCredentials = true;

function Login() {
    const [user, setInfo] = useState({
        username: '',
        password: ''
    });
    const input_info = (e) => {
        const { value, name } = e.target;
        setInfo({
            ...user,
            [name]: value
        });
    }
    const autoPress = (e) => {
        if (e.key === 'Enter') {
            login_request();
        }
    }
    const login_request = () => {
        axios.post('http://localhost:8000/api/rest-auth/login/', user
        ).then((response) => {
            console.log(response.data);
            axios.defaults.headers.common['Authorization'] = `jwt ${response.data.token}`;
            console.log(axios.defaults.headers.common['Authorization']);
            alert(`${response.data.user.username}님 환영합니다.`);
            window.localStorage.setItem('user', JSON.stringify(user.username));
            window.localStorage.setItem('isLogin', 'true');
            window.localStorage.setItem('token', `jwt ${response.data.token}`);
            document.location.href = '/';
        }).catch((Error) => {
            console.log(Error.response);
            Error.response.data &&
                alert(`ERROR : ${Error.response.data[`${Object.keys(Error.response.data)[0]}`][0]}`);
        });
    }
    return (
        <div>
            <Maintitle />
            <div className="login--main">
                <div className="inner">
                    <div className="loginbox">
                        <div className="boxtitle">로그인</div>
                        <div className="inputbox">
                            <div className="email">
                                <label>ID</label>
                                <input type="text" onKeyPress={autoPress} onChange={input_info} name='username' value={user.username} placeholder="아이디를 입력하세요." />
                            </div>
                            <div className="pw">
                                <label>PW</label>
                                <input type="password" onKeyPress={autoPress} onChange={input_info} name='password' value={user.password} placeholder="비밀번호를 입력하세요." />
                            </div>
                        </div>
                        <div className="btnbox">
                            <input type="button" onClick={login_request} value="로그인" />
                            <Link to="/CreateAccount">회원가입</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div >);
}

export default Login;