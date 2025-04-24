import React, { useEffect, useRef,useState } from 'react'
import '../../css/calendar.less';
import { Button, Container,Card, Calendar, Icon, Scroll, Input,CKModal } from '../../../src';
import TestCalendar from './TestCalendar'
const yearList:any[] = []
const monthList:any[] = [
    '一',
    '二',
    '三',
    '四',
    '五',
    '六',
    '七',
    '八',
    '九',
    '十',
    '十一',
    '十二'
]
for(let i = 0; i < 300; i++) {
    yearList.push(2017+i)
}

export default function TestMainCalendar(props:any) {
    const arr = [...new Array<string>(39).keys()];
    const [date, setDate] = useState('2018-8-3 17:00:01')
    const modal = useRef<CKModal>(null)
    useEffect(()=>{
        // console.log(props);
        setDate('2018-8-3 17:00:02')
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
                    <div className='year lg d-none' id='calendar-year-lg'>
                        {yearList.map((item,idx)=>{
                            if (item == 2018) {
                                return <div key={idx} className='item active rounded-pill'>{item}</div>
                            }
                            return <div key={idx} className='item'>{item}</div>
                        })}
                    </div>
                    {/* <Scroll selector='#calendar-year-lg'/> */}
                    <div className='year lg d-none'>
                        {monthList.map((item,idx)=>{
                            if (idx == 1) {
                                return <div key={idx} className='item active rounded-pill'>{item}月</div>
                            }
                            return <div key={idx} className='item'>{item}月</div>
                        })}
                    </div>
                    <div className='calendar-v2 lg'>
                        <div className='head-btn c-btn btn-pr w-100'>
                            <Icon icon='chevron-left'/>
                        </div>
                        <div className="header d-flex">
                            <div className='head-btn c-btn py-2 w-50'>2003</div>
                            <div className='head-btn c-btn py-2 w-50'>1月</div>
                        </div>
                        <div className='head-btn c-btn btn-nx w-100'>
                            <Icon icon='chevron-right'/>
                        </div>
                        {heads.map((item,idx)=>{
                            return <div key={idx} tabIndex={idx} className='title'>{item}</div>
                        })}
                        {arr.map((item,idx)=>{
                            return <div key={idx} tabIndex={idx} className={'item c-btn' + (idx==18?' active':'')}>{idx+1}</div>
                        })}
                        <div className='timer'>
                            <div className='time text-center'>
                            21 : 51 : 32
                            </div>
                            <div className='time-btn c-btn text-center rounded'>
                                选择
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className='calendar-v2-main'>
                    <div className='year' id='calendar-year'>
                        {yearList.map((item,idx)=>{
                            if (item == 2018) {
                                return <div key={idx} className='item active rounded-pill'>{item}</div>
                            }
                            return <div key={idx} className='item'>{item}</div>
                        })}
                    </div>
                    <Scroll selector='#calendar-year'/>
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
                        <div className='timer'>
                            <div className='time text-center'>
                                21:51:32
                            </div>
                            <div className='time-btn c-btn text-center rounded'>
                                选择
                            </div>
                        </div>
                    </div>
                </div>
                <Input size='sm' label='Calendar' data={date} onChange={(val)=>{
                    setDate(val)
                }} calendar={{format:"YYYY-MM-DD HH:II:SS",time:true}}/>
                <Button onClick={()=>{
                    modal.current?.view({
                        content: <TestCalendar date={date}/>,
                        shadowClose:true,
                    })
                }}>点击</Button>
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
                        <div className='timer'>
                            <div className='time text-center'>
                                21 : 51 : 32
                            </div>
                            <div className='time-btn c-btn text-center rounded'>
                                选择
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div className='mb-1'>英文和时间</div>
            <Calendar lang='en' timeBar/>
        </div>
        </Card>
        <CKModal ref={modal}/>
    </Container>
}