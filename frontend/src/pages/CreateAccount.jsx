import React, { useState } from 'react';
import './CreateAccount.css';
import Maintitle from './Maintitle';
import axios from 'axios';

function CreateAccount() {
    const [user, setInfo] = useState({
        username: '',
        email: '',
        password1: '',
        password2: ''
    });
    const new_user = (e) => {
        const { value, name } = e.target;
        setInfo({
            ...user,
            [name]: value
        });
    }
    const autoNext = (e) => {
        if (e.key === 'Enter') {
            new_request();
        }
    }
    const new_request = () => {
        if (user.password1 === user.password2) {
            axios.post('http://localhost:8000/api/rest-auth/registration/', user
            ).then(() => {
                alert([`가입을 축하드립니다. \nname : ${user.username} \nemail : ${user.email} \n 가입확인 메일이 발송되었습니다.`]);
                document.location.href = '/login';
            }).catch((Error) => {
                //console.log(Error.response.data);
                Error.response.data &&
                    alert(`ERROR : ${Error.response.data[`${Object.keys(Error.response.data)[0]}`][0]}`);
            }).then(() => { });
        }
        else {
            alert('비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
        }
    }
    return (<div>
        <Maintitle />
        <div className="CA--main">
            <div className="inner">
                <div className="CAbox">
                    <div className="boxtitle">회원가입</div>
                    <div className="inputbox">
                        <div className="q">
                            <label>ID</label>
                            <input onChange={new_user} name="username" type="text" placeholder="아이디를 입력하세요." />
                        </div>
                        <div className="q">
                            <label>Email</label>
                            <input onChange={new_user} name="email" type="text" placeholder="이메일을 입력하세요." />
                        </div>
                        <div className="q">
                            <label>PW</label>
                            <input onChange={new_user} name="password1" type="password" placeholder="비밀번호를 입력하세요." />
                        </div>
                        <div className="q">
                            <label>Re-enter PW</label>
                            <input onChange={new_user} onKeyPress={autoNext} name="password2" type="password" placeholder="비밀번호를 입력하세요." />
                        </div>
                    </div>
                    <div className="btnbox">
                        <input type="button" onClick={new_request} value="가입완료" />
                    </div>
                </div>
            </div>
        </div>
    </div >);
}

export default CreateAccount;