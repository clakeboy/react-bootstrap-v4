import React, { useEffect } from 'react'
import '../../css/calendar.less';
import { Button, Container,Card, Calendar, Icon, Scroll, Input } from '../../../src';

const yearList:any[] = []

for(let i = 0; i < 300; i++) {
    yearList.push(2017+i)
}

export default function TestCalendar(props:any) {
    const arr = [...new Array<string>(39).keys()];
    const [date, setDate] = React.useState('')
    useEffect(()=>{
        console.log(props);
        setDate('2018-8-3 17:00')
    },[])

    const heads:string[] = [
        '日','一','二','三','四','五','六'
    ]

    return <Container>
        <Button className='my-2' onClick={()=>{
            props.history.go(-1)
        }}>返回</Button>
        <Card header="新版 Calendar 样式">
        <div className="row">
            <div className="col">
                <div className='calendar-v2-main'>
                    <div className='year' id='calendar-year'>
                        {yearList.map((item,idx)=>{
                            return <div key={idx}>{item}</div>
                        })}
                        
                    </div>
                    <Scroll selector='#calendar-year'/>
                    <div className='month'>

                    </div>
                    <div className='calendar-v2 lg'>
                        <div className='head-btn btn-pr w-100'>
                            <Icon icon='chevron-left'/>
                        </div>
                        <div className="header d-flex">
                            <div className='head-btn py-2 w-50'>2003</div>
                            <div className='head-btn py-2 w-50'>1月</div>
                        </div>
                        <div className='head-btn btn-nx w-100'>
                            <Icon icon='chevron-right'/>
                        </div>
                        {heads.map((item,idx)=>{
                            return <div key={idx} tabIndex={idx} className='title'>{item}</div>
                        })}
                        {arr.map((item,idx)=>{
                            return <div key={idx} tabIndex={idx} className={'item' + (idx==18?' active':'')}>{idx+1}</div>
                        })}
                    </div>
                </div>
            </div>
            <div className="col">
                <div className='calendar-v2-main'>
                    <div className='calendar-v2'>
                        <div className='head-btn btn-pr w-100'>
                            <Icon icon='chevron-left'/>
                        </div>
                        <div className="header d-flex">
                            <div className='head-btn py-2 w-50'>2003</div>
                            <div className='head-btn py-2 w-50'>1月</div>
                        </div>
                        <div className='head-btn btn-nx w-100'>
                            <Icon icon='chevron-right'/>
                        </div>
                        {heads.map((item,idx)=>{
                            return <div key={idx} tabIndex={idx} className='title'>{item}</div>
                        })}
                        {arr.map((item,idx)=>{
                            return <div key={idx} tabIndex={idx} className={'item' + (idx==18?' active':'')}>{idx+1}</div>
                        })}
                    </div>
                </div>
                <Input size='sm' label='Calendar' data={date} onChange={(val)=>{
                    setDate(val)
                }} calendar={{format:"YYYY-MM-DD HH:II",time:true}}/>
            </div>
            <div className="col">
                <div className='calendar-v2-main'>
                    <div className='calendar-v2 sm'>
                        <div className='head-btn btn-pr w-100'>
                            <Icon icon='chevron-left'/>
                        </div>
                        <div className="header d-flex">
                            <div className='head-btn py-2 w-50'>2003</div>
                            <div className='head-btn py-2 w-50'>1月</div>
                        </div>
                        <div className='head-btn btn-nx w-100'>
                            <Icon icon='chevron-right'/>
                        </div>
                        {heads.map((item,idx)=>{
                            return <div key={idx} tabIndex={idx} className='title'>{item}</div>
                        })}
                        {arr.map((item,idx)=>{
                            return <div key={idx} tabIndex={idx} className={'item' + (idx==18?' active':'')}>{idx+1}</div>
                        })}
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div className='mb-1'>英文和时间</div>
            <Calendar lang='en' timeBar/>
        </div>
        </Card>
    </Container>
}