import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import {GetComponent} from "../common/Funcs";
import {
    Container,
    Input,
    InputGroup,
    Button,
    ButtonGroup,
    Card,
    CCheckbox,
    Checkbox,
    Table,
    Pagination,
    Dropdown,
    Select,
    Calendar,
    Modal,
    Tree,
    Title,
    Tabs,
    TabsContent,
    Load,
    CKModal
} from '../../src/index';
import Loader from '../components/Loader';

class Coupon extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            tree:[
                {
                    icon:'user',
                    key:'main',
                    text:'这是主树',
                    children:[
                        {icon:'user',key:'',text:'这是三儿子'},
                        {icon:'',key:'',text:'这是三儿子'},
                        {icon:'',key:'',text:'这是三儿子'},
                        {icon:'',key:'',text:'这是三儿子'},
                        {icon:'',key:'',text:'这是三儿子'}
                    ]
                },
                {
                    icon:'',
                    key:'main',
                    text:'这是主树2',
                    children:[
                        {
                            icon:'',
                            key:'child',
                            text:'这是主树2儿子',
                            children:[
                                {icon:'',key:'',text:'这是三儿子'}
                            ]
                        }
                    ]
                },
                {icon:'',key:'',text:'没有儿子的'},
                {
                    icon:'',
                    key:'main',
                    text:'这是主树3',
                    children:[
                        {
                            icon:'',
                            key:'child',
                            text:'这是主树3儿子',
                        }
                    ]
                }
            ]
        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <Container>
                <h1>React Bootstrap v4 Demo 2</h1>
                <Button onClick={()=>{
                    this.props.history.goBack();
                }}>返回主页</Button>
                <Card className='mt-2' custom header="Load 动画组件">
                    <div>
                        <Load>内容加载中</Load>
                    </div>
                </Card>
                <Card divider border={'info'} className='mt-2' header="优惠券添加">
                    <div className='form-row'>
                        <Input className='col-6' label='Name' plaintext data='Clake'/>
                        <Input className='col-6' label='Last Name' data='Lee'/>
                    </div>
                    <div className='form-row'>
                        <div className='col-2 form-group pt-2'><label>middle垂直居中</label></div>
                        <Input className='col-10' data='Lee'/>
                    </div>
                </Card>
                <Card className='mt-2' header="模态窗口">

                    <Button onClick={e=>this.modal.alert({
                        title:'测试',
                        content:'测试一下效果',
                        center:true
                    })}>测试 alert 警告 Modal</Button>
                    <Button theme='success' onClick={e=>this.modal.confirm({
                        content:'确定要按下这个按钮?',
                        callback:(flag)=>{
                            console.log(flag);
                        },
                        center:true
                    })}>测试 confirm 警告 Modal</Button>
                    <Button theme='secondary' onClick={e=>{
                        let idx = 3;
                        let callLoad = ()=>{
                            if (idx === 0) {
                                this.modal.close();
                            } else {
                                this.modal.loading('加载中....读秒('+idx+')');
                                idx--;
                                setTimeout(callLoad,1000);
                            }
                        };
                        callLoad();
                    }}>测试 loading 加载 Modal</Button>
                    <Button theme='info' onClick={e=>this.modal.view({
                        title:'添加优惠券',
                        content:<Loader loadPath='/skill/AddCoupon' import={GetComponent}/>
                    })}>测试 view 自定义内容 Modal</Button>

                    <Button className='mt-4' block onClick={e=>{
                        this.modal.alert("测试")
                    }}>Button Block</Button>
                </Card>
                <Card className='mt-2' header='树组件 Card 自定义头' custom border='light'>
                    <Tree data={this.state.tree} onSelect={(item,id)=>{
                        this.modal.alert(item.text+id);
                    }}/>
                </Card>
                <Title className='mb-2'>
                    Tabs 组件 (直接使用 Title 组件)
                </Title>
                <Title sm className='mb-2 bg-light'>
                    Title 小组件
                </Title>
                <Button onClick={()=>{

                }}>切换TAB</Button>
                <Tabs>
                    <TabsContent id='label1' text='标题1' active>
                        <div className='form-row'>
                            <Input className='col-6' label='Name' plaintext data='Clake'/>
                            <Input className='col-6' label='Last Name' data='Lee'/>
                        </div>
                        <div className='form-row'>
                            <div className='col-2 form-group pt-2'><label>middle垂直居中</label></div>
                            <Input className='col-10' data='Lee'/>
                        </div>
                    </TabsContent>
                    <TabsContent id='label2' text='标题2'>
                        <h5>这有一个树</h5>
                        <Tree data={this.state.tree} onSelect={(item,id)=>{
                            this.modal.alert(item.text+id);
                        }}/>
                    </TabsContent>
                </Tabs>
                <CKModal ref={c=>this.modal=c} blurSelector='#react-main'/>
            </Container>
        );
    }
}

Coupon.propTypes = {

};

Coupon.defaultProps = {

};

export default Coupon;