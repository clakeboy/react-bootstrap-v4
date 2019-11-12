import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

class InputStyle extends React.PureComponent {
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

InputStyle.propTypes = {
    label: PropTypes.string,
};

InputStyle.defaultProps = {
    label: '',
};

export default InputStyle;