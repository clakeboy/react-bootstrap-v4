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
            </Container>
        );
    }
}

export default Window;