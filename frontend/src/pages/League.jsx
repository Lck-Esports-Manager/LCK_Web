import React, { useState, useEffect } from 'react';
import './League.css';
import axios from 'axios';
import { Link } from "react-router-dom";
import { domain } from '../config';
export default function League() {
    const [playbtn, setPlaybtn] = useState(true);
    const [leagueState, setLeague] = useState({
        league: true,
        my_team: true,
        banpick: false,
        past_league: false,
        score: [0, 0],
        my_team_data: { name: 'blue team' },
        op_team_data: { name: 'red team' },
        data: { id: 0, turn: 1, side: 0 },
        side: 0,
    });
    const [refresh, setRefresh] = useState(0);
    const pageRefresh = () => {
        setRefresh(refresh + 1);
    };
    useEffect(() => {
        const getLeague = async () => {
            try {
                axios.post(`${domain}:8000/api/progressleague/`
                ).then((response) => {
                    setLeague(response.data);
                    console.log(leagueState);
                }).catch((e) => {
                    console.log(e.response);
                })
            } catch (e) { console.log(e); }
        };
        getLeague();
    }, [refresh]);
    const loadPage = () => {
        setPlaybtn(false);
        pageRefresh();
    }
    const movePage = () => {
        if (leagueState.league === false)       // 리그가 없는 경우 -> 팀생성
            return `/maketeam`;
        else if (leagueState.my_team === false) // 경기가 없는 경우 -> 선수 개인스케줄
            return `/personalschedule`;
        else if (leagueState.banpick === true) // 밴픽이 없는 경우 -> 밴픽
            return `/banpick`;
        else                                    // 다 준비 되어 있는 경우 -> 게임시작
            return `/game/${leagueState.data?.side}/${leagueState.data?.turn}/${leagueState.data?.id}`;
    }
    const seasonEnd = () => {
        axios.post(`${domain}:8000/api/leagueend/`
        ).then((response) => {
        })
        alert("리그의 마지막 날이 되었습니다.");
        document.location.href = "/";
    }
    const setVictory = () => {
        axios.post(`${domain}:8000/api/banpick/`, {
            set_id: leagueState?.set_id,
            btop: 217,
            bjng: 273,
            bmid: 313,
            badc: 366,
            bsup: 391,
            rtop: 218,
            rjng: 274,
            rmid: 314,
            radc: 367,
            rsup: 390
        })
        axios.post(`${domain}:8000/api/selectionprocess/`, {
            set_id: leagueState.data?.id,
            selection: [20]
        }).then((response) => {
            alert(response.data.message);
        });
        document.location.href = "/league";
    }
    const newleague = () => {
        axios.post(`${domain}:8000/api/makenewleague/`
        ).then((response) => {
            console.log(response);
        })
        alert(`기존 팀으로 리그가 생성되었습니다.`);
        document.location.href = '/';
    }
    return (<>
        <div className="league--main">
            <div className="inner">
                <div className="league--box">
                    <div className="contents">
                        {leagueState.past_league === true ? <h2>이번 시즌 리그가 종료되었습니다</h2> : <h2>소환사의 계곡에 오신 것을 환영합니다</h2>}
                        {playbtn ?
                            <>
                                <p>
                                    Tip!<br /><br />
                                    아래 PLAY를 눌러 게임을 진행해주세요.<br />
                                    처음 오신 경우 팀 생성을 하게 됩니다.<br />
                                    팀 생성 후 리그에 본격적으로 진입합니다. <br />
                                    리그 선수들과 함께 소환사의 계곡에서 즐거운 게임 되시기 바랍니다.<br />
                                    <br />
                                    중간에 게임을 종료하게 될 경우 자동 저장되며 <br />빠른 종료를 원하실 경우
                                    진행된 턴 정보를 바탕으로 머신러닝 모델을 통해 승패를 결정하게 됩니다.
                                </p><div className="play--button" onClick={loadPage}>
                                    PLAY
                                </div>
                            </>
                            : <>{leagueState.past_league === true ?
                                <>
                                    <div className="current">
                                        <div className="end makeTeam"><Link className="img" to={movePage}></Link><Link className="title" to={movePage}>새로운 팀<br />생성</Link></div>
                                        <div className="end banPick">
                                            <><div className="img" onClick={() => { newleague(); }}  ></div>
                                                <div className="title" onClick={() => { newleague(); }}  ><div className="playtitle">기존팀으로 진행</div></div></>
                                        </div>

                                    </div>
                                    <div ><br />주의 : 새로운 팀 생성시 기존 선수들의 스텟 및 컨디션 정보는 모두 사라지게 됩니다.</div>
                                </>
                                : <>
                                    <div className="victory" onClick={setVictory}>세트 승리</div>
                                    <div className="season" onClick={seasonEnd}>시즌 종료</div>
                                    <div className="current">
                                        {leagueState.league === false ?
                                            <div className="on makeTeam"><Link className="img" to={movePage}></Link><Link className="title" to={movePage}>ㅤ팀 생성ㅤ</Link></div>
                                            : <div className="makeTeam"><div className="black--img"></div><div className="teamtitle">TEAM<br />{leagueState.my_team_data?.name}</div></div>
                                        }
                                        {leagueState.league === true && leagueState.banpick === true && leagueState.my_team === true ?
                                            <div className="on banPick">
                                                {/* <Link className="img" to={movePage}></Link> */}
                                                {leagueState?.side === 1 ?
                                                    <><Link className="img" to='/banpick/1'  ></Link>
                                                        <Link className="title" to='/banpick/1'  ><div className="playtitle">챔피언 선택<br />{leagueState?.score[0]} : {leagueState?.score[1]}</div></Link></>
                                                    : <><Link className="img" to='/banpick/0'  ></Link>
                                                        <Link className="title" to='/banpick/0'  ><div className="playtitle">챔피언 선택<br />{leagueState?.score[0]} : {leagueState?.score[1]}</div></Link></>}
                                                {/* <Link className="title" to={movePage} side={leagueState?.side}>챔피언 선택</Link> */}
                                            </div>
                                            : <div className="banPick"><div className="black--img"></div><div className="title">챔피언 선택</div></div>
                                        }
                                        {leagueState.league === true && leagueState.banpick === false && leagueState.my_team === true ?
                                            (leagueState.data?.turn === 1 ? <div className="on playGame">
                                                {leagueState.data?.side === 1 ?
                                                    <><Link className="img" to={movePage}  ></Link>
                                                        <Link className="title" to={movePage}  ><div className="playtitle">게임 시작<br />{leagueState?.score[0]} : {leagueState?.score[1]}</div></Link></>
                                                    : <><Link className="img" to={movePage}  ></Link>
                                                        <Link className="title" to={movePage}  ><div className="playtitle">게임 시작<br />{leagueState?.score[0]} : {leagueState?.score[1]}</div></Link></>}
                                                {/* <Link className="img" to={movePage}></Link>
                                            <Link className="title" to={movePage}>
                                                <div className="title">게임 시작<br />{leagueState?.score[0]} : {leagueState?.score[1]}</div>
                                            </Link> */}
                                            </div> :
                                                <div className="on playGame">
                                                    {leagueState.data?.side === 1 ?
                                                        <><Link className="img" to={movePage}  ></Link>
                                                            <Link className="title" to={movePage}  ><div className="playtitle">게임 진행중<br />{leagueState?.score[0]} : {leagueState?.score[1]}<br /> {leagueState.data?.turn} 턴</div></Link></>
                                                        : <><Link className="img" to={movePage}  ></Link>
                                                            <Link className="title" to={movePage}  ><div className="playtitle">게임 진행중<br />{leagueState?.score[0]} : {leagueState?.score[1]}<br /> {leagueState.data?.turn} 턴</div></Link></>}
                                                </div>)

                                            : <div className="playGame"><div className="black--img"></div><div className="title">게임 진행</div></div>
                                        }
                                        {leagueState.league === true && leagueState.my_team === false ?
                                            <div className="on personalSchedule"><Link className="img" to={movePage}></Link><Link className="title" to={movePage}>선수 스케줄</Link></div>
                                            : <div className="personalSchedule"><div className="black--img"></div><div className="title">선수 스케줄</div></div>
                                        }
                                    </div>
                                </>}
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    </>);
}