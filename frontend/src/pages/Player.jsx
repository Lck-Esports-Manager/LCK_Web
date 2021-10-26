import React, { Component, useState } from 'react';
import axios from 'axios';
import './Player.css';
// import Headline from "./Headline";

export default function Player() {
    console.log('불러오기 시작');
    axios.get('http://localhost:8000/api/playerlist/?position=top'
    ).then((response) => {
        Loading(response.data);
        // const [player, setPlayer] = useState({
        //     name: ''
        // })

        // const list = Object.entries(response.data).map((player1) => (
        //     <ul>
        //         <li>{player1[2]}</li>
        //         <li>{player1[3]}</li>
        //         <li>{player1[4]}</li>
        //         <li>{player1[5]}</li>
        //         <li>{player1[10][0]}</li>
        //         <li>{player1[2]}</li>
        //     </ul>
        // ))
        console.log(response.data[0]);
        // console.log(player);
    }).catch((Error) => {
        console.log(Error);
    }).then(() => {
    });
    const Loading = (e) => {
        // const Plist = Object.entries(e).map((player1) => (
        //     <ul>
        //         <li>{player1[2]}</li>
        //         <li>{player1[3]}</li>
        //         <li>{player1[4]}</li>
        //         <li>{player1[5]}</li>
        //         <li>{player1[10][0]}</li>
        //         <li>{player1[2]}</li>
        //     </ul>
        // ))
        // console.log(Plist);
        // return Load(Plist);
        console.log(e);
    }
    return (<>
        <div>
            {/* <Headline /> */}
            <div className="player--top">
                <div className="inner">
                    <div className="title">
                        LCK Esports Manager
                    </div>
                </div>
            </div>
            <div className="player--main">
                <div className="inner">
                    <div className="playerbox">
                        <div className="title">
                            선수도감
                        </div>
                        <div className="contents">
                            <div className="line">ㅤ</div>
                            <div className="btnbar">
                                <button>이름순 정렬</button>
                                <button>랭크순 정렬</button>
                                <button>금액순 정렬</button>
                            </div>
                            {/* <div className="line">ㅤ</div> */}
                            <div className="index">
                                <ul>
                                    <li>이름</li>
                                    <li>시즌</li>
                                    <li>팀 이름</li>
                                    <li>포지션</li>
                                    <li>등급</li>
                                    <li>영입비용</li>
                                </ul>
                            </div>
                            <div className="players">
                                {/* <Load /> */}
                            </div>
                            <div className="line">ㅤ</div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    </>);
}