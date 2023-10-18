import React from 'react';
import classNames from 'classnames/bind';
import {
    Container,
    Input,
    Button,
    Card,
    Table,
    Icon,
    Theme,
    Switch,
    RImage,
    Modal,
    ImageView
} from '../../../src/index';

class Jump extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            date: "",
            mini_chk:false
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
                <Button className='me-2' onClick={e => {
                    this.props.history.goBack();
                }}>返回上页</Button>
                <Button onClick={e => {
                    this.props.history.push('/skill/calendar',this.state);
                }}>测试样式</Button>
                <Card>
                    <Container className='p-0 mb-1' inline fluid>
                        <Input className='me-1' disabled placeholder='用户名'/>
                        <Switch className='me-1' theme={Theme.success} size='lg' checked={this.state.checked} onChange={(checked) => {
                            this.setState({
                                checked: checked
                            }, () => {
                                console.log(this.state.checked);
                                setTimeout(() => {
                                    this.setState({checked: !this.state.checked})
                                }, 2000);
                            })
                        }}>{this.state.checked?<Icon icon='check'/>:null}</Switch>
                        <Switch disabled className='me-1' theme={Theme.success} size='lg' checked={this.state.checked} onChange={(checked) => {
                            this.setState({
                                checked: checked
                            }, () => {
                                console.log(this.state.checked);
                            })
                        }}/>
                    </Container>
                    <Container className='p-0 mb-1' inline fluid>
                        <Input className='me-1' disabled placeholder='用户名'/>
                        <Switch className='me-1' theme={Theme.dark} checked={this.state.checked} onChange={(checked) => {
                            this.setState({
                                checked: checked
                            }, () => {
                                console.log(this.state.checked);
                            })
                        }}>{this.state.checked?'开':'关'}</Switch>
                        <Switch disabled theme={Theme.dark} checked={this.state.checked} onChange={(checked) => {
                            this.setState({
                                checked: checked
                            }, () => {
                                console.log(this.state.checked);
                            })
                        }}/>
                    </Container>
                    <Container className='p-0 mb-1' inline fluid>
                        <Input className='me-1' size='sm' disabled placeholder='用户名'/>
                        <Switch className='me-1' ref={c=>this.switch=c} checked={this.state.mini_chk} size='sm' theme={Theme.warning} onChange={(chk)=>{
                            if (chk) {
                                this.modal.alert('点击了打开',()=>{
                                    this.switch.setChecked(false)
                                })
                            }
                        }}/>
                        <Switch disabled ref={c=>this.switch=c} size='sm' theme={Theme.warning}/>
                    </Container>
                    {this.state.checked ? <div>是</div> : <div>否</div>}
                    <Button disabled>禁用</Button>
                    <Input className='me-1' width={'200px'} placeholder='日期' calendar data={this.state.date} onChange={(e)=>{
                        this.setState({
                            date:e
                        })
                    }}/>
                    <Modal ref={c=>this.modal=c}/>
                </Card>
                <Card header='Test Image Component' height='500px' scroll>
                    <RImage height='50px' width='50px' border circle/>
                    <RImage height='50px' width='50px' border circle src='http://img.tubaozhang.com/files/upload/20171008e2RmfXsxOTQ4Mzd9e2tTTHh9.jpg'/>
                    <RImage onClick={()=>{
                        this.view.show();
                    }} height='100px' width='150px' src='http://dudubao.oss-cn-shenzhen.aliyuncs.com/tmp/poster/008f322df45c4dbcdf4e950173d0f23f.jpg'/>
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
                <Card header='测试图片查看器 - ImageView' height='500px' scroll>
                    <span>点击下面图片查看单张</span>
                    <RImage onClick={()=>{
                        this.view.show('https://dudubao.oss-cn-shenzhen.aliyuncs.com/tmp/poster/008f322df45c4dbcdf4e950173d0f23f.jpg');
                    }} height='100px' width='150px' src='http://dudubao.oss-cn-shenzhen.aliyuncs.com/tmp/poster/008f322df45c4dbcdf4e950173d0f23f.jpg'/>
                    <span>点击下面图片查看多张</span>
                    <RImage onClick={()=>{
                        this.view.show([
                            'https://dudubao.oss-cn-shenzhen.aliyuncs.com/tmp/poster/0006f86400bc1717f2f614a462261e0d.jpg',
                            'https://dudubao.oss-cn-shenzhen.aliyuncs.com/tmp/poster/0009af448169e081195ad2429d9cf013.jpg',
                            'https://dudubao.oss-cn-shenzhen.aliyuncs.com/tmp/poster/00141c63674e7d07b546ddfc971b089e.jpg',
                            'https://dudubao.oss-cn-shenzhen.aliyuncs.com/tmp/poster/001d546ad57edcd38622fd35341328a0.jpg',
                            'https://dudubao.oss-cn-shenzhen.aliyuncs.com/tmp/poster/008f322df45c4dbcdf4e950173d0f23f.jpg'
                        ]);
                    }} height='100px' width='150px' src='https://dudubao.oss-cn-shenzhen.aliyuncs.com/tmp/poster/0006f86400bc1717f2f614a462261e0d.jpg'/>
                </Card>
                <hr/>
                <ImageView ref={c=>this.view=c} src={[
                    'http://dudubao.oss-cn-shenzhen.aliyuncs.com/tmp/poster/008f322df45c4dbcdf4e950173d0f23f.jpg',
                    'http://img.tubaozhang.com/files/upload/20171008e2RmfXsxOTQ4Mzd9e2tTTHh9.jpg'
                ]}/>
            </Container>
        );
    }
}

Jump.propTypes = {};

Jump.defaultProps = {};

export default Jump;