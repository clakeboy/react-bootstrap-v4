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
    CCheckbox, Complex
} from '../../src/index';
import {Svg} from "../../src/components/Svg";
import GroupStyle from "../../src/GroupStyle";
import ComboBox from "../../src/ComboBox";
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
                    <Button className='mr-1' onClick={e=>{
                        this.props.history.replace('/',this.state);
                    }}>回到首页</Button>
                </Container>
                <Card className='mt-2 h-100 mb-2' header='Window Test'>
                    <Label text='Clake Lee'/>
                    <Button onClick={(e)=>{
                        this.mainMenu.show({evt:e,type:'dom-left',data:'',close:()=>{
                                console.log("close dom-left");
                            }});
                    }}>点击打开菜单</Button>
                    <div className="mt-2 form-inline comm-form">
                        <GroupStyle left='测试组'>
                            <Input placeholder='一般输入框'/>
                        </GroupStyle>
                        <GroupStyle left='测试组'>
                            <ComboBox searchColumn='task_name'
                                      placeholder='ComboBox'
                                      header
                                      showRows={10}
                                      data={taskData}
                                      onChange={(val,row)=>{
                                          console.log(val,row);
                                      }}
                            >
                                <ComboBox.Column field='task_name' text='任务名称'/>
                                <ComboBox.Column field='time_rule' text='时间规则'/>
                                <ComboBox.Column field='notify_method' text='通知方法'/>
                                <ComboBox.Column field='source' text='数据源'/>
                                <ComboBox.Column field='created_date' text='创建时间' format={(val,row)=>{
                                    return new Date(val*1000).toLocaleString();
                                }}/>
                            </ComboBox>
                        </GroupStyle>
                        <GroupStyle left='下拉'>
                            <CDropdown text='下拉选择'>
                                <CDropdown.Value text='选项1' value={11111} />
                                <CDropdown.Value text='选项2' value={222222} />
                            </CDropdown>
                        </GroupStyle>
                        <GroupStyle left='加Switch' right={<Switch/>} rightClass='bg-white'>

                        </GroupStyle>
                        <GroupStyle left='金额' right='元' leftClass='bg-white'>
                            <Input width='150px' align='right' type='number' disableClear placeholder='左右组合'/>
                        </GroupStyle>
                        <GroupStyle className='mr-2' left='测试组'>
                            <Input width='200px' placeholder='宽度定义200px'/>
                        </GroupStyle>
                        <GroupStyle left='加Check' right={<>
                            <CCheckbox/> <CCheckbox/>
                        </>} rightClass='bg-white'/>
                        <GroupStyle left='复杂组件'>
                            <Complex placeholder="输入添加项" onChange={(val,list)=>{
                                console.log(val,list);
                            }}/>
                        </GroupStyle>
                    </div>
                </Card>
                <Card header='SVG 测试'>
                    <div id='svg_con'></div>
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
                        <span className='mr-1'>Filter</span>
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
                <Alerts ref={c=>this.alert=c} />
            </Container>
        );
    }
}

export default Window;