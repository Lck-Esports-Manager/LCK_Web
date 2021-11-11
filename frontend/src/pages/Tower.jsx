import React from 'react';
import './Tower.css';

export default function Tower(props) {

    return (<>
        <div className='tower--main'>
            <div className="hpbar">
                {props.num === 0 ? '' :
                    props.num === 1 ? <div className="hp">ㅤ</div> :
                        props.num === 2 ? <><div className="hp">ㅤ</div><div className="hp">ㅤ</div></> :
                            props.num === 3 ? <><div className="hp">ㅤ</div><div className="hp">ㅤ</div><div className="hp">ㅤ</div></> :
                                props.num === 4 ? <><div className="hp">ㅤ</div><div className="hp">ㅤ</div><div className="hp">ㅤ</div><div className="hp">ㅤ</div></> :
                                    <><div className="hp">ㅤ</div><div className="hp">ㅤ</div><div className="hp">ㅤ</div><div className="hp">ㅤ</div><div className="hp">ㅤ</div></>
                }
            </div>
            <div className="tower">ㅤ</div>
        </div>
    </>);
}