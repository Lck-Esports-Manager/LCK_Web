import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Game.css';
import Tower from './Tower';
import SelectBtn from './SelectBtn';

export default function Game() {
    const [clicked, setClick] = useState({
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        11: false,
        12: false,
        13: false,
        14: false,
        15: false,
        16: false,
        17: false,
        18: false,
        19: false,
        20: false
    });
    const [action, setAction] = useState(3);
    let buffer = [];
    const [pop, setPop] = useState(true);       //팝업창의 띄움상태
    const [refresh, setRefresh] = useState(0);  //렌더를 돕는 스테이트
    const [team, setTeam] = useState(null);     //팀정보
    const [select, setSelect] = useState({
        "lane_press": {
            "top": [
                false,
                1,
                1
            ],
            "mid": [
                false,
                1,
                2
            ],
            "bot": [
                false,
                1,
                3
            ]
        },
        "ganking": {
            "top": [
                true,
                1,
                4
            ],
            "mid": [
                true,
                1,
                5
            ],
            "bot": [
                true,
                1,
                6
            ]
        },
        "engage": {
            "top": [
                true,
                2,
                7
            ],
            "mid": [
                true,
                2,
                8
            ],
            "bot": [
                true,
                2,
                9
            ]
        },
        "fight": {
            "dragon": [
                false,
                3,
                10
            ],
            "elder": [
                false,
                3,
                11
            ],
            "baron": [
                false,
                3,
                12
            ],
            "normal": [
                false,
                3,
                13
            ]
        },
        "tower_press": {
            "top": [
                false,
                1,
                14
            ],
            "mid": [
                false,
                1,
                15
            ],
            "bot": [
                false,
                1,
                16
            ]
        },
        "tower_destroy": {
            "top": [
                false,
                2,
                17
            ],
            "mid": [
                false,
                2,
                18
            ],
            "bot": [
                false,
                2,
                19
            ]
        },
        "nexus_destroy": false
    });
    const [time, setTime] = useState({
        min: 5,
        sec: 0
    });
    const [info, setInfo] = useState({
        score: [
            0,
            1
        ],
        data: {
            id: 54,
            side: 0,
            turn: 1,
            my_tower1: 5,
            my_tower2: 5,
            my_tower3: 5,
            my_tower4: 5,
            my_tower5: 5,
            my_tower6: 5,
            my_tower7: 5,
            my_tower8: 5,
            my_tower9: 5,
            op_tower1: 5,
            op_tower2: 5,
            op_tower3: 5,
            op_tower4: 5,
            op_tower5: 5,
            op_tower6: 5,
            op_tower7: 5,
            op_tower8: 5,
            op_tower9: 5,
            my_dragon: 0,
            op_dragon: 0,
            my_baron: 0,
            op_baron: 0,
            my_gold: 2500,
            op_gold: 2500,
            my_tower_destroy: 0,
            op_tower_destroy: 0,
            set_num: 1,
            status: "ongoing",
            result: 1,
            is_baron: 0,
            is_elder: 0,
            my_top: 217,
            my_jng: 217,
            my_mid: 217,
            my_adc: 217,
            my_sup: 217,
            op_top: 217,
            op_jng: 217,
            op_mid: 217,
            op_adc: 217,
            op_sup: 217,
            match: 38
        }
    });
    const [popup, setPopup] = useState(['게임을 진행합니다.']); //팝업창
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
    const randomPick = () => {
        let sumAct = 0;
        let rannum = Math.floor(Math.random() * 20) + 1;
        sumAct = calcAct(rannum);
    }
    useEffect(() => {
        const fetch = async () => {
            try {
                axios.post('http://localhost:8000/api/progressleague/')
                    .then((response1) => {
                        setInfo(response1.data);
                        console.log(info);
                        axios.get('http://localhost:8000/api/makeselection/?set=' + info.data?.id)
                            .then((response2) => {
                                setSelect(response2.data);
                                console.log(response2.data);
                            }).catch((e) => {
                                console.log(e.response);
                                // console.log(e.response.data);
                            });
                    });
            } catch (e) { console.log(e); }
        };
        fetch();
        // if (info.data.turn%2===0){
        //     Math.floor(Math.random() * 20) + 1;
        // }
    }, [refresh]);
    useEffect(() => {
        const fetch = async () => {
            try {
                axios.post('http://localhost:8000/api/progressleague/')
                    .then((response1) => {
                        setInfo(response1.data);
                        console.log(info);
                        console.log(response1.data);
                    });
                // axios.get('http://localhost:8000/api/makeselection/?set=' + info.data?.id)
                //     .then((response2) => {
                //         setSelect(response2.data);
                //         console.log(response2.data);
                //     });
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
    const calcAct = (num) => {
        if (num >= 1 && num <= 6) return 1
        else if (num === 7 || num === 8 || num === 9) return 2
        else if (num === 10 || num === 11 || num === 12 || num === 13) return 3
        else if (num === 14 || num === 15 || num === 16) return 1
        else if (num === 17 || num === 18 || num === 19) return 2
        else return 3
    }
    const click = (num) => {
        if (clicked[num]) {
            setClick({
                ...clicked,
                [num]: false
            })
            setAction(action + calcAct(num))
        }
        else {
            if (action - calcAct(num) < 0) {
                alert('주어진 행동력안에서 선택해주세요');
            }
            else {
                setClick({
                    ...clicked,
                    [num]: true
                })
                setAction(action - calcAct(num))
            }
        }
    }
    const sendSelect = () => {
        for (let i = 0; i < 21; i++) {
            if (clicked[i]) {
                buffer.push(i);
            }
        }
        if (buffer.length === 0) {
            console.log('선택해야합니다.');
        }
        else {
            // api전송 
            axios.post('http://localhost:8000/api/selectionprocess/', {
                set_id: info.data.id,
                selection: buffer
            }).then((response) => {
                console.log(response.data);
                setPop(true);
                setPopup(response.data.message);
                if (buffer[0] === 20) {
                    document.location.href = '/';
                }
            });
            // 선택 초기화
            setClick({
                1: false,
                2: false,
                3: false,
                4: false,
                5: false,
                6: false,
                7: false,
                8: false,
                9: false,
                10: false,
                11: false,
                12: false,
                13: false,
                14: false,
                15: false,
                16: false,
                17: false,
                18: false,
                19: false,
                20: false
            })
            // 행동력 3
            setAction(3);
            buffer = [];
        }
        pageRefresh();
    }
    return (<>
        <div className="game">
            <div className="inner">
                <div className="gamebox">
                    <div className="contents">
                        <div className="main">
                            {pop &&
                                <div className="popup">
                                    {popup && popup.map((text) => {
                                        return <p>{text}</p>
                                    })}
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
                                        <div>{info.my_team_data?.top.name}</div>
                                        {/* <span class="material-icons">pets</span>
                                        <div>{team && team.top.id}</div> */}
                                    </li>
                                    <li>
                                        <span class="jungle--image">ㅤ</span>
                                        <div>Jungle</div>
                                        <span class="material-icons">account_circle</span>
                                        <div>{info.my_team_data?.jng.name}</div>
                                        {/* <span class="material-icons">pets</span>
                                        <div>{team && team.jungle.id}</div> */}
                                    </li>
                                    <li>
                                        <span class="middle--image">ㅤ</span>
                                        <div>Middle</div>
                                        <span class="material-icons">account_circle</span>
                                        <div>{info.my_team_data?.mid.name}</div>
                                        {/* <span class="material-icons">pets</span>
                                        <div>{team && team.mid.id}</div> */}
                                    </li>
                                    <li>
                                        <span class="adc--image">ㅤ</span>
                                        <div>ADC</div>
                                        <span class="material-icons">account_circle</span>
                                        <div>{info.my_team_data?.adc.name}</div>
                                        {/* <span class="material-icons">pets</span>
                                        <div>{team && team.adc.id}</div> */}
                                    </li>
                                    <li>
                                        <span class="support--image">ㅤ</span>
                                        <div>Support</div>
                                        <span class="material-icons">account_circle</span>
                                        <div>{info.my_team_data?.sup.name}</div>
                                        {/* <span class="material-icons">pets</span>
                                        <div>{team && team.support.id}</div> */}
                                    </li>
                                </ul>
                            </div>
                            <div className="something">
                                <div className="head">
                                    {/* <div className="bluestatus2">
                                        <div className="info--gold"></div>
                                        <div className='goldnum'>ㅤ{info.data?.my_gold}</div>
                                        <div className="info--dragon"></div>
                                        <div>ㅤ{info.data?.my_dragon}</div>
                                        <div className="info--baron"></div>
                                        <div>ㅤ{info.data?.my_baron}</div>
                                        <div className="info--tower"></div>
                                        <div>ㅤ{info.data?.my_tower_destroy}</div>
                                    </div> */}
                                    <div className="bluestatus">
                                        <ul>
                                            <li>글로벌 골드량 : {info.data?.my_gold}</li>
                                            <li>처치한 드래곤 : {info.data?.my_dragon}</li>
                                            <li>처치한 바론수 : {info.data?.my_baron}</li>
                                            <li>처치한 타워수 : {info.data?.my_tower_destroy}</li>
                                        </ul>
                                    </div>
                                    {/* <div className="time">
                                        <div className="back">{() => { return info?.score[0] }} : {() => { return info?.score[1] }}</div>
                                    </div> */}
                                    <div className="redstatus">
                                        <ul>
                                            <li>글로벌 골드량 : {info.data?.op_gold}</li>
                                            <li>처치한 드래곤 : {info.data?.op_dragon}</li>
                                            <li>처치한 바론수 : {info.data?.op_baron}</li>
                                            <li>처치한 타워수 : {info.data?.op_tower_destroy}</li>
                                        </ul>
                                    </div>
                                </div>
                                {select.fight?.baron[0] ? <div className='baron'>ㅤ</div> : <></>}
                                {select.fight?.dragon[0] || select.fight?.elder[0] ? <div className='dragon'>ㅤ</div> : <></>}
                                <div className="my1"><Tower color={0} num={info.data?.my_tower1} /></div>
                                <div className="my2"><Tower color={0} num={info.data?.my_tower2} /></div>
                                <div className="my3"><Tower color={0} num={info.data?.my_tower3} /></div>
                                <div className="my4"><Tower color={0} num={info.data?.my_tower4} /></div>
                                <div className="my5"><Tower color={0} num={info.data?.my_tower5} /></div>
                                <div className="my6"><Tower color={0} num={info.data?.my_tower6} /></div>
                                <div className="my7"><Tower color={0} num={info.data?.my_tower7} /></div>
                                <div className="my8"><Tower color={0} num={info.data?.my_tower8} /></div>
                                <div className="my9"><Tower color={0} num={info.data?.my_tower9} /></div>
                                <div className="op1"><Tower color={1} num={info.data?.op_tower1} /></div>
                                <div className="op2"><Tower color={1} num={info.data?.op_tower2} /></div>
                                <div className="op3"><Tower color={1} num={info.data?.op_tower3} /></div>
                                <div className="op4"><Tower color={1} num={info.data?.op_tower4} /></div>
                                <div className="op5"><Tower color={1} num={info.data?.op_tower5} /></div>
                                <div className="op6"><Tower color={1} num={info.data?.op_tower6} /></div>
                                <div className="op7"><Tower color={1} num={info.data?.op_tower7} /></div>
                                <div className="op8"><Tower color={1} num={info.data?.op_tower8} /></div>
                                <div className="op9"><Tower color={1} num={info.data?.op_tower9} /></div>
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
                                        <div>{info.op_team_data?.top.name}</div>
                                        {/* <span class="material-icons">pets</span>
                                        <div>{team && team.top.id}</div> */}
                                    </li>
                                    <li>
                                        <span class="jungle--image">ㅤ</span>
                                        <div>Jungle</div>
                                        <span class="material-icons">account_circle</span>
                                        <div>{info.op_team_data?.jng.name}</div>
                                        {/* <span class="material-icons">pets</span>
                                        <div>{team && team.jungle.id}</div> */}
                                    </li>
                                    <li>
                                        <span class="middle--image">ㅤ</span>
                                        <div>Middle</div>
                                        <span class="material-icons">account_circle</span>
                                        <div>{info.op_team_data?.mid.name}</div>
                                        {/* <span class="material-icons">pets</span>
                                        <div>{team && team.mid.id}</div> */}
                                    </li>
                                    <li>
                                        <span class="adc--image">ㅤ</span>
                                        <div>ADC</div>
                                        <span class="material-icons">account_circle</span>
                                        <div>{info.op_team_data?.adc.name}</div>
                                        {/* <span class="material-icons">pets</span>
                                        <div>{team && team.adc.id}</div> */}
                                    </li>
                                    <li>
                                        <span class="support--image">ㅤ</span>
                                        <div>Support</div>
                                        <span class="material-icons">account_circle</span>
                                        <div>{info.op_team_data?.sup.name}</div>
                                        {/* <span class="material-icons">pets</span>
                                        <div>{team && team.support.id}</div> */}
                                    </li>
                                </ul>
                            </div>
                            <div className="choice">
                                <ul>
                                    <li>
                                        <div className="title">교전</div>
                                        {/*true ? (clicked[0] ? <div className="selected" onClick={() => { click(0) }} >바텀 (2)</div>
                                            : <div className="select" onClick={() => { click(0) }}>바텀 (2)</div>)
                                            : <div className="no--select">바텀 (2)</div>*/}
                                        {/*select.engage.bot[0] */}
                                        <SelectBtn text="바텀 (2)" bool={select.engage?.bot[0]} argu={clicked[9]} func={() => { click(9) }} />
                                        <SelectBtn text="미드 (2)" bool={select.engage?.mid[0]} argu={clicked[8]} func={() => { click(8) }} />
                                        <SelectBtn text="탑 (2)" bool={select.engage?.top[0]} argu={clicked[7]} func={() => { click(7) }} />
                                    </li>
                                    <li>
                                        <div className="title">한타</div>
                                        <SelectBtn text="바론 (3)" bool={select.fight?.baron[0]} argu={clicked[12]} func={() => { click(12) }} />
                                        <SelectBtn text="드래곤 (3)" bool={select.fight?.dragon[0]} argu={clicked[10]} func={() => { click(10) }} />
                                        <SelectBtn text="엘더 (3)" bool={select.fight?.elder[0]} argu={clicked[11]} func={() => { click(11) }} />
                                        <SelectBtn text="노멀 (3)" bool={select.fight?.normal[0]} argu={clicked[13]} func={() => { click(13) }} />
                                    </li>
                                    <li>
                                        <div className="title">갱킹</div>
                                        <SelectBtn text="바텀 (1)" bool={select.ganking?.bot[0]} argu={clicked[6]} func={() => { click(6) }} />
                                        <SelectBtn text="미드 (1)" bool={select.ganking?.mid[0]} argu={clicked[5]} func={() => { click(5) }} />
                                        <SelectBtn text="탑 (1)" bool={select.ganking?.top[0]} argu={clicked[4]} func={() => { click(4) }} />
                                    </li>
                                    <li className='turn--info'>
                                        {info.data?.turn % 2 === 1 ?
                                            <div className='blue--turn'>TURN {info.data?.turn}</div>
                                            : <div className='red--turn'>TURN {info.data?.turn}</div>
                                        }
                                        <div className='action'>남은 행동력 {action}</div>
                                        <div className='complete' onClick={sendSelect}>진행</div>
                                    </li>
                                    <li>
                                        <div className="title">라인압박</div>
                                        <SelectBtn text="바텀 (1)" bool={select.lane_press?.bot[0]} argu={clicked[3]} func={() => { click(3) }} />
                                        <SelectBtn text="미드 (1)" bool={select.lane_press?.mid[0]} argu={clicked[2]} func={() => { click(2) }} />
                                        <SelectBtn text="탑 (1)" bool={select.lane_press?.top[0]} argu={clicked[1]} func={() => { click(1) }} />
                                        <SelectBtn text="넥서스 파괴" bool={select.nexus_destroy} argu={clicked[20]} func={() => { click(20) }} />
                                    </li>
                                    <li>
                                        <div className="title">타워공격</div>
                                        <SelectBtn text="바텀 (1)" bool={select.tower_press?.bot[0]} argu={clicked[16]} func={() => { click(16) }} />
                                        <SelectBtn text="미드 (1)" bool={select.tower_press?.mid[0]} argu={clicked[15]} func={() => { click(15) }} />
                                        <SelectBtn text="탑 (1)" bool={select.tower_press?.top[0]} argu={clicked[14]} func={() => { click(14) }} />
                                    </li>
                                    <li>
                                        <div className="title">타워파괴</div>
                                        <SelectBtn text="바텀 (2)" bool={select.tower_destroy?.bot[0]} argu={clicked[19]} func={() => { click(19) }} />
                                        <SelectBtn text="미드 (2)" bool={select.tower_destroy?.mid[0]} argu={clicked[18]} func={() => { click(18) }} />
                                        <SelectBtn text="탑 (2)" bool={select.tower_destroy?.top[0]} argu={clicked[17]} func={() => { click(17) }} />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}