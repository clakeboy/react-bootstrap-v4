import React, { useEffect } from 'react'
import '../../css/calendar.less';
import { Button, Container,Card, Calendar, Icon } from '../../../src';
export default function TestCalendar(props:any) {
    const arr = [...new Array<string>(39).keys()];
    useEffect(()=>{
        console.log(props);
    })

    const heads:string[] = [
        '日','一','二','三','四','五','六'
    ]

    return <Container>
        <Button className='my-2' onClick={()=>{
            props.history.go(-1)
        }}>返回</Button>
        <Card header="新版 Calendar 样式">
        <div className='calendar-v2-main'>
            <div className='calendar-v2'>
                <div className='head-btn btn-pr w-100'>
                    <Icon icon='arrow-left'/>
                </div>
                <div className="header d-flex">
                    <div className='head-btn py-2 w-50'>2003</div>
                    <div className='head-btn py-2 w-50'>1月</div>
                </div>
                <div className='head-btn btn-nx w-100'>
                    <Icon icon='arrow-right'/>
                </div>
                {heads.map((item,idx)=>{
                    return <div key={idx} tabIndex={idx} className='title'>{item}</div>
                })}
                {arr.map((item,idx)=>{
                    return <div key={idx} tabIndex={idx} className={'item' + (idx==18?' active':'')}>{idx+1}</div>
                })}
            </div>
        </div>
        <div>
            <div className='mb-1'>英文和时间</div>
            <Calendar lang='en' timeBar/>
        </div>
        </Card>
    </Container>
}