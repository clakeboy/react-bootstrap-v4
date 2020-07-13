/**
 * Created by clakeboy on 2020/4/2.
 */

import React from 'react';
import {Button, Card, Container, Input, DropPanel} from "../../src";
// import '../../src/css/Triangle.less';

class TestTriangle extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        let div={
            width: '200px',
            height: '300px',
        };

        return (
            <Container>
                <h1>Triangle Demo</h1>
                <Container fluid className='mb-1 p-0'>
                    <Button className='mr-1' onClick={e=>{
                        this.props.history.replace('/',this.state);
                    }}>回到首页</Button>
                </Container>
                <Card className='mt-2' header='DropPanel 测试'>
                    <div className='cleafix'>
                        <div className='position-relative d-inline border p-2 float-right' id='test_drop_panel_left'>
                            <span>点击测试</span>
                            <DropPanel className='bg-white' selector='#test_drop_panel_left'>
                                <div className='p-1' style={{width:'300px'}}>
                                    <Input/>
                                    <Input/>
                                    <Input/>
                                    <Input/>
                                </div>
                            </DropPanel>
                        </div>
                        <div className='position-relative d-inline border p-2 float-left' id='test_drop_panel_right'>
                            <span>点击测试</span>
                            <DropPanel className='bg-white' selector='#test_drop_panel_right'>
                                <div className='p-1'>
                                    <Input/>
                                    <Input/>
                                    <Input/>
                                    <Input/>
                                </div>
                            </DropPanel>
                        </div>
                    </div>
                </Card>
                <Card className='mt-2' header='三角CSS测试'>
                    <div className='d-flex'>
                        <div className='ck-triangle ck-triangle-top border position-relative m-2' style={div}/>
                        <div className='ck-triangle ck-triangle-top ck-triangle-xl border position-relative m-2' style={div}/>
                        <div className='ck-triangle ck-triangle-top ck-triangle-xr border position-relative m-2' style={div}/>
                    </div>
                    <div className='d-flex'>
                        <div className='ck-triangle ck-triangle-bottom border position-relative m-2' style={div}/>
                        <div className='ck-triangle ck-triangle-bottom ck-triangle-xl border position-relative m-2' style={div}/>
                        <div className='ck-triangle ck-triangle-bottom ck-triangle-xr border position-relative m-2' style={div}/>
                    </div>
                    <div className='d-flex'>
                        <div className='ck-triangle ck-triangle-left border position-relative m-2' style={div}/>
                        <div className='ck-triangle ck-triangle-left ck-triangle-yt border position-relative m-2' style={div}/>
                        <div className='ck-triangle ck-triangle-left ck-triangle-yb border position-relative m-2' style={div}/>
                    </div>
                    <div className='d-flex'>
                        <div className='ck-triangle ck-triangle-right border position-relative m-2' style={div}/>
                        <div className='ck-triangle ck-triangle-right ck-triangle-yt border position-relative m-2' style={div}/>
                        <div className='ck-triangle ck-triangle-right ck-triangle-yb border position-relative m-2' style={div}/>
                    </div>
                </Card>
            </Container>
        );
    }
}

export default TestTriangle;