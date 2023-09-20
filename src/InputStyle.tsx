import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { ComponentProps } from './components/common';

interface Props extends ComponentProps {
    label?:string
}

export class InputStyle extends React.PureComponent<Props,any> {

    static defaultProps = {
        label: '',
    };

    constructor(props:any) {
        super(props);
    }

    componentDidMount() {

    }

    getClasses() {
        const base = 'form-group';

        return classNames(base,this.props.className);
    }

    render() {
        return (
            <div className={this.getClasses()}>
                <label>{this.props.label}</label>
                {this.props.children}
            </div>
        );
    }
}

export default InputStyle;