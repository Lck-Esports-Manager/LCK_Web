import React from 'react';
import Maintitle from './Maintitle';

/* 올바르지 못한 접근 */
export default function NotFound() {
    return (<>
        <Maintitle />
        <div>페이지를 찾을 수 없습니다.</div>
    </>);
}