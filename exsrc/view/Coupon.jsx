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
    Modal
} from '../../src/index';
import Loader from '../components/LoaderComponent';

class Coupon extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <Container>
                <Card header="优惠券添加">
                    <div className='form-row'>
                        <Input className='col-6' label='Name' plaintext data='Clake'/>
                        <Input className='col-6' label='Last Name' data='Lee'/>
                    </div>
                    <div className='form-row'>
                        <div className='col-3 p-1 text-center'><h5 className=''>middle垂直居中</h5></div>
                        <Input className='col-9' data='Lee'/>
                    </div>
                </Card>
                <Card header="模态窗口">
                    <Button className='mr-4' onClick={e=>this.modal.alert({
                        title:'测试',
                        content:'测试一下效果'
                    })}>测试 alert 警告 Modal</Button>
                    <Button className='mr-4' theme='success' onClick={e=>this.modal.confirm({
                        content:'确定要按下这个按钮?',
                        callback:(flag)=>{
                            console.log(flag);
                        },
                    })}>测试 confirm 警告 Modal</Button>
                    <Button className='mr-4' theme='secondary' onClick={e=>{
                        this.modal.loading('加载中....是的...正在加载...');
                        setTimeout(()=>{
                            this.modal.close();
                        },1000);
                    }}>测试 confirm 警告 Modal</Button>
                    <Button theme='info' onClick={e=>this.modal.view({
                        title:'添加优惠券',
                        content:<Loader loadPath='/AddCoupon' modal/>,
                        callback:(args)=>{

                        },
                    })}>测试 confirm 警告 Modal</Button>
                </Card>
                <Modal ref={c=>this.modal=c}/>
            </Container>
        );
    }
}

Coupon.propTypes = {

};

Coupon.defaultProps = {

};

export default Coupon;