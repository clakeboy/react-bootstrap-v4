/**
 * Created by clakeboy on 2018/7/2.
 */
import React from 'react';
import classNames from 'classnames/bind';
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
    Load
} from '../../src/index';
import Fetch from "../common/Fetch";

class TestModal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data       : [],
            count      : 0,
            currentPage: 1
        };

        this.pageNumber = 30;
    }

    componentDidMount() {
        this.loadTask(1);
    }

    getClasses() {
        let base = '';

        return classNames(base, this.props.className);
    }


    loadTask(page) {
        let res = {
            "data"  : {
                "list"     : [{
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
                }], "count": 3
            }, "msg": "ok", "status": true
        };

        this.setState({
            data       : res.data.list,
            currentPage: page,
            count      : res.data.count
        });
    }

    loadChild(row,callback) {
        this.modal.loading('加载中...');
        setTimeout(()=>{
            this.modal.close();
            let child = [{
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
            callback(child);
        },1000)
    }

    render() {
        let child = [{
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
        return (
            <Container className={'mb-5'}>
                <Button onClick={() => {
                    this.props.history.goBack();
                }}>返回主页</Button>
                <Card header='测试加载'>
                    <Table striped={false} tree headerTheme='light' data={this.state.data} onClickTree={(row,callback)=>{
                        this.loadChild(row,callback);
                    }}>
                        <Table.Header text='任务ID' field='id'/>
                        <Table.Header text='任务名称' field='task_name' tree/>
                        <Table.Header text='时间规则' field='time_rule'/>
                        <Table.Header text='执行一次' field='once' onFormat={val => {
                            return val ? <span className="badge badge-success">是</span> : '否';
                        }}/>
                        <Table.Header text='通知次数' field='notify_number'/>
                        <Table.Header text='已通知次数' field='notified_number'/>
                        <Table.Header text='创建时间' field='created_date' onFormat={value => {
                            return moment.unix(value).format("YYYY-MM-DD hh:mm:ss");
                        }}/>
                        <Table.Header text='操作' align='center' onFormat={() => {
                            return <ButtonGroup>
                                <Button size='sm' icon='edit' theme='success'>修改</Button>
                                <Button size='sm' icon='trash-alt' theme='danger'>册除</Button>
                            </ButtonGroup>
                        }}/>
                    </Table>
                    <Pagination className='mt-2' count={this.state.count} current={this.state.currentPage}
                                number={this.pageNumber} showPage={10}
                                onSelect={page => this.loadTask(page)}/>
                </Card>
                <Title className='mb-2'>
                    Tabs 组件 不使用内容
                </Title>
                <Tabs border={false}>
                    <TabsContent id='label1' text='标题1' active>
                        <Input label="测试远程数据 Combo" combo={{
                            searchColumn:'name',
                            filterColumns:['name','gender','age','company'],
                            onSearch: (search,callback)=>{
                                Fetch('/serv/test/query',{name:search},(res)=>{
                                     if (res.status) {
                                         callback(res.data);
                                     } else {
                                         callback(null);
                                     }
                                });
                            }
                        }} onChange={(val,row)=>{
                            console.log(val,row);
                        }}/>
                        <Input label="测试本地数据 Combo" combo={{
                            searchColumn:'task_name'
                        }} comboData={child} onChange={(val,row)=>{
                            console.log(val,row);
                        }}/>
                    </TabsContent>
                    <TabsContent id='label2' text='标题2'>

                    </TabsContent>
                </Tabs>
                <hr/>
                <Tabs border={false} sm>
                    <TabsContent id='smlabel1' text='Small-1' active/>
                    <TabsContent id='smlabel2' text='Small-2'/>
                </Tabs>

                <Modal ref={c => this.modal = c}/>
            </Container>
        );
    }
}

TestModal.propTypes = {};

TestModal.defaultProps = {};

export default TestModal;