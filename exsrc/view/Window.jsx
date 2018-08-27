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
    Label
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
                <Card className='mt-2' header='Window Test'>
                    <Label text='Clake Lee'/>
                </Card>
                <Table absolute x='100px' y='300px' width='500px' height='300px' headerTheme='light' scroll hover={true} select={true} sm data={this.dataTable}>
                    <Table.Header width='100px' text='Name' field='name' onSort={(sort)=>{alert(sort)}}/>
                    <Table.Header width='100px' text='Age' field='age' hide/>
                    <Table.Header width='100px' text='Birthday' field='birthday'/>
                    <Table.Header width='100px' text='Address' field='address'/>
                    <Table.Header width='100px' text='Both' field='both'/>
                    <Table.Header width='100px' text='Test' field='test'/>
                    <Table.Header width='100px' text='Action' onFormat={row=>{
                        return <Button className='color-blue' size='xs' icon='plus'>Add</Button>
                    }} />
                </Table>
            </Container>
        );
    }
}

export default Window;