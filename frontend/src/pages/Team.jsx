import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Card, Col, Button, Tabs,Tab,Container } from 'react-bootstrap'
import { header } from "../config.js";
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
            <Card style={{ width: '12rem' }}>
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

function TeamInfo({myTeam}){
    return(
    <>
    <h2 text={myTeam.name}>{myTeam.name}</h2>
    <h3 class='my-2'>주전</h3>
    <Container>
    <Row className="justify-content-md-center">
        <Col><Player player={myTeam.top} pos="Top"></Player></Col>
        <Col><Player player={myTeam.jungle} pos="Jungle"></Player></Col>
        <Col><Player player={myTeam.mid} pos="Middle"></Player></Col>
        <Col><Player player={myTeam.adc} pos="AD Carry"></Player></Col>
        <Col><Player player={myTeam.support} pos="Supporter"></Player></Col>
    </Row>
    </Container>
    <h3 class='my-2'>서브</h3>
    <Container>
    <Row className="justify-content-md-center">
        <Col><Player player={myTeam.sub1} pos="Sub1"></Player></Col>
        <Col><Player player={myTeam.sub2} pos="Sub2"></Player></Col>
    </Row>
    </Container>
    </>
    )
}

function Sponsor({sponsor}){

    if (sponsor==null){
        return (<div></div>)
    }
    else{
        return (<div>스폰서가 있습니다</div>)
    }
}
function SponsorInfo({sponsor1,sponsor2,sponsor3,_available_sponsor}){



    return(
        <>

        <h3 class='my-2'>계약 중인 스폰서</h3>
        <Container>
        <Row className="justify-content-md-center">

            <Col><Sponsor sponsor={sponsor1}></Sponsor></Col>
            <Col><Sponsor sponsor={sponsor2}></Sponsor></Col>
            <Col><Sponsor sponsor={sponsor3}></Sponsor></Col>


        </Row>
        </Container>
        <h3 class='my-2'>계약 가능한 스폰서</h3>
        <Container>
        <Row className="justify-content-md-center">
        {_available_sponsor && _available_sponsor.map((sponsor) => (
                                    <Col><Sponsor sponsor={sponsor}></Sponsor></Col>
            ))}
        </Row>
        </Container>
        </>
        )

}

function Enterprise({enterprise,money}){


    const StartEnterprise=()=>{
        if(money<enterprise.cost){
            alert("자금이 부족합니다");
        }
        else{
            const data={
                "enterprise":enterprise.id
            }
            try {
                axios.post('http://localhost:8000/api/enterprisestart/',data,header).then((response) => {
                    alert("사업이 등로되었습니다");
                    document.location.href = '/team';
                })
            } catch (e) { console.log(e); }
        }
    }

    if (enterprise==null){
        return (<div></div>)
    }
    else{
        return (
            <Card style={{ width: '12rem' }}>
                <Card.Body>
                    <Card.Title>{enterprise.name}</Card.Title>
                    <Card.Text className="mb-2 text-muted">{enterprise.description}</Card.Text>
                    <Card.Text className="mb-2 text-muted">초기비용 : {enterprise.cost}원</Card.Text>
                    <Button variant="secondary" onClick={StartEnterprise}>시작하기</Button>
                </Card.Body>
            </Card>)
    }
}
function EnterpriseInfo({enterprise1,enterprise2,_available_enterprise,money}){

    



    return(
        <>

        <h3 class='my-2'>진행 중인 사업</h3>
        <Container>
        <Row className="justify-content-md-center">
            <Col><Enterprise enterprise={enterprise1}></Enterprise></Col>
            <Col><Enterprise enterprise={enterprise2}></Enterprise></Col>
        </Row>
        </Container>
        <h3 class='my-2'>시작 가능한 사업</h3>
        <Container>
        <Row className="justify-content-md-center">
        {_available_enterprise && _available_enterprise.map((enterprise) => (
                                    <Col><Enterprise enterprise={enterprise} money={money}></Enterprise></Col>
            ))}
        </Row>
        </Container>
        </>
        )

}
export default function Team() {


    const test =()=>{
        document.location.href = '/team';

    }
    const [data, setData] = useState({
        my_team:{
            name: "",
            top: null,
            jungle: null,
            mid: null,
            adc: null,
            support: null,
            sponsor1:null,
            sponsor2:null,
            sponsor3:null,
            enterprise1:null,
            enterprise2:null

        },
        available_sponsor:[],
        available_enterprise:[]
})
   
    useEffect(() => {
        const fetchTeam = async () => {
            try {
                axios.get('http://localhost:8000/api/teaminfo/',header).then((response) => {
                    setData(response.data);
                    console.log(response.data);
                })
            } catch (e) { console.log(e); }
        };
        fetchTeam();
    }, []);
    return (
        <>
            <Tabs defaultActiveKey="team" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="team" title="로스터 정보">
                    
                    <TeamInfo myTeam={data.my_team}></TeamInfo>
                </Tab>
                <Tab eventKey="sponsor" title="스폰서">
                    <SponsorInfo sponsor1={data.my_team.sponsor1} sponsor2={data.my_team.sponsor2} sponsor3={data.my_team.sponsor3} _available_sponsor={data.available_sponsor}></SponsorInfo>
                </Tab>
                <Tab eventKey="enterprise" title="사업">
                    <EnterpriseInfo enterprise1={data.my_team.enterprise1} enterprise2={data.my_team.enterprise2} _available_enterprise={data.available_enterprise} money={data.my_team.money}></EnterpriseInfo>
                </Tab>
                <Tab eventKey="leagueinfo" title="리그 상황">
                    <div>4</div>
                </Tab>
            </Tabs>
        <Button onClick={test}>Redirection Test</Button>

        </>);
}