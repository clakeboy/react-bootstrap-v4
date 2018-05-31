import React from 'react';
import PropTypes from 'prop-types';
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
} from '../../src/index';

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            testChecked: false,
            pageData:{},
            chose_date:'2018-8-3',
        };

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

        this.dataTable = [];
        for (let i=0;i<10;i++) {
            this.dataTable.push({
                'name':'name-'+(i+1),
                'age':'age-'+(i+1),
                'birthday':'birthday-'+(i+1),
                'address':'address-'+(i+1),
                'both':'both-'+(i+1),
                'test':'test-'+(i+1),
            })
        }
    }

    componentDidMount() {
        console.log(this.props.history)
    }

    changeHandler(name){
        return (val)=>{
            let data = this.state.pageData;
            data[name] = val;
            this.setState({
                data:data
            })
        };
    }

    render() {
        return (
            <Container>
                <h1>React Bootstrap v4 Demo</h1>
                <Button onClick={e=>{
                    this.props.history.push('/skill/jump',this.state);
                }}>转到内联</Button>
                <Button onClick={e=>{
                    this.props.history.push('/coupon',this.state);
                }}>转到输入</Button>
                <Container className='p-0 mb-1' inline fluid>
                    <Input className='mr-1' disabled placeholder='用户名' onChange={this.changeHandler('user_name')} data={this.state.pageData.user_name}/>
                    <Input className='mr-1' placeholder='密码' type='password'/>
                    <InputGroup className='mr-1' ref={c=>this.ing=c} width={200} label="测试" data="11111"/>
                    <Dropdown className='mr-1' text='JSON数组' data={this.dataList}/>
                    <Dropdown className='mr-1' text='普通数组' data={this.dataArrList}/>
                    <Button>搜索</Button>
                </Container>
                <Card className='mb-2' header='User Info'>
                    <div className='form-row'>
                        <Input className='col-6' label='Name' plaintext data='Clake'/>
                        <Input className='col-6' label='Last Name' data='Lee'/>
                    </div>
                    <div className='form-row'>
                        <Select className='col-6' label='City Object' data={this.dataList} defaultValue='3'/>
                        <Select className='col-6' label='City Text' data={this.dataArrList} defaultValue='Dropdown Text2' summary='下载文本'/>
                    </div>
                    <div className='form-row'>
                        <Input className='col-6' label='Calendar Unix Timestamp' data='1518427253' calendarFormat='unix' calendar readOnly/>
                        <Input className='col-6' label='Calendar' data={this.state.pageData.chose_date} onChange={this.changeHandler('chose_date')} calendar readOnly/>
                    </div>
                    <TextArea label='Summary' summary='input something' data={this.state.pageData.text_area} rows={10}/>
                </Card>
                <Card className='bg-light mb-3' header='Small size'>
                    <Container className='p-0 mb-1' inline>
                        <InputGroup className='mr-1' ref={c=>this.ing=c} width={200} label="测试" size='sm' placeholder='测试数据填写' df="11111"/>
                        <Button className='mr-1' theme='dark' size='sm' icon='user' onClick={e=>console.log(this.ing.getValue())}>
                            点击
                        </Button>
                    </Container>
                    <Container inline>
                        <CCheckbox label='clake'/>
                    </Container>
                    <Container inline>
                        <Checkbox ref={c=>this.chk = c} className='mr-1' onChange={e=>{
                            this.setState({
                                testChecked:e.target.checked
                            })
                        }} checked={this.state.testChecked} label=''/>
                        <Button className='mr-1' size='sm' onClick={e=>{
                            this.setState({testChecked:!this.state.testChecked})
                        }}>
                            State 方式测试
                        </Button>
                        <Button className='mr-1' size='sm' onClick={e=>{
                            this.chk.setChecked(!this.chk.getChecked());
                        }}>
                            setValue 方式测试
                        </Button>
                    </Container>
                    <Input label='Email' placeholder='Please enter your email address' size='sm'/>
                </Card>
                <Card className='mb-2' header='Table'>
                    <Table hover={true} select={true} headerTheme='light' data={this.dataTable}>
                        <Table.Header text='Name' field='name' onSort={(sort)=>{alert(sort)}}/>
                        <Table.Header text='Age' field='age'/>
                        <Table.Header text='Birthday' field='birthday'/>
                        <Table.Header text='Address' field='address'/>
                        <Table.Header text='Both' field='both'/>
                        <Table.Header text='Test' field='test'/>
                        <Table.Header text='Action' onFormat={row=>{
                            return <Button className='color-blue' size='sm' icon='plus'>Add</Button>
                        }} />
                    </Table>
                    <Pagination count={1000} current={1} number={30} showPage={10}/>
                    <Table hover={true} select={true} sm data={this.dataTable}>
                        <Table.Header text='Name' field='name' onSort={(sort)=>{alert(sort)}}/>
                        <Table.Header text='Age' field='age'/>
                        <Table.Header text='Birthday' field='birthday'/>
                        <Table.Header text='Address' field='address'/>
                        <Table.Header text='Both' field='both'/>
                        <Table.Header text='Test' field='test'/>
                        <Table.Header text='Action' onFormat={row=>{
                            return <Button className='color-blue' size='sm' icon='plus'>Add</Button>
                        }} />
                    </Table>
                </Card>
                <Card header='Calendar'>
                    <Calendar value={this.state.chose_date} lang='en' shadow/>
                    <Calendar value={this.state.chose_date} onSelect={(value)=>{
                        this.setState({chose_date:value})
                    }} shadow/>
                </Card>
            </Container>
        );
    }
}

Main.contextTypes = {
    router: PropTypes.object
};

export default Main;