import React, { useState } from 'react';
import './Card.css';

export default function Card(props) {
    return (
        <li id="Card">
            <div className="card--title">{props.name}</div>
            <div className="card--name">{props.props.name} </div>
            <div className="card--rate">{props.props.rate}티어</div>
            <div className="card--price">￦{props.props.price}</div>
        </li>
    )
}