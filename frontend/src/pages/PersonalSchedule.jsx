import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Maintitle from './components/Maintitle';
import s0 from '../images/player.PNG';
import s1 from '../images/S1.PNG';
import s2 from '../images/S2-1.PNG';
import s3 from '../images/S3.PNG';
import s4 from '../images/S4.PNG';
import './PersonalSchedule.css';
import { domain } from '../config';
let imgs = [s0, s1, s2, s3, s4];

function PlayinfoCard(props) {
    const CondiToString = (num) => {
        if (num === -2) return "매우 나쁨";
        else if (num === -1) return "나쁨";
        else if (num === 0) return "보통";
        else if (num === 1) return "좋음";
        else return "매우 좋음";
    }
    const Condi = (choice) => {
        if (choice === 1) return "ㅤ▲▲";
        else if (choice === 2) return "ㅤ▲";
        else if (choice === 4) return "ㅤ▼";
        else return "";
    }
    const Exp = (choice) => {
        if (choice === 1) return "ㅤ▼";
        else if (choice === 4) return "ㅤ▲";
        else return "";
    }
    return (<>
        <ul className="info">
            <div>Name</div>
            <li>{props.pos?.player.name}</li>
            <div>Level</div>
            <li>{props.pos?.level}</li>
            <div>EXP </div>
            <li>{props.pos?.exp * 10} %{Exp(props?.choice)}</li>
            <div>Tier</div>
            <li>{props.pos?.player.rate}</li>
            <div>Condition </div>
            <li>{CondiToString(props.pos?.feeling)}{Condi(props?.choice)}</li>
        </ul>

    </>);
}

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
        }
    });
    const [refresh, setRefresh] = useState(0);
    const [click1, setClick1] = useState(0);
    const [click2, setClick2] = useState(0);
    const [click3, setClick3] = useState(0);
    const [click4, setClick4] = useState(0);
    const [click5, setClick5] = useState(0);
    const [click6, setClick6] = useState(0);
    const [click7, setClick7] = useState(0);
    const [todayMatch, setMatch] = useState(null);
    useEffect(() => {
        const getTeam = async () => {
            try {
                axios.get(`${domain}:8000/api/getdayschedule/`
                ).then((response) => {
                    setMatch(response.data);
                    // if (!response.data.Success) {
                    //     alert('올바르지 못한 접근입니다.');
                    //     document.location.href = '/';
                    // }
                }).catch((e) => {
                    console.log(e.response);
                })
                axios.get(`${domain}:8000/api/teaminfo/`
                ).then((response) => {
                    setTeam(response.data);
                }).catch((e) => {
                    console.log(e.response);
                })
            } catch (e) { console.log(e); }
        };
        getTeam();
    }, [refresh]);
    const setbtn = (click, x) => {
        if (click === 1) setClick1(x);
        else if (click === 2) setClick2(x);
        else if (click === 3) setClick3(x);
        else if (click === 4) setClick4(x);
        else if (click === 5) setClick5(x);
        else if (click === 6) setClick6(x);
        else setClick7(x);
    }
    const sendScd = () => {
        if (click1 * click2 * click3 * click4 * click5 === 0)
            alert('모든 선수에게 스케줄을 부여해주세요.');
        else {
            axios.post(`${domain}:8000/api/progresspersonalschedule/`, {
                "my_team": team.my_team.id,
                "top": click1,
                "jng": click2,
                "mid": click3,
                "adc": click4,
                "sup": click5,
                "sub1": click6,
                "sub2": click7
            }
            ).then((response) => {
            }).catch((e) => {
                console.log(e.response);
            })
            setClick1(0)
            setClick2(0)
            setClick3(0)
            setClick4(0)
            setClick5(0)
            axios.post(`${domain}:8000/api/otherteamprocess/`,
            ).then((response) => {
            }).catch((e) => {
                console.log(e.response);
            })
            pageRefresh();
            axios.get(`${domain}:8000/api/teaminfo/`
            ).then((response) => {
                setTeam(response.data);
            }).catch((e) => {
                console.log(e.response);
            })
            axios.get(`${domain}:8000/api/getdayschedule/`
            ).then((response) => {
                setMatch(response.data);
                // if (response.data.Success === false) {
                //     alert('올바르지 못한 접근입니다.');
                //     document.location.href = '/';
                // }
            }).catch((e) => {
                console.log(e.response);
            })
            alert("적용되었습니다.");
            document.location.href = "/";
        }
    }
    const pageRefresh = () => {
        setRefresh(refresh + 1);
    }
    const schedulebtn = (click, num) => {
        return (
            <div className="select">
                <ul>
                    {click === 1 ? <li onClick={() => { setbtn(num, 1) }} title="선수의 컨디션이 2단계 증가하고, 경험치가 소폭 감소합니다">휴식</li>
                        : <div onClick={() => { setbtn(num, 1) }} title="선수의 컨디션이 2단계 증가하고, 경험치가 소폭 감소합니다">휴식</div>}
                    {click === 2 ? <li onClick={() => { setbtn(num, 2) }} title="선수의 컨디션이 1단계 상승합니다">헬스</li>
                        : <div onClick={() => { setbtn(num, 2) }} title="선수의 컨디션이 1단계 상승합니다">헬스</div>}
                    {click === 3 ? <li onClick={() => { setbtn(num, 3) }} title="선수단의 예산과 인기도 소폭 증가합니다">개인방송</li>
                        : <div onClick={() => { setbtn(num, 3) }} title="선수단의 예산과 인기도 소폭 증가합니다">개인방송</div>}
                    {click === 4 ? <li onClick={() => { setbtn(num, 4) }} title="선수의 경험치가 상승하고 컨디션이 1단계 하락합니다">추가연습</li>
                        : <div onClick={() => { setbtn(num, 4) }} title="선수의 경험치가 상승하고 컨디션이 1단계 하락합니다">추가연습</div>}
                </ul>
            </div>);
    }
    const ingido = () => {
        if (click1 === 3 || click2 === 3 || click3 === 3 || click4 === 3 || click5 === 3 || click6 === 3 || click7 === 3)
            return "ㅤ▲";
    }
    const money = () => {
        if (click1 === 3 || click2 === 3 || click3 === 3 || click4 === 3 || click5 === 3 || click6 === 3 || click7 === 3)
            return "ㅤ▲";
    }
    return (<>
        <div className="PS--main">
            <Maintitle />
            <div className="inner">
                <div className="contents">
                    <div className="team--info">
                        <div className="teamname">Team : {team.my_team && team.my_team.name}</div>
                        <div className="popularity">인기도 : {team.my_team && team.my_team.popularity}{ingido()}</div>
                        <div className="money">예산 : ￦ {team.my_team && team.my_team.money}{money()}</div>
                    </div>
                    <div className="match--info">
                        <div className="title">TODAY MATCH</div>
                        <div className="VS">
                            {todayMatch && <div>ㅤ{todayMatch.data[0]?.team1}</div>}
                            <div className="text"> VS </div>
                            {todayMatch && <div>ㅤ{todayMatch.data[0]?.team2}</div>}
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
                            <PlayinfoCard pos={team.my_team?.top} choice={click1} />
                            {schedulebtn(click1, 1)}
                        </div>
                        <div className="card">
                            <div className="pos">Jungle</div>
                            <img src={imgs[click2]} className="image" alt="images" />
                            <PlayinfoCard pos={team.my_team?.jungle} choice={click2} />
                            {schedulebtn(click2, 2)}
                        </div>
                        <div className="card">
                            <div className="pos">Middle</div>
                            <img src={imgs[click3]} className="image" alt="images" />
                            <PlayinfoCard pos={team.my_team?.mid} choice={click3} />
                            {schedulebtn(click3, 3)}
                        </div>
                        <div className="card">
                            <div className="pos">ADC</div>
                            <img src={imgs[click4]} className="image" alt="images" />
                            <PlayinfoCard pos={team.my_team?.adc} choice={click4} />
                            {schedulebtn(click4, 4)}
                        </div>
                        <div className="card">
                            <div className="pos">Support</div>
                            <img src={imgs[click5]} className="image" alt="images" />
                            <PlayinfoCard pos={team.my_team?.support} choice={click5} />
                            {schedulebtn(click5, 5)}
                        </div>
                        {team.my_team?.sub1 ?
                            <div className="card">
                                <div className="pos">Sub1</div>
                                <img src={imgs[click6]} className="image" alt="images" />
                                <PlayinfoCard pos={team.my_team?.sub1} choice={click6} />
                                {schedulebtn(click6, 6)}
                            </div> :
                            <div className="null--card">
                                <div className="pos">선수없음</div>
                            </div>}
                        {team.my_team?.sub2 ?
                            <div className="card">
                                <div className="pos">Sub2</div>
                                <img src={imgs[click7]} className="image" alt="images" />
                                <PlayinfoCard pos={team.my_team?.sub2} choice={click7} />
                                {schedulebtn(click7, 7)}
                            </div> :
                            <div className="null--card">
                                <div className="pos">선수없음</div>
                            </div>}
                    </div>
                </div>
            </div>
        </div>
    </>);
}