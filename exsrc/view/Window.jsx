/**
 * Created by clakeboy on 2018/8/16.
 */
import React from 'react';
import ReactBootstrap4,{
    Container,
    Input,
    InputGroup,
    Button,
    Card,
    CCheckbox,
    Checkbox,
    Table,
    Pagination,
    Dropdown,
    Select,
    Calendar,
    TextArea,
    Switch,
    Label,
    Menu
} from '../../src/index';

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
                <Card className='mt-2 h-100' header='Window Test'>
                    <Label text='Clake Lee'/>
                    <Button onClick={(e)=>{
                        this.mainMenu.show({evt:e,type:'dom-left',data:'',close:()=>{
                                console.log("close dom-left");
                            }});
                    }}>点击打开菜单</Button>
                </Card>
                <Menu ref={c=>this.mainMenu=c} onClick={(key)=>{
                    console.log(key);
                }}>
                    <Menu.Item field="copy" onClick={()=>{
                        console.log(document.execCommand("copy"))
                    }}>Copy</Menu.Item>
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
            </Container>
        );
    }
}

export default Window;