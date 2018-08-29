import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import './css/Label.less';

class Label extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            text:this.props.text
        };
    }

    componentDidMount() {

    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.text !== nextProps.text) {
            return {
                text:nextProps.text
            };
        }

        return null
    }

    getClasses() {
        let base = 'ck-label';
        if (this.props.absolute) {
            base = classNames(base,'position-absolute');
        }
        return classNames(base,this.props.className);
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
            base.top = this.props.y;
            base.left = this.props.x;
        }
        return base;
    }

    render() {
        return (
            <div className={this.getClasses()} style={this.getStyles()}>
                {this.state.text}
            </div>
        );
    }
}

Label.propTypes = {
    text: PropTypes.string,
    absolute: PropTypes.bool,
    x: PropTypes.string,
    y: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    color: PropTypes.string,
    backColor: PropTypes.string
};

Label.defaultProps = {

};

export default Label;