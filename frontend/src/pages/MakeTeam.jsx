import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MakeTeam.css';
import Card from './Card'

export default function MakeTeam() {
    let temp = 'asdf';
    const [players, setPlayer] = useState(null);
    const [myteam, setTeam] = useState({
        name: '',
        total: 200000,
        Top: {
            id: 0,
            name: "null",
            rate: 0,
            price: 0,
            choice: false
        },
        Jungle: {
            id: 0,
            name: "null",
            rate: 0,
            price: 0,
            choice: false
        },
        Middle: {
            id: 0,
            name: "null",
            rate: 0,
            price: 0,
            choice: false
        },
        ADC: {
            id: 0,
            name: "null",
            rate: 0,
            price: 0,
            choice: false
        },
        Support: {
            id: 0,
            name: "null",
            rate: 0,
            price: 0,
            choice: false
        }
    });
    if (myteam.name === '') {
        temp = prompt('생성할 팀 이름을 입력해주세요.');
        while (temp.length <= 4) {
            alert('팀 이름이 너무 짧습니다. 다시 입력해주세요');
            temp = prompt('생성할 팀 이름을 입력해주세요.');
        }
        setTeam({
            ...myteam,
            name: temp
        });
        alert(`팀이름 : ${temp} 이 되었습니다.`);
    }
    const getList = (props) => {
        axios.get('http://localhost:8000/api/playerlist/?position=' + props).then((response) => { setPlayer(response.data); })
    };
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                axios.get('http://localhost:8000/api/playerlist/?position=top'
                ).then((response) => {
                    setPlayer(response.data);
                })
            } catch (e) { console.log(e); }
        };
        fetchUsers();
    }, []);
    const sortList = (props) => {
        let newList;
        if (props === 'name')
            newList = [...players].sort((a, b) => a.name.localeCompare(b.name));
        else if (props === 'season')
            newList = [...players].sort((a, b) => a.year < b.year ? -1 : a.year > b.year ? 1 : 0);
        else if (props === 'team')
            newList = [...players].sort((a, b) => a.team.name < b.team.name ? -1 : a.team.name > b.team.name ? 1 : 0);
        else if (props === 'position')
            newList = [...players].sort((a, b) => a.position < b.position ? -1 : a.position > b.position ? 1 : 0);
        else if (props === 'rate')
            newList = [...players].sort((a, b) => a.price < b.price ? -1 : a.price > b.price ? 1 : 0);
        else if (props === 'price')
            newList = [...players].sort((a, b) => a.rate < b.rate ? -1 : a.rate > b.rate ? 1 : 0);
        setPlayer(newList);
    };
    const selectPlayer = (props) => {
        setTeam({
            ...myteam,
            [props.position]: {
                id: props.id,
                name: props.name,
                rate: props.rate,
                price: props.price,
                choice: true
            },
        });
    };
    const resetTeam = () => {
        setTeam({
            ...myteam,
            total: 200000,
            Top: {
                id: 0,
                name: "null",
                rate: 0,
                price: 0,
                choice: false
            },
            Jungle: {
                id: 0,
                name: "null",
                rate: 0,
                price: 0,
                choice: false
            },
            Middle: {
                id: 0,
                name: "null",
                rate: 0,
                price: 0,
                choice: false
            },
            ADC: {
                id: 0,
                name: "null",
                rate: 0,
                price: 0,
                choice: false
            },
            Support: {
                id: 0,
                name: "null",
                rate: 0,
                price: 0,
                choice: false
            }
        })
    };
    const sendTeam = () => { // 모두 골랐는지 체크, 돈이 안넘었는지 체크
        if (myteam.Top.price * myteam.Jungle.price * myteam.Middle.price
            * myteam.ADC.price * myteam.Support.price === 0) {
            alert("모든 포지션에 선수를 선택해주세요.");
        }
        else if (myteam.total < myteam.Top.price + myteam.Jungle.price
            + myteam.Middle.price + myteam.ADC.price + myteam.Support.price) {
            alert("주어진 금액을 초과했습니다. 다시 선택해주세요.");
        }
        else {
            console.log(myteam);
            alert(`${myteam.name} 팀이 생성되었습니다.`);
            axios.post('http://localhost:8000/api/maketeam/', {
                name: myteam.name,
                top: myteam.Top.id,
                jungle: myteam.Jungle.id,
                mid: myteam.Middle.id,
                adc: myteam.ADC.id,
                sup: myteam.Support.id,
                total_money: myteam.total - (myteam.Top.price + myteam.Jungle.price
                    + myteam.Middle.price + myteam.ADC.price + myteam.Support.price)
            }
            ).then((response) => {
                console.log(response);
            }).catch((e) => {
                console.log(e.response);
            })
            document.location.href = `/league`;
        }
    };
    return (<>
        <div>
            <div className="MT--main">
                <div className="inner">
                    <div className="MTbox">
                        <div className="main--top">
                            <div>
                                <div className="title">팀 생성</div>
                                <div className="money">남은 비용 : ￦{myteam.total
                                    - myteam.Top.price
                                    - myteam.Jungle.price
                                    - myteam.Middle.price
                                    - myteam.ADC.price
                                    - myteam.Support.price}</div>
                            </div>
                            <ul className="myplayer">
                                {myteam.Top.choice && <Card name='Top' props={myteam.Top} />}
                                {myteam.Jungle.choice && <Card name='Jungle' props={myteam.Jungle} />}
                                {myteam.Middle.choice && <Card name='Middle' props={myteam.Middle} />}
                                {myteam.ADC.choice && <Card name='ADC' props={myteam.ADC} />}
                                {myteam.Support.choice && <Card name='Support' props={myteam.Support} />}
                            </ul>
                            <div className="send">
                                <button onClick={sendTeam}>생성하기</button>
                                <button onClick={resetTeam}>다시하기</button>
                            </div>
                        </div>
                        <div className="contents">
                            <div className="btnbar">
                                <div className="position" onClick={() => { getList('top') }}>Top</div>
                                <div className="position" onClick={() => { getList('jungle') }}>Jungle</div>
                                <div className="position" onClick={() => { getList('middle') }}>Middle</div>
                                <div className="position" onClick={() => { getList('adc') }}>ADC</div>
                                <div className="position" onClick={() => { getList('support') }}>Support</div>
                            </div>
                            <div className="index">
                                <ul>
                                    <div>선수 선택</div>
                                    <li onClick={() => { sortList('name') }} >ㅤ선수 이름ㅤΞ</li>
                                    <li onClick={() => { sortList('season') }}>ㅤㅤㅤ시즌ㅤΞ</li>
                                    <li onClick={() => { sortList('team') }}>ㅤㅤㅤㅤㅤ팀 이름ㅤΞ</li>
                                    <li onClick={() => { sortList('position') }}>ㅤㅤㅤㅤ포지션ㅤΞ</li>
                                    <li onClick={() => { sortList('rate') }}>ㅤㅤㅤ티어ㅤΞ</li>
                                    <li onClick={() => { sortList('price') }}>ㅤㅤㅤ영입비용ㅤΞ</li>
                                    <div >ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ 능력치</div>
                                </ul>
                            </div>
                            <div className="MT--players">
                                {players && players.map((player) => (
                                    <ul>
                                        <div><button onClick={() => { selectPlayer(player) }}>선택</button></div>
                                        <li>{player.name}</li>
                                        <li>{player.year} {player.season}</li>
                                        <li className="long">{player.team.name}</li>
                                        <li>{player.position}</li>
                                        <li>{player.rate}</li>
                                        <li>{player.price}</li>
                                        <li className="status">라인 : {player.status1}</li>
                                        <li className="status">교전 : {player.status2}</li>
                                        <li className="status">한타 : {player.status3}</li>
                                    </ul>
                                ))}
                            </div>
                            <div className="line">ㅤ</div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    </>);
}