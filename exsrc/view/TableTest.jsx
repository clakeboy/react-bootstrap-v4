/**
 * Created by clakeboy on 2018/8/16.
 */
import React from 'react';
import {
    Container,
    Table,
    Button,
    Card,
    Pagination,
    ButtonGroup,
    Theme
} from '../../src/index';

class Window extends React.Component {
    constructor(props) {
        super(props);

        this.dataTable = [];
        for (let i=0;i<100;i++) {
            let idx = i+1;
            this.dataTable.push({
                "id": idx,
                "task_name_eng": "Test task_"+idx,
                "task_name": "测试任务"+idx,
                "time_rule": "0 * * * * *",
                "once": true,
                "is_execute": true,
                "disable": false,
                "notify_url": "http://localhost:9803",
                "notify_method": "GET",
                "notify_data": "asdfasdf",
                "notify_number": 7,
                "notified_number": 12,
                "source": "",
                "created_date": 1530767866
            })
        }
        this.pageNumber = 30
        this.state = {
            data:this.getData(1),
            count:this.dataTable.length,
            currentPage:1,
        }
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {
    }

    loadTask(page) {
        this.setState({
            data:this.getData(page),
            currentPage:page
        })
    }

    getData(page) {
        return this.dataTable.slice((page-1)*this.pageNumber,page*this.pageNumber)
    }

    render() {
        return (
            <Container>
                <h1>Table Demo</h1>
                <Container fluid className='mb-1 p-0'>
                    <Button className='me-1' onClick={e=>{
                        this.props.history.replace('/',this.state);
                    }}>回到首页</Button>
                </Container>
                <div style={{
                        height: '100%',
                        overflow: 'auto',
                    }}>
                <Card>
                    
                        <Table striped={true} sticky headerTheme={Theme.primary} width='100%' move bordered sm data={this.state.data}>
                            <Table.Header text='任务ID' field='id' width='60px'/>
                            <Table.Header text='任务名称' field='task_name' width='100px'/>
                            <Table.Header text='时间规则' field='time_rule' width='200px'/>
                            <Table.Header text='执行一次' field='once' onFormat={val => {
                                return val ? <span className="badge bg-success">是</span> : '否';
                                // return val
                            }} width='200px'/>
                            <Table.Header text='通知次数' field='notify_number' width='200px'/>
                            <Table.Header text='已通知次数' field='notified_number' width='200px'/>
                            <Table.Header text='创建时间' field='created_date' onFormat={value => {
                                return moment.unix(value).format("YYYY-MM-DD hh:mm:ss");
                            }} width='200px'/>
                            <Table.Header text='操作' align='center' width='200px' afterHold onFormat={() => {
                                return <ButtonGroup>
                                    <Button size='sm' icon='edit' theme={Theme.success}>修改</Button>
                                    <Button size='sm' icon='trash-alt' theme={Theme.danger}>册除</Button>
                                </ButtonGroup>
                            }}/>
                        </Table>
                        <Pagination className='mt-2' count={this.state.count} current={this.state.currentPage}
                            number={this.pageNumber} showPage={10}
                            onSelect={(page)=>{
                                this.loadTask(parseInt(page))
                            }}/>
                </Card>
                </div>
            </Container>
        );
    }
}

export default Window;