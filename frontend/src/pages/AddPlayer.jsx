import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Row, DropdownButton, Col, Button, Dropdown, Table, Spinner, Container, Image, CloseButton } from 'react-bootstrap'
import { header, domain } from "../config.js";

const button = {
    border: 'none',
    backgroundColor: '#011e46',
    width: '79px'
}
const button2 = {
    border: 'none',
    backgroundColor: 'white',
    width: '175px',
    color: '#011e46'
}
const style2 = {
    borderRadius: "10px",
    textAlign: 'center',
    width: '300px',
    alignContent: "center",
    margin: "auto",
    marginTop: "10px",
    marginBottom: "10px",
    padding: "5px",
    backgroundColor: '#011e46',
    color: '#ffdba1'
}

function PlayerDetailInfo({ id, unable, money, func }) {
    const [player, setPlayer] = useState(null);
    useEffect(() => {
        const fetchPlayer = async () => {
            let config = {

                params: {
                    id: id
                }
            }
            try {
                axios.get(`${domain}:8000/api/playerlist/detail/`, config).then((response) => {

                    setPlayer(response.data);
                })
            } catch (e) { console.log(e); }
        };

        fetchPlayer();


    }, []);
    const exitClick = () => {
        func()
    }
    const history = useHistory();
    const purchase = () => {
        const remain_money = money - player.price
        const body = {
            id: id,
            money: remain_money
        }
        if (!unable.indexOf(player.id)) {
            alert("이미 보유하고 있는 선수입니다")
        }
        else if (money < player.price) {
            alert("보유하고 있는 금액이 부족합니다")
        }
        else {
            try {

                axios.post(`${domain}:8000/api/addplayer/`, body, header).then((response) => {


                    if (response.data.success) {
                        alert("구입이 완료되었습니다")
                        history.push('/team');
                    }
                    else {
                        alert("비정상적인 접근입니다")
                    }
                })
            } catch (e) { console.log(e); }
        }
    }
    if (player === null) {
        return (<></>)
    }
    return (
        <>
            <Container style={
                {
                    width: '1180px',
                    height: '290px',
                    borderRadius: "10px",
                    margin: '30px',
                    position: 'absolute',
                    backgroundColor: '#011e46',
                    zIndex: '1',
                    color: "white"
                }}>
                <div style={{ margin: '10px' }}><CloseButton variant='white' style={{ float: "right" }} onClick={exitClick} /></div>

                <Row>
                    <Col >
                        <Container style={{ margin: 'auto', padding: '60px' }}>
                            <Image style={{ width: '200px' }} src={`${domain}:8000${player.images}`} />
                        </Container>
                    </Col>
                    <Col >
                        <Container style={{ margin: "auto", fontSize: "22px" }}>
                            <div style={{ padding: "8px" }}>이름 : {player.name}</div>
                            <div style={{ padding: "8px" }}>포지션 : {player.position}</div>
                            <div style={{ padding: "8px" }}>연도 및 시즌 : {player.year} {player.season}</div>
                            <div style={{ padding: "8px" }}>소속 팀 : {player.team.name}</div>
                            <div style={{ padding: "8px" }}>등급 : {player.rate}</div>
                        </Container>
                    </Col>
                    <Col>
                        <Container style={{ margin: "auto", fontSize: "22px" }}>
                            <div style={{ padding: "8px" }}>라인전 능력 : {player.status1}</div>
                            <div style={{ padding: "8px" }}>교전 능력 : {player.status2}</div>
                            <div style={{ padding: "8px" }}>한타 능력 : {player.status3}</div>
                            <div style={{ padding: "8px" }}>가격 : {player.price}</div>
                            <div style={{ padding: "8px" }}><Button style={button2} onClick={purchase}>구입하기</Button></div>

                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default function AddPlayer() {
    const [myTeam, setMyTeam] = useState({
        money: 0

    });
    const [unable, setUnable] = useState([]);
    const [player, setPlayer] = useState([])
    const [year, setYear] = useState(15)
    const [position, setPosition] = useState("Top")
    const [season, setSeason] = useState("spring")
    const [tier, setTier] = useState(1)
    const [click, setClick] = useState(false)
    const [clickPlayer, setClickPlayer] = useState(null)
    const [clickEvent, setClickEvent] = useState(false)

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                axios.get(`${domain}:8000/api/teaminfo/`, header).then((response) => {
                    var lst = []
                    setMyTeam(response.data.my_team);
                    lst.push(response.data.my_team.top.player.id)
                    lst.push(response.data.my_team.jungle.player.id)
                    lst.push(response.data.my_team.mid.player.id)
                    lst.push(response.data.my_team.adc.player.id)
                    lst.push(response.data.my_team.support.player.id)
                    if (response.data.my_team.sub1 != null) {
                        lst.push(response.data.my_team.sub1.player.id)
                    }
                    if (response.data.my_team.sub2 != null) {
                        lst.push(response.data.my_team.sub2.player.id)
                    }
                    setMyTeam(response.data.my_team);
                    setUnable(lst)

                })
            } catch (e) { console.log(e); }
        };
        fetchTeam();
    }, []);

    const selectPlayer = (e) => {

        setClickEvent(true)

        setClickPlayer(e.target.value)

    }
    const changePosition = (e) => {
        setPosition(e.target.value)
    }
    const changeTier = (e) => {
        setTier(e.target.value)
    }
    const changeYear = (e) => {
        setYear(e.target.value)
    }
    const changeSeason = (e) => {
        setSeason(e.target.value)
    }
    const exit = () => {
        setClickEvent(false)
    }
    const fetchPlayer = () => {
        setClick(true)
        let config = {
            headers: header.headers,
            params: {
                position: position,
                season: season,
                year: year,
                rate: tier
            },
        }
        try {

            axios.get(`${domain}:8000/api/playerlist/`, config).then((response) => {
                setPlayer(response.data);
                setClick(false)
            })
        } catch (e) { console.log(e); }
    }

    const positionArr = ["Top", "Jungle", "Middle", "ADC", "Support"];
    const yearArr = ["15", "16", "17", "18", "19", "20", "21"]
    const seasonArr = ["spring", "summer"]
    const tierArr = ["1", "2", "3", "4", "5"]
    const tableHead = ["이름", "연도", "시즌", "포지션", "등급"]

    return (
        <>
            <div className="Team--main">
                <div className="inner">
                    <div className="contents">
                        <div className="title">선수 영입</div>
                        <div style={style2}>여유 금액 :{myTeam.money}원</div>
                        {clickEvent ? <PlayerDetailInfo id={clickPlayer} unable={unable} money={myTeam.money} func={exit} /> : <></>}

                        <Container style={
                            {
                                width: '1250px',
                                borderWidth: 'thin',
                                borderStyle: "solid",
                                padding: "10px"
                            }}>
                            <Row>
                                <Col style={{ margin: "auto" }}>포지션</Col>
                                <Col style={{ margin: "auto" }}>연도</Col>
                                <Col style={{ margin: "auto" }}>시즌</Col>
                                <Col style={{ margin: "auto" }}>등급</Col>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col>

                                    <DropdownButton variant='outline-secondary' id="dropdown-item-button" title={position}>
                                        {positionArr && positionArr.map((_position) => (
                                            <Dropdown.Item as="button" onClick={changePosition} value={_position}>{_position}</Dropdown.Item>
                                        ))}
                                        <Dropdown.Item as="button" onClick={changePosition} value={null}>전체</Dropdown.Item>
                                    </DropdownButton>
                                </Col>
                                <Col>

                                    <DropdownButton variant='outline-secondary' style={{ width: '100px' }} id="dropdown-item-button" title={year}>
                                        {yearArr && yearArr.map((_year) => (
                                            <Dropdown.Item as="button" onClick={changeYear} value={_year}>{_year}</Dropdown.Item>
                                        ))}
                                        <Dropdown.Item as="button" onClick={changeYear} value={null}>전체</Dropdown.Item>
                                    </DropdownButton>
                                </Col>
                                <Col>

                                    <DropdownButton variant='outline-secondary' style={{ width: '100px' }} id="dropdown-item-button" title={season}>
                                        {seasonArr && seasonArr.map((_season) => (
                                            <Dropdown.Item as="button" onClick={changeSeason} value={_season}>{_season}</Dropdown.Item>
                                        ))}
                                        <Dropdown.Item as="button" onClick={changeSeason} value={null}>전체</Dropdown.Item>
                                    </DropdownButton>
                                </Col>
                                <Col>

                                    <DropdownButton variant='outline-secondary' style={{ width: '100px' }} id="dropdown-item-button" title={tier}>
                                        {tierArr && tierArr.map((_tier) => (
                                            <Dropdown.Item as="button" onClick={changeTier} value={_tier}>{_tier}</Dropdown.Item>
                                        ))}
                                        <Dropdown.Item as="button" onClick={changeTier} value={null}>전체</Dropdown.Item>
                                    </DropdownButton>
                                </Col>
                                <Col style={
                                    {
                                        alignContent: "center"
                                    }}>
                                    <Button style={button} onClick={fetchPlayer}>
                                        검색
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                        {click ? <div class="d-flex justify-content-center"><Spinner animation="border" /></div> :
                            <Container style={
                                {
                                    width: '1250px',
                                    height: '755px',
                                    margin: '10px auto',
                                    overflow: 'auto'
                                }}>

                                <Table size="sm" style={{ alignContent: "center" }}>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            {tableHead && tableHead.map((elem) => (
                                                <th>{elem}</th>
                                            ))}

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {player && player.map((_player) => (
                                            <>
                                                <tr>
                                                    <td><Button variant='outline-secondary' size="sm" value={_player.id} onClick={selectPlayer} disabled={clickEvent}>선택</Button></td>
                                                    <td>{_player.name}</td>
                                                    <td>{_player.season}</td>
                                                    <td>{_player.year}</td>
                                                    <td>{_player.position}</td>
                                                    <td>{_player.rate}</td>
                                                </tr>
                                            </>
                                        ))}
                                    </tbody>
                                </Table>
                            </Container>
                        }
                    </div>
                </div>
            </div>
        </>)
}