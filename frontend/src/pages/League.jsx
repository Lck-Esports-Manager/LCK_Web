import React, { useState } from 'react';
import './League.css';
import axios from 'axios';

export default function League() {
    // const [leagueState, setLeague] = useState(null);
    const [leagueState, setLeague] = useState({
        league: false,
        my_team: true,
        banpick: false
    });
    const movePage = () => {
        axios.post('http://localhost:8000/api/progressleague/'
        ).then((response) => {
            console.log(response);
            setLeague(response.data);
        }).catch((e) => {
            console.log(e.response);
        })
        if (leagueState.league === false)       // 리그가 없는 경우 -> 팀생성
            document.location.href = `/maketeam`;
        else if (leagueState.my_team === false) // 경기가 없는 경우 -> 선수 개인스케줄
            document.location.href = `/personalschedule`;
        else if (leagueState.banpick === false) // 밴픽이 없는 경우 -> 밴픽
            document.location.href = `/banpick`;
        else                                    // 다 준비 되어 있는 경우 -> 게임시작
            document.location.href = `/playgame`;
    }
    return (<>
        <div className="league--main">
            <div className="inner">
                <div className="league--box">
                    <div className="contents">
                        <h2>
                            소환사의 계곡에 오신 것을 환영합니다
                        </h2>
                        <p>
                            아래 PLAY를 눌러 게임을 진행해주세요.<br />
                            처음 오신 경우 팀 생성을 하게 됩니다.<br />
                            팀 생성 후 리그에 본격적으로 진입합니다. <br />
                            리그 선수들과 함께 소환사의 계곡에서 즐거운 게임 되시기 바랍니다.<br />
                            <br />
                            중간에 게임을 종료하게 될 경우 자동 저장되며 <br />빠른 종료를 원하실 경우
                            진행된 턴 정보를 바탕으로 머신러닝 모델을 통해 승패를 결정하게 됩니다.
                        </p>
                        <div className="play--button" onClick={movePage}>
                            PLAY
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}