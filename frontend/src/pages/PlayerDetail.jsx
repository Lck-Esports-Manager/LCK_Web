import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Player.css';
import { header } from "../config.js";
import { Row, Col, Button, Container, Image, ProgressBar } from 'react-bootstrap'



const right={
    border:'none',
    backgroundColor:'#ffdba1',
    width:'70px',
    color:'#011e46',
    float:'right'
}
const left={
    border:'none',
    backgroundColor:'#ffdba1',
    width:'70px',
    color:'#011e46',
    float:'left'
}
const containerStyle={ width: '560px',
    height: '300px',
    borderRadius:"10px",
    margin: 'auto',
    color:"white",
    backgroundColor:'#011e46',
    padding:'10px'
}
function ExpManage({level,exp,feeling}){
    const [_exp, setExp] = useState(exp)
    const [_level, setLevel] = useState(level)

    return(
        <>
        <div style={{padding:'30px',fontSize:'30px'}}>Lv {_level}</div>
        <div style={{padding:'30px'}}><ProgressBar now={_exp*10} /></div>
        </>
    )
}

function StatusManage({ status1, status2, status3, remain, id }) {

    const [_status1, setStatus1] = useState(status1)
    const [_status2, setStatus2] = useState(status2)
    const [_status3, setStatus3] = useState(status3)
    const [_remain, setRemain] = useState(remain)
    const changeStatus = () => {
        const data = {
            my_player: id,
            status1: _status1,
            status2: _status2,
            status3: _status3,
            remain: _remain
        }
        try {
            axios.post('http://localhost:8000/api/updatestatus/', data, header).then((response) => {
                alert("status가 저장되었습니다.");
                document.location.href = `/playerdetail/${id}`;
            })
        } catch (e) { console.log(e); }
    }
    const add1 = () => {
        
        const new_status1 = _status1 + 1
        setStatus1(new_status1)
        const new_remain = _remain - 1
        setRemain(new_remain)
    }
    const add2 = () => {
   
        const new_status2 = _status2 + 1
        setStatus2(new_status2)
        const new_remain = _remain - 1
        setRemain(new_remain)
    }
    const add3 = () => {

        const new_status3 = _status3 + 1
        setStatus3(new_status3)
        const new_remain = _remain - 1
        setRemain(new_remain)
    }
    const sub1 = () => {
        const new_status1 = _status1 - 1
        setStatus1(new_status1)
        const new_remain = _remain + 1
        setRemain(new_remain)
    }
    const sub2 = () => {

        const new_status2 = _status2 - 1
        setStatus2(new_status2)
        const new_remain = _remain + 1
        setRemain(new_remain)
    }
    const sub3 = () => {

        const new_status3 = _status3 - 1
        setStatus3(new_status3)
        const new_remain = _remain + 1
        setRemain(new_remain)
    }
    return (
        <>
            <Row style={{padding:'10px'}}>
                <Col style={{textAlign:"center"}}>라인전</Col>
                <Col>
                <Row>
                <Col>
                <Button  style={right} onClick={sub1} disabled={_status1 > status1 ? false : true}>-</Button>
                </Col>
                <Col>
                <div style={{textAlign:"center"}}>{_status1}</div>
                </Col >
                <Col>
                <Button  style={left} onClick={add1} disabled={_remain > 0 ? false : true}>+</Button>
                </Col>
                </Row>
                </Col>
            </Row>
            <Row style={{padding:'10px'}}>
                <Col style={{textAlign:"center"}}>교전</Col>
                <Col>
                <Row>
                <Col>
                <Button  style={right} onClick={sub2} disabled={_status2 > status2 ? false : true}>-</Button>
                </Col>
                <Col>
                <div style={{textAlign:"center"}}>{_status2}</div>
                </Col >
                <Col>
                <Button  style={left} onClick={add2} disabled={_remain > 0 ? false : true}>+</Button>
                </Col>
                </Row>
                </Col>
            </Row>
            <Row style={{padding:'10px'}}>
                <Col style={{textAlign:"center"}}>한타</Col>
                <Col>
                <Row>
                <Col>
                <Button  style={right} onClick={sub3} disabled={_status3 > status3 ? false : true}>-</Button>
                </Col>
                <Col>
                <div style={{textAlign:"center"}}>{_status3}</div>
                </Col >
                <Col>
                <Button  style={left} onClick={add3} disabled={_remain > 0 ? false : true}>+</Button>
                </Col>
                </Row>
                </Col>
            </Row>
            <div style={{
                textAlign:'left',
                padding:'10px'
                }}>남은 포인트: {_remain}
                <Button style={right} disabled={_remain === remain ? true : false} onClick={changeStatus}>저장</Button></div>
                
            
        </>
    )

}

export default function PlayerDetail(props) {

    const { id } = props.match.params
    const [MyPlayer, setMyPlayer] = useState(null)
    const feeling=['보통','좋음','매우 좋음','매우 나쁨','나쁨']
    useEffect(() => {
        const fetchPlayer = async () => {

            let config = {
                headers: header.headers,
                params: {
                    id: id
                },
            }
            try {
                
                axios.get('http://localhost:8000/api/myplayerdetail/', config).then((response) => {
                    setMyPlayer(response.data);
                    console.log(response.data);
                })
            } catch (e) { console.log(e); }
        };
        fetchPlayer();
    }, []);
    if (MyPlayer == null) {
        return (
            <>
            </>);
    }
    return (
        <div className="Team--main">
            <div className="inner">
                <div className="contents">
                    <div className="title">선수 상세정보</div>
                    <div>
                    <Container style={
                {
                    width: '1200px',
                    height: '389px',
                    borderRadius:"10px",
                    margin: '30px',
                    color:"white",
                    backgroundColor:'#011e46',
                }}>
                
                <Row>
                    <Col >
                        <Container style={{margin:'auto',padding:'50px'}}>
                        <Image style={{width:"350px"}}src={`http://localhost:8000${MyPlayer.player.images}`} />
                        </Container>
                    </Col> 
                    <Col >
                    <Container style={{margin:"auto",fontSize:"22px",padding:'50px'}}>
                        <div style={{padding:"15px"}}>이름 : {MyPlayer.player.name}</div>
                        <div style={{padding:"15px"}}>포지션 : {MyPlayer.player.position}</div>
                        <div style={{padding:"15px"}}>연도 및 시즌 : {MyPlayer.player.year} {MyPlayer.player.season}</div>
                        <div style={{padding:"15px"}}>등급 : {MyPlayer.player.rate}</div>
                        <div style={{padding:"15px"}}>컨디션 : {feeling[MyPlayer.feeling]}</div>
                        </Container>
                    </Col>
                </Row>
            </Container>
            <Row>
                <Col>
                <Container style={containerStyle}>
                <div style={{textAlign:'center',
                             fontSize:'20px',
                             color:'#ffdba1',
                             margin:'10px'}}>레벨</div>
                <ExpManage exp={MyPlayer.exp} level={MyPlayer.level}></ExpManage>
                </Container></Col>
                <Col>
                <Container style={containerStyle}>
                <div style={{textAlign:'center',
                             fontSize:'20px',
                             color:'#ffdba1',
                             margin:'10px'}}>스텟 관리</div>
                <StatusManage status1={MyPlayer.status1} status2={MyPlayer.status2} status3={MyPlayer.status3} remain={MyPlayer.remain} id={MyPlayer.id}></StatusManage>
                </Container>
                </Col>
                
            </Row>

                        
                    </div>
                </div>
            </div>
        </div>
    );
}