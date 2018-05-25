import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import common from "./Common";

class TextArea extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.data
        };

        this.domId = common.RandomString(16);
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
        return classNames(base, this.props.className);
    }

    getMainStyles() {
        //default style
        let def_style = {};
        //width
        if (this.props.width) {
            def_style['width'] = this.props.width + 'px';
        }
        //height
        if (this.props.height) {
            def_style['height'] = this.props.height + 'px';
        }

        return common.extend(def_style, this.props.style)
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
            default:
                size = ''
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
    width      : PropTypes.number,
    height     : PropTypes.number,
    placeholder: PropTypes.string,
    calendar   : PropTypes.bool,
    onChange   : PropTypes.func,
    plaintext  : PropTypes.bool,
    row        : PropTypes.number,
};

TextArea.defaultProps = {
    label   : '',
    data    : null,
    summary : '',
    readOnly: false,
};

export default TextArea;