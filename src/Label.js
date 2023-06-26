import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import './css/Label.less';

export class Label extends React.PureComponent {
    static propTypes = {
        text     : PropTypes.string,
        absolute : PropTypes.bool,
        x        : PropTypes.string,
        y        : PropTypes.string,
        width    : PropTypes.string,
        height   : PropTypes.string,
        color    : PropTypes.string,
        backColor: PropTypes.string,
        sm       : PropTypes.bool,
        align: PropTypes.string
    };
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text
        };
    }

    componentDidMount() {

    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.text !== nextProps.text) {
            return {
                text: nextProps.text
            };
        }

        return null
    }

    getClasses() {
        let base = 'ck-label';
        if (this.props.absolute) {
            base = classNames(base, 'position-absolute');
        }
        if (this.props.sm) {
            base = classNames(base, 'ck-label-sm');
        }
        return classNames(base, this.props.className);
    }

    getStyles() {
        let base = {};
        if (this.props.width) {
            base.width = this.props.width;
            base.paddingLeft = '0';
            base.paddingRight = '0';
        }
        if (this.props.height) {
            base.height = this.props.height;
            base.paddingTop = '0';
            base.paddingBottom = '0';
        }
        if (this.props.absolute) {
            base.top  = this.props.y;
            base.left = this.props.x;
        }
        if (this.props.color) {
            base.color = this.props.color;
        }
        if (this.props.backColor) {
            base.backgroundColor = this.props.backColor;
        }
        if (this.props.align) {
            base.textAlign = this.props.align;
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

export default Label;