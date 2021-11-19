import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Maintitle from './components/Maintitle';
import { Row, Card, Col, Button, Container } from 'react-bootstrap'

function Player({ player, pos }) {

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
            <Card style={{ width: '18rem' }}>
                <Card.Img class='m-3' variant="top" src={`http://localhost:8000${player.player.images}`} />
                <Card.Body>
                    <Card.Title>{player.player.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{player.player.year} {player.player.season}</Card.Subtitle>
                    <Button variant="secondary">상세보기</Button>
                </Card.Body>
            </Card>
        </>
    );



}

export default function Team() {
    const [myTeam, setMyTeam] = useState({
        name: "",
        top: null,
        jungle: null,
        mid: null,
        adc: null,
        support: null
    })
    useEffect(() => {
        const fetchTeam = async () => {
            try {
                axios.get('http://localhost:8000/api/teaminfo/'
                ).then((response) => {
                    setMyTeam(response.data.my_team);
                })
            } catch (e) { console.log(e); }
        };
        fetchTeam();
    }, []);
    return (
        <>
            <h2 class='my-2'>{myTeam.name}</h2>

            <Row>
                <Col><Player player={myTeam.top} pos="Top"></Player></Col>
                <Col><Player player={myTeam.jungle} pos="Jungle"></Player></Col>
                <Col><Player player={myTeam.mid} pos="Middle"></Player></Col>
                <Col><Player player={myTeam.adc} pos="AD Carry"></Player></Col>
                <Col><Player player={myTeam.support} pos="Supporter"></Player></Col>
            </Row>


        </>);
}