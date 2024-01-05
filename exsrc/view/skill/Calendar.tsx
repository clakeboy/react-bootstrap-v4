import React, { useEffect } from 'react'
import '../../css/calendar.less';
import { Button, Container,Card, Calendar, Icon } from '../../../src';
export default function TestCalendar(props:any) {
    const arr = [...new Array<string>(39).keys()];
    useEffect(()=>{
        console.log(props);
        
    })
    return <Container>
        <Button className='my-2' onClick={()=>{
            props.history.go(-1)
        }}>返回</Button>
        <Card header="新版 Calendar 样式">
        <div className='calendar-v2'>
            <div className='btn-pr'>
                <Icon icon='arrow-left'/>
            </div>
            <div className="header">2003</div>
            <div className='btn-nx'>
                <Icon icon='arrow-right'/>
            </div>
            {arr.map((item,idx)=>{
                return <div key={idx} tabIndex={idx} className='item'>{idx+1}</div>
            })}
        </div>
        <div>
            <div className='mb-1'>英文和时间</div>
            <Calendar lang='en' timeBar/>
        </div>
        </Card>
    </Container>
}