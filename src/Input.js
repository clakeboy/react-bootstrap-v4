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
            value: this.props.data
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

        return classNames(base, size);
    }

    /*********************
     * Event
     *********************/
    changeHandler = (e) => {
        this.setState({
            value:e.target.value
        });

        if (this.props.onChange && typeof this.props.onChange === 'function') {
            this.props.onChange(e.target.value,this);
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
                <input ref={c=>this.input=c} type="text" {...this.props} onChange={this.changeHandler} value={this.state.value} className={this.getInputClasses()} id={this.domId}/>
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
};

Input.defaultProps = {
    id      : '',
    size    : 'df',
    label   : '',
    data    : null,
    summary : '',
    readOnly: false,
};

export default Input;