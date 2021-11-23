import React from 'react';

export default function SelectBtn(props) {
    return (<>
        {props.bool ? (props.argu ? <div className="selected" onClick={props.func} >{props.text} ({props.act})</div>
            : <div className="select" onClick={props.func}>{props.text} ({props.act})</div>)
            : <div className="no--select">{props.text} ({props.act})</div>}
    </>);
}