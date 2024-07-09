import React, { useEffect, useState } from 'react';
import  {
    Card,
    CDropdown,
    Container,
    Button
} from '../../src/index';
export default function Mobile(props) {
    const [list,setList] = useState([]);
    
    useEffect(()=>{
        let ls = [];
        for (let i=0;i<10;i++) {
            ls.push({
                text:'Dropdown Item '+(i+1),
                value:(i+1),
            })
        }
        setList(ls);
    },[])

    return <Container>
        <Container fluid className='mb-1 p-0'>
            <Button onClick={() => {
                props.history.goBack();
            }}>返回主页</Button>
        </Container>
        <Card header="测试移动端效果">
            <CDropdown>
                {list.map((item,idx)=>{
                    return <CDropdown.Value key={idx} text={item.text} value={item.value}/>
                })}
            </CDropdown>
        </Card>
    </Container>
}