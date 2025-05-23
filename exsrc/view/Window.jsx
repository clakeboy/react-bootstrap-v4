/**
 * Created by clakeboy on 2018/8/16.
 */
import React from 'react';
import {
    Container,
    Input,
    Button,
    Card,
    Label,
    Menu,
    Alerts,
    Switch,
    CDropdown,
    CCheckbox, Complex,Form,GroupStyle,ComboBox,
    Theme
} from '../../src/index';
import {Svg} from "../../src/components/Svg";
import taskData from '../data/task.json';

class Window extends React.Component {
    constructor(props) {
        super(props);

        this.dataTable = [];
        for (let i=0;i<10;i++) {
            this.dataTable.push({
                'name':'name-'+(i+1),
                'age':'age-'+(i+1),
                'birthday':'birthday-'+(i+1),
                'address':'address-'+(i+1),
                'both':'both-'+(i+1),
                'is_paid':1,
                'test':'test-'+(i+1),
            })
        }

        this.comboData = [{
            "id"             : 3,
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
        document.oncontextmenu=(e)=>{
            e.preventDefault();
            this.mainMenu.show({evt:e,type:'mouse',data:'',close:()=>{
                console.log("close");
            }});
        }
        this.testSvg()
    }

    componentWillUnmount() {
        document.oncontextmenu=null;
    }

    testSvg() {
        const svg = Svg()
            .attr('x','0')
            .attr('y','0')
            .attr('width','200px')
            .attr('height','200px')
        let circle = svg.add('circle')
        svg.attachTo('#svg_con')
    }

    render() {
        return (
            <Container>
                <h1>Window Manage Demo</h1>
                <Container fluid className='mb-1 p-0'>
                    <Button className='me-1' onClick={e=>{
                        this.props.history.replace('/',this.state);
                    }}>回到首页</Button>
                </Container>
                <Card className='mt-2 h-100 mb-2 box-hover' header='Window Test'>
                    <Label text='Clake Lee'/>
                    <Button onClick={(e)=>{
                        this.mainMenu.show({evt:e,type:'dom-left',data:'',close:()=>{
                                console.log("close dom-left");
                            }});
                    }}>点击打开菜单</Button>
                    <Button className='ms-3' theme='success' icon='plus' onClick={(e)=>{
                        this.dicMenu.show({
                            menu_list:[
                                {field:'asc',children:'这是动态菜单1'},
                                {field:'asc2',children:'这是动态菜单2'},
                            ],
                            evt:e,
                            type:'dom-right',
                            data:''
                        })
                    }}>动态菜单项</Button>
                    <Form onChange={(field,val,row,combo)=>{
                        console.log(field,val,row,combo)
                    }}>
                    <div className="mt-2 comm-form">
                        <GroupStyle left='测试组'>
                            <Input placeholder='一般输入框' field='test' validate={{text:'必须输入',rule:/.+/,tip:true}}/>
                        </GroupStyle>
                        <GroupStyle left='测试组'>
                            <ComboBox searchColumn='task_name' field='test-combo'
                                      placeholder='ComboBox'
                                      header
                                      showRows={10}
                                      data={taskData}
                                      onChange={(val,row)=>{
                                          console.log(val,row);
                                      }}
                                      width='100'
                            >
                                <ComboBox.Column field='task_name' text='任务名称' width='150px'/>
                                <ComboBox.Column field='time_rule' text='时间规则' width='150px'/>
                                <ComboBox.Column field='notify_method' text='通知方法' width='100px'/>
                                <ComboBox.Column field='source' text='数据源' width='150px'/>
                                <ComboBox.Column field='created_date' text='创建时间' format={(val,row)=>{
                                    return new Date(val*1000).toLocaleString();
                                }} width='180px'/>
                            </ComboBox>
                        </GroupStyle>
                        <GroupStyle left='下拉'>
                            <CDropdown text='下拉选择' field='test-drop'>
                                <CDropdown.Value text='选项1' value={11111} />
                                <CDropdown.Value text='选项2' value={222222} />
                            </CDropdown>
                        </GroupStyle>
                        <GroupStyle left='加Switch small' leftClass={this.state?.schk?' bg-primary text-white':''} size='sm'>
                            <GroupStyle.Content>
                                <Switch size='sm' field='test-switch' checked={this.state?.schk} theme={Theme.success} onChange={(chk)=>{
                                    this.setState({
                                        schk: chk
                                    })
                                }}/>
                            </GroupStyle.Content>
                        </GroupStyle>
                        <GroupStyle left='金额' right='元' leftClass='bg-white'>
                            <Input width='150px' field='test-price' align='right' type='number' disableClear placeholder='左右组合'/>
                        </GroupStyle>
                        <GroupStyle className='me-2' left='测试组'>
                            <Input width='200px' field='test-input' placeholder='宽度定义200px'/>
                        </GroupStyle>
                        <GroupStyle left='加Check' leftClass={this.state?.checked?'bg-success text-white':''}>
                            <GroupStyle.Content>
                                <CCheckbox field='test-check' theme={Theme.success} checked={this.state?.checked} onChange={(check)=>{
                                    this.setState({
                                        checked: check
                                    })
                                }}/>
                            </GroupStyle.Content>
                        </GroupStyle>
                        <GroupStyle left='复杂组件'>
                            <Complex placeholder="输入添加项" field='test-complex' onChange={(val,list)=>{
                                console.log(val,list);
                            }}/>
                        </GroupStyle>
                        <GroupStyle left={<Button>按钮</Button>} right='元'>
                            <Input width='150px' field='test-price' align='right' type='number' disableClear placeholder='按钮组合'/>
                        </GroupStyle>
                    </div>
                    </Form>
                </Card>
                <Card header='SVG 测试'>
                    <div id='svg_con'></div>
                </Card>
                <Card header='Card 测试'>
                    <div className="row">
                        <div className="col">
                            <Card header='默认' divider={false}>
                                asdfasdf
                            </Card>
                        </div>
                        <div className="col">
                            <Card header='text-dark bg-light' divider={false} className='text-dark bg-light'>
                                asdfasdf
                            </Card>
                        </div>
                        
                    </div>
                </Card>
                <Menu ref={c=>this.mainMenu=c} onClick={(key)=>{
                    console.log(key);
                }}>
                    <Menu.Item field="copy" onClick={()=>{
                        console.log(document.execCommand("copy"))
                    }}>Copy</Menu.Item>
                    <Menu.Item field="alerts" onClick={()=>{
                        this.alert.show('这是测试');
                    }}>Test Alerts</Menu.Item>
                    <Menu.Item field="alerts-load" onClick={()=>{
                        this.alert.loading('这是测试');
                    }}>Test Alerts loading</Menu.Item>
                    <Menu.Item field="alerts-load" onClick={()=>{
                        this.alert.show({content:'正常',theme:Theme.light});
                    }}>Test Alerts loading</Menu.Item>
                    <Menu.Item step/>
                    <Menu.Item field="asc">Asc</Menu.Item>
                    <Menu.Item field="desc" onClick={(key)=>{
                        console.log("custom key");
                    }}>Desc</Menu.Item>
                    <Menu.Item step/>
                    <Menu.Item field='select_filter' onClick={()=>{
                        let select = document.getSelection();
                        console.log(select.toString());
                    }}>Filter Selection</Menu.Item>
                    <Menu.Item field="filter">
                        <span className='me-1'>Filter</span>
                        <Input size='xs' onMouseDown={(e)=>{e.stopPropagation();}}/>
                    </Menu.Item>
                    <Menu.Item field="filter" text='More...' child>
                        <Menu.Item onClick={(e,field,data)=>{
                            console.log(field,data);
                        }}>Child Menu 1</Menu.Item>
                        <Menu.Item text='Child Menu 2' child>
                            <Menu.Item onClick={(e,field,data)=>{
                                console.log(field,data);
                            }}>Child Menu 1</Menu.Item>
                            <Menu.Item>Child Menu 2</Menu.Item>
                            <Menu.Item>Child Menu 3</Menu.Item>
                        </Menu.Item>
                        <Menu.Item>Child Menu 3</Menu.Item>
                    </Menu.Item>
                    <Menu.Item text='Child Menu 2' child>
                        <Menu.Item onClick={(e,field,data)=>{
                            console.log(field,data);
                        }}>Child Menu 1</Menu.Item>
                        <Menu.Item>Child Menu 2</Menu.Item>
                        <Menu.Item>Child Menu 3</Menu.Item>
                    </Menu.Item>
                </Menu>
                <Menu ref={c=>this.dicMenu=c}></Menu>
                <Alerts ref={c=>this.alert=c} />
            </Container>
        );
    }
}

export default Window;