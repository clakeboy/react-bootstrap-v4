import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import common from './Common';
import Calendar from './Calendar';
import $ from "jquery";
import ReactDOM from "react-dom";
import Icon from "./Icon";

import './css/Input.less';

class Input extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.data,
            validate:true,
            disabled:this.props.disabled
        };

        this.domId = common.RandomString(16);
        if (this.props.id) {
            this.domId = this.props.id;
        }
    }

    componentDidMount() {
        if (this.props.calendar) {
            $(ReactDOM.findDOMNode(this.input)).on('focus',(e)=>{
                this.calendar.show(e.currentTarget);
            });
            $(ReactDOM.findDOMNode(this.input)).on('mousedown',(e)=>{
                e.stopPropagation();
            });
        }
    }

    componentWillReceiveProps(nextProp) {
        this.setState({value:nextProp.data});
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.disabled !== this.props.disabled) {
            return true
        }
        if (nextState.validate !== this.state.validate) {
            return true
        }
        return nextState.value !== this.state.value;
    }

    getValue() {
        return this.state.value;
    }

    setValue(val) {
        this.setState({value:val});
    }

    getMainClasses() {
        let base = 'form-group';
        return classNames(base, this.props.className);
    }

    getMainStyles() {
        //default style
        let def_style = {
            "width": this.props.width + "px",
            "position":"relative"
        };

        return common.extend(def_style, this.props.style)
    }

    getInputClasses() {
        let base = 'form-control ck-input';
        //readonly
        if (this.props.plaintext) {
            base = 'form-control-plaintext';
            this.props.readOnly = true;
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

        if (!this.state.validate) {
            base = classNames(base,'is-invalid');
        }

        return classNames(base, size);
    }

    check() {
        let validate = this.validate(this.state.value);
        this.setState({
            validate:validate
        });
        return validate
    }

    validate(val) {
        if (this.props.validate) {
            return this.props.validate.rule.test(val);
        }
        return true;
    }

    /*********************
     * Event
     *********************/
    changeHandler = (e) => {
        let state = {
            value:e.target.value
        };

        this.setState(state,()=>{
            if (typeof this.props.onChange === 'function') {
                this.props.onChange(state.value,state.validate,this);
            }
        });
    };

    blurHandler = (e)=>{
        this.setState({
            validate:this.validate(e.target.value)
        })
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
        if (!this.state.validate) {
            return (
                <div className='invalid-feedback'>
                    {this.props.validate.text}
                </div>
            )
        }
        if (!this.props.summary) {
            return null
        }
        return (
            <small className="form-text text-muted text-truncate">
                {this.props.summary}
            </small>
        )
    }

    renderCalendar() {
        if (!this.props.calendar) {
            return null;
        }
        let input_icon = 'ck-input-calendar-icon';
        if (this.props.size) {
            input_icon = classNames(input_icon,'ck-input-calendar-icon-'+this.props.size);
        }
        return (
            <div className='ck-input-calendar'>
                <Calendar ref={c=>this.calendar=c} onSelect={(val)=>{
                    this.setState({
                        value:val,
                    });
                    if (this.props.onChange && typeof this.props.onChange === 'function') {
                        this.props.onChange(val,this);
                    }
                }} value={this.state.value} format={this.props.calendarFormat} none shadow absolute triangular='up'/>
                <div className={input_icon}><Icon iconType='regular' icon='calendar-alt'/></div>
            </div>
        )
    }

    render() {
        return (
            <div className={this.getMainClasses()} style={this.getMainStyles()}>
                {this.renderLabel()}
                <input ref={c=>this.input=c} type="text" {...this.props} onBlur={this.blurHandler} onChange={this.changeHandler} value={this.state.value} className={this.getInputClasses()} id={this.domId}/>
                {this.renderSummary()}
                {this.renderCalendar()}
            </div>
        );
    }
}

Input.propTypes = {
    id         : PropTypes.string,
    size       : PropTypes.oneOf(['df', 'sm', 'lg']),
    label      : PropTypes.string,
    data       : PropTypes.any,
    summary    : PropTypes.string,
    readOnly   : PropTypes.bool,
    width      : PropTypes.number,
    placeholder: PropTypes.string,
    calendar: PropTypes.bool,
    onChange   : PropTypes.func,
    plaintext: PropTypes.bool,
    calendarFormat: PropTypes.string,
    validate: PropTypes.object,
    disabled: PropTypes.bool
};

Input.defaultProps = {
    id      : '',
    size    : 'df',
    label   : '',
    data    : null,
    summary : '',
    readOnly: false,
    disabled:false
};

export default Input;