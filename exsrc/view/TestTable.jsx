/**
 * Created by clakeboy on 2019-07-29.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import {
    Button,
    ButtonGroup,
    Card,
    CKModal,
    Container,
    Input,
    Load,
    Table,
    Tabs,
    TabsContent,
    Title,
    Tree
} from "../../src";
import Form from "../../src/Form";
import CDropdown from "../../src/CDropdown";
import Loader from "../components/Loader";
import {GetComponent} from "../common/Funcs";

class TestTable extends React.PureComponent {
    constructor(props) {
        super(props);

        this.dataTable = [];
        for (let i=0;i<100;i++) {
            this.dataTable.push({
                'name':'name-'+(i+1),
                'age':'age-'+(i+1),
                'birthday':'birthday-'+(i+1),
                'address':'address-'+(i+1),
                'both':'both-'+(i+1),
                'is_edit':false,
                'test':'test-'+(i+1),
            })
        }
        this.editTable = [];
        for (let i=0;i<10;i++) {
            this.editTable.push({
                'name':(i+1),
                'age':(i+1),
                'test1':'test1-'+(i),
                'test2':'test2-'+(i),
                'birthday':(i+1),
                'address':(i+1),
                'both':'both-'+(i+1),
                'is_edit':false,
                'test':(i+1),
            })
        }

        this.state = {
            editData: []
        };

        this.editRows = [];
    }

    componentDidMount() {
        this.setState({
            editData:this.editTable.slice()
        })
    }

    getClasses() {
        let base = '';

        return classNames(base,this.props.className);
    }

    editTableData(idx) {
        return ()=>{
            let data = this.state.editData.slice();
            data[idx].is_edit = true;
            this.editRows[idx] = data[idx];
            this.setState({
                editData:data
            })
        }
    }

    saveTableData(idx) {
        return ()=>{
            let data = this.state.editData.slice();
            data[idx] = this.editRows[idx];
            data[idx].is_edit = false;
            this.setState({
                editData:data
            })
        }
    }

    changeTableData(idx,field) {
        return (e)=>{
            let data = this.state.editData.slice();
            this.editRows[idx][field] = e.target.value;
            data[idx].name += parseInt(e.target.value);
            this.setState({
                editData: data
            })
        };
    }

    render() {
        return (
            <div>
                <h1>React Bootstrap v4 Test Table Scroll</h1>
                <Button onClick={()=>{
                    this.props.history.goBack();
                }}>返回主页</Button>
                <h3>测试编辑</h3>
                <Card className='mt-2' header='测试 Table Scroll'>
                    <Table hover={true} select={true} data={this.state.editData} headerTheme='light' width='100%'>
                        <Table.HeaderRow>
                            <Table.Header text='User' cols={2} align='center'/>
                            <Table.Header text='Content' cols={4} align='center'/>
                        </Table.HeaderRow>
                        <Table.HeaderRow>
                            <Table.Header text='User' cols={2} align='center'/>
                            <Table.Header text='Content' cols={2} align='center'/>
                            <Table.Header text='Content' cols={2} align='center'/>
                        </Table.HeaderRow>
                        <Table.Header text='Name' field='name' width='100px' beforeHold onSort={(sort)=>{alert(sort)}}/>
                        <Table.Header text='Age' field='age' width='100px' beforeHold/>
                        <Table.Header text='Test1' field='test1' width='250px' />
                        <Table.Header text='Test2' field='test2' width='250px' />
                        <Table.Header text='Birthday' field='birthday' width='150px' onFormat={(val,row,idx)=>{
                            if (!row.is_edit) {
                                return val
                            }
                            return <input className='w-75' type="number" defaultValue={val} onChange={this.changeTableData(idx,'birthday')}/>
                        }}/>
                        <Table.Header text='Address' field='address' width='150px' onFormat={(val,row,idx)=>{
                            if (!row.is_edit) {
                                return val
                            }
                            return <input className='w-75' type="number" defaultValue={val} onChange={this.changeTableData(idx,'address')}/>
                        }}/>
                        <Table.Header text='Test' field='test' width='200px' onFormat={(val,row,idx)=>{
                            if (!row.is_edit) {
                                return val
                            }
                            return <input className='w-75' type="number" defaultValue={val} onChange={this.changeTableData(idx,'test')}/>
                        }}/>
                        <Table.Header text='Edit' field='is_edit' width='80px' afterHold onFormat={(val)=>{
                            return val.toString();
                        }}/>
                        <Table.Header text='Action' width='100px' afterHold onFormat={(val,row,index)=>{
                            if (row.is_edit) {
                                return <Button theme='success' size='sm' icon='save' onClick={this.saveTableData(index)}>Save</Button>
                            }
                            return <Button size='sm' icon='edit' onClick={this.editTableData(index)}>Edit</Button>
                        }} />
                    </Table>
                </Card>
                <div style={{
                    width:'100%',
                    height:'500px',
                    overflow:'auto',
                    position:'relative',
                }}>
                    <Card className='mt-2' header='测试 Table Scroll'>
                        <Table hover={true} select={true} sm data={this.dataTable} fontSm width='100%'>
                            <Table.Header text='Name' field='name' width='100px' onSort={(sort)=>{alert(sort)}}/>
                            <Table.Header text='Age' field='age' width='250px' hide/>
                            <Table.Header text='Birthday' field='birthday' width='350px'/>
                            <Table.Header text='Address' field='address' width='350px'/>
                            <Table.Header text='Both' field='both' width='1300px'/>
                            <Table.Header text='Test' field='test' width='400px'/>
                            <Table.Header text='Action' width='100px' onFormat={row=>{
                                return <Button className='color-blue' size='xs' icon='plus'>Add</Button>
                            }} />
                        </Table>
                    </Card>
                </div>
                <Card className='mt-2' header='测试 Table Scroll'>
                    <Table hover={true} select={true} sm data={this.dataTable} fontSm width='100%'>
                        <Table.Header text='Name' field='name' width='100px' onSort={(sort)=>{alert(sort)}}/>
                        <Table.Header text='Age' field='age' width='250px' hide/>
                        <Table.Header text='Birthday' field='birthday' width='350px'/>
                        <Table.Header text='Address' field='address' width='350px'/>
                        <Table.Header text='Both' field='both' width='300px'/>
                        <Table.Header text='Test' field='test' width='400px'/>
                        <Table.Header text='Action' width='100px' onFormat={row=>{
                            return <Button className='color-blue' size='xs' icon='plus'>Add</Button>
                        }} />
                    </Table>
                </Card>
            </div>
        );
    }
}

TestTable.propTypes = {

};

TestTable.defaultProps = {

};

export default TestTable;