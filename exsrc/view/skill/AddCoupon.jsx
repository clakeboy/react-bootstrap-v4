/**
 * Created by clakeboy on 2018/5/25.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import {
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
    CKModal,
    Form
} from '../../../src/index';

class AddCoupon extends React.PureComponent {
    constructor(props) {
        super(props);
        this.dataList = [
            {text:'Dropdown Item 1',value:'1'},
            {text:'Dropdown Item 2',value:'2'},
            {text:'Dropdown Item 3',value:'3'}
        ];

        this.dataArrList = [
            'Dropdown Text1',
            'Dropdown Text2',
            'Dropdown Text3',
        ];
    }

    componentDidMount() {
        // this.form.setValues({
        //     'username':'Clake',
        //     'password':'123123',
        //     'date':'1984-03-10',
        // });
    }

    getClasses() {
        let base = '';

        return classNames(base,this.props.className);
    }

    render() {
        return (
            <div className={this.getClasses()}>
                <Form ref={c=>this.form=c}>
                    <Container className='p-0 mb-1' inline fluid>
                        <Input field='username' className='mr-1' disabled width='100' placeholder='用户名'/>
                        <Input field='password' className='mr-1' placeholder='密码' type='password'/>
                        <div className='mr-2'>日期:</div>
                        <Input field='date' className='mr-1' placeholder='日期' calendar/>
                    </Container>
                    <div className='form-row'>
                        <Input className='col-6' label='Name' plaintext />
                        <Input field='name' className='col-6' label='Last Name' data='Lee'/>
                    </div>
                    <div className='form-row'>
                        <Select field='city1' className='col-6' label='City Object' data={this.dataList} defaultValue='3'/>
                        <Select field='city2' className='col-6' label='City Text' data={this.dataArrList} defaultValue='Dropdown Text2' summary='下载文本'/>
                    </div>
                    <div className='form-row'>
                        <Input field='birthday' className='col-6' label='Calendar' data='1518427253' calendar readOnly/>
                        <Input className='col-6' label='Calendar' data='Lee' calendar disabled/>
                    </div>
                    <TextArea field='text' label='Summary' summary='input some' rows={10}/>
                    <Checkbox label='是否完成' field='is_done'/>
                    <Button className='float-right' icon='plus' onClick={()=>{
                        this.modal.alert({
                            title:'试试',
                            content:'试试 Modal 内再调用 Modal',
                        })
                    }}>添加</Button>
                    <Button className='float-right' onClick={()=>{
                        console.log(this.form.getValues());
                    }}>显示数据</Button>
                </Form>
                <CKModal ref={c=>this.modal=c} center/>
            </div>
        );
    }
}

AddCoupon.propTypes = {

};

AddCoupon.defaultProps = {

};

export default AddCoupon;