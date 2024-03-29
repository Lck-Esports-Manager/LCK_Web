import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Game.css';
import Tower from './components/Tower';
import SelectBtn from './components/SelectBtn';
import Slot from './components/PlayerSlot';
import { header, domain } from "../config.js";

function Result(props) {
    const isOver = () => {
        if (props.turn % 2 === 1) {
            if (props.side === 1) {
                if (props.num?.score[0] + 1 === 2) return true;
            }
            else {
                if (props.num?.score[1] + 1 === 2) return true;
            }
        }
        else { //상대턴에 종료
            if (props.side === 1) {
                if (props.num?.score[1] + 1 === 2) return true;
            }
            else {
                if (props.num?.score[0] + 1 === 2) return true;
            }
        }
        return false;
    }
    return (<>
        <div className="gameover">
            <div className="response">
                {props.turn % 2 === 1 ?
                    (props.side === 1 ? <div className="title">BlueTeam Win</div> : <div className="title">RedTeam Win</div>
                    ) : (props.side === 1 ? <div className="title">RedTeam Win</div> : <div className="title">BlueTeam Win</div>)}
                <div className="matchinfo">
                    {props.side === 1 ? <div className="blue">{props.num.blue?.name}</div> : <div className="blue">{props.num.blue?.name}</div>}
                    {props.turn % 2 === 1 ?
                        (props.side === 1
                            ? <div className="score">{props.num?.score[0] + 1} : {props.num?.score[1]}</div>
                            : <div className="score">{props.num?.score[0]} : {props.num?.score[1] + 1}</div>)
                        : (props.side === 1
                            ? <div className="score">{props.num?.score[0]} : {props.num?.score[1] + 1}</div>
                            : <div className="score">{props.num?.score[0] + 1} : {props.num?.score[1]}</div>)}
                    <div className="red">{props.num.red?.name}</div>
                </div>
                <ul className="score">
                    <li><div className="blue">{props.num.blue?.gold}</div><div className="subtitle">글로벌 골드량</div><div className="red">{props.num.red?.gold}</div></li>
                    <li><div className="blue">{props.num.blue?.dragon}</div><div className="subtitle">처치한 드래곤</div><div className="red">{props.num.red?.dragon}</div></li>
                    <li><div className="blue">{props.num.blue?.baron}</div><div className="subtitle">처치한 바론수</div><div className="red">{props.num.red?.baron}</div></li>
                    <li><div className="blue">{props.num.blue?.tower}</div><div className="subtitle">파괴한 타워수</div><div className="red">{props.num.red?.tower}</div></li>

                    {isOver() === true ? <li className="money">
                        <ul className="title">
                            <li>현재 예산</li>
                            <li>사업 수익</li>
                            <li>스폰서 수익</li>
                            <li>경기 보상</li>
                            <li>합계</li>
                        </ul>
                        <ul className="data">
                            <li>{props.num.money?.current}</li>
                            <li>{props.num.money?.enterprise}</li>
                            <li>{props.num.money?.sponsor}</li>
                            <li>{props.num.money?.playresult}</li>
                            <li>{props.num.money?.current + props.num.money?.enterprise +
                                props.num.money?.sponsor + props.num.money?.playresult}</li>
                        </ul>
                    </li> : <></>}
                </ul>
            </div>
            <div className="btn" onClick={() => {
                document.location.href = '/league';
            }}>
                확인
            </div>
        </div>
    </>);
}

export default function Game(props) {
    const over = (model) => {
        let money = 10000;
        if (model) buffer = [21];
        else buffer = [20];
        axios.post(`${domain}:8000/api/progressleague/`).then((leagueData) => {
            axios.get(`${domain}:8000/api/teaminfo/`).then((teamInfo) => {
                if (side === 1) //blue
                {
                    if (info.data?.turn % 2 === 0) money = 8000;
                    setR({
                        score: [leagueData.data.score[0], leagueData.data.score[1]],
                        blue: {
                            name: leagueData.data.my_team_data.name,
                            gold: leagueData.data.data.my_gold,
                            dragon: leagueData.data.data.my_dragon,
                            baron: leagueData.data.data.my_baron,
                            tower: leagueData.data.data.my_tower_destroy
                        },
                        red: {
                            name: leagueData.data.op_team_data.name,
                            gold: leagueData.data.data.op_gold,
                            dragon: leagueData.data.data.op_dragon,
                            baron: leagueData.data.data.op_baron,
                            tower: leagueData.data.data.op_tower_destroy
                        },
                        money: {
                            current: teamInfo.data.my_team.money,
                            enterprise: teamInfo.data.my_team.enterprise1?.earning,
                            sponsor: 0,
                            playresult: money
                        }
                    });
                }
                else {
                    if (info.data?.turn % 2 === 0) money = 8000;
                    setR({
                        score: [leagueData.data.score[0], leagueData.data.score[1]],
                        blue: {
                            name: leagueData.data.op_team_data.name,
                            gold: leagueData.data.data.op_gold,
                            dragon: leagueData.data.data.op_dragon,
                            baron: leagueData.data.data.op_baron,
                            tower: leagueData.data.data.op_tower_destroy
                        },
                        red: {
                            name: leagueData.data.my_team_data.name,
                            gold: leagueData.data.data.my_gold,
                            dragon: leagueData.data.data.my_dragon,
                            baron: leagueData.data.data.my_baron,
                            tower: leagueData.data.data.my_tower_destroy
                        },
                        money: {
                            current: teamInfo.data.my_team.money,
                            enterprise: teamInfo.data.my_team.enterprise1?.earning,
                            sponsor: 0,
                            playresult: money
                        }
                    });
                }
            });
        });
        axios.post(`${domain}:8000/api/selectionprocess/`, {
            set_id: info.data.id,
            selection: buffer
        }).then((response) => {
            alert(response.data.message);
            document.location.href = '/league';
        });
        // setGameover(true);
    }
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
        20: false,
        21: false
    });
    const [action, setAction] = useState(3);
    let buffer = [];
    const [refresh, setRefresh] = useState(0);  //렌더를 돕는 스테이트
    const [pick, setPick] = useState(null);
    const [myImg, setmyImg] = useState({
        top: {
            name: "quinnn",
            url: "/api/media/images/quinn.png"
        },
        jng: {
            name: "shaco",
            url: "/api/media/images/shaco.png"
        },
        mid: {
            name: "vex",
            url: "/api/media/images/vex.png"
        },
        adc: {
            name: "missfortune",
            url: "/api/media/images/missfortune.png"
        },
        sup: {
            name: "morgana",
            url: "/api/media/images/morgana.png"
        }
    });
    const [opImg, setopImg] = useState({
        top: {
            name: "quinn",
            url: "/api/media/images/quinn.png"
        },
        jng: {
            name: "shaco",
            url: "/api/media/images/shaco.png"
        },
        mid: {
            name: "vex",
            url: "/api/media/images/vex.png"
        },
        adc: {
            name: "missfortune",
            url: "/api/media/images/missfortune.png"
        },
        sup: {
            name: "morgana",
            url: "/api/media/images/morgana.png"
        }
    });
    const [select, setSelect] = useState({
        "lane_press": {
            "top": [false, 1, 1],
            "mid": [false, 1, 2],
            "bot": [false, 1, 3]
        },
        "ganking": {
            "top": [true, 1, 4],
            "mid": [true, 1, 5],
            "bot": [true, 1, 6]
        },
        "engage": {
            "top": [true, 2, 7],
            "mid": [true, 2, 8],
            "bot": [true, 2, 9]
        },
        "fight": {
            "dragon": [false, 3, 10],
            "elder": [false, 3, 11],
            "baron": [false, 3, 12]
        },
        "tower_press": {
            "top": [false, 1, 14],
            "mid": [false, 1, 15],
            "bot": [false, 1, 16]
        },
        "tower_destroy": {
            "top": [false, 2, 17],
            "mid": [false, 2, 18],
            "bot": [false, 2, 19]
        },
        "nexus_destroy": false,
        "model_use": [false, 3, 21]
    });
    const [info, setInfo] = useState({
        score: [
            0,
            1
        ],
        data: {
            id: 54,
            side: 0,
            turn: 0,
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
    const [side, setSide] = useState(Number(props.match.params.side));
    const [turn, setTurn] = useState(Number(props.match.params.turn));
    const [set_id, setId] = useState(props.match.params.id);
    const [pop, setPop] = useState(true);       //팝업창의 띄움상태
    const [popup, setPopup] = useState(['게임을 진행합니다.']); //팝업창
    const [check, setCheck] = useState(false);
    const [gameover, setGameover] = useState(false);
    const [gameresult, setResult] = useState(['결과창']); //팝업창
    const [result, setR] = useState({
        score: [0, 1],
        blue: {
            name: "blue team",
            gold: 2500,
            dragon: 0,
            baron: 0,
            tower: 0
        },
        red: {
            name: "red team",
            gold: 2500,
            dragon: 0,
            baron: 0,
            tower: 0
        },
        money: {
            current: 2500,
            enterprise: 0,
            sponsor: 0,
            playresult: 0
        }
    }); //팝업창
    const pageRefresh = () => {
        setRefresh(refresh + 1);
        console.log(refresh);
    };
    const loadImage = () => {
        axios.get(`${domain}:8000/api/champion/detail/?id=` + info.data?.my_top, header)
            .then((response1) => {
                axios.get(`${domain}:8000/api/champion/detail/?id=` + info.data?.my_jng, header)
                    .then((response2) => {
                        axios.get(`${domain}:8000/api/champion/detail/?id=` + info.data?.my_mid, header)
                            .then((response3) => {
                                axios.get(`${domain}:8000/api/champion/detail/?id=` + info.data?.my_adc, header)
                                    .then((response4) => {
                                        axios.get(`${domain}:8000/api/champion/detail/?id=` + info.data?.my_sup, header)
                                            .then((response5) => {
                                                setmyImg({
                                                    top: {
                                                        name: response1.data.name,
                                                        url: response1.data.image_url
                                                    },
                                                    jng: {
                                                        name: response2.data.name,
                                                        url: response2.data.image_url
                                                    },
                                                    mid: {
                                                        name: response3.data.name,
                                                        url: response3.data.image_url
                                                    },
                                                    adc: {
                                                        name: response4.data.name,
                                                        url: response4.data.image_url
                                                    },
                                                    sup: {
                                                        name: response5.data.name,
                                                        url: response5.data.image_url
                                                    }
                                                });
                                            })
                                    })
                            })
                    })
            })
        axios.get(`${domain}:8000/api/champion/detail/?id=` + info.data?.op_top, header)
            .then((response1) => {
                axios.get(`${domain}:8000/api/champion/detail/?id=` + info.data?.op_jng, header)
                    .then((response2) => {
                        axios.get(`${domain}:8000/api/champion/detail/?id=` + info.data?.op_mid, header)
                            .then((response3) => {
                                axios.get(`${domain}:8000/api/champion/detail/?id=` + info.data?.op_adc, header)
                                    .then((response4) => {
                                        axios.get(`${domain}:8000/api/champion/detail/?id=` + info.data?.op_sup, header)
                                            .then((response5) => {
                                                setopImg({
                                                    top: {
                                                        name: response1.data.name,
                                                        url: response1.data.image_url
                                                    },
                                                    jng: {
                                                        name: response2.data.name,
                                                        url: response2.data.image_url
                                                    },
                                                    mid: {
                                                        name: response3.data.name,
                                                        url: response3.data.image_url
                                                    },
                                                    adc: {
                                                        name: response4.data.name,
                                                        url: response4.data.image_url
                                                    },
                                                    sup: {
                                                        name: response5.data.name,
                                                        url: response5.data.image_url
                                                    }
                                                });
                                            })
                                    })
                            })
                    })
            })
    }
    useEffect(() => {
        const fetch = async () => {
            try {
                if (gameover === false && check === false) {
                    if (turn % 2 === 1) { //myturn
                        if (refresh > 1 && info.data?.turn % 2 === 1) {
                            autoSelect();
                        }
                    }
                    else { //auto
                        if (refresh === 1 || info.data?.turn % 2 === 1) {
                            autoSelect();
                        }
                    }
                    if (refresh === 0 || refresh === 1 || refresh === 2) loadImage();
                }
                axios.get(`${domain}:8000/api/makeselection/?set=` + set_id, header)
                    .then((response2) => {
                        setSelect(response2.data);
                        console.log(response2.data);
                        console.log(select);
                        setPick({
                            1: { bool: select.lane_press?.top[0], act: response2.data.lane_press?.top[1] },
                            2: { bool: select.lane_press?.mid[0], act: response2.data.lane_press?.mid[1] },
                            3: { bool: select.lane_press?.bot[0], act: response2.data.lane_press?.bot[1] },
                            4: { bool: select.ganking?.top[0], act: response2.data.ganking?.top[1] },
                            5: { bool: select.ganking?.mid[0], act: response2.data.ganking?.mid[1] },
                            6: { bool: select.ganking?.bot[0], act: response2.data.ganking?.bot[1] },
                            7: { bool: select.engage?.top[0], act: response2.data.engage?.top[1] },
                            8: { bool: select.engage?.mid[0], act: response2.data.engage?.mid[1] },
                            9: { bool: select.engage?.bot[0], act: response2.data.engage?.bot[1] },
                            10: { bool: false },
                            11: { bool: false },
                            12: { bool: false },
                            13: { bool: false },
                            14: { bool: select.tower_press?.top[0], act: select.tower_press?.top[1] },
                            15: { bool: select.tower_press?.mid[0], act: select.tower_press?.mid[1] },
                            16: { bool: select.tower_press?.bot[0], act: select.tower_press?.bot[1] },
                            17: { bool: select.tower_destroy?.top[0], act: select.tower_destroy?.top[1] },
                            18: { bool: select.tower_destroy?.mid[0], act: select.tower_destroy?.mid[1] },
                            19: { bool: select.tower_destroy?.bot[0], act: select.tower_destroy?.bot[1] },
                            20: { bool: select.nexus_destroy },
                            21: { bool: select?.model_use[0] }
                        });
                        // if (select.nexus_destroy) {
                        //     setSelect({
                        //         "lane_press": {
                        //             "top": [false, 1, 1],
                        //             "mid": [false, 1, 2],
                        //             "bot": [false, 1, 3]
                        //         },
                        //         "ganking": {
                        //             "top": [false, 1, 4],
                        //             "mid": [false, 1, 5],
                        //             "bot": [false, 1, 6]
                        //         },
                        //         "engage": {
                        //             "top": [false, 2, 7],
                        //             "mid": [false, 2, 8],
                        //             "bot": [false, 2, 9]
                        //         },
                        //         "fight": {
                        //             "dragon": [false, 3, 10],
                        //             "elder": [false, 3, 11],
                        //             "baron": [false, 3, 12]
                        //         },
                        //         "tower_press": {
                        //             "top": [false, 1, 14],
                        //             "mid": [false, 1, 15],
                        //             "bot": [false, 1, 16]
                        //         },
                        //         "tower_destroy": {
                        //             "top": [false, 2, 17],
                        //             "mid": [false, 2, 18],
                        //             "bot": [false, 2, 19]
                        //         },
                        //         "nexus_destroy": true,
                        //         "model_use": [false, 3, 21]
                        //     });
                        // }
                    }).catch((e) => {
                        console.log(e.response);
                        // console.log(e.response.data);
                    });
                axios.post(`${domain}:8000/api/progressleague/`, header)
                    .then((response1) => {
                        setInfo(response1.data);
                        // loadImage();
                    });
            } catch (e) { console.log(e); }
        };

        fetch();
    }, [refresh]);
    const calcAct = (num) => {
        if (num === 1 || num === 2 || num === 3) return select.lane_press?.bot[1];
        else if (num === 4 || num === 5 || num === 6) return select.ganking?.bot[1];
        else if (num === 7 || num === 8 || num === 9) return select.engage?.bot[1];
        else if (num === 10 || num === 11 || num === 12 || num === 13) return 0;
        else if (num === 14 || num === 15 || num === 16) return select.tower_press?.bot[1];
        else if (num === 17 || num === 18 || num === 19) return select.tower_destroy?.bot[1];
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
        if (select.fight?.dragon[0]) buffer.push(10);
        if (select.fight?.elder[0]) buffer.push(11);
        if (select.fight?.baron[0]) buffer.push(12);
        for (let i = 0; i < 21; i++) {
            if (clicked[i]) {
                buffer.push(i);
            }
        }
        if (buffer.length === 0) {
            alert('선택해야합니다.');
        }
        else {
            // api전송 
            if (buffer.indexOf(20) >= 0) {
                over(false);
            }
            else {
                axios.post(`${domain}:8000/api/selectionprocess/`, {
                    set_id: info.data.id,
                    selection: buffer
                }).then((response) => {
                    setPop(true);
                    setPopup(response.data.message);
                });
            }
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
                20: false,
                21: false
            })
            // 행동력 3
            setAction(3);
            buffer = [];
        }
    }
    const autoSelect = () => {
        let rand1 = Math.floor(Math.random() * 3); //0~2 선택지 조합 변수
        let rand2 = 0; //각 행동력 배열안에서 하나 뽑는 랜덤수
        let act1 = [];
        let act2 = [];
        let act3 = [];
        buffer = [];
        let i = 0;
        let temp = 0;
        // 행동력따라 나눠 저장
        if (pick !== null) {
            console.log(pick);
            for (i = 1; i < 20; i++) {
                if (pick[i]?.bool) {
                    if (pick[i]?.act === 1) act1.push(i);
                    if (pick[i]?.act === 2) act2.push(i);
                    if (pick[i]?.act === 3) act3.push(i);
                }
            }
            if (pick[20].bool) {    //넥서스 파괴 선택지가 있을경우 
                over(false);
            }
            else {                  //넥서스 파괴 선택지가 없을경우 
                //3
                if (rand1 === 0) {
                    if (act3.length === 0) rand1 = rand1 + 1;
                    else {
                        rand2 = Math.floor(Math.random() * act3.length); //0~2
                        buffer.push(act3[rand2]);
                    }
                }
                //2 1
                if (rand1 === 1) {
                    if (act2.length === 0) rand1 = rand1 + 1;
                    else {
                        rand2 = Math.floor(Math.random() * act2.length); //0~2
                        buffer.push(act2[rand2]);
                        rand2 = Math.floor(Math.random() * act1.length); //0~2
                        buffer.push(act1[rand2]);
                    }
                }
                // 1 1 1
                if (rand1 === 2) {
                    //섞고 pop해서 나온걸로 넣기
                    while (buffer.length < 3) {
                        if (act1.length === 0) break;
                        else {
                            act1.sort(() => Math.random() - Math.random());
                            temp = act1.pop();
                            buffer.push(temp);
                        }
                    }
                }
                buffer.sort();
            }
        }
        //버퍼에는 선택가능한 것들이 들어가 있는 상태
        axios.post(`${domain}:8000/api/selectionprocess/`, {
            set_id: info.data.id,
            selection: buffer
        }).then((response) => {
            setPop(true);
            setPopup(response.data.message);
        });
        buffer = [];
    }
    const useModel = () => {
        over(true);
    }
    return (<>
        <div className="game">
            <div className="inner">
                <div className="gameinfo">
                    {side === 1 ?
                        <>
                            <div className="blueteam"><div className="img" />{info.my_team_data?.name}</div>
                            <div className="score">{info.score[0]} : {info.score[1]}</div>
                            <div className="redteam">{info.op_team_data?.name}</div>
                        </>
                        : <>
                            <div className="blueteam"><div className="img" />{info.op_team_data?.name}</div>
                            <div className="score">{info.score[0]} : {info.score[1]}</div>
                            <div className="redteam">{info.my_team_data?.name}</div>
                        </>
                    }
                </div>
                <div className="gamebox">
                    <div className="contents">
                        <div className="main">
                            {pop &&
                                <div className="popup">
                                    <div className="response">
                                        {popup && popup.map((text) => { return <p>{text}</p> })}
                                    </div>
                                    <div className="btn" onClick={() => {
                                        setPop(false);
                                        pageRefresh();
                                    }}>
                                        확인
                                    </div>
                                </div>
                            }
                            {gameover &&
                                <Result num={result} side={side} turn={info.data?.turn} />
                            }
                            <div className="blue_info">
                                <div className="img" />
                                {side === 1 ?
                                    <ul>
                                        <Slot pos="Top" teaminfo={info.my_team_data?.top} img={myImg.top} icon="top--image" />
                                        <Slot pos="Jungle" teaminfo={info.my_team_data?.jng} img={myImg.jng} icon="jungle--image" />
                                        <Slot pos="Middle" teaminfo={info.my_team_data?.mid} img={myImg.mid} icon="middle--image" />
                                        <Slot pos="ADC" teaminfo={info.my_team_data?.adc} img={myImg.adc} icon="adc--image" />
                                        <Slot pos="Support" teaminfo={info.my_team_data?.sup} img={myImg.sup} icon="support--image" />
                                    </ul> :
                                    <ul>
                                        <Slot pos="Top" teaminfo={info.op_team_data?.top} img={opImg.top} icon="top--image" />
                                        <Slot pos="Jungle" teaminfo={info.op_team_data?.jng} img={opImg.jng} icon="jungle--image" />
                                        <Slot pos="Middle" teaminfo={info.op_team_data?.mid} img={opImg.mid} icon="middle--image" />
                                        <Slot pos="ADC" teaminfo={info.op_team_data?.adc} img={opImg.adc} icon="adc--image" />
                                        <Slot pos="Support" teaminfo={info.op_team_data?.sup} img={opImg.sup} icon="support--image" />
                                    </ul>}
                            </div>
                            <div className="something">
                                <div className="head">
                                    <div className="bluestatus">
                                        {side === 1 ?
                                            <ul>
                                                <li>글로벌 골드량 : {info.data?.my_gold}</li>
                                                <li>처치한 드래곤 : {info.data?.my_dragon}</li>
                                                <li>처치한 바론수 : {info.data?.my_baron}</li>
                                                <li>처치한 타워수 : {info.data?.my_tower_destroy}</li>
                                            </ul> :
                                            <ul>
                                                <li>글로벌 골드량 : {info.data?.op_gold}</li>
                                                <li>처치한 드래곤 : {info.data?.op_dragon}</li>
                                                <li>처치한 바론수 : {info.data?.op_baron}</li>
                                                <li>처치한 타워수 : {info.data?.op_tower_destroy}</li>
                                            </ul>
                                        }
                                    </div>
                                    {/* <div className="time">
                                        <div className="back">{() => { return info?.score[0] }} : {() => { return info?.score[1] }}</div>
                                    </div> */}
                                    <div className="redstatus">
                                        {side !== 1 ?
                                            <ul>
                                                <li>글로벌 골드량 : {info.data?.my_gold}</li>
                                                <li>처치한 드래곤 : {info.data?.my_dragon}</li>
                                                <li>처치한 바론수 : {info.data?.my_baron}</li>
                                                <li>처치한 타워수 : {info.data?.my_tower_destroy}</li>
                                            </ul> :
                                            <ul>
                                                <li>글로벌 골드량 : {info.data?.op_gold}</li>
                                                <li>처치한 드래곤 : {info.data?.op_dragon}</li>
                                                <li>처치한 바론수 : {info.data?.op_baron}</li>
                                                <li>처치한 타워수 : {info.data?.op_tower_destroy}</li>
                                            </ul>
                                        }
                                    </div>
                                </div>
                                {select.fight?.baron[0] ? <div className='baron'>ㅤ</div> : <></>}
                                {select.fight?.dragon[0] || select.fight?.elder[0] ? <div className='dragon'>ㅤ</div> : <></>}
                                {side === 1 ?
                                    <>
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
                                    </>
                                    :
                                    <>
                                        <div className="my1"><Tower color={0} num={info.data?.op_tower1} /></div>
                                        <div className="my2"><Tower color={0} num={info.data?.op_tower2} /></div>
                                        <div className="my3"><Tower color={0} num={info.data?.op_tower3} /></div>
                                        <div className="my4"><Tower color={0} num={info.data?.op_tower4} /></div>
                                        <div className="my5"><Tower color={0} num={info.data?.op_tower5} /></div>
                                        <div className="my6"><Tower color={0} num={info.data?.op_tower6} /></div>
                                        <div className="my7"><Tower color={0} num={info.data?.op_tower7} /></div>
                                        <div className="my8"><Tower color={0} num={info.data?.op_tower8} /></div>
                                        <div className="my9"><Tower color={0} num={info.data?.op_tower9} /></div>
                                        <div className="op1"><Tower color={1} num={info.data?.my_tower1} /></div>
                                        <div className="op2"><Tower color={1} num={info.data?.my_tower2} /></div>
                                        <div className="op3"><Tower color={1} num={info.data?.my_tower3} /></div>
                                        <div className="op4"><Tower color={1} num={info.data?.my_tower4} /></div>
                                        <div className="op5"><Tower color={1} num={info.data?.my_tower5} /></div>
                                        <div className="op6"><Tower color={1} num={info.data?.my_tower6} /></div>
                                        <div className="op7"><Tower color={1} num={info.data?.my_tower7} /></div>
                                        <div className="op8"><Tower color={1} num={info.data?.my_tower8} /></div>
                                        <div className="op9"><Tower color={1} num={info.data?.my_tower9} /></div>
                                    </>
                                }
                            </div>
                            <div className="map">
                                <div className="element">
                                    ㅤ
                                </div>
                            </div>
                            <div className="red_info">
                                <div className="img" />
                                {side !== 1 ?
                                    <ul>
                                        <Slot pos="Top" teaminfo={info.my_team_data?.top} img={myImg.top} icon="top--image" />
                                        <Slot pos="Jungle" teaminfo={info.my_team_data?.jng} img={myImg.jng} icon="jungle--image" />
                                        <Slot pos="Middle" teaminfo={info.my_team_data?.mid} img={myImg.mid} icon="middle--image" />
                                        <Slot pos="ADC" teaminfo={info.my_team_data?.adc} img={myImg.adc} icon="adc--image" />
                                        <Slot pos="Support" teaminfo={info.my_team_data?.sup} img={myImg.sup} icon="support--image" />
                                    </ul> :
                                    <ul>
                                        <Slot pos="Top" teaminfo={info.op_team_data?.top} img={opImg.top} icon="top--image" />
                                        <Slot pos="Jungle" teaminfo={info.op_team_data?.jng} img={opImg.jng} icon="jungle--image" />
                                        <Slot pos="Middle" teaminfo={info.op_team_data?.mid} img={opImg.mid} icon="middle--image" />
                                        <Slot pos="ADC" teaminfo={info.op_team_data?.adc} img={opImg.adc} icon="adc--image" />
                                        <Slot pos="Support" teaminfo={info.op_team_data?.sup} img={opImg.sup} icon="support--image" />
                                    </ul>}
                            </div>
                            <div className="choice">
                                <ul>
                                    <li>
                                        <div className="title">교전</div>
                                        {/*true ? (clicked[0] ? <div className="selected" onClick={() => { click(0) }} >바텀 (2)</div>
                                            : <div className="select" onClick={() => { click(0) }}>바텀 (2)</div>)
                                            : <div className="no--select">바텀 (2)</div>*/}
                                        {/*select.engage.bot[0] */}
                                        <SelectBtn text="탑" act={select.engage?.top[1]} bool={select.engage?.top[0]} argu={clicked[7]} func={() => { click(7) }} />
                                        <SelectBtn text="미드" act={select.engage?.mid[1]} bool={select.engage?.mid[0]} argu={clicked[8]} func={() => { click(8) }} />
                                        <SelectBtn text="바텀" act={select.engage?.bot[1]} bool={select.engage?.bot[0]} argu={clicked[9]} func={() => { click(9) }} />
                                    </li>
                                    <li>
                                        <div className="title">한타</div>
                                        {select.fight?.baron[0] ? <div className="selected" >바론</div>
                                            : <div className="no--select">바론</div>}
                                        {select.fight?.dragon[0] ? <div className="selected" >드래곤</div>
                                            : <div className="no--select">드래곤</div>}
                                        {select.fight?.elder[0] ? <div className="selected" >엘더</div>
                                            : <div className="no--select">엘더</div>}
                                        {/* <SelectBtn text="노멀" act={select.fight?.normal[1]} bool={select.fight?.normal[0]} argu={clicked[13]} func={() => { click(13) }} /> */}
                                    </li>
                                    <li>
                                        <div className="title">갱킹</div>
                                        <SelectBtn text="탑" act={select.ganking?.top[1]} bool={select.ganking?.top[0]} argu={clicked[4]} func={() => { click(4) }} />
                                        <SelectBtn text="미드" act={select.ganking?.mid[1]} bool={select.ganking?.mid[0]} argu={clicked[5]} func={() => { click(5) }} />
                                        <SelectBtn text="바텀" act={select.ganking?.bot[1]} bool={select.ganking?.bot[0]} argu={clicked[6]} func={() => { click(6) }} />
                                    </li>
                                    <li className='turn--info'>
                                        {info.data?.turn % 2 === 1 ?
                                            (side === 1 ?
                                                <div className='blue--turn'>TURN {info.data?.turn}</div> :
                                                <div className='red--turn'>TURN {info.data?.turn}</div>)
                                            : (side === 0 ?
                                                <div className='blue--turn'>TURN {info.data?.turn}</div> :
                                                <div className='red--turn'>TURN {info.data?.turn}</div>)
                                        }
                                        <div className='action'>남은 행동력 {action}</div>
                                        {gameover === false ? <div className='complete' onClick={sendSelect}>선택지 진행</div>
                                            : <div className='no--complete' >선택지 진행</div>}
                                        {gameover === false && select?.model_use[0] ? <div className='complete' onClick={useModel}>빠른실행</div>
                                            : <div className='no--complete'>빠른실행</div>}

                                    </li>
                                    <li>
                                        <div className="title">라인압박</div>
                                        <SelectBtn text="탑" act={select.lane_press?.top[1]} bool={select.lane_press?.top[0]} argu={clicked[1]} func={() => { click(1) }} />
                                        <SelectBtn text="미드" act={select.lane_press?.mid[1]} bool={select.lane_press?.mid[0]} argu={clicked[2]} func={() => { click(2) }} />
                                        <SelectBtn text="바텀" act={select.lane_press?.bot[1]} bool={select.lane_press?.bot[0]} argu={clicked[3]} func={() => { click(3) }} />
                                        {/* <SelectBtn text="넥서스 파괴" bool={select.nexus_destroy} argu={clicked[20]} func={() => { click(20) }} /> */}
                                        {select.nexus_destroy ? (clicked[20] ? <div className="selected" onClick={() => { click(20) }} >넥서스 파괴</div>
                                            : <div className="select" onClick={() => { click(20) }}>넥서스 파괴</div>)
                                            : <div className="no--select">넥서스 파괴</div>}
                                    </li>
                                    <li>
                                        <div className="title">타워공격</div>
                                        <SelectBtn text="탑" act={select.tower_press?.top[1]} bool={select.tower_press?.top[0]} argu={clicked[14]} func={() => { click(14) }} />
                                        <SelectBtn text="미드" act={select.tower_press?.mid[1]} bool={select.tower_press?.mid[0]} argu={clicked[15]} func={() => { click(15) }} />
                                        <SelectBtn text="바텀" act={select.tower_press?.bot[1]} bool={select.tower_press?.bot[0]} argu={clicked[16]} func={() => { click(16) }} />
                                    </li>
                                    <li>
                                        <div className="title">타워파괴</div>
                                        <SelectBtn text="탑" act={select.tower_destroy?.top[1]} bool={select.tower_destroy?.top[0]} argu={clicked[17]} func={() => { click(17) }} />
                                        <SelectBtn text="미드" act={select.tower_destroy?.mid[1]} bool={select.tower_destroy?.mid[0]} argu={clicked[18]} func={() => { click(18) }} />
                                        <SelectBtn text="바텀" act={select.tower_destroy?.bot[1]} bool={select.tower_destroy?.bot[0]} argu={clicked[19]} func={() => { click(19) }} />
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