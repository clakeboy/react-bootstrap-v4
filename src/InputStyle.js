import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

export class InputStyle extends React.PureComponent {
    static propTypes = {
        label: PropTypes.string,
    };
    static defaultProps = {
        label: '',
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    getClasses() {
        let base = 'form-group';

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