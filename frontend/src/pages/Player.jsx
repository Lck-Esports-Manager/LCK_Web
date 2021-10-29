import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import './Player.css';
/*import styled from 'styled-components';*/
// import Headline from "./Headline";

export default function Player() {
    const [players, setPlayer] = useState(null);
    const top = () => {
        axios.get('http://localhost:8000/api/playerlist/?position=top').then((response) => { setPlayer(response.data); })
    }
    const jungle = () => {
        axios.get('http://localhost:8000/api/playerlist/?position=jungle').then((response) => { setPlayer(response.data); })
    }
    const middle = () => {
        axios.get('http://localhost:8000/api/playerlist/?position=middle').then((response) => { setPlayer(response.data); })
    }
    const adc = () => {
        axios.get('http://localhost:8000/api/playerlist/?position=adc').then((response) => { setPlayer(response.data); })
    }
    const support = () => {
        axios.get('http://localhost:8000/api/playerlist/?position=support').then((response) => { setPlayer(response.data); })
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
    const sortName = () => {
        const newlist = [...players].sort((a, b) => a.name.localeCompare(b.name));
        setPlayer(newlist);
    }
    const sortSeason = () => {
        const newlist = [...players].sort((a, b) => a.year < b.year ? -1 : a.year > b.year ? 1 : 0);
        setPlayer(newlist);
    }
    const sortTeam = () => {
        const newlist = [...players].sort((a, b) => a.team.name < b.team.name ? -1 : a.team.name > b.team.name ? 1 : 0);
        setPlayer(newlist);
    }
    const sortPosition = () => {
        const newlist = [...players].sort((a, b) => a.position < b.position ? -1 : a.position > b.position ? 1 : 0);
        setPlayer(newlist);
    }
    const sortRate = () => {
        const newlist = [...players].sort((a, b) => a.price < b.price ? -1 : a.price > b.price ? 1 : 0);
        setPlayer(newlist);
    }
    const sortPrice = () => {
        const newlist = [...players].sort((a, b) => a.rate < b.rate ? -1 : a.rate > b.rate ? 1 : 0);
        setPlayer(newlist);
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
                                <div className="position" onClick={top}>Top</div>
                                <div className="position" onClick={jungle}>Jungle</div>
                                <div className="position" onClick={middle}>Middle</div>
                                <div className="position" onClick={adc}>ADC</div>
                                <div className="position" onClick={support}>Support</div>
                            </div>
                            <div className="index">
                                <ul>
                                    <li onClick={sortName} >선수 이름ㅤΞ</li>
                                    <li onClick={sortSeason}>시즌ㅤΞ</li>
                                    <li onClick={sortTeam}>팀 이름ㅤΞ</li>
                                    <li onClick={sortPosition}>포지션ㅤΞ</li>
                                    <li onClick={sortRate}>티어ㅤΞ</li>
                                    <li onClick={sortPrice}>영입비용ㅤΞ</li>
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