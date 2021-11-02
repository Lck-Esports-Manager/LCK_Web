import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Player.css';
/*import styled from 'styled-components';*/
// import Headline from "./Headline";

export default function Player() {
    const [players, setPlayer] = useState(null);
    const getList = (props) => {
        axios.get('http://localhost:8000/api/playerlist/?position=' + props).then((response) => { setPlayer(response.data); })
    }
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
    }
    return (<>
        <div>
            <div className="player--main">
                <div className="inner">
                    <div className="playerbox">
                        <div className="title">
                            선수도감
                        </div>
                        <div className="contents">
                            <div className="line">ㅤ</div>
                            <div className="btnbar">
                                <div className="position" onClick={() => { getList('top') }}>Top</div>
                                <div className="position" onClick={() => { getList('jungle') }}>Jungle</div>
                                <div className="position" onClick={() => { getList('middle') }}>Middle</div>
                                <div className="position" onClick={() => { getList('adc') }}>ADC</div>
                                <div className="position" onClick={() => { getList('support') }}>Support</div>
                            </div>
                            <div className="index">
                                <ul>
                                    <li onClick={() => { sortList('name') }} >선수 이름ㅤΞ</li>
                                    <li onClick={() => { sortList('season') }}>시즌ㅤΞ</li>
                                    <li onClick={() => { sortList('team') }}>팀 이름ㅤΞ</li>
                                    <li onClick={() => { sortList('position') }}>포지션ㅤΞ</li>
                                    <li onClick={() => { sortList('rate') }}>티어ㅤΞ</li>
                                    <li onClick={() => { sortList('price') }}>영입비용ㅤΞ</li>
                                </ul>
                            </div>
                            <div className="players">
                                {players && players.map((player) => (
                                    <ul>
                                        <li>{player.name}</li>
                                        <li>{player.year} {player.season}</li>
                                        <li>{player.team.name}</li>
                                        <li>{player.position}</li>
                                        <li>{player.rate}</li>
                                        <li>{player.price}</li>
                                        <li className="status">라인전 능력 : {player.status1}</li>
                                        <li className="status">교전 능력 : {player.status2}</li>
                                        <li className="status">한타 능력 : {player.status3}</li>
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