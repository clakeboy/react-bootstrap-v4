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
    Modal
} from '../../src/index';

class AddCoupon extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    getClasses() {
        let base = '';

        return classNames(base,this.props.className);
    }

    render() {
        return (
            <div className={this.getClasses()}>
                <Container className='p-0 mb-1' inline fluid>
                    <Input className='mr-1' disabled width='100' placeholder='用户名'/>
                    <Input className='mr-1' placeholder='密码' type='password'/>
                    <Input className='mr-1' placeholder='日期' calendar/>
                </Container>
                <div className='form-row'>
                    <Input className='col-6' label='Name' plaintext data='Clake'/>
                    <Input className='col-6' label='Last Name' data='Lee'/>
                </div>
                <div className='form-row'>
                    <Select className='col-6' label='City Object' data={this.dataList} defaultValue='3'/>
                    <Select className='col-6' label='City Text' data={this.dataArrList} defaultValue='Dropdown Text2' summary='下载文本'/>
                </div>
                <div className='form-row'>
                    <Input className='col-6' label='Calendar' data='1518427253' calendar readOnly/>
                    <Input className='col-6' label='Calendar' data='Lee' calendar disabled/>
                </div>
                <TextArea label='Summary' summary='input some' rows={10}/>
                <Button className='float-right' icon='plus' onClick={()=>{
                    this.modal.alert({
                        title:'试试',
                        content:'试试 Modal 内再调用 Modal',
                    })
                }}>添加</Button>
                <Modal ref={c=>this.modal=c} center/>
            </div>
        );
    }
}

AddCoupon.propTypes = {

};

AddCoupon.defaultProps = {

};

export default AddCoupon;