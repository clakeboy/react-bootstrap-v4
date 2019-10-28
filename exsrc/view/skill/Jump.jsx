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
    Switch,
    RImage,
    Modal
} from '../../../src/index';

class Jump extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            checked: false
        };
    }

    componentDidMount() {
        console.log(this.props.history)
    }

    getClasses() {
        let base = '';

        return classNames(base, this.props.className);
    }

    render() {
        return (
            <Container>
                <Button onClick={e => {
                    this.props.history.goBack();
                }}>返回上页</Button>

                <Card>
                    <Container className='p-0 mb-1' inline fluid>
                        <Input className='mr-1' disabled placeholder='用户名'/>
                        <Switch className='mr-1' theme='success' size='lg' checked={this.state.checked} onChange={(checked) => {
                            this.setState({
                                checked: checked
                            }, () => {
                                console.log(this.state.checked);
                            })
                        }}/>
                        <Switch disabled className='mr-1' theme='success' size='lg' checked={this.state.checked} onChange={(checked) => {
                            this.setState({
                                checked: checked
                            }, () => {
                                console.log(this.state.checked);
                            })
                        }}/>
                    </Container>
                    <Container className='p-0 mb-1' inline fluid>
                        <Input className='mr-1' disabled placeholder='用户名'/>
                        <Switch className='mr-1' theme='dark' checked={this.state.checked} onChange={(checked) => {
                            this.setState({
                                checked: checked
                            }, () => {
                                console.log(this.state.checked);
                            })
                        }}/>
                        <Switch disabled theme='dark' checked={this.state.checked} onChange={(checked) => {
                            this.setState({
                                checked: checked
                            }, () => {
                                console.log(this.state.checked);
                            })
                        }}/>
                    </Container>
                    <Container className='p-0 mb-1' inline fluid>
                        <Input className='mr-1' size='sm' disabled placeholder='用户名'/>
                        <Switch className='mr-1' ref={c=>this.switch=c} size='sm' theme='warning'/>
                        <Switch disabled ref={c=>this.switch=c} size='sm' theme='warning'/>
                    </Container>
                    {this.state.checked ? <div>是</div> : <div>否</div>}
                    <Button disabled>禁用</Button>
                    <Modal ref={c=>this.modal=c}/>
                </Card>
                <Card header='Test Image Component' height='500px' scroll>
                    <RImage height='50px' width='50px' border circle/>
                    <RImage height='50px' width='50px' border circle src='http://img.tubaozhang.com/files/upload/20171008e2RmfXsxOTQ4Mzd9e2tTTHh9.jpg'/>
                    <RImage onClick={()=>{}} height='100px' width='150px' src='http://dudubao.oss-cn-shenzhen.aliyuncs.com/tmp/poster/008f322df45c4dbcdf4e950173d0f23f.jpg'/>
                    <RImage height='100px' width='150px' display='full' border src='http://dudubao.oss-cn-shenzhen.aliyuncs.com/tmp/poster/008f322df45c4dbcdf4e950173d0f23f.jpg'/>
                    <RImage height='100px' width='150px' src='http://dudubao.oss-cn-shenzhen.aliyuncs.com/tmp/poster/008f322df45c4dbcdf4e950173d0f23f.jpg'/>
                    <RImage height='100px' width='150px' src='http://dudubao.oss-cn-shenzhen.aliyuncs.com/tmp/poster/008f322df45c4dbcdf4e950173d0f23f.jpg'/>
                    <RImage height='100px' width='150px' src='http://dudubao.oss-cn-shenzhen.aliyuncs.com/tmp/poster/008f322df45c4dbcdf4e950173d0f23f.jpg'/>
                    <RImage height='50px' width='50px' border circle/>
                    <RImage height='50px' width='50px' border circle src='http://img.tubaozhang.com/files/upload/20171008e2RmfXsxOTQ4Mzd9e2tTTHh9.jpg'/>
                    <RImage onClick={()=>{}} height='100px' width='150px' src='http://dudubao.oss-cn-shenzhen.aliyuncs.com/tmp/poster/008f322df45c4dbcdf4e950173d0f23f.jpg'/>
                    <RImage height='100px' width='150px' display='full' border src='http://dudubao.oss-cn-shenzhen.aliyuncs.com/tmp/poster/008f322df45c4dbcdf4e950173d0f23f.jpg'/>
                    <RImage height='100px' width='150px' src='http://dudubao.oss-cn-shenzhen.aliyuncs.com/tmp/poster/008f322df45c4dbcdf4e950173d0f23f.jpg'/>
                    <RImage height='100px' width='150px' src='http://dudubao.oss-cn-shenzhen.aliyuncs.com/tmp/poster/008f322df45c4dbcdf4e950173d0f23f.jpg'/>
                    <RImage height='100px' width='150px' src='http://dudubao.oss-cn-shenzhen.aliyuncs.com/tmp/poster/008f322df45c4dbcdf4e950173d0f23f.jpg'/>
                    <RImage height='50px' width='50px' border circle/>
                    <RImage height='50px' width='50px' border circle src='http://img.tubaozhang.com/files/upload/20171008e2RmfXsxOTQ4Mzd9e2tTTHh9.jpg'/>
                    <RImage onClick={()=>{}} height='100px' width='150px' src='http://dudubao.oss-cn-shenzhen.aliyuncs.com/tmp/poster/008f322df45c4dbcdf4e950173d0f23f.jpg'/>
                    <RImage height='100px' width='150px' display='full' border src='http://dudubao.oss-cn-shenzhen.aliyuncs.com/tmp/poster/008f322df45c4dbcdf4e950173d0f23f.jpg'/>
                    <RImage height='100px' width='150px' src='http://dudubao.oss-cn-shenzhen.aliyuncs.com/tmp/poster/008f322df45c4dbcdf4e950173d0f23f.jpg'/>
                    <RImage height='100px' width='150px' src='http://dudubao.oss-cn-shenzhen.aliyuncs.com/tmp/poster/008f322df45c4dbcdf4e950173d0f23f.jpg'/>
                    <RImage height='100px' width='150px' src='http://dudubao.oss-cn-shenzhen.aliyuncs.com/tmp/poster/008f322df45c4dbcdf4e950173d0f23f.jpg'/>
                    <RImage height='50px' width='50px' border circle/>
                    <RImage height='50px' width='50px' border circle src='http://img.tubaozhang.com/files/upload/20171008e2RmfXsxOTQ4Mzd9e2tTTHh9.jpg'/>
                    <RImage onClick={()=>{}} height='100px' width='150px' src='http://dudubao.oss-cn-shenzhen.aliyuncs.com/tmp/poster/008f322df45c4dbcdf4e950173d0f23f.jpg'/>
                    <RImage height='100px' width='150px' display='full' border src='http://dudubao.oss-cn-shenzhen.aliyuncs.com/tmp/poster/008f322df45c4dbcdf4e950173d0f23f.jpg'/>
                    <RImage height='100px' width='150px' src='http://dudubao.oss-cn-shenzhen.aliyuncs.com/tmp/poster/008f322df45c4dbcdf4e950173d0f23f.jpg'/>
                    <RImage height='100px' width='150px' src='http://dudubao.oss-cn-shenzhen.aliyuncs.com/tmp/poster/008f322df45c4dbcdf4e950173d0f23f.jpg'/>
                    <RImage height='100px' width='150px' src='http://dudubao.oss-cn-shenzhen.aliyuncs.com/tmp/poster/008f322df45c4dbcdf4e950173d0f23f.jpg'/>
                    <RImage height='50px' width='50px' border circle/>
                    <RImage height='50px' width='50px' border circle src='http://img.tubaozhang.com/files/upload/20171008e2RmfXsxOTQ4Mzd9e2tTTHh9.jpg'/>
                    <RImage onClick={()=>{}} height='100px' width='150px' src='http://dudubao.oss-cn-shenzhen.aliyuncs.com/tmp/poster/008f322df45c4dbcdf4e950173d0f23f.jpg'/>
                    <RImage height='100px' width='150px' display='full' border src='http://dudubao.oss-cn-shenzhen.aliyuncs.com/tmp/poster/008f322df45c4dbcdf4e950173d0f23f.jpg'/>
                    <RImage height='100px' width='150px' src='http://dudubao.oss-cn-shenzhen.aliyuncs.com/tmp/poster/008f322df45c4dbcdf4e950173d0f23f.jpg'/>
                    <RImage height='100px' width='150px' src='http://dudubao.oss-cn-shenzhen.aliyuncs.com/tmp/poster/008f322df45c4dbcdf4e950173d0f23f.jpg'/>
                    <RImage height='100px' width='150px' src='http://dudubao.oss-cn-shenzhen.aliyuncs.com/tmp/poster/008f322df45c4dbcdf4e950173d0f23f.jpg'/>
                    <RImage height='50px' width='50px' border circle/>
                    <RImage height='50px' width='50px' border circle src='http://img.tubaozhang.com/files/upload/20171008e2RmfXsxOTQ4Mzd9e2tTTHh9.jpg'/>
                    <RImage onClick={()=>{}} height='100px' width='150px' src='http://dudubao.oss-cn-shenzhen.aliyuncs.com/tmp/poster/008f322df45c4dbcdf4e950173d0f23f.jpg'/>
                    <RImage height='100px' width='150px' display='full' border src='http://dudubao.oss-cn-shenzhen.aliyuncs.com/tmp/poster/008f322df45c4dbcdf4e950173d0f23f.jpg'/>
                    <RImage height='100px' width='150px' src='http://dudubao.oss-cn-shenzhen.aliyuncs.com/tmp/poster/008f322df45c4dbcdf4e950173d0f23f.jpg'/>
                    <RImage height='100px' width='150px' src='http://dudubao.oss-cn-shenzhen.aliyuncs.com/tmp/poster/008f322df45c4dbcdf4e950173d0f23f.jpg'/>
                    <RImage height='100px' width='150px' src='http://dudubao.oss-cn-shenzhen.aliyuncs.com/tmp/poster/008f322df45c4dbcdf4e950173d0f23f.jpg'/>
                    <RImage height='50px' width='50px' border circle/>
                    <RImage height='50px' width='50px' border circle src='http://img.tubaozhang.com/files/upload/20171008e2RmfXsxOTQ4Mzd9e2tTTHh9.jpg'/>
                    <RImage onClick={()=>{}} height='100px' width='150px' src='http://dudubao.oss-cn-shenzhen.aliyuncs.com/tmp/poster/008f322df45c4dbcdf4e950173d0f23f.jpg'/>
                    <RImage height='100px' width='150px' display='full' border src='http://dudubao.oss-cn-shenzhen.aliyuncs.com/tmp/poster/008f322df45c4dbcdf4e950173d0f23f.jpg'/>
                    <RImage height='100px' width='150px' src='http://dudubao.oss-cn-shenzhen.aliyuncs.com/tmp/poster/008f322df45c4dbcdf4e950173d0f23f.jpg'/>
                    <RImage height='100px' width='150px' src='http://dudubao.oss-cn-shenzhen.aliyuncs.com/tmp/poster/008f322df45c4dbcdf4e950173d0f23f.jpg'/>
                    <RImage height='100px' width='150px' src='http://dudubao.oss-cn-shenzhen.aliyuncs.com/tmp/poster/008f322df45c4dbcdf4e950173d0f23f.jpg'/>
                    <Table hover={true} select={true} sm data={this.dataTable} fontSm width='2000px'>
                        <Table.Header text='Name' field='name' width='100px' onSort={(sort)=>{alert(sort)}}/>
                        <Table.Header text='Age' field='age' width='150px' hide/>
                        <Table.Header text='Birthday' field='birthday' width='150px'/>
                        <Table.Header text='Address' field='address' width='150px'/>
                        <Table.Header text='Both' field='both' width='300px'/>
                        <Table.Header text='Test' field='test' width='400px'/>
                        <Table.Header text='Action' width='100px' onFormat={row=>{
                            return <Button className='color-blue' size='xs' icon='plus'>Add</Button>
                        }} />
                    </Table>
                </Card>
                <Card header='Test Image Component' height='500px' scroll>
                    <RImage height='50px' width='50px' border circle/>
                </Card>
                <hr/>
            </Container>
        );
    }
}

Jump.propTypes = {};

Jump.defaultProps = {};

export default Jump;