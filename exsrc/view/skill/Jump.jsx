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
                <div className="card-columns">
                    <div className="card">
                        <img className="card-img-top" src="" alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">This is a longer card with supporting text below as a natural
                                    lead-in to additional content. This content is a little bit longer.</p>
                                <p className="card-text">
                                    <small className="text-muted">Last updated 3 mins ago</small>
                                </p>
                            </div>
                    </div>
                    <div className="card">
                        <img className="card-img-top" src="" alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">This card has supporting text below as a natural lead-in to
                                    additional content.</p>
                                <p className="card-text">
                                    <small className="text-muted">Last updated 3 mins ago</small>
                                </p>
                            </div>
                    </div>
                    <div className="card">
                        <img className="card-img-top" src="" alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">This is a wider card with supporting text below as a natural
                                    lead-in to additional content. This card has even longer content than the first to
                                    show that equal height action.</p>
                                <p className="card-text">
                                    <small className="text-muted">Last updated 3 mins ago</small>
                                </p>
                            </div>
                    </div>
                    <div className="card">
                        <img className="card-img-top" src="" alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a wider card with supporting text below as a natural
                                lead-in to additional content. This card has even longer content than the first to
                                show that equal height action.</p>
                            <p className="card-text">
                                <small className="text-muted">Last updated 3 mins ago</small>
                            </p>
                        </div>
                    </div>
                    <div className="card">
                        <img className="card-img-top" src="" alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a wider card with supporting text below as a natural
                                lead-in to additional content. This card has even longer content than the first to
                                show that equal height action.</p>
                            <p className="card-text">
                                <small className="text-muted">Last updated 3 mins ago</small>
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        );
    }
}

Jump.propTypes = {};

Jump.defaultProps = {};

export default Jump;