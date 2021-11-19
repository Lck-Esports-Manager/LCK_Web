import React from 'react';
import './Tower.css';

export default function Tower(props) {

    return (<>
        <div className='tower--main'>
            <div className="hpbar">
                {props.color === 0 ? (props.num === 0 ? '' :
                    props.num === 1 ? <div className="hp--blue">ㅤ</div> :
                        props.num === 2 ? <><div className="hp--blue">ㅤ</div><div className="hp--blue">ㅤ</div></> :
                            props.num === 3 ? <><div className="hp--blue">ㅤ</div><div className="hp--blue">ㅤ</div><div className="hp--blue">ㅤ</div></> :
                                props.num === 4 ? <><div className="hp--blue">ㅤ</div><div className="hp--blue">ㅤ</div><div className="hp--blue">ㅤ</div><div className="hp--blue">ㅤ</div></> :
                                    <><div className="hp--blue">ㅤ</div><div className="hp--blue">ㅤ</div><div className="hp--blue">ㅤ</div><div className="hp--blue">ㅤ</div><div className="hp--blue">ㅤ</div></>)
                    : (props.num === 0 ? '' :
                        props.num === 1 ? <div className="hp--red">ㅤ</div> :
                            props.num === 2 ? <><div className="hp--red">ㅤ</div><div className="hp--red">ㅤ</div></> :
                                props.num === 3 ? <><div className="hp--red">ㅤ</div><div className="hp--red">ㅤ</div><div className="hp--red">ㅤ</div></> :
                                    props.num === 4 ? <><div className="hp--red">ㅤ</div><div className="hp--red">ㅤ</div><div className="hp--red">ㅤ</div><div className="hp--red">ㅤ</div></> :
                                        <><div className="hp--red">ㅤ</div><div className="hp--red">ㅤ</div><div className="hp--red">ㅤ</div><div className="hp--red">ㅤ</div><div className="hp--red">ㅤ</div></>)
                }
            </div>
            {props.color === 0 ? <div className="blue--tower">ㅤ</div> : <div className="red--tower">ㅤ</div>}
        </div>
    </>);
}