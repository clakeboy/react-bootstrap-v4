import React, { useEffect, useRef,useState } from 'react'
import '../../css/calendar.less';
import { Button, Container,Card, Calendar, Icon, Scroll, Input,CKModal } from '../../../src';

interface Props{
    date?:string
}
export default function TestCalendar(props:Props){
    const [date, setDate] = useState(props.date??'')
    useEffect(()=>{
        console.log(props);
        setDate(props.date??'')
    },[props.date])
    return <>
        <div>{date}</div>
        <Input size='sm' label='Calendar' data={date} onChange={(val)=>{
                    setDate(val)
                }} calendar={{format:"YYYY-MM-DD HH:II:SS",time:true}}/>
    </>
}