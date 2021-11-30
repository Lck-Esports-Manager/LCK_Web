import React from 'react';

export default function PlayerSlot(props) {
    return (<>
        <li>
            <span class={props.icon}>ㅤ</span>
            <div>{props.pos}</div>
            <div className="name">{props.teaminfo?.name}</div>
            <img src={props.img?.url} alt="img" />
        </li>
    </>);
}