import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Player.css';
import { header } from "../config.js";
import { Button,Col,Row } from 'react-bootstrap'

function StatusManage({status1,status2,status3,remain,id}){
    
    const [_status1, setStatus1] = useState(status1)
    const [_status2, setStatus2] = useState(status2)
    const [_status3, setStatus3] = useState(status3)
    const [_remain,setRemain]=useState(remain)
    const changeStatus=()=>{
        const data={
            my_player:id,
            status1:_status1,
            status2:_status2,
            status3:_status3,
            remain:_remain
        }
        try {
            axios.post('http://localhost:8000/api/updatestatus/',data,header).then((response) => {
                alert("status가 저장되었습니다.");
                document.location.href = `/playerdetail/${id}`;
            })
        } catch (e) { console.log(e); }
    }
    const add1=()=>{    
        const new_status1=_status1+1
        setStatus1(new_status1)
        const new_remain=_remain-1
        setRemain(new_remain)
    }
    const add2=()=>{    

        const new_status2=_status2+1
        setStatus2(new_status2)
        const new_remain=_remain-1
        setRemain(new_remain)
    }
    const add3=()=>{    

        const new_status3=_status3+1
        setStatus3(new_status3)
        const new_remain=_remain-1
        setRemain(new_remain)
    }
    const sub1=()=>{    
        const new_status1=_status1-1
        setStatus1(new_status1)
        const new_remain=_remain+1
        setRemain(new_remain)
    }
    const sub2=()=>{    

        const new_status2=_status2-1
        setStatus2(new_status2)
        const new_remain=_remain+1
        setRemain(new_remain)
    }
    const sub3=()=>{    

        const new_status3=_status3-1
        setStatus3(new_status3)
        const new_remain=_remain+1
        setRemain(new_remain)
    }
    return (
        <>
            <Row>
            <Col><Button variant="outline-primary" onClick={sub1} disabled={_status1 > status1 ? false : true}>-</Button></Col>
            <Col>라인전: {_status1}</Col>
            <Col><Button variant="outline-primary" onClick={add1} disabled={_remain > 0 ? false : true}>+</Button></Col>
            </Row>
            <Row>
            <Col><Button variant="outline-primary" onClick={sub2} disabled={_status2 > status2 ? false : true}>-</Button></Col>
            <Col>교전: {_status2}</Col>
            <Col><Button variant="outline-primary" onClick={add2} disabled={_remain > 0 ? false : true}>+</Button></Col>
            </Row>
            <Row>
            <Col><Button variant="outline-primary" onClick={sub3} disabled={_status3 > status3 ? false : true}>-</Button></Col>
            <Col>한타: {_status3}</Col>
            <Col><Button variant="outline-primary" onClick={add3} disabled={_remain > 0 ? false : true}>+</Button></Col>
            </Row>
            <div>남은거: {_remain}</div>
            <Button  disabled={_remain === remain ? true : false} onClick={changeStatus}>저장</Button>
        </>
    )

}

export default function PlayerDetail(props) {

    const {id}=props.match.params
    const [MyPlayer, setMyPlayer] = useState(null)
    useEffect(() => {
        const fetchPlayer = async () => {

            let config = {
                headers: header.headers,
                params: {
                id:id 
                },
              }
            try {

                axios.get('http://localhost:8000/api/myplayerdetail/',config).then((response) => {
                    setMyPlayer(response.data);
                })
            } catch (e) { console.log(e); }
        };
        fetchPlayer();
    }, []);
    if (MyPlayer==null){
        return (
            <>
            </>);
    }
    return (
        <div>
        <div>이름: {MyPlayer.player.name}</div>
        <div>티어:{MyPlayer.player.rate}</div>
        <div>{MyPlayer.player.position}</div>
        <StatusManage status1={MyPlayer.status1} status2={MyPlayer.status2} status3={MyPlayer.status3} remain={MyPlayer.remain} id={MyPlayer.id}></StatusManage>
        </div>
        );
}