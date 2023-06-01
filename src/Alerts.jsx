/**
 * Created by clakeboy on 2023/6/1.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

class Alerts extends React.PureComponent {
    state = {
        content: this.props.content
    }

    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    getClasses() {
        let base = '';

        return classNames(base,this.props.className);
    }

    render() {
        return (
            <div className={this.getClasses()}>

            </div>
        );
    }
}

Alerts.propTypes = {
    content: PropTypes.string
};

Alerts.defaultProps = {
    content: ''
};

export default Alerts;