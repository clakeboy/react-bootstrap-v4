import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

class Box extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    getClasses() {
        let base = '';

        return classNames(base, this.props.className);
    }

    getStyles() {
        let base = {};

        if (this.props.width) {
            base.width = this.props.width;
        }

        if (this.props.height) {
            base.height = this.props.height;
        }

        if (this.props.absolute) {
            base.position = 'absolute';
            base.left     = this.props.x;
            base.top      = this.props.y;
        }

        if (this.props.borderWidth) {
            base.borderStyle = 'solid';
            base.borderWidth = this.props.borderWidth;
        }

        if (this.props.borderColor) {
            base.borderColor = this.props.borderColor;
        }

        return base;
    }

    render() {
        return (
            <div className={this.getClasses()} style={this.getStyles()}/>
        );
    }
}

Box.propTypes = {
    absolute   : PropTypes.bool,
    x          : PropTypes.string,
    y          : PropTypes.string,
    width      : PropTypes.string,
    height     : PropTypes.string,
    borderWidth: PropTypes.string,
    borderColor: PropTypes.string
};

Box.defaultProps = {};

export default Box;