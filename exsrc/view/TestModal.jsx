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
            data:[],
            count:0,
            currentPage:1
        };

        this.pageNumber = 30;
    }

    componentDidMount() {
        this.loadTask(1);
    }

    getClasses() {
        let base = '';

        return classNames(base,this.props.className);
    }

    loadTask(page) {
        this.modal.loading("加载中...");
        Fetch("/serv/task/query",{page:page,number:this.pageNumber},(res)=>{
            this.modal.close();
            if (res.status) {
                this.setState({
                    data:res.data.list,
                    currentPage:page,
                    count:res.data.count
                });
            } else {
                this.modal.alert(res.msg);
            }
        });
    }

    render() {
        return (
            <Container>
                <Button onClick={()=>{
                    this.props.history.goBack();
                }}>返回主页</Button>
                <Card header='测试加载'>
                    <Table hover={true} select={true} headerTheme='light' data={this.state.data}>
                        <Table.Header text='任务ID' field='id'/>
                        <Table.Header text='任务名称' field='task_name'/>
                        <Table.Header text='时间规则' field='time_rule'/>
                        <Table.Header text='执行一次' field='once' onFormat={val=>{
                            return val? <span className="badge badge-success">是</span>:'否';
                        }}/>
                        <Table.Header text='通知次数' field='notify_number'/>
                        <Table.Header text='已通知次数' field='notified_number'/>
                        <Table.Header text='创建时间' field='created_date' onFormat={value=>{
                            return moment.unix(value).format("YYYY-MM-DD hh:mm:ss");
                        }}/>
                        <Table.Header text='操作' align='center' onFormat={()=>{
                            return <ButtonGroup>
                                <Button size='sm' icon='edit' theme='success'>修改</Button>
                                <Button size='sm' icon='trash-alt' theme='danger'>册除</Button>
                            </ButtonGroup>
                        }} />
                    </Table>
                    <Pagination count={this.state.count} current={this.state.currentPage}
                                number={this.pageNumber} showPage={10}
                                onSelect={page=>this.loadTask(page)}/>
                </Card>

                <Modal ref={c=>this.modal=c}/>
            </Container>
        );
    }
}

TestModal.propTypes = {

};

TestModal.defaultProps = {

};

export default TestModal;