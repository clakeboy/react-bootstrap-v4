import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import common from "./Common";
import './css/TextArea.less';
class TextArea extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.data
        };

        this.domId = 'text-area-'+common.RandomString(16);
        if (this.props.id) {
            this.domId = this.props.id;
        }
    }

    componentWillReceiveProps(nextProp) {
        this.setState({value: nextProp.data});
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.value !== this.state.value;
    }

    getValue() {
        return this.state.value;
    }

    setValue(val) {
        this.setState({value: val});
    }

    getMainClasses() {
        let base = 'form-group';
        if (this.props.absolute) {
            base = classNames(base, 'position-absolute');
        }
        return classNames(base, this.props.className);
    }

    getMainStyles() {
        //default style
        let base = {};
        //width
        if (this.props.width) {
            base.width = this.props.width;
        }
        //height
        if (this.props.height) {
            base.height = this.props.height;
        }

        if (this.props.absolute) {
            base.top  = this.props.y;
            base.left = this.props.x;
        }

        if (!this.props.label) {
            base.marginBottom = '0';
        }

        return common.extend(base, this.props.style)
    }

    getInputClasses() {
        let base = 'form-control';
        //readonly
        if (this.props.plaintext) {
            base = 'form-control-plaintext';
        }
        //size
        let size;
        switch (this.props.size) {
            case 'lg':
                size = 'form-control-lg';
                break;
            case 'sm':
                size = 'form-control-sm';
                break;
            case 'xs':
                size = 'ck-text-area-xs';
                break;
            default:
                size = ''
        }

        base = classNames(base, size);
        //height
        if (this.props.height) {
            base = classNames(base,'h-100')
        }

        return classNames(base, size);
    }

    /*********************
     * Event
     *********************/
    changeHandler = (e) => {
        this.setState({
            value: e.target.value
        });

        if (this.props.onChange && typeof this.props.onChange === 'function') {
            this.props.onChange(e.target.value, this);
        }
    };

    /*********************
     * render method
     *********************/
    renderLabel() {
        if (this.props.label === '') {
            return null;
        }
        return (
            <label htmlFor={this.domId}>{this.props.label}</label>
        )
    }

    renderSummary() {
        if (this.props.summary === '') {
            return null
        }
        return (
            <small className="form-text text-muted text-truncate">
                {this.props.summary}
            </small>
        )
    }

    render() {
        return (
            <div className={this.getMainClasses()} style={this.getMainStyles()}>
                {this.renderLabel()}
                <textarea ref={c => this.input = c} {...this.props} onChange={this.changeHandler} value={this.state.value} className={this.getInputClasses()} id={this.domId}/>
                {this.renderSummary()}
            </div>
        );
    }
}

TextArea.propTypes = {
    id         : PropTypes.string,
    label      : PropTypes.string,
    data       : PropTypes.any,
    summary    : PropTypes.string,
    readOnly   : PropTypes.bool,
    width      : PropTypes.string,
    height     : PropTypes.string,
    placeholder: PropTypes.string,
    calendar   : PropTypes.bool,
    onChange   : PropTypes.func,
    plaintext  : PropTypes.bool,
    row        : PropTypes.number,
    absolute: PropTypes.bool,
    x       : PropTypes.string,
    y       : PropTypes.string
};

TextArea.defaultProps = {
    label   : '',
    data    : null,
    summary : '',
    readOnly: false,
};

export default TextArea;