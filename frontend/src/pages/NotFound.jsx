import React from 'react';
import './NotFound.css';

/* 올바르지 못한 접근 */
export default function NotFound() {
    return (<>
        <div className="NF--main">
            <div className="inner">
                <div>페이지를 찾을 수 없습니다.</div>
                <div className="message"></div>
                <div className="btn"></div>
            </div>
        </div>
    </>);
}