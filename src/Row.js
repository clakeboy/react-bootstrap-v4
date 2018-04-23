import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

class Row extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    getClasses() {
        let base = 'row';
        //no-gutters
        if (this.props.noGutters) {
            base = classNames(base,'no-gutters');
        }

        return classNames(base, this.props.className);
    }

    render() {
        return (
            <div className={this.getClasses()}>
                {this.props.children}
            </div>
        );
    }
}

Row.propTypes = {
    noGutters: PropTypes.bool,
};

Row.defaultProps = {};

export default Row;