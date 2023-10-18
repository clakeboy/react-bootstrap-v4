import React from 'react'
import '../../css/calendar.less';

export default function TestCalendar() {
    const arr = [...new Array<string>(42).keys()];
    return <>
        <div className='calendar-v2'>
            <div className="header">header</div>
            {arr.map((item,idx)=>{
                return <div key={idx} className='item'>{idx+1}</div>
            })}
        </div>
    </>
}