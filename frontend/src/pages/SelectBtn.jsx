import React from 'react';

export default function SelectBtn(props) {
    return (<>
        {props.bool ? (props.argu ? <div className="selected" onClick={props.func} >{props.text}</div>
            : <div className="select" onClick={props.func}>{props.text}</div>)
            : <div className="no--select">{props.text}</div>}
    </>);
}