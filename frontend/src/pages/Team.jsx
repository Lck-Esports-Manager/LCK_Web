import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Row, Card, Col, Button, Tabs, Tab, Container, Table } from 'react-bootstrap'
import { header,domain } from "../config.js";
import './Team.css';

const style0 = {
    borderRadius: "10px",
    textAlign: 'center',
    width: '600px',
    alignContent: "center",
    margin: "auto",
    marginTop: "10px",
    marginBottom: "10px",
    padding: "5px",
    backgroundColor: '#011e46',
    color: '#ffdba1',
    fontSize: '20px'
}
const style1 = {
    border: 'none',
    backgroundColor: '#011e46'
}
const style1_1 = {
    border: 'none',
    backgroundColor: '#ffdba1',
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
const style3 = {
    width: "600px",
    marginTop: "50px",
    marginBottom: "50px",
    height: "200px",
    borderRadius: "10px",
    backgroundColor: '#011e46',
    color: "white"
}
const style4 = {
    width: "600px",
    marginTop: "50px",
    marginBottom: "50px",
    height: "200px",
}
const style5 = {
    borderRadius: "10px",
    textAlign: 'center',
    width: '150px',
    alignContent: "center",
    margin: "auto",
    marginTop: "10px",
    marginBottom: "10px",
    padding: "5px",
    backgroundColor: '#011e46',
    color: 'white'
}
const containerStyle = {
    borderRadius: "10px",

    margin: "auto",
    marginTop: "10px",
    marginBottom: "10px",
    paddingTop: "80px",
    paddingBottom: "26px",
    height: "700px",
    backgroundColor: '#011e46',
    color: 'white'
}
function Player({ player, pos }) {
    const history = useHistory();
    const routeChange = () => {
        let path = `/playerdetail/${player.id}`;
        history.push(path);
    }
    if (player == null) {
        return (
            <div></div>
        );
    }
    return (
        <>
            <h4 style={style5}>
                {pos}
            </h4>
            <Card style={{ width: '12rem', margin: "auto" }} onClick={routeChange}>
                <Card.Img class='m-3' variant="top" src={`${domain}:8000${player.player.images}`} />
                <Card.Body>
                    <Card.Title>{player.player.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{player.player.year} {player.player.season}</Card.Subtitle>
                </Card.Body>
            </Card>
        </>
    );
}

function TeamInfo({ myTeam }) {
    const history = useHistory();
    const routeChange = () => {
        let path = '/changeteam/';
        history.push(path);
    }

    return (
        <>
            <Button style={style1} onClick={routeChange}>팀 수정</Button>


            <Container>
                <h3 style={style2} >주전</h3>
                <Row className="justify-content-md-center">
                    <Col><Player player={myTeam.top} pos="Top"></Player></Col>
                    <Col><Player player={myTeam.jungle} pos="Jungle"></Player></Col>
                    <Col><Player player={myTeam.mid} pos="Middle"></Player></Col>
                    <Col><Player player={myTeam.adc} pos="AD Carry"></Player></Col>
                    <Col><Player player={myTeam.support} pos="Supporter"></Player></Col>
                </Row>
            </Container>

            <Container>
                <h3 style={style2} >서브</h3>
                <Row className="justify-content-md-center">
                    <Col><Player player={myTeam.sub1} pos="Sub1"></Player></Col>
                    <Col><Player player={myTeam.sub2} pos="Sub2"></Player></Col>
                    <Col><div ></div></Col>
                    <Col><div ></div></Col>
                    <Col><div ></div></Col>
                </Row>
            </Container>
        </>
    )
}



function Sponsor1({ sponsor }) {

    if (sponsor == null) {
        return (<div style={style4}></div>)
    }
    else {
        return (
            <Card style={style3}>
                <Card.Body>
                    <Card.Title>{sponsor.name}</Card.Title>
                    <Card.Text className="mb-2 text-muted">{sponsor.description}</Card.Text>
                    <Card.Text className="mb-2 text-muted"></Card.Text>
                    <Card.Text className="mb-2 text-muted">승리하면 {sponsor.earning}원을 추가로 획득합니다</Card.Text>
                </Card.Body>
            </Card>)
    }
}

function Sponsor2({ sponsor }) {
    const StartSponsor = () => {


        const data = {
            "sponsor": sponsor.id
        }
        try {
            axios.post(`${domain}:8000/api/sponsorstart/`, data, header).then((response) => {
                alert("사업이 등록되었습니다");
                document.location.href = '/team';
            })
        } catch (e) { console.log(e); }

    }

    if (sponsor == null) {
        return (<div></div>)
    }
    else {
        return (
            <Card style={style3}>
                <Card.Body>
                    <Card.Title>{sponsor.name}</Card.Title>
                    <Card.Text className="mb-2 text-muted">{sponsor.description}</Card.Text>
                    <Card.Text className="mb-2 text-muted">승리하면 {sponsor.earning}원을 추가로 획득합니다</Card.Text>
                    <Button style={style1_1} onClick={StartSponsor}>계약 하기</Button>
                </Card.Body>
            </Card>)
    }
}


function SponsorInfo({ sponsor1, sponsor2, sponsor3, _available_sponsor }) {

    return (
        <>

            <h3 style={style2}>계약 중인 스폰서</h3>
            <Container style={{ height: "300px" }}>
                <Row className="justify-content-md-center">

                    <Col><Sponsor1 sponsor={sponsor1}></Sponsor1></Col>
                    <Col><Sponsor1 sponsor={sponsor2}></Sponsor1></Col>
                    <Col><Sponsor1 sponsor={sponsor3}></Sponsor1></Col>

                </Row>
            </Container>
            <h3 style={style2}>계약 가능한 스폰서</h3>
            <Container style={{ height: "300px" }}>
                <Row className="justify-content-md-center">
                    {_available_sponsor && _available_sponsor.map((sponsor) => (
                        <Col><Sponsor2 sponsor={sponsor}></Sponsor2></Col>
                    ))}
                </Row>
            </Container>
        </>
    )

}

function Enterprise2({ enterprise, money }) {
    const StartEnterprise = () => {
        if (money < enterprise.cost) {
            alert("자금이 부족합니다");
        }
        else {
            const data = {
                "enterprise": enterprise.id
            }
            try {
                axios.post(`${domain}:8000/api/enterprisestart/`, data, header).then((response) => {
                    alert("사업이 등록되었습니다");
                    document.location.href = '/team';
                })
            } catch (e) { console.log(e); }
        }
    }

    if (enterprise == null) {
        return (<div style={style4}></div>)
    }
    else {
        return (
            <Card style={style3}>
                <Card.Body>
                    <Card.Title>{enterprise.name}</Card.Title>
                    <Card.Text className="mb-2 text-muted">{enterprise.description}</Card.Text>
                    <Card.Text className="mb-2 text-muted">시작하면 {enterprise.cost}원이 소모됩니다</Card.Text>
                    <Card.Text className="mb-2 text-muted">승리하면 {enterprise.earning}원을 추가로 획득합니다</Card.Text>
                    <Button style={style1_1} onClick={StartEnterprise}>시작하기</Button>
                </Card.Body>
            </Card>)
    }
}
function Enterprise1({ enterprise, money }) {


    if (enterprise == null) {
        return (<div></div>)
    }
    else {
        return (
            <Card style={style3}>
                <Card.Body>
                    <Card.Title>{enterprise.name}</Card.Title>
                    <Card.Text className="mb-2 text-muted">{enterprise.description}</Card.Text>
                    <Card.Text className="mb-2 text-muted">승리하면 {enterprise.earning}원을 추가로 획득합니다</Card.Text>
                </Card.Body>
            </Card>)
    }
}
function EnterpriseInfo({ enterprise1, enterprise2, _available_enterprise, money }) {

    return (
        <>

            <h3 style={style2}>진행 중인 사업</h3>
            <Container style={{ height: "300px" }}>
                <Row className="justify-content-md-center">
                    <Col><Enterprise1 enterprise={enterprise1}></Enterprise1></Col>
                    <Col><Enterprise1 enterprise={enterprise2}></Enterprise1></Col>
                </Row>
            </Container>
            <h3 style={style2}>시작 가능한 사업</h3>
            <Container style={{ height: "300px" }}>
                <Row className="justify-content-md-center">
                    {_available_enterprise && _available_enterprise.map((enterprise) => (
                        <Col><Enterprise2 enterprise={enterprise} money={money}></Enterprise2></Col>
                    ))}
                </Row>
            </Container>
        </>
    )

}

function LeagueScheduleTable() {
    const [schedule, setSchedule] = useState(null)
    useEffect(() => {
        const fetchSchdule = async () => {
            try {
                axios.get(`${domain}:8000/api/getschedule/`, header).then((response) => {
                    setSchedule(response.data.schedule);

                })
            } catch (e) { console.log(e); }
        };
        fetchSchdule();
    }, []);
    if (schedule === null) {
        return (<></>)
    }
    else {
        return (
            <>
                <h2 style={style2}>리그 스케줄</h2>
                <Container style={containerStyle}>

                    <Table style={{ color: "white" }} responsive>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Blue Team</th>
                                <th>Red Team</th>
                            </tr>
                        </thead>
                        <tbody>


                            {schedule.map((elem) => (
                                <tr>
                                    <td>{elem.date}</td>
                                    <td>{elem.team1}</td>
                                    <td>{elem.team2}</td>
                                </tr>
                            ))}


                        </tbody>
                    </Table>
                </Container>
            </>
        )
    }
}
function LeagueRank() {
    const [data, setData] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                axios.get(`${domain}:8000/api/leaguerank/`, header).then((response) => {
                    setData(response.data.Data);

                })
            } catch (e) { console.log(e); }
        };
        fetchData();
    }, []);
    if (data === null) {
        return (<></>)
    }
    else {
        return (
            <>

                <h2 style={style2}>리그 랭킹</h2>
                <Container style={containerStyle}>

                    <Table style={{ color: "white" }} responsive>
                        <thead>
                            <tr>
                                <th>순위</th>
                                <th>팀 이름</th>
                                <th>승</th>
                                <th>패</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((elem, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{elem.name}</td>
                                    <td>{elem.win}</td>
                                    <td>{elem.lose}</td>
                                </tr>
                            ))}


                        </tbody>
                    </Table>
                </Container>
            </>
        )
    }
}

export default function Team() {


    const moveAddPlayer = () => {
        document.location.href = '/addplayer';

    }
    const [data, setData] = useState({
        my_team: {
            name: "",
            top: null,
            jungle: null,
            mid: null,
            adc: null,
            support: null,
            sub1: null,
            sub2: null,
            sponsor1: null,
            sponsor2: null,
            sponsor3: null,
            enterprise1: null,
            enterprise2: null

        },
        available_sponsor: [],
        available_enterprise: []
    })

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                axios.get(`${domain}:8000/api/teaminfo/`, header).then((response) => {
                    setData(response.data);
                    console.log(response.data);
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
                        <div style={style0}>Team {data.my_team.name}ㅤㅤ인기도 : {data.my_team.popularity}ㅤㅤ여유 금액 :{data.my_team.money}원</div>
                        <Tabs defaultActiveKey="team" id="uncontrolled-tab-example" className="mb-3">
                            <Tab eventKey="team" title="로스터 정보">
                                {data.my_team.sub1 === null || data.my_team.sub2 === null ? <Button style={style1}
                                    onClick={moveAddPlayer}>선수 영입하기</Button> : <div></div>}
                                <TeamInfo myTeam={data.my_team}></TeamInfo>
                            </Tab>
                            <Tab eventKey="sponsor" title="스폰서">
                                <SponsorInfo sponsor1={data.my_team.sponsor1} sponsor2={data.my_team.sponsor2} sponsor3={data.my_team.sponsor3} _available_sponsor={data.available_sponsor}></SponsorInfo>
                            </Tab>
                            <Tab eventKey="enterprise" title="사업">
                                <EnterpriseInfo enterprise1={data.my_team.enterprise1} enterprise2={data.my_team.enterprise2} _available_enterprise={data.available_enterprise} money={data.my_team.money}></EnterpriseInfo>
                            </Tab>
                            <Tab eventKey="leagueinfo" title="리그 상황">
                                <Row>
                                    <Col><LeagueScheduleTable></LeagueScheduleTable></Col>
                                    <Col><LeagueRank></LeagueRank></Col>
                                </Row>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        </>);
}