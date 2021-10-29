// import { Swiper, SwiperSlide } from "swiper/react";
// import 'swiper/swiper.min.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Headline from "./Headline";

import slide1 from '../images/main-1.png';
import slide2 from '../images/main-2.png';
import slide3 from '../images/main-3.png';
import slide4 from '../images/main-4.png';
import slide5 from '../images/main-5.png';
import './Home.css';

let imgs = [slide1, slide2, slide3, slide4, slide5];

function Home() {
    const [state, setState] = useState({
        num: 0,
        match: {
        }
    });
    axios.get('http://localhost:8000/api/getschedule/'
    ).then((response) => {
        console.log(response.data[0]);
    }).catch((Error) => {
        console.log(Error.response);
    }).then(() => {
    });
    const Lclick = () => {
        if (state.num > 0)
            setState({ num: state.num - 1 })
        else
            setState({ num: state.num + 4 })
    }
    const Rclick = () => {
        setState({ num: (state.num + 1) % 5 })
    }
    return (
        <div>
            <div className="home--top">
                <div className="inner">
                    <div className="material-icons L" onClick={Lclick}>chevron_left</div>
                    <img src={imgs[state.num]} className="top--img" alt="slide images" />
                    <div className="material-icons R" onClick={Rclick}>chevron_right</div>
                </div>
            </div>
            <div className="home--bottom">
                <div className="inner">
                    <div className="info">
                        <h2>INFOMATION</h2>
                        <p>LCK Esports Manager는 LoL 기반 2차 컨텐츠 게임으로
                            LoL과 함께 높은 관심을 보이는 e스포츠 대회를 접목하여
                            LoL을 즐기는 유저들에게 더 다양한 수요를 충족해주고
                            색다른 재미를 선보일 수 있습니다. <br /><br />기존 LoL유저 중에서도
                            LCK 주시청자인 20~30대 남성을 주요타켓층으로 삼았으며,
                            자신만의 리그팀을 결성하고 대결하는 방식을 통해 LoL을
                            즐길수 있는 또 하나의 방법을 제공해줄것입니다.</p>
                    </div>
                    <div className="match">
                        <h2>MATCH SCHEDULE</h2>
                        <div className="schedule">
                            스케줄 들어갈 자리
                        </div>
                    </div>
                </div>
            </div>
            <div className="underline">
                ⓒ 2021 카Cau게임즈. All Rights Reserved.
            </div>
        </div>
    );
}

export default Home;