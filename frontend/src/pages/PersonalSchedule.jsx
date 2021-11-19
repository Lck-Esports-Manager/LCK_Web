import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Maintitle from './components/Maintitle';
import s0 from '../images/player.PNG';
import s1 from '../images/s1.jpg';
import s2 from '../images/s2.png';
import s3 from '../images/s3.jpg';
import s4 from '../images/s4.jpg';
import './PersonalSchedule.css';

let imgs = [s0, s1, s2, s3, s4];

export default function PersonalSchedule() {
    const [team, setTeam] = useState({
        "my_team": {
            "id": 65,
            "top": {
                "id": 321,
                "player": {
                    "name": "Daki",
                    "season": "Spring",
                    "year": 15,
                    "rate": 2
                },
                "level": 1,
                "feeling": 0,
                "status1": 80,
                "status2": 65,
                "status3": 70,
                "remain": 0,
                "exp": 0,
                "user": 34,
                "schedule": null
            },
            "jungle": {
                "id": 322,
                "player": {
                    "name": "Chesir",
                    "season": "Spring",
                    "year": 15,
                    "rate": 2
                },
                "level": 1,
                "feeling": 0,
                "status1": 70,
                "status2": 80,
                "status3": 70,
                "remain": 0,
                "exp": 0,
                "user": 34,
                "schedule": null
            },
            "mid": {
                "id": 323,
                "player": {
                    "name": "GBM",
                    "season": "Spring",
                    "year": 15,
                    "rate": 2
                },
                "level": 1,
                "feeling": 0,
                "status1": 65,
                "status2": 80,
                "status3": 75,
                "remain": 0,
                "exp": 0,
                "user": 34,
                "schedule": null
            },
            "adc": {
                "id": 324,
                "player": {
                    "name": "Zife",
                    "season": "Spring",
                    "year": 15,
                    "rate": 4
                },
                "level": 1,
                "feeling": 0,
                "status1": 75,
                "status2": 60,
                "status3": 60,
                "remain": 0,
                "exp": 0,
                "user": 34,
                "schedule": null
            },
            "support": {
                "id": 325,
                "player": {
                    "name": "GurollE",
                    "season": "Spring",
                    "year": 15,
                    "rate": 3
                },
                "level": 1,
                "feeling": 0,
                "status1": 65,
                "status2": 70,
                "status3": 75,
                "remain": 0,
                "exp": 0,
                "user": 34,
                "schedule": null
            },
            "sub1": null,
            "sub2": null,
            "sponsor1": null,
            "sponsor2": null,
            "sponsor3": null,
            "enterprise1": null,
            "name": "vvTeam",
            "money": 5000,
            "popularity": 0,
            "user": 34,
            "enterprise2": null
        },
        "available_sponsor": [],
        "available_enterprise": [
            {
                "id": 1,
                "name": "유튜브 사업",
                "description": "팀의 유튜브 채널을 개설하여 유튜브 영상을 통해 수익을 얻습니다",
                "earning": 1000,
                "cost": 300
            },
            {
                "id": 2,
                "name": "굿즈 산업",
                "description": "팀에 관련된 상품을 만들어 판매하여 수익을 얻습니다",
                "earning": 10000,
                "cost": 50000
            }
        ]
    });
    const [refresh, setRefresh] = useState(0);
    const [click1, setClick1] = useState(0);
    const [click2, setClick2] = useState(0);
    const [click3, setClick3] = useState(0);
    const [click4, setClick4] = useState(0);
    const [click5, setClick5] = useState(0);
    const [todayMatch, setMatch] = useState(null);
    useEffect(() => {
        const getTeam = async () => {
            try {
                axios.get('http://localhost:8000/api/getdayschedule/'
                ).then((response) => {
                    console.log(response);
                    setMatch(response.data);
                    if (!response.data.Success) {
                        alert('올바르지 못한 접근입니다.');
                        document.location.href = '/';
                    }
                }).catch((e) => {
                    console.log(e.response);
                })
                axios.get('http://localhost:8000/api/teaminfo/'
                ).then((response) => {
                    console.log(response);
                    setTeam(response.data);
                }).catch((e) => {
                    console.log(e.response);
                })
            } catch (e) { console.log(e); }
        };
        getTeam();
    }, [refresh]);
    const setbtn = (click, x) => {
        if (click === 1) {
            setClick1(x)
        }
        else if (click === 2) {
            setClick2(x)
        }
        else if (click === 3) {
            setClick3(x)
        }
        else if (click === 4) {
            setClick4(x)
        }
        else {
            setClick5(x)
        }
    }
    const sendScd = () => {
        if (click1 * click2 * click3 * click4 * click5 === 0)
            alert('모든 선수에게 스케줄을 부여해주세요.');
        else {
            axios.post('http://localhost:8000/api/progresspersonalschedule/', {
                "my_team": team.my_team.id,
                "top": click1,
                "jng": click2,
                "mid": click3,
                "adc": click4,
                "sup": click5,
                "sub1": null,
                "sub2": null
            }
            ).then((response) => {
                console.log(response.data);
            }).catch((e) => {
                console.log(e.response);
            })
            setClick1(0)
            setClick2(0)
            setClick3(0)
            setClick4(0)
            setClick5(0)
            axios.post('http://localhost:8000/api/otherteamprocess/',
            ).then((response) => {
                console.log(response);
            }).catch((e) => {
                console.log(e.response);
            })
            pageRefresh();
            axios.get('http://localhost:8000/api/teaminfo/'
            ).then((response) => {
                console.log(response);
                setTeam(response.data);
            }).catch((e) => {
                console.log(e.response);
            })
            axios.get('http://localhost:8000/api/getdayschedule/'
            ).then((response) => {
                console.log(response);
                setMatch(response.data);
                if (!response.data.Success) {
                    alert('올바르지 못한 접근입니다.');
                    document.location.href = '/';
                }
            }).catch((e) => {
                console.log(e.response);
            })
            alert("적용되었습니다.");
            document.location.href = "/";
        }
    }
    const pageRefresh = () => {
        setRefresh(refresh + 1);
        console.log(refresh);
    }
    return (<>
        <Maintitle />
        <div className="PS--main">
            <div className="inner">
                <div className="contents">
                    <div className="team--info">
                        <div className="teamname">Teamㅤ{team.my_team && team.my_team.name}</div>
                        <div className="popularity">인기도 : {team.my_team && team.my_team.popularity}</div>
                        <div className="money">예산 : ￦ {team.my_team && team.my_team.money}</div>
                    </div>
                    <div className="match--info">
                        <div className="title">TODAY MATCH</div>
                        <div className="VS">
                            {todayMatch && <div>ㅤ{todayMatch.data[0].team1}</div>}
                            <div className="text"> VS </div>
                            {todayMatch && <div>ㅤ{todayMatch.data[0].team2}</div>}
                        </div>
                    </div>
                    <div className="schedule--info">
                        <div className="title">
                            선수 개인 스케줄
                        </div>
                        <div className="blank">
                            <div className="help">?
                                <br />
                                휴ㅤㅤ식 : 선수의 컨디션이 2단계 증가하고, 경험치가 소폭 감소합니다.<br />
                                헬ㅤㅤ스 : 선수의 컨디션이 1단계 상승합니다.<br />
                                개인방송 : 선수단의 예산과 인기도 소폭 증가합니다.<br />
                                추가연습 : 선수의 경험치가 상승하고 컨디션이 1단계 하락합니다.
                            </div>
                        </div>
                        <div className="send" onClick={pageRefresh}>팀 정보 불러오기</div>
                        <div className="send" onClick={sendScd}>스케줄 적용하기</div>
                        <div className="card">
                            <div className="pos">Top</div>
                            <img src={imgs[click1]} className="image" alt="images" />
                            {/* <div className="image"> </div> */}
                            <ul className="info">
                                <div>Name</div>
                                <li>{team.my_team && team.my_team.top.player.name}</li>
                                <div>Level</div>
                                <li>{team.my_team && team.my_team.top.level}</li>
                                <div>Tier</div>
                                <li>{team.my_team && team.my_team.top.player.rate}</li>
                                <div>Season </div>
                                <li>ㅤ{team.my_team && team.my_team.top.player.year} {team.my_team && team.my_team.top.player.season}</li>
                            </ul>
                            <div className="select">
                                <ul>
                                    {click1 === 1 ? <li onClick={() => { setbtn(1, 1) }} title="선수의 컨디션이 2단계 증가하고, 경험치가 소폭 감소합니다">휴식</li>
                                        : <div onClick={() => { setbtn(1, 1) }} title="선수의 컨디션이 2단계 증가하고, 경험치가 소폭 감소합니다">휴식</div>}
                                    {click1 === 2 ? <li onClick={() => { setbtn(1, 2) }} title="선수의 컨디션이 1단계 상승합니다">헬스</li>
                                        : <div onClick={() => { setbtn(1, 2) }} title="선수의 컨디션이 1단계 상승합니다">헬스</div>}
                                    {click1 === 3 ? <li onClick={() => { setbtn(1, 3) }} title="선수단의 예산과 인기도 소폭 증가합니다">개인방송</li>
                                        : <div onClick={() => { setbtn(1, 3) }} title="선수단의 예산과 인기도 소폭 증가합니다">개인방송</div>}
                                    {click1 === 4 ? <li onClick={() => { setbtn(1, 4) }} title="선수의 경험치가 상승하고 컨디션이 1단계 하락합니다">추가연습</li>
                                        : <div onClick={() => { setbtn(1, 4) }} title="선수의 경험치가 상승하고 컨디션이 1단계 하락합니다">추가연습</div>}
                                </ul>
                            </div>
                        </div>
                        <div className="card">
                            <div className="pos">Jungle</div>
                            <img src={imgs[click2]} className="image" alt="images" />
                            <ul className="info">
                                <div>Name</div>
                                <li>{team.my_team && team.my_team.jungle.player.name}</li>
                                <div>Level</div>
                                <li>{team.my_team && team.my_team.jungle.level}</li>
                                <div>Tier</div>
                                <li>{team.my_team && team.my_team.jungle.player.rate}</li>
                                <div>Season </div>
                                <li>ㅤ{team.my_team && team.my_team.jungle.player.year} {team.my_team && team.my_team.jungle.player.season}</li>
                            </ul>
                            <div className="select">
                                <ul>
                                    {click2 === 1 ? <li onClick={() => { setbtn(2, 1) }} title="선수의 컨디션이 2단계 증가하고, 경험치가 소폭 감소합니다">휴식</li>
                                        : <div onClick={() => { setbtn(2, 1) }} title="선수의 컨디션이 2단계 증가하고, 경험치가 소폭 감소합니다">휴식</div>}
                                    {click2 === 2 ? <li onClick={() => { setbtn(2, 2) }} title="선수의 컨디션이 1단계 상승합니다">헬스</li>
                                        : <div onClick={() => { setbtn(2, 2) }} title="선수의 컨디션이 1단계 상승합니다">헬스</div>}
                                    {click2 === 3 ? <li onClick={() => { setbtn(2, 3) }} title="선수단의 예산과 인기도 소폭 증가합니다">개인방송</li>
                                        : <div onClick={() => { setbtn(2, 3) }} title="선수단의 예산과 인기도 소폭 증가합니다">개인방송</div>}
                                    {click2 === 4 ? <li onClick={() => { setbtn(2, 4) }} title="선수의 경험치가 상승하고 컨디션이 1단계 하락합니다">추가연습</li>
                                        : <div onClick={() => { setbtn(2, 4) }} title="선수의 경험치가 상승하고 컨디션이 1단계 하락합니다">추가연습</div>}
                                </ul>
                            </div>
                        </div>
                        <div className="card">
                            <div className="pos">Middle</div>
                            <img src={imgs[click3]} className="image" alt="images" />
                            <ul className="info">
                                <div>Name</div>
                                <li>{team.my_team && team.my_team.mid.player.name}</li>
                                <div>Level</div>
                                <li>{team.my_team && team.my_team.mid.level}</li>
                                <div>Tier</div>
                                <li>{team.my_team && team.my_team.mid.player.rate}</li>
                                <div>Season </div>
                                <li>ㅤ{team.my_team && team.my_team.mid.player.year} {team.my_team && team.my_team.mid.player.season}</li>
                            </ul>
                            <div className="select">
                                <ul>
                                    {click3 === 1 ? <li onClick={() => { setbtn(3, 1) }} title="선수의 컨디션이 2단계 증가하고, 경험치가 소폭 감소합니다">휴식</li>
                                        : <div onClick={() => { setbtn(3, 1) }} title="선수의 컨디션이 2단계 증가하고, 경험치가 소폭 감소합니다">휴식</div>}
                                    {click3 === 2 ? <li onClick={() => { setbtn(3, 2) }} title="선수의 컨디션이 1단계 상승합니다">헬스</li>
                                        : <div onClick={() => { setbtn(3, 2) }} title="선수의 컨디션이 1단계 상승합니다">헬스</div>}
                                    {click3 === 3 ? <li onClick={() => { setbtn(3, 3) }} title="선수단의 예산과 인기도 소폭 증가합니다">개인방송</li>
                                        : <div onClick={() => { setbtn(3, 3) }} title="선수단의 예산과 인기도 소폭 증가합니다">개인방송</div>}
                                    {click3 === 4 ? <li onClick={() => { setbtn(3, 4) }} title="선수의 경험치가 상승하고 컨디션이 1단계 하락합니다">추가연습</li>
                                        : <div onClick={() => { setbtn(3, 4) }} title="선수의 경험치가 상승하고 컨디션이 1단계 하락합니다">추가연습</div>}
                                </ul>
                            </div>
                        </div>
                        <div className="card">
                            <div className="pos">ADC</div>
                            <img src={imgs[click4]} className="image" alt="images" />
                            <ul className="info">
                                <div>Name</div>
                                <li>{team.my_team && team.my_team.adc.player.name}</li>
                                <div>Level</div>
                                <li>{team.my_team && team.my_team.adc.level}</li>
                                <div>Tier</div>
                                <li>{team.my_team && team.my_team.adc.player.rate}</li>
                                <div>Season </div>
                                <li>ㅤ{team.my_team && team.my_team.adc.player.year} {team.my_team && team.my_team.adc.player.season}</li>
                            </ul>
                            <div className="select">
                                <ul>
                                    {click4 === 1 ? <li onClick={() => { setbtn(4, 1) }} title="선수의 컨디션이 2단계 증가하고, 경험치가 소폭 감소합니다">휴식</li>
                                        : <div onClick={() => { setbtn(4, 1) }} title="선수의 컨디션이 2단계 증가하고, 경험치가 소폭 감소합니다">휴식</div>}
                                    {click4 === 2 ? <li onClick={() => { setbtn(4, 2) }} title="선수의 컨디션이 1단계 상승합니다">헬스</li>
                                        : <div onClick={() => { setbtn(4, 2) }} title="선수의 컨디션이 1단계 상승합니다">헬스</div>}
                                    {click4 === 3 ? <li onClick={() => { setbtn(4, 3) }} title="선수단의 예산과 인기도 소폭 증가합니다">개인방송</li>
                                        : <div onClick={() => { setbtn(4, 3) }} title="선수단의 예산과 인기도 소폭 증가합니다">개인방송</div>}
                                    {click4 === 4 ? <li onClick={() => { setbtn(4, 4) }} title="선수의 경험치가 상승하고 컨디션이 1단계 하락합니다">추가연습</li>
                                        : <div onClick={() => { setbtn(4, 4) }} title="선수의 경험치가 상승하고 컨디션이 1단계 하락합니다">추가연습</div>}
                                </ul>
                            </div>
                        </div>
                        <div className="card">
                            <div className="pos">Support</div>
                            <img src={imgs[click5]} className="image" alt="images" />
                            <ul className="info">
                                <div>Name</div>
                                <li>{team.my_team && team.my_team.support.player.name}</li>
                                <div>Level</div>
                                <li>{team.my_team && team.my_team.support.level}</li>
                                <div>Tier</div>
                                <li>{team.my_team && team.my_team.support.player.rate}</li>
                                <div>Season </div>
                                <li>ㅤ{team.my_team && team.my_team.support.player.year} {team.my_team && team.my_team.support.player.season}</li>
                            </ul>
                            <div className="select">
                                <ul>
                                    {click5 === 1 ? <li onClick={() => { setbtn(5, 1) }} title="선수의 컨디션이 2단계 증가하고, 경험치가 소폭 감소합니다">휴식</li>
                                        : <div onClick={() => { setbtn(5, 1) }} title="선수의 컨디션이 2단계 증가하고, 경험치가 소폭 감소합니다">휴식</div>}
                                    {click5 === 2 ? <li onClick={() => { setbtn(5, 2) }} title="선수의 컨디션이 1단계 상승합니다">헬스</li>
                                        : <div onClick={() => { setbtn(5, 2) }} title="선수의 컨디션이 1단계 상승합니다">헬스</div>}
                                    {click5 === 3 ? <li onClick={() => { setbtn(5, 3) }} title="선수단의 예산과 인기도 소폭 증가합니다">개인방송</li>
                                        : <div onClick={() => { setbtn(5, 3) }} title="선수단의 예산과 인기도 소폭 증가합니다">개인방송</div>}
                                    {click5 === 4 ? <li onClick={() => { setbtn(5, 4) }} title="선수의 경험치가 상승하고 컨디션이 1단계 하락합니다">추가연습</li>
                                        : <div onClick={() => { setbtn(5, 4) }} title="선수의 경험치가 상승하고 컨디션이 1단계 하락합니다">추가연습</div>}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}