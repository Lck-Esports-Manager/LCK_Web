import React from 'react';
import './Game.css';

export default function Game() {
    return (<>
        <div className="game">
            <div className="inner">
                <div className="gamebox">
                    <div className="contents">
                        <div className="main">
                            <div className="head">
                                <div className="bluestatus">global gold</div>
                                <ul className="notice">
                                    <li className="turn">turn : 5</li>
                                    <li className="time">12:20</li>
                                    <li className="action">행동력 : 5</li>
                                </ul>
                                <div className="redStatus">ㅤ</div>
                            </div>
                            <div className="map">
                                <div className="element">
                                    ㅤ
                                </div>
                            </div>
                            <div className="choice">
                                <ul>
                                    <li>갱킹</li>
                                    <li>교전</li>
                                    <li>한타</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}