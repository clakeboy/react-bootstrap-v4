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
    Switch
} from '../../../src/index';
import Modal from "../../../src/Modal";

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
                        <Switch className='mr-1' theme='success' checked={this.state.checked} onChange={(checked) => {
                            this.setState({
                                checked: checked
                            }, () => {
                                console.log(this.state.checked);
                            })
                        }}/>
                    </Container>
                    <Container className='p-0 mb-1' inline fluid>
                        <Input className='mr-1' disabled placeholder='用户名'/>
                        <Switch size='sm' theme='dark' checked={this.state.checked} onChange={(checked) => {
                            this.setState({
                                checked: checked
                            }, () => {
                                console.log(this.state.checked);
                            })
                        }}/>
                    </Container>
                    <Container className='p-0 mb-1' inline fluid>
                        <Input className='mr-1' size='sm' disabled placeholder='用户名'/>
                        <Switch ref={c=>this.switch=c} size='xs' theme='warning' onChange={(checked) => {
                            this.modal.alert(this.switch.getChecked().toString());
                        }}/>
                    </Container>
                    {this.state.checked ? <div>是</div> : <div>否</div>}
                    <Modal ref={c=>this.modal=c}/>
                </Card>
            </Container>
        );
    }
}

Jump.propTypes = {};

Jump.defaultProps = {};

export default Jump;