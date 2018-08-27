/**
 * Created by clakeboy on 2018/8/16.
 */
import React from 'react';
import ReactBootstrap4,{
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
    Label
} from '../../src/index';

class Window extends React.Component {
    constructor(props) {
        super(props);

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

    render() {
        return (
            <Container>
                <h1>Window Manage Demo</h1>
                <Container fluid className='mb-1 p-0'>
                    <Button className='mr-1' onClick={e=>{
                        this.props.history.replace('/',this.state);
                    }}>回到首页</Button>
                </Container>
                <Card className='mt-2' header='Window Test'>
                    <Label text='Clake Lee'/>
                </Card>
                <Table absolute x='100px' y='300px' width='500px' height='300px' headerTheme='light' scroll hover={true} select={true} sm data={this.dataTable}>
                    <Table.Header width='100px' text='Name' field='name' onSort={(sort)=>{alert(sort)}}/>
                    <Table.Header width='100px' text='Age' field='age' hide/>
                    <Table.Header width='100px' text='Birthday' field='birthday'/>
                    <Table.Header width='100px' text='Address' field='address'/>
                    <Table.Header width='100px' text='Both' field='both'/>
                    <Table.Header width='100px' text='Test' field='test'/>
                    <Table.Header width='100px' text='Action' onFormat={row=>{
                        return <Button className='color-blue' size='xs' icon='plus'>Add</Button>
                    }} />
                </Table>
            </Container>
        );
    }
}

export default Window;