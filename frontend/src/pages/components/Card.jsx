import React from 'react';
import './Card.css';

export default function Card(props) {
    return (
        <li id="Card">
            <div className="card--title">{props.name}</div>
            <div className="card--name">[{props.props.rate}] {props.props.name} </div>
            <div className="card--price">￦{props.props.price}</div>
        </li>
    )
}