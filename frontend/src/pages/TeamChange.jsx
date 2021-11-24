import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Row, Card, Col, Button, Modal, Container, Table } from 'react-bootstrap'
import { header } from "../config.js";


function RemoveButton({ func }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const remove = () => {
        setShow(false)
        func()
    }
    return (
        <>
            <Button variant="danger" onClick={handleShow}>
                방출
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>방출하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>정말 방출하시겠습니까? 방출하신 선수는 다시 되돌릴 수 없습니다.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        취소
                    </Button>
                    <Button variant="danger" onClick={remove}>
                        방출
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

function Player({ player, pos, func }) {

    const changeRoasterToHigh = () => {
        func(player, pos)
    }
    const history = useHistory();
    const routeChange = () => {
        let path = '/team';
        history.push(path);
    }
    const removePlayer = () => {
        try {
            const body = {
                id: player.id,
                pos: pos
            }
            axios.post('http://localhost:8000/api/removeplayer/', body, header).then((response) => {
                if (response.data.success) {
                    routeChange();
                }
                else {
                    alert("비정상적인 접근입니다.")
                }
            })
        } catch (e) { console.log(e); }

    }
    if (player == null) {
        return (
            <div></div>
        );
    }
    return (
        <>
            <h3 class='my-2'>
                {pos}
            </h3>
            <Card style={{ width: '12rem' }}>
                <Card.Img class='m-3' variant="top" src={`http://localhost:8000${player.player.images}`} />
                <Card.Body>
                    <Card.Title>{player.player.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{player.player.year} {player.player.season}</Card.Subtitle>
                    {pos === 'Sub1' || pos === 'Sub2' ? <div>{player.player.position}</div> : <div></div>}
                </Card.Body>
            </Card>
            {pos === 'Sub1' || pos === 'Sub2' ? <Button variant="secondary" onClick={changeRoasterToHigh}>등록</Button> : <div></div>}
            {pos === 'Sub1' || pos === 'Sub2' ? <RemoveButton func={removePlayer}></RemoveButton> : <div></div>}
        </>
    );
}

export default function TeamChange() {

    const [data, setData] = useState({
        top: null,
        jng: null,
        mid: null,
        adc: null,
        sup: null,
        sub1: null,
        sub2: null

    });
    const changeRoaster = (player, pos) => {

        var new_data = JSON.parse(JSON.stringify(data));

        if (player.player.position === 'Top') {
            const temp = data.top
            new_data.top = player
            if (pos === 'Sub1') {
                new_data.sub1 = temp
            }
            else {
                new_data.sub2 = temp
            }
        }
        else if (player.player.position === 'Jungle') {
            const temp = data.jng
            new_data.jng = player
            if (pos === 'Sub1') {
                new_data.sub1 = temp
            }
            else {
                new_data.sub2 = temp
            }
        }
        else if (player.player.position === 'Middle') {
            const temp = data.mid
            new_data.mid = player
            if (pos === 'Sub1') {
                new_data.sub1 = temp
            }
            else {
                new_data.sub2 = temp
            }
        }
        else if (player.player.position === 'ADC') {
            const temp = data.adc
            new_data.adc = player
            if (pos === 'Sub1') {
                new_data.sub1 = temp
            }
            else {
                new_data.sub2 = temp
            }
        }
        else if (player.player.position === 'Support') {
            const temp = data.sup
            new_data.sup = player
            if (pos === 'Sub1') {
                new_data.sub1 = temp
            }
            else {
                new_data.sub2 = temp
            }
        }
        setData(new_data)
    }
    const history = useHistory();
    const routeChange = () => {
        let path = '/team';
        history.push(path);
    }
    const submitRoaster = () => {

        const sub1 = data.sub1 === null ? null : data.sub1.id
        const sub2 = data.sub2 === null ? null : data.sub2.id

        try {
            const body = {
                top: data.top.id,
                jng: data.jng.id,
                mid: data.mid.id,
                adc: data.adc.id,
                sup: data.sup.id,
                sub1: sub1,
                sub2: sub2

            }
            axios.post('http://localhost:8000/api/changeroaster/', body, header).then((response) => {
                if (response.data.success) {
                    routeChange();
                }
                else {
                    alert("비정상적인 접근입니다.")
                }
            })
        } catch (e) { console.log(e); }

    }
    useEffect(() => {
        const fetchTeam = async () => {
            try {
                axios.get('http://localhost:8000/api/teaminfo/', header).then((response) => {
                    const myTeam = response.data.my_team

                    const setting = {
                        top: myTeam.top,
                        jng: myTeam.jungle,
                        mid: myTeam.mid,
                        adc: myTeam.adc,
                        sup: myTeam.support,
                        sub1: myTeam.sub1,
                        sub2: myTeam.sub2
                    }
                    setData(setting);

                })
            } catch (e) { console.log(e); }
        };
        fetchTeam();
    }, []);


    return (
        <>
            <div className="Team--main">
                <div className="inner">
                    <div className="contents">
                        <div className="title">팀 관리</div>
                        <h3 class='my-2'>주전</h3>
                        <Container>
                            <Row className="justify-content-md-center">
                                <Col><Player player={data.top} pos="Top"></Player></Col>
                                <Col><Player player={data.jng} pos="Jungle"></Player></Col>
                                <Col><Player player={data.mid} pos="Middle"></Player></Col>
                                <Col><Player player={data.adc} pos="AD Carry"></Player></Col>
                                <Col><Player player={data.sup} pos="Supporter"></Player></Col>
                            </Row>
                        </Container>
                        <h3 class='my-2'>서브</h3>
                        <Container>
                            <Row className="justify-content-md-center">
                                <Col><Player player={data.sub1} pos="Sub1" func={changeRoaster}></Player></Col>
                                <Col><Player player={data.sub2} pos="Sub2" func={changeRoaster}></Player></Col>
                            </Row>
                        </Container>
                        <Button onClick={submitRoaster}>로스터 저장</Button>
                    </div>
                </div>
            </div>
        </>
    )
}