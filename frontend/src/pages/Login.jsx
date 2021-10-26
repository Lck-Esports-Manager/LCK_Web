import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Login.css';
import axios from 'axios';
// import Headline from "./Headline";

function Login(props) {
    const [user, setInfo] = useState({
        username: 'test',
        email: '',
        password: ''
    });
    const input_info = (e) => {
        const { value, name } = e.target;
        setInfo({
            ...user,
            [name]: value
        });
    }
    const login_request = () => {
        axios.post('http://localhost:8000/api/rest-auth/login/', user
        ).then((response) => {
            alert(`${response.data.user.username}님 환영합니다.`);
            document.location.href = `/${response.data.user.username}`;
            // props.tag(response.data.token);
        }).catch((Error) => {
            Error.response.data &&
                alert(`ERROR : ${Error.response.data[`${Object.keys(Error.response.data)[0]}`][0]}`);
        }).then(() => { });
    }
    return (
        <div>
            {/* <Headline /> */}
            <div className="login--top">
                <div className="inner">
                    <div className="title">
                        LCK Esports Manager
                    </div>
                </div>
            </div>
            <div className="login--main">
                <div className="inner">
                    <div className="loginbox">
                        <div className="boxtitle">로그인</div>
                        <div className="inputbox">
                            <div className="email">
                                <label>EMAIL</label>
                                <input type="text" onChange={input_info} name='email' value={user.email} placeholder="이메일을 입력하세요." />
                            </div>
                            <div className="pw">
                                <label>PW</label>
                                <input type="password" onChange={input_info} name='password' value={user.pw} placeholder="비밀번호를 입력하세요." />
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