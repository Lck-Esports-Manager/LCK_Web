import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Game.css';
import Tower from './Tower';

export default function Game() {
    const [pop, setPop] = useState(true);       //팝업창의 띄움상태
    const [refresh, setRefresh] = useState(0);  //렌더를 돕는 스테이트
    const [team, setTeam] = useState(null);     //팀정보
    const [time, setTime] = useState({
        min: 5,
        sec: 0
    });
    /*
    data : 
    */
    const [info, setInfo] = useState(null);
    const [mycham, setCham] = useState({
        top: '',
        jungle: '',
        middle: '',
        adc: '',
        support: ''
    });
    const [popup, setPopup] = useState('게임을 시작하시겠습니까?'); //팝업창
    const pageRefresh = () => {
        setRefresh(refresh + 1);
        console.log(refresh);
    };
    const [tt, setTT] = useState('');
    const checkCham = (num) => {
        let temp = 'sdfd';
        axios.get('http://localhost:8000/api/champion/detail/?id=' + num)
            .then((response) => {
                console.log(response.data.name);
                temp = 'asdasdas'
                setTT(response.data.name);
            });
        return temp;
    }
    useEffect(() => {
        const fetch = async () => {
            try {
                axios.get('http://localhost:8000/api/teaminfo/')
                    .then((response) => {
                        setTeam(response.data.my_team);
                        console.log(response.data.my_team);

                    });
                axios.post('http://localhost:8000/api/progressleague/')
                    .then((response) => {
                        setInfo(response.data);
                        console.log(info);
                        console.log(response.data);
                    });
                console.log(team);
                console.log(info);
            } catch (e) { console.log(e); }
        };
        fetch();
    }, [refresh]);
    useEffect(() => {
        const fetch = async () => {
            try {
                axios.post('http://localhost:8000/api/progressleague/')
                    .then((response) => {
                        setInfo(response.data);
                        console.log(info);
                        console.log(response.data);
                    });
            } catch (e) { console.log(e); }
        };
        fetch();
    }, []);
    const turnStart = () => {
        console.log('start');
        while (time.min * time.sec !== 0) {
            setTimeout(() => {
                if (time.min > 0) {
                    setTime({
                        ...time,
                        sec: time.sec - 1
                    })
                }
                else {
                    setTime({
                        ...time,
                        min: time.min - 1,
                        sec: time.sec + 60
                    })
                }
            }, 1000);
            console.log(time.sec);
        }
    }
    return (<>
        <div className="game">
            <div className="inner">
                <div className="gamebox">
                    <div className="contents">
                        <div className="main">
                            {pop &&
                                <div className="popup">
                                    <p>{popup}</p>
                                    <div className="btn" onClick={() => {
                                        setPop(false);
                                        pageRefresh();
                                    }}>
                                        확인
                                    </div>
                                </div>
                            }
                            <div className="blue_info">
                                <ul>
                                    <li>
                                        <span class="top--image">ㅤ</span>
                                        <div>Top</div>
                                        <span class="material-icons">account_circle</span>
                                        <div>{team && team.top.player.name}</div>
                                        <span class="material-icons">pets</span>
                                        <div>{team && team.top.id}</div>
                                    </li>
                                    <li>
                                        <span class="jungle--image">ㅤ</span>
                                        <div>Jungle</div>
                                        <span class="material-icons">account_circle</span>
                                        <div>{team && team.jungle.player.name}</div>
                                        <span class="material-icons">pets</span>
                                        <div>{team && team.jungle.id}</div>
                                    </li>
                                    <li>
                                        <span class="middle--image">ㅤ</span>
                                        <div>Middle</div>
                                        <span class="material-icons">account_circle</span>
                                        <div>{team && team.mid.player.name}</div>
                                        <span class="material-icons">pets</span>
                                        <div>{team && team.mid.id}</div>
                                    </li>
                                    <li>
                                        <span class="adc--image">ㅤ</span>
                                        <div>ADC</div>
                                        <span class="material-icons">account_circle</span>
                                        <div>{team && team.adc.player.name}</div>
                                        <span class="material-icons">pets</span>
                                        <div>{team && team.adc.id}</div>
                                    </li>
                                    <li>
                                        <span class="support--image">ㅤ</span>
                                        <div>Support</div>
                                        <span class="material-icons">account_circle</span>
                                        <div>{team && team.support.player.name}</div>
                                        <span class="material-icons">pets</span>
                                        <div>{team && team.support.id}</div>
                                    </li>
                                </ul>
                            </div>
                            <div className="something">
                                <div className="head">
                                    <div className="bluestatus">
                                        <ul>
                                            <li>글로벌 골드량 : 173,125</li>
                                            <li>처치한 드래곤 : 1</li>
                                            <li>처치한 바론수 : 2</li>
                                            <li>처치한 타워수 : 4</li>
                                        </ul>
                                    </div>
                                    <div className="time">
                                        <div className="back">{time.min}:{time.sec}</div>
                                    </div>
                                    <div className="redstatus">
                                        <ul>
                                            <li>글로벌 골드량 : 234,200</li>
                                            <li>처치한 드래곤 : 2</li>
                                            <li>처치한 바론수 : 1</li>
                                            <li>처치한 타워수 : 2</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="my1"><Tower num={3} /></div>
                                <div className="my2"><Tower num={4} /></div>
                                <div className="my3"><Tower num={3} /></div>
                                <div className="my4"><Tower num={5} /></div>
                                <div className="my5"><Tower num={5} /></div>
                                <div className="my6"><Tower num={5} /></div>
                                <div className="my7"><Tower num={5} /></div>
                                <div className="my8"><Tower num={5} /></div>
                                <div className="my9"><Tower num={5} /></div>
                                <div className="op1"><Tower num={2} /></div>
                                <div className="op2"><Tower num={4} /></div>
                                <div className="op3"><Tower num={4} /></div>
                                <div className="op4"><Tower num={5} /></div>
                                <div className="op5"><Tower num={5} /></div>
                                <div className="op6"><Tower num={5} /></div>
                                <div className="op7"><Tower num={5} /></div>
                                <div className="op8"><Tower num={5} /></div>
                                <div className="op9"><Tower num={5} /></div>
                            </div>
                            <div className="map">
                                <div className="element">
                                    ㅤ
                                </div>
                            </div>
                            <div className="red_info">
                                <ul>
                                    <li>
                                        <span class="top--image">ㅤ</span>
                                        <div>Top</div>
                                        <span class="material-icons">account_circle</span>
                                        <div>{team && team.top.player.name}</div>
                                        <span class="material-icons">pets</span>
                                        <div>{team && team.top.id}</div>
                                    </li>
                                    <li>
                                        <span class="jungle--image">ㅤ</span>
                                        <div>Jungle</div>
                                        <span class="material-icons">account_circle</span>
                                        <div>{team && team.jungle.player.name}</div>
                                        <span class="material-icons">pets</span>
                                        <div>{team && team.jungle.id}</div>
                                    </li>
                                    <li>
                                        <span class="middle--image">ㅤ</span>
                                        <div>Middle</div>
                                        <span class="material-icons">account_circle</span>
                                        <div>{team && team.mid.player.name}</div>
                                        <span class="material-icons">pets</span>
                                        <div>{team && team.mid.id}</div>
                                    </li>
                                    <li>
                                        <span class="adc--image">ㅤ</span>
                                        <div>ADC</div>
                                        <span class="material-icons">account_circle</span>
                                        <div>{team && team.adc.player.name}</div>
                                        <span class="material-icons">pets</span>
                                        <div>{team && team.adc.id}</div>
                                    </li>
                                    <li>
                                        <span class="support--image">ㅤ</span>
                                        <div>Support</div>
                                        <span class="material-icons">account_circle</span>
                                        <div>{team && team.support.player.name}</div>
                                        <span class="material-icons">pets</span>
                                        <div>{team && team.support.id}</div>
                                    </li>
                                </ul>
                            </div>
                            <div className="choice">
                                <ul>
                                    <li onClick={pageRefresh}>선택지1</li>
                                    <li onClick={() => {
                                        setPop(true);

                                    }}>선택지2</li>
                                    <li onClick={() => {
                                        console.log(mycham);
                                        turnStart();
                                    }}>선택지3</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}