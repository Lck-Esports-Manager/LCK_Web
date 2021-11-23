import React from 'react';

export default function PlayerSlot(props) {
    return (<>
        <li>
            <span class={props.icon}>ㅤ</span>
            <div>{props.pos}</div>
            <span class="material-icons">account_circle</span>
            <div>{props.teaminfo?.name}</div>
            <span class="material-icons">pets</span>
            <div className="chamsName">{props.img?.name}</div>
            <img src={props.img?.url} alt="img" />
        </li>
    </>);
}