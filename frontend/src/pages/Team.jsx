import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Maintitle from './Maintitle';
import {Button} from 'react-bootstrap'

export default function Team() {
    const [myTeam, setMyTeam] = useState({name:"test"})
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
    return (<>
        <Maintitle />
        <div>{myTeam.name}</div>
        <Button variant="secondary">Secondary</Button>
    </>);
}