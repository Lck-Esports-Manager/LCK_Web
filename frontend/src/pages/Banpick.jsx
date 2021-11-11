import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Banpick.css";
import Maintitle from './Maintitle';

export default function Banpick() {
    /* 해당 계정에 대한 정보 */
    const [api, setApi] = useState(
        {
            "league": true,
            "my_team": true,
            "other_team": false,
            "banpick": true,
            "set_num": 1,
            "set_id": 9,
        }
    );
    let randT = 0;
    let randC = 0;
    let bpTitle = "챔피언 선택";
    let bpSubTitle = ['Top Ban', 'Top Ban', 'Jungle Ban',
        'Jungle Ban', 'Middle Ban', 'Middle Ban', 'Top Pick'
        , 'Top Pick', 'Jungle Pick', 'Jungle Pick', 'Middle Pick',
        'Middle Pick', 'Bottom Ban', 'Bottom Ban', 'Support Ban',
        'Support Ban', 'Bottom Pick', 'Bottom Pick', 'Support Pick', 'Support Pick', 'Selection complete !!'];
    let [iTurn, setTurn] = useState(-1);

    /* 선택된 챔피언 리스트 밴픽, 픽 모두 포함 */
    const [chamList, setChamList] = useState({
        0: null,
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
        6: null,
        7: null,
        8: null,
        9: null,
        10: null,
        11: null,
        12: null,
        13: null,
        14: null,
        15: null,
        16: null,
        17: null,
        18: null,
        19: null,
        20: null,
    });
    /* 화면에 출력하는 챔피언 목록 */
    const [pntList, setPntList] = useState(null);
    const [ranList, setRanList] = useState(null);

    /* 빨강파랑 고려하여 현재 내턴인지 구분 */
    const isMyturn = (i) => {
        if (api.set_num === 1) { //myteam blue
            if (i === 0 || i === 2 || i === 4 || i === 7 || i === 8 ||
                i === 11 || i === 12 || i === 14 || i === 16 || i === 19) {
                return 0
            }
            else { return 1 }
        }
        else {                   // myteam red
            if (i === 0 || i === 2 || i === 4 || i === 7 || i === 8 ||
                i === 11 || i === 12 || i === 14 || i === 16 || i === 19) {
                return 1
            }
            else { return 0 }
        }
    }
    /* 선택완료 버튼 눌렀을때의 동작 */
    const nextTurn = () => {
        if (iTurn >= 19) {
            alert('챔피언 선택이 완료되었습니다.');
            axios.post('http://localhost:8000/api/banpick/', {
                set_id: api.set_id,
                btop: chamList[6].id,
                bjng: chamList[9].id,
                bmid: chamList[10].id,
                badc: chamList[17].id,
                bsup: chamList[18].id,
                rtop: chamList[7].id,
                rjng: chamList[8].id,
                rmid: chamList[11].id,
                radc: chamList[16].id,
                rsup: chamList[19].id
            })
                .then((response) => { setPntList(response.data); })
            document.location.href = '/league';
        }
        else if (chamList[iTurn] === null) {
            alert('챔피언을 선택해주세요.');
        }
        else {
            setTurn(iTurn + 1);
            axios.get('http://localhost:8000/api/champion/?position=' + isPos(iTurn + 1) + '&tier=1')
                .then((response1) => {
                    axios.get('http://localhost:8000/api/champion/?position=' + isPos(iTurn + 1) + '&tier=2')
                        .then((response2) => {
                            setRanList({
                                1: response1.data,
                                2: response2.data
                            });
                        })
                })
        }
    }
    const isBan = (i) => {
        if (i === 0 || i === 1 || i === 2 || i === 3 || i === 4 || i === 5
            || i === 12 || i === 13 || i === 14 || i === 15)
            return 1
        else
            return 0
    }
    const isPos = (i) => {
        if (i === 0 || i === 1 || i === 6 || i === 7)
            return 'Top'
        else if (i === 2 || i === 3 || i === 8 || i === 9)
            return 'Jungle'
        else if (i === 4 || i === 5 || i === 10 || i === 11)
            return 'Middle'
        else if (i === 12 || i === 13 || i === 16 || i === 17)
            return 'Bottom'
        else if (i === 14 || i === 15 || i === 18 || i === 19)
            return 'Support'
        else
            return
    }
    /* 챔피언을 하나 눌렀을때 동작 */
    const Pick = (cham) => {
        if (iTurn === -1)
            alert('시작하기를 눌러주세요.');
        if (iTurn !== -1 && isMyturn()) {
            for (let i = 0; i < iTurn; i++) {
                if (cham.id === chamList[i].id) {
                    alert('다른 챔피언으로 다시 선택해주십시오.');
                    return
                }
            }
            console.log(cham);
            if (cham.position !== isPos(iTurn))
                alert(`${isPos(iTurn)} 포지션의 챔피언을 선택해주세요.`);
            else {
                setChamList({
                    ...chamList,
                    [iTurn]: cham,
                })
            }
            //console.log(cham);
            //console.log(chamList);
        }
        else {
            alert('상대방 차례입니다. NEXT를 눌러 진행해주세요.');
        }
    }
    /* 선택된 챔피언들을 출력하는 함수 */
    const printList = (i) => {
        return chamList[i] ?
            <ul>
                <li className="grade">{chamList[i].grade}</li>
                <li className="name">{chamList[i].name}</li>
            </ul> : "";
    }
    /* 포지션별 API요청 */
    const getList = (props) => {
        axios.get('http://localhost:8000/api/champion/?position=' + props)
            .then((response) => { setPntList(response.data); })
    }
    /* 처음 렌더시 top포지션 api요청 */
    useEffect(() => {
        const fetch = async () => {
            try {
                axios.get('http://localhost:8000/api/champion/?position=top')
                    .then((response) => { setPntList(response.data); })
                axios.get('http://localhost:8000/api/progressleague/')
                    .then((response) => { setApi(response.data); })

                axios.get('http://localhost:8000/api/champion/?position=' + 'top' + '&tier=1')
                    .then((response1) => {
                        axios.get('http://localhost:8000/api/champion/?position=' + 'top' + '&tier=2')
                            .then((response2) => {
                                setRanList({
                                    1: response1.data,
                                    2: response2.data
                                });
                            })
                    })
            } catch (e) { console.log(e); }
        };
        fetch();
    }, []);
    /* 1티어, 2티어 스테이트 생성 *//*
    useEffect(() => {
        console.log(`==== i: ${iTurn}+1 ran 새로받아오기 ====`);
        const fetchcham = async () => {
            try {
                axios.get('http://localhost:8000/api/champion/?position=' + isPos(iTurn + 1) + '&tier=1')
                    .then((response1) => {
                        axios.get('http://localhost:8000/api/champion/?position=' + isPos(iTurn + 1) + '&tier=2')
                            .then((response2) => {
                                setRanList({
                                    1: response1.data,
                                    2: response2.data
                                });
                            })
                    })
                //console.log(ranList);
            } catch (e) { console.log(e); }
        };
        fetchcham();
    }, [iTurn]);*/
    /* 렌더될때마다 내 턴이 아니면 자동으로 픽하는 동작 */
    if (!isMyturn(iTurn)) {
        randT = Math.floor(Math.random() * 2) + 1;
        randC = Math.floor(Math.random() * ranList[randT].length);
        let temp = 1;
        axios.get('http://localhost:8000/api/champion/?position=' + isPos(iTurn + 1) + '&tier=1')
            .then((response1) => {
                axios.get('http://localhost:8000/api/champion/?position=' + isPos(iTurn + 1) + '&tier=2')
                    .then((response2) => {
                        setRanList({
                            1: response1.data,
                            2: response2.data
                        });
                    })
            })
        while (temp) {
            temp = 0;
            for (let i = 0; i < iTurn; i++) {
                if (ranList[randT][randC].id === chamList[i].id) {
                    randT = Math.floor(Math.random() * 2) + 1;
                    randC = Math.floor(Math.random() * ranList[randT].length);
                    temp = 1;
                }
            }
        }
        setChamList({
            ...chamList,
            [iTurn]: ranList[randT][randC],
        })
        setTurn(iTurn + 1);

    }
    return (<>
        <Maintitle />
        <div className="BP--main">
            <div className="BP--inner">
                <div className="BPbox">
                    <div className="contents">
                        <div className="titles">
                            <div className="BP--title">
                                {bpTitle}
                            </div>
                            <div className="BP--Subtitle">
                                {bpSubTitle[iTurn]}
                            </div>
                            <div className="nextBtn" onClick={nextTurn}>
                                {iTurn === -1 ? '시작하기' : iTurn !== 20 ? '선택완료' : '완 료'}
                            </div>
                        </div>
                        <ul>
                            <li className="ban">
                                <div className="blue--pick">
                                    <ul className="cardbar">
                                        <div className="top">Top</div>
                                        <li className="card"><div className="cham">{printList(1)}</div> </li>
                                        <div className="jng">Jungle</div>
                                        <li className="card"><div className="cham">{printList(3)}</div> </li>
                                        <div className="mid">Middle</div>
                                        <li className="card"><div className="cham">{printList(5)}</div> </li>
                                        <div className="adc">ADC</div>
                                        <li className="card"><div className="cham">{printList(13)}</div> </li>
                                        <div className="spt">Support</div>
                                        <li className="card"><div className="cham">{printList(15)}</div> </li>
                                    </ul>
                                </div>
                                <div className="blue--pick">
                                    {/* <div className="title">BAN</div> */}
                                    <ul className="cardbar">
                                        <div className="top">Top</div>
                                        <li className="card"><div className="cham">{printList(0)}</div> </li>
                                        <div className="jng">Jungle</div>
                                        <li className="card"><div className="cham">{printList(2)}</div> </li>
                                        <div className="mid">Middle</div>
                                        <li className="card"><div className="cham">{printList(4)}</div> </li>
                                        <div className="adc">ADC</div>
                                        <li className="card"><div className="cham">{printList(12)}</div> </li>
                                        <div className="spt">Support</div>
                                        <li className="card"><div className="cham">{printList(14)}</div> </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="blue">
                                <div className="pick">
                                    {/* <div className="title">BLUE</div> */}
                                    <ul className="cardbar">
                                        <div className="pos">Top</div>
                                        <li className="card"><div className="cham">{printList(6)}</div> </li>
                                        <div className="pos">Jungle</div>
                                        <li className="card"><div className="cham">{printList(9)}</div> </li>
                                        <div className="pos">Middle</div>
                                        <li className="card"><div className="cham">{printList(10)}</div> </li>
                                        <div className="pos">ADC</div>
                                        <li className="card"><div className="cham">{printList(17)}</div> </li>
                                        <div className="pos">Support</div>
                                        <li className="card"><div className="cham">{printList(18)}</div> </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="chams">
                                <div className="btnbar">
                                    {isPos(iTurn) !== 'Top' ? <div className="position" onClick={() => { getList('top') }}>Top</div>
                                        : <div className="special" onClick={() => { getList('top') }}>Top</div>}
                                    {isPos(iTurn) !== 'Jungle' ? <div className="position" onClick={() => { getList('jungle') }}>Jungle</div>
                                        : <div className="special" onClick={() => { getList('jungle') }}>Jungle</div>}
                                    {isPos(iTurn) !== 'Middle' ? <div className="position" onClick={() => { getList('middle') }}>Middle</div>
                                        : <div className="special" onClick={() => { getList('middle') }}>Middle</div>}
                                    {isPos(iTurn) !== 'Bottom' ? <div className="position" onClick={() => { getList('bottom') }}>ADC</div>
                                        : <div className="special" onClick={() => { getList('bottom') }}>ADC</div>}
                                    {isPos(iTurn) !== 'Support' ? <div className="position" onClick={() => { getList('support') }}>Support</div>
                                        : <div className="special" onClick={() => { getList('support') }}>Support</div>}
                                </div>
                                <div className="list">
                                    {pntList && pntList.map((cham) => (
                                        <ul onClick={() => { Pick(cham) }}>
                                            <li className="grade">{cham.grade}</li>
                                            <li className="pos">{cham.position}</li>
                                            <li className="name">{cham.name}</li>
                                        </ul>
                                    ))}
                                </div>
                            </li>
                            <li className="red">
                                <div className="pick">
                                    {/* <div className="title">RED</div> */}
                                    <ul className="cardbar">
                                        <div className="pos">Top</div>
                                        <li className="card"><div className="cham">{printList(7)}</div> </li>
                                        <div className="pos">Jungle</div>
                                        <li className="card"><div className="cham">{printList(8)}</div> </li>
                                        <div className="pos">Middle</div>
                                        <li className="card"><div className="cham">{printList(11)}</div> </li>
                                        <div className="pos">ADC</div>
                                        <li className="card"><div className="cham">{printList(16)}</div> </li>
                                        <div className="pos">Support</div>
                                        <li className="card"><div className="cham">{printList(19)}</div> </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div >
    </>);
}