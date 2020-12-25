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
import Icon from "../../src/Icon";
import ComboBox from "../../src/ComboBox";

class TestModal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data       : [],
            count      : 0,
            currentPage: 1,
            comboSelect: {'id':[1,3,5]},
            child : [],
            inputData:{}
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

        this.pageNumber = 30;
    }

    componentDidMount() {
        this.loadTask(1);
        this.loadTree();
        this.selectCombo.setSelectRows('id',[1,3,4])
    }

    getClasses() {
        let base = '';

        return classNames(base, this.props.className);
    }

    loadTree() {
        let data = {
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
        };
        let list = [];
        for (let i=0;i<3;i++) {
            let clone = Object.assign({},data);
            clone.task_name += `_${i}`;
            clone.children = [];
            for (let k=0;k<3;k++) {
                let child = Object.assign({},data);
                child.task_name += `_${i}_${k}`;
                clone.children.push(child);
            }
            list.push(clone);
        }
        this.setState({treeData:list});
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
            count      : res.data.count,
            child:this.child,
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
        return (
            <Container className={'mb-5'}>
                <h1>React Bootstrap v4 Test Table Tree Modal</h1>
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
                <Card header='测试静态数据'>
                    <Table select={false} striped={false} height='500px' width='100%' tree headerTheme='light' data={this.state.treeData}>
                        <Table.Header text='任务ID' field='id' width='80px' beforeHold/>
                        <Table.Header text='任务名称' field='task_name' width='150px' beforeHold tree/>
                        <Table.Header text='时间规则' field='time_rule' width='150px'/>
                        <Table.Header text='执行一次' field='once' width='150px' onFormat={val => {
                            return val ? <span className="badge badge-success">是</span> : '否';
                        }}/>
                        <Table.Header text='通知次数' field='notify_number' width='150px'/>
                        <Table.Header text='已通知次数' field='notified_number' width='150px'/>
                        <Table.Header text='创建时间' field='created_date' width='250px' onFormat={value => {
                            return moment.unix(value).format("YYYY-MM-DD hh:mm:ss");
                        }}/>
                        <Table.Header text='操作' align='center' width='150px' onFormat={() => {
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
                <Tabs>
                    <TabsContent id='label1' text='标题1' active>
                        <div className="p-3 bg-white">

                        <Input label="测试远程数据 Combo" combo={{
                            searchColumn:'name',
                            filterColumns:[{field:'name',width:'100px'},'gender','age',{field:'company',width:'200px'}],
                            onSearch: (search,callback)=>{
                                Fetch('/serv/test/query',{name:search},(res)=>{
                                     if (res.status) {
                                         callback(res.data);
                                     } else {
                                         callback(null);
                                     }
                                },(e)=>{
                                    console.log(e);
                                    callback(null);
                                });
                            }
                        }} onChange={(val,row)=>{
                            console.log(val,row);
                        }}/>
                        <Input label="测试远程数据(模拟)" combo={{
                            searchColumn:'task_name',
                            filterColumns:[{field:'task_name',width:'100px'},'source','time_rule',{field:'notify_url',width:'200px'}],
                            onSearch: (search,callback)=>{
                                setTimeout(()=>{
                                    callback(this.state.child);
                                },1000)
                            }
                        }} onChange={(val,row)=>{
                            console.log(val,row);
                        }} data={this.state?.inputData?.task_name?.text}/>
                        <Button onClick={()=>{
                            let data = [{
                                "id"             : 3,
                                "task_name"      : "改变值1",
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
                                "task_name"      : "测试改变值",
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
                            }];
                            this.setState({
                                child:data
                            },()=>{
                                console.log(data);
                            });
                        }}>改变值</Button>
                        <Input label="测试本地数据 Combo (超小)" size={'xs'} combo={{
                            searchColumn:'task_name',
                            header:true,
                            showRows:5,
                            searchType:'include',
                            filterColumns:[
                                {field:'task_name',text:'任务名称'},
                                {field:'time_rule',text:'时间规则'},
                                {field:'notify_method',text:'任务名称'},
                                {field:'source',text:'任务名称'},
                                {field:'created_date',text:'创建时间',format:(val,row)=>{
                                    return new Date(val*1000).toLocaleString();
                                    }}
                            ],
                        }} comboData={this.state.child} onChange={(val,row)=>{
                            console.log(val,row);
                        }}/>
                        <Input className='col-3' label={<div><span style={{color: 'red'}}>* </span>机构</div>}
                               placeholder='请选择机构'
                               combo={{
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
                        }} comboData={this.state.child} onChange={(val, row) => {
                            console.log(val,row)
                        }}/>
                        <Input label="测试本地数据 Combo 只读(正常)" readOnly combo={{
                            searchColumn:'task_name',
                            // width:'100%',
                            header:true,
                            filterColumns:['task_name','time_rule','notify_method','source','created_date'],
                        }} comboData={this.state.child} onChange={(val,row)=>{
                            console.log(val,row);
                        }}/>
                        <Input label="测试本地数据 Combo 只读(小)" size='sm' readOnly combo={{
                            searchColumn:'task_name',
                            width:'100%',
                            multi:true,
                            filterColumns:['task_name','time_rule','notify_method','source','created_date'],
                        }} comboData={this.state.child} onChange={(val,row)=>{
                            console.log(val,row);
                        }}/>
                        <Input ref={c=>this.selectCombo=c} label="测试本地数据 Combo 只读(小) 多选 设置选中" size='sm' readOnly combo={{
                            searchColumn:'task_name',
                            width:'100%',
                            multi:true,
                            filterColumns:['task_name','time_rule','notify_method','source','created_date'],
                        }} comboData={this.state.child} onChange={(val,row)=>{
                            console.log(val,row);
                        }}/>
                        <Button onClick={(e)=>{
                            this.selectCombo.setSelectRows('id',[2,4,6])
                        }}>改变选中</Button>
                        </div>
                    </TabsContent>
                    <TabsContent id='label2' text='标题2'>
                        <div className="p-3 bg-white">
                            <ComboBox label="测试本地数据 Combo (超小)" size={'xs'}
                                      searchColumn='task_name'
                                      header
                                      showRows={10}
                                      data={this.state.child}
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
                        </div>
                    </TabsContent>
                </Tabs>
                <hr/>
                <Tabs onSelect={(tbid)=>{
                    console.log(tbid);
                }} sm>
                    <TabsContent id='smlabel1' text='Small-1'/>
                    <TabsContent id='smlabel2' text='Small-2' disabled/>
                    <TabsContent id='smlabel3' text={<span><Icon icon='external-link-alt'/> Small-Click</span>} onClick={(tabid)=>{
                        this.modal.alert(tabid);
                    }}/>
                    <TabsContent id='smlabel4' text='Small-4'/>
                </Tabs>
                <Tabs className='mb-1' border={false} onSelect={()=>{
                    this.setState({
                        currentPage:2
                    })
                }}>
                    <TabsContent id='all' text='全部任务'/>
                    <TabsContent id='loop' text='循环任务'/>
                    <TabsContent id='once' text='单次任务'/>
                </Tabs>
                <Modal ref={c => this.modal = c}/>
            </Container>
        );
    }
}

TestModal.propTypes = {};

TestModal.defaultProps = {};

export default TestModal;