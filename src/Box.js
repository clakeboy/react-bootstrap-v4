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
        let base = 'ck-box';

        return classNames(base, this.props.className);
    }

    getStyles() {
        let base = {
            borderColor:'#c3c3c3'
        };

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

        if (this.props.backColor) {
            base.backgroundColor = this.props.backColor;
        }

        return base;
    }

    render() {
        return (
            <div className={this.getClasses()} style={this.getStyles()}>
                {this.props.children}
            </div>
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
    borderColor: PropTypes.string,
    backColor: PropTypes.string
};

Box.defaultProps = {};

export default Box;