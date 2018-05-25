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
} from '../../../src/index';

class Jump extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props.history)
    }

    getClasses() {
        let base = '';

        return classNames(base,this.props.className);
    }

    render() {
        return (
            <Container>
                <Button onClick={e=>{
                    this.props.history.goBack();
                }}>返回上页</Button>
            </Container>
        );
    }
}

Jump.propTypes = {

};

Jump.defaultProps = {

};

export default Jump;