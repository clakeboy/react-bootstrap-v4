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
    Form, CDropdown
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

    static getDerivedStateFromProps(props,state) {
        console.log('getDerivedStateFromProps',props,state)
        return null
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('componentDidUpdate',prevProps,prevState,this.props,this.state)
    }

    getClasses() {
        let base = 'bg-white p-2 rounded';

        return classNames(base,this.props.className);
    }

    changeHandler = (field,val,row)=>{
        console.log(field,val,row)
    }

    render() {
        return (
            <div className={this.getClasses()}>
                <Form ref={c=>this.form=c} onChange={this.changeHandler}>
                    <Container className='p-0 mb-1' inline fluid>
                        <Input field='username' className='me-1' disabled width='100' placeholder='用户名'/>
                        <Input field='password' className='me-1' placeholder='密码' type='password'/>
                        <div className='me-2'>日期:</div>
                        <Input field='date' className='me-1' placeholder='日期' calendar/>
                    </Container>
                    <div className='row'>
                        <Input className='col-6' label='Name' plaintext />
                        <Input field='name' className='col-6' label='Last Name' data='Lee'/>
                    </div>
                    <div className='row'>
                        <Select field='city1' className='col-6' label='City Object' data={this.dataList} defaultValue='3'/>
                        <Select field='city2' className='col-6' label='City Text' data={this.dataArrList} defaultValue='Dropdown Text2' summary='下载文本'/>
                    </div>
                    <div className='row'>
                        <Input field='birthday' className='col-6' label='Calendar' data='1518427253' calendar readOnly/>
                        <Input className='col-6' label='Calendar' data='Lee' calendar disabled/>
                    </div>
                    <TextArea field='text' label='Summary' summary='input some' rows={10}/>
                    <CCheckbox label='是否完成' field='is_done'/>
                </Form>
                <div>
                    <Button className='float-end' icon='plus' onClick={()=>{
                        this.modal.alert({
                            title:'试试',
                            content:'试试 Modal 内再调用 Modal',
                        })
                    }}>添加</Button>
                    <Button className='float-end' onClick={()=>{
                        console.log(this.form.getValues());
                        console.log(this.props);
                    }}>显示数据</Button>
                </div>
                <Card divider border={'info'} className='mt-2' header="优惠券添加">
                    <Form onChange={(field,val,row)=>{
                        console.log(field,val,row);
                        let data = this.state.data;
                        data[field] = val;
                        this.setState({
                            data:data
                        },()=>{
                            console.log(this.state.data);
                        })
                    }}>
                        <div className='row'>
                            <Input className='col-6' field='name' label='Name' plaintext data='Clake'/>
                            <Input className='col-6' field='name_s' label='Last Name' data='Lee' calendar/>
                        </div>
                        <div className='row'>
                            <CDropdown className='col-6' field='text_drop' label='Name' text='下拉选择'>
                                <CDropdown.Value text='选项1' value={11111} active/>
                                <CDropdown.Value text='选项2' value={222222} />
                            </CDropdown>
                            <CDropdown className='col-6' size='sm' field='text_drop' label='Name' text='下拉选择'>
                                <CDropdown.Value text='选项1' value={11111} />
                                <CDropdown.Value text='选项2' value={222222} active/>
                            </CDropdown>
                        </div>
                        <div className='row'>
                            <div className='col-2 form-group pt-2'><label>middle垂直居中</label></div>
                            <Input className='col-10' data='Lee'/>
                        </div>
                        <div className='row'>
                            <Input className='col-6' field='name' label='Name' plaintext data='Clake'/>
                            <Input field='birthday' className='col-6' label='Calendar' data='1518427253' calendar readOnly/>
                        </div>
                        <div className='row'>
                            <Input className='col-6' field='name' label='Name' plaintext data='Clake'/>
                            <Input field='birthday' className='col-6' label='Calendar' data='1518427253' calendar readOnly/>
                        </div>
                        <div className='row'>
                            <Input className='col-6' field='name' label='Name' plaintext data='Clake'/>
                            <Input className='col-6' field='name_s' label='Last Name' data='Lee'/>
                        </div>
                    </Form>
                </Card>
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