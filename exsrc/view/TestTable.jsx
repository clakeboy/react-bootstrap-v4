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
                'is_paid':1,
                'test':'test-'+(i+1),
            })
        }
    }

    componentDidMount() {

    }

    getClasses() {
        let base = '';

        return classNames(base,this.props.className);
    }

    render() {
        return (
            <Container>
                <h1>React Bootstrap v4 Test Table Scroll</h1>
                <Button onClick={()=>{
                    this.props.history.goBack();
                }}>返回主页</Button>
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
            </Container>
        );
    }
}

TestTable.propTypes = {

};

TestTable.defaultProps = {

};

export default TestTable;