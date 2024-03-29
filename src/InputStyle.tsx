import React from 'react';
import classNames from 'classnames/bind';
import { ComponentProps } from './components/common';

interface Props extends ComponentProps {
    label?:any
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
        const base = 'mb-3';

        return classNames(base,this.props.className);
    }

    render() {
        return (
            <div className={this.getClasses()}>
                <label className='form-label'>{this.props.label}</label>
                {this.props.children}
            </div>
        );
    }
}

export default InputStyle;