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
        console.log(Label.propTypes);
    }

    getDerivedStateFromProps(nextProps, prevState) {
        if (this.props.text !== nextProps.text) {
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
        if (this.props.absolute) {
            base.top = this.props.y;
            base.left = this.props.x;
        }
    }

    render() {
        return (
            <span className={this.getClasses()} style={this.getStyles()}>
                {this.state.text}
            </span>
        );
    }
}

Label.propTypes = {
    text: PropTypes.string,
    absolute: PropTypes.bool,
    x: PropTypes.string,
    y: PropTypes.string
};

Label.defaultProps = {

};

export default Label;