import React from 'react';
import PropTypes from 'prop-types';
import  {
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
    RadioGroup,
    Radio, Menu,  Theme
} from '../../src/index';
import CalendarRange from "../../src/CalendarRange";
import Row from '../../src/Row';

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            testChecked: false,
            pageData:{
                sss_date:'2018-8-3 17:00'
            },
            chose_date:'2018-8-3',
            dropdown:{
                drop1:'JSON数据',
                drop2:'普通数组',
            },
            radioDisabled:false,
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
                'is_paid':1,
                'test':'test-'+(i+1),
            })
        }
    }

    componentDidMount() {

    }

    changeHandler(name){
        return (val)=>{
            let data = this.state.pageData;
            data[name] = val;
            this.setState({
                pageData:data
            })
        };
    }

    render() {
        return (
            <Container>
                <h1>React Bootstrap v5 Demo</h1>
                <Container fluid className='mb-1 p-0'>
                    <Button theme={Theme.danger} outline className='me-1' onClick={e=>{
                        this.props.history.push('/skill/jump',this.state);
                    }} tip="转到内联">转到内联</Button>
                    <Button className='me-1' onClick={e=>{
                        this.props.history.push('/coupon',this.state);
                    }}>转到 Demo2</Button>
                    <Button className='me-1' onClick={e=>{
                        this.props.history.push('/test_modal',this.state);
                    }}>转到 Table Modal</Button>
                    <Button className='me-1' onClick={e=>{
                        this.props.history.push('/window',this.state);
                    }}>转到 Window</Button>
                    <Button className='me-1' onClick={e=>{
                        this.props.history.push('/test_table',this.state);
                    }}>转到 Table Scroll</Button>
                    <Button className='me-1' onClick={e=>{
                        this.props.history.push('/test_triangle',this.state);
                    }}>转到 Triangle</Button>
                    <Button className='me-1' onClick={e=>{
                        this.props.history.push('/test_edit',this.state);
                    }}>转到 HTML Edit &gt;</Button>
                    <Button className='me-1' onClick={e=>{
                        this.props.history.push('/mobile',this.state);
                    }}>转到移动端测试 &gt;</Button>
                </Container>
                <Container className='p-0 mb-1 comm-form' inline fluid>
                    <Input className='me-1' disabled size='sm' absolute x='50px' y='150px' width='100px' placeholder='用户名' onChange={this.changeHandler('user_name')} data={this.state.pageData.user_name}/>
                    <Input className='me-1' placeholder='密码' type='password'/>
                    <Input className='me-1' placeholder='日期' calendar/>
                    <InputGroup className='me-1' ref={c=>this.ing=c} width={200} label="测试" data="11111"/>
                    <Dropdown className='me-1' text={this.state.dropdown.drop1} data={this.dataList}/>
                    <Dropdown className='me-1' text={this.state.dropdown.drop2} data={this.dataArrList}/>
                    <Button onClick={()=>{
                        this.setState({
                            dropdown:{
                                drop1: 'JSON数据',
                                drop2: '普通数据'
                            }
                        })
                    }} loading>搜索</Button>
                </Container>
                <Container className='p-0 mb-1 comm-form' inline fluid>
                    <CalendarRange placeholderMin='开始时间' placeholderMax='结束时间' onChange={(min,max)=>{
                        console.log(min,max)
                    }}/>
                    <CalendarRange placeholderMin='开始时间' placeholderMax='结束时间' limit={{gt:'2024-7-15'}} onChange={(min,max)=>{
                        console.log(min,max)
                    }}/>
                </Container>
                <Card className='mb-2' header='User Info'>
                    <div className='row'>
                        <Input className='col-6' label='Name' plaintext underline data='Clake'/>
                        <Input className='col-6' label='Last Name' readOnly data={this.state.pageData.last_name} onChange={this.changeHandler('last_name')} validate={{rule:/.+/,text:'请填写用户名',tip:true}}/>
                    </div>
                    <div className='row'>
                        <Select className='col-6' label='City Object' data={this.dataList} defaultValue='3'/>
                        <Select className='col-6' label='City Text' onSelect={(e)=>{
                            console.log(e.target.value);
                            let data = this.state.pageData;
                            data['city'] = e.target.value;
                            this.setState({
                                pageData:data
                            })
                        }} data={this.dataArrList} value={this.state.pageData.city} defaultValue='Dropdown Text2' summary='下载文本'/>
                    </div>
                    <div className='row'>
                        <Input className='col-6' label='Calendar Unix Timestamp' data='1518427253' calendarFormat='unix' calendar disabled onDblClick={()=>{
                            alert('双击');
                        }}/>
                        <Input className='col-6' size='sm' label='Calendar' data={this.state.pageData.sss_date} onChange={this.changeHandler('sss_date')} calendar={{format:"YYYY-MM-DD HH:mm",time:true}} readOnly/>
                    </div>
                    <div className='row'>
                        <Input className='col-6' size='lg' label='Calendar' data={this.state.pageData.chose_date} onChange={this.changeHandler('chose_date')} calendar={{format:"MMM DD,YYYY"}} readOnly/>
                        <Input className='col-6' size='xs' label='Calendar' data={this.state.pageData.chose_date} onChange={this.changeHandler('chose_date')} calendar readOnly/>
                    </div>
                    <div className='row'>
                        <CalendarRange className='col-6' label='Calendar Range'/>
                    </div>
                    <TextArea label='Summary' htmlMode height='500px' data={this.state.pageData.text_area}/>

                    <TextArea label='Summary' height='500px' data={this.state.pageData.text_area}/>
                </Card>
                <Card header='absolute card small size' absolute sm x='0' y='0' width='100px' height='100px'>

                </Card>
                <Card className='bg-light mb-3' header='Small size'>
                    <Container className='p-0 mb-1' inline>
                        <InputGroup className='me-1' ref={c=>this.ing=c} disabled={this.state.testChecked} width={200} label="测试" size='sm' placeholder='测试数据填写' df="11111"/>
                        <Button className='me-1' theme='dark' size='sm' icon='user' onClick={e=>console.log(this.ing.getValue())}>
                            点击
                        </Button>
                    </Container>
                    <Container inline>
                        <CCheckbox label='clake' disabled className='me-2'/>
                        <CCheckbox label='clake' disabled checked className='me-2'/>
                    </Container>
                    <Container inline>
                        <Checkbox ref={c=>this.chk = c} className='me-1' onChange={e=>{
                            this.setState({
                                testChecked:!e.target.checked
                            })
                        }} checked={this.state.pageData.testChecked} label='ddd'/>
                        <CCheckbox label='clake' className='me-2'/>
                        <Button className='me-1' size='sm' onClick={e=>{
                            let data = this.state.pageData;
                            data['testChecked'] = !data['testChecked'];
                            this.setState({pageData:data})
                        }}>
                            State 方式测试
                        </Button>
                        <Button className='me-1' size='sm' onClick={e=>{
                            this.chk.setChecked(!this.chk.getChecked());
                        }}>
                            setValue 方式测试
                        </Button>
                    </Container>
                    <Input label='Email' disabled={this.state.testChecked} placeholder='Please enter your email address' size='sm'/>
                    <Button className='me-1' size='sm' onClick={e=>{
                        this.setState({
                            radioDisabled:!this.state.radioDisabled
                        });
                    }}>
                        禁用 Radio
                    </Button>
                    <RadioGroup onChange={(val)=>{
                        console.log(val);
                    }} data='2' disabled={this.state.radioDisabled}>
                        <Radio label='Check1' className='me-2' name='ccc' data='1'/>
                        <Radio label='Check2' className='me-2' name='ccc' data='2'/>
                        <Radio label='Check3' className='me-2' name='ccc' data='3'/>
                    </RadioGroup>
                </Card>
                <Card className='mb-2' header='Table'>
                    <Button onClick={()=>{
                        console.log(this.mainTable.getSelectRows());
                    }}>得到选中数据</Button>
                    <Table ref={c=>this.mainTable = c} onRefresh={()=>{}} refreshText='刷新列表' hover={true} select={true} headerTheme={Theme.light} data={this.dataTable}>
                        <Table.Header text='Name' field='name' onSort={(field,sort)=>{
                            alert(field+'-'+sort);

                        }}/>
                        <Table.Header text='Age' field='age' align='center'/>
                        <Table.Header text='Birthday' field='birthday'/>
                        <Table.Header text='Address' field='address' hide/>
                        <Table.Header text='Both' field='both'/>
                        <Table.Header text='Test' field='test'/>
                        <Table.Header text='Paid' field='is_paid' onFormat={row=>{
                            return <Switch size='sm'/>
                        }}/>
                        <Table.Header text='Action' align='center' onFormat={row=>{
                            return <Button className='color-blue' size='sm' icon='plus'>Add</Button>
                        }} />
                        <Menu>
                            <Menu.Item field="copy" icon='copy' onClick={()=>{
                                document.execCommand("copy");
                            }}>复制</Menu.Item>
                            <Menu.Item step/>
                            <Menu.Item field='custom' icon='trash-alt' onClick={(e,field,data)=>{
                                console.log(field,data)
                            }}>自定义的菜单</Menu.Item>
                        </Menu>
                    </Table>
                    <Pagination count={1000} info={"这里${count}显示数量，这里${page}显示页数"} current={1} number={100} showPage={10} numberList={[
                        {text:'每页显示30条',value:30},{text:'每页显示50条',value:50}
                    ]} onSelect={(page,showNumber)=>{
                        console.log('select',page,showNumber)
                        console.log(page.target)
                    }}/>
                    <Table hover={true} select={true} headerTheme={Theme.light}>
                        <Table.Header text='Name' field='name' onSort={(field,sort)=>{
                            alert(field+'-'+sort);

                        }}/>
                        <Table.Header text='Age' field='age' align='center'/>
                        <Table.Header text='Birthday' field='birthday'/>
                        <Table.Header text='Address' field='address' hide/>
                        <Table.Header text='Both' field='both'/>
                        <Table.Header text='Test' field='test'/>
                        <Table.Header text='Paid' field='is_paid' onFormat={row=>{
                            return <Switch size='sm'/>
                        }}/>
                        <Table.Header text='Action' align='center' onFormat={row=>{
                            return <Button className='color-blue' size='sm' icon='plus'>Add</Button>
                        }} />
                    </Table>
                    <Table hover={true} select={true} sm data={this.dataTable} fontSm width='100%'>
                        <Table.Header text='Name' field='name' width='100px' onSort={(field,sort)=>{alert(sort)}} sort='asc'/>
                        <Table.Header text='Age' field='age' width='150px' hide/>
                        <Table.Header text='Birthday' field='birthday' width='150px'/>
                        <Table.Header text='Address' field='address' width='150px'/>
                        <Table.Header text='Both' field='both' width='300px'/>
                        <Table.Header text='Test' field='test' width='400px'/>
                        <Table.Header text='Action' width='100px' onFormat={row=>{
                            return <Button className='color-blue' size='xs' icon='plus'>Add</Button>
                        }} />
                    </Table>
                    <Pagination size='sm' numberList={[
                        {text:'每页显示30条',value:30},{text:'每页显示50条',value:50}
                    ]} count={1000} current={1} number={50} showPage={10} onSelect={(page,showNumber)=>{
                        console.log('select',page,showNumber)
                        console.log(page.currentTarget)
                    }}/>
                </Card>
                <Card header='Calendar'>
                    <div className='d-flex'>
                        <div>
                            <div className='mb-1'>英文和时间</div>
                            <Calendar value={this.state.chose_date} lang='en' timeBar/>
                        </div>
                        <div>
                            <div className='mb-1'>2023-6-1 {'=>'} 2023-8-21</div>
                            <Calendar onSelect={(value)=>{
                                this.setState({chose_date:value})
                            }} limit={{lt:'2023-8-21',gt:'2023-6-1'}}/>
                        </div>
                        <div>
                            <div className='mb-1'>小于 2023-6-1 可选</div>
                            <Calendar size='lg' onSelect={(value)=>{
                                this.setState({chose_date:value})
                            }} limit={{lt:'2023-6-1'}}/>
                        </div>
                        <div>
                            <div className='mb-1'>大于 2023-7-1 可选</div>
                            <Calendar onSelect={(value)=>{
                                this.setState({chose_date:value})
                            }} limit={{gt:'2023-7-1'}} timeBar/>
                        </div>
                    </div>
                </Card>
                <Row>
                    Row 测试
                </Row>
            </Container>
        );
    }
}

Main.contextTypes = {
    router: PropTypes.object
};

export default Main;