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
    CKModal,
    CDropdown,
    Form,
    InputStyle,
    Complex
} from '../../src/index';
import Loader from '../components/Loader';

class Coupon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:{},
            tree:[
                {
                    icon:'user',
                    key:'main',
                    text:'这是主树',
                    show:true,
                    children:[
                        {icon:'user',key:'',text:'这是三儿子'},
                        {icon:'',key:'',text:'这是三儿子'},
                        {icon:'',key:'',text:'这是三儿子'},
                        {icon:'',key:'',text:'这是三儿子',checked:true},
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
                {icon:'',key:'',text:'没有儿子的',data:{name:'',value:''}},
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

        this.child = [{
            "id"             : 3,
            "task_name_eng":"Test notify",
            "task_name"      : "测试通知",
            "time_rule"      : "0 * * * * *",
            "once"           : true,
            "is_execute"     : true,
            "disable"        : false,
            "notify_url"     : "http://localhost:9803/notify",
            "notify_method"  : "GET",
            "notify_data"    : "",
            "notify_number"  : 6,
            "notified_number": 6,
            "source"         : "System",
            "created_date"   : 1530864160
        }, {
            "id"             : 2,
            "task_name_eng":"Test one notify",
            "task_name"      : "测试一次通知",
            "time_rule"      : "* */1 * * * *",
            "once"           : true,
            "is_execute"     : true,
            "disable"        : false,
            "notify_url"     : "http://localhost:9803/serv/server/status",
            "notify_method"  : "GET",
            "notify_data"    : "",
            "notify_number"  : 3,
            "notified_number": 7,
            "source"         : "System",
            "created_date"   : 1530783655
        }, {
            "id"             : 1,
            "task_name_eng":"Test task",
            "task_name"      : "测试任务",
            "time_rule"      : "0 * * * * *",
            "once"           : true,
            "is_execute"     : true,
            "disable"        : false,
            "notify_url"     : "http://localhost:9803",
            "notify_method"  : "GET",
            "notify_data"    : "asdfasdf",
            "notify_number"  : 7,
            "notified_number": 12,
            "source"         : "",
            "created_date"   : 1530767866
        }, {
            "id"             : 4,
            "task_name_eng":"Test task",
            "task_name"      : "测试任务",
            "time_rule"      : "0 * * * * *",
            "once"           : true,
            "is_execute"     : true,
            "disable"        : false,
            "notify_url"     : "http://localhost:9803",
            "notify_method"  : "GET",
            "notify_data"    : "asdfasdf",
            "notify_number"  : 7,
            "notified_number": 12,
            "source"         : "",
            "created_date"   : 1530767866
        }, {
            "id"             : 5,
            "task_name_eng":"Test task",
            "task_name"      : "测试任务",
            "time_rule"      : "0 * * * * *",
            "once"           : true,
            "is_execute"     : true,
            "disable"        : false,
            "notify_url"     : "http://localhost:9803",
            "notify_method"  : "GET",
            "notify_data"    : "asdfasdf",
            "notify_number"  : 7,
            "notified_number": 12,
            "source"         : "",
            "created_date"   : 1530767866
        }, {
            "id"             : 6,
            "task_name_eng":"Test task",
            "task_name"      : "测试任务",
            "time_rule"      : "0 * * * * *",
            "once"           : true,
            "is_execute"     : true,
            "disable"        : false,
            "notify_url"     : "http://localhost:9803",
            "notify_method"  : "GET",
            "notify_data"    : "asdfasdf",
            "notify_number"  : 7,
            "notified_number": 12,
            "source"         : "",
            "created_date"   : 1530767866
        }];
    }

    componentDidMount() {

    }

    render() {
        let data = {
            item1:'asdfasdf',
            item2:'asdg3222'
        };
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
                    <Container inline>
                        <Input field='name' width='200px' data={this.state.data.name} multi={{height:'100px'}}/>
                        <Input field='name_s' data={this.state.data.name_s}/>
                    </Container>
                    <Form onChange={(field,val,row)=>{
                        console.log(field,val,row);
                        let data = this.state.data;
                        data[field] = val;
                        this.setState({
                            data:data
                        },()=>{
                            console.log(this.state.data);
                        })
                    }}>
                        <div className='form-row'>
                            <Input className='col-6' field='name' label='Name' data={this.state.data.name} multi={{height:'100px'}}/>
                            <Input className='col-6' field='name_s' label='Last Name' data={this.state.data.name_s}/>
                        </div>
                        <div className='form-row'>
                            <CDropdown className='col-6' field='text_drop' label='Name' text='下拉选择'>
                                <CDropdown.Value text='选项1' value={11111} active={this.state.data.text_drop==='选项1'}/>
                                <CDropdown.Value text='选项2' value={222222} active={this.state.data.text_drop==='选项2'}/>
                            </CDropdown>
                            <CDropdown className='col-6' size='sm' field='text_drop' label='Name' text='下拉选择'>
                                <CDropdown.Value text='选项1' value={11111} active={this.state.data.text_drop==='选项1'}/>
                                <CDropdown.Value text='选项2' value={222222} active={this.state.data.text_drop==='选项2'}/>
                            </CDropdown>
                        </div>
                        <div className='form-row'>
                            <div className='col-2 form-group pt-2'><label>middle垂直居中</label></div>
                            <Input className='col-10' data='Lee'/>
                        </div>
                        <div className='form-row'>
                            <InputStyle className='col-6' label='Complex Combobox'>
                                <Complex combo={{
                                    searchColumn: 'task_name_eng',
                                    showRows:10,
                                    width:'500px',
                                    filterColumns:[
                                        {field:'task_name_eng',text:'任务名称',width:'200px'},
                                        {field:'task_name',text:'任务名称',width:'200px'},
                                        {field:'time_rule',text:'时间规则'},
                                        {field:'notify_method',text:'任务名称'},
                                        {field:'source',text:'任务名称'},
                                        {field:'created_date',text:'创建时间',format:(val,row)=>{
                                                return new Date(val*1000).toLocaleString();
                                            }}
                                    ],
                                }} comboData={this.child} placeholder="选择添加项"
                                onChange={(val,list)=>{
                                    console.log(val,list);
                                }}/>
                            </InputStyle>
                            <InputStyle className='col-6' label='Complex input'>
                                <Complex placeholder="输入添加项" onChange={(val,list)=>{
                                    console.log(val,list);
                                }}/>
                            </InputStyle>
                        </div>

                    </Form>
                </Card>
                <Card className='mt-2' header="模态窗口">
                    <ButtonGroup>
                    <Button onClick={e=>this.modal.alert('测试效果',()=>{
                        console.log('asdfsadf');
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
                                this.modal.loading({
                                    header:false,
                                    content:'加载中....读秒('+idx+')',
                                });
                                idx--;
                                setTimeout(callLoad,1000);
                            }
                        };
                        callLoad();
                    }}>测试 loading 加载 Modal</Button>
                    <Button theme='info' onClick={e=>this.modal.view({
                        title:'添加优惠券',
                        content:<Loader loadPath='/skill/AddCoupon' import={GetComponent}/>,
                        width:'1000px',
                    })}>测试 view 自定义内容 Modal</Button>
                    </ButtonGroup>
                    <Button className='mt-4' block onClick={e=>{
                        this.modal.alert("测试")
                    }}>Button Block</Button>
                </Card>
                <Card className='mt-2' header='树组件 Card 自定义头' custom border='light'>
                    <Tree data={this.state.tree} showSelected onClick={(item,id)=>{
                        // this.modal.alert(item.text+id);
                        console.log(item);
                    }}/>
                    <Tree ref={c=>this.dataTree=c} data={this.state.tree} onClick={(item,id)=>{
                        // this.modal.alert(item.text+id);
                        console.log(item);
                    }} check onSelect={(check,item)=>{
                        console.log(check,item);
                    }}/>
                    <Button onClick={()=>{
                        console.log(this.dataTree.getSelected());
                    }}>输出dataTree值</Button>
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
                <CKModal ref={c=>this.modal=c} fade blurSelector='#react-main'/>
            </Container>
        );
    }
}

Coupon.propTypes = {

};

Coupon.defaultProps = {

};

export default Coupon;