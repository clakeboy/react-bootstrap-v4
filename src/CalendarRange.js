import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import './css/Input.less';
import './css/CalendarRange.less';
import common from "./Common";
import {Calendar} from "./index";

const stopEvent  = function (e) {
    e.stopPropagation();
};

class CalendarRange extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value    : this.props.data,
            min      : this.props.minData,
            max      : this.props.maxData,
            validate : true,
            disabled : this.props.disabled,
            icon     : 'calendar-alt',
        };

        this.domId = 'calendar-range-' + common.RandomString(16);
        if (this.props.id) {
            this.domId = this.props.id;
        }

        this.isFocus = false;
    }

    componentDidMount() {
        this.inputDom.addEventListener('focus',this.show);
        this.inputMin.addEventListener('focus',this.show);
        this.inputMax.addEventListener('focus',this.show);
        this.inputMin.addEventListener('mousedown',stopEvent);
        this.inputMax.addEventListener('mousedown',stopEvent);
        window.addEventListener('mousedown',this.hide,false);
        this.maxCalendar.setFailRange(new Date(this.state.min),this.props.days);
    }

    componentWillUnmount() {
        this.inputDom.removeEventListener('focus',this.show);
        this.inputMin.removeEventListener('focus',this.show);
        this.inputMax.removeEventListener('focus',this.show);
        this.inputMin.removeEventListener('mousedown',stopEvent);
        this.inputMax.removeEventListener('mousedown',stopEvent);
        window.removeEventListener('mousedown',this.hide,false);
    }

    getClasses() {
        let base = 'form-group ck-calendar-range';
        return classNames(base, this.props.className);
    }

    getMainStyles() {
        //default style
        let base = {"position": "relative"};
        if (this.props.width) {
            base.width = this.props.width;
        }
        if (this.props.height) {
            base.height = this.props.height;
        }
        if (this.props.absolute) {
            base.position = 'absolute';
        }
        if (this.props.x) {
            base.left = this.props.x;
        }
        if (this.props.y) {
            base.top = this.props.y;
        }
        if (!this.props.label) {
            base.marginBottom = '0';
        }

        return common.extend(base, this.props.style)
    }

    getInputClasses(append) {
        let base = 'form-control d-flex flex-row';
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
                size = 'form-control-xs';
                break;
            default:
                size = ''
        }

        base = classNames(base, size);

        if (!this.state.validate) {
            base = classNames(base, 'ck-input-valid');
        }

        if (this.props.readOnly) {
            base = classNames(base, 'ck-input-select');
        }

        return classNames(base, this.props.textClass, append);
    }

    show = () => {
        this.calendar_panel.classList.add('d-flex')
        this.calendar_panel.style.top = this.mainDom.offsetHeight+3+'px'
        this.minCalendar.refreshWidth();
        this.maxCalendar.refreshWidth();
    }

    hide = () => {
        this.calendar_panel.classList.remove('d-flex')

    }

    changeHandler = () => {
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(this.state.min,this.state.max)
        }
    }

    render() {
        return (
            <div ref={c=>{this.mainDom=c}} id={this.domId} className={this.getClasses()} style={this.getMainStyles()}>
                {this.renderLabel()}
                <div ref={c=>{this.inputDom=c}} className={this.getInputClasses()} tabIndex='1'>
                    <input ref={c=>this.inputMin=c} readOnly value={this.state.min} className='c-input w-50 text-center' placeholder={this.props.placeholderMin??this.props.format}/>
                    <span>{'\u0020-\u0020'}</span>
                    <input ref={c=>this.inputMax=c} readOnly value={this.state.max} className='c-input w-50 text-center' placeholder={this.props.placeholderMax??this.props.format}/>
                </div>
                {this.renderCalendar()}
            </div>
        );
    }

    renderLabel() {
        if (this.props.label === '') {
            return null;
        }
        return (
            <label htmlFor={this.domId} className={this.props.labelClass}>{this.props.label}</label>
        )
    }

    renderCalendar() {
        return <div ref={c=>this.calendar_panel=c} className='c-panel d-none p-1 shadow'>
            <Calendar ref={c=>this.minCalendar=c} target={this.inputMin} value={this.state.min} onSelect={(val)=>{
                let max = this.state.max;
                let flag = this.maxCalendar.setFailRange(new Date(val),this.props.days);
                if (!flag) {
                    max = '';
                }
                this.setState({
                    min:val,
                    max:max,
                },()=>{
                    this.changeHandler();
                })
            }}/>
            <Calendar ref={c=>this.maxCalendar=c} target={this.inputMax} value={this.state.max} onSelect={(val)=>{
                this.setState({
                    max:val
                },()=>{
                    this.changeHandler();
                })
            }}/>
        </div>
    }
}

CalendarRange.propTypes = {
    id            : PropTypes.string,
    label         : PropTypes.string,
    minData       : PropTypes.string,
    maxData       : PropTypes.string,
    days          : PropTypes.number,
    readOnly      : PropTypes.bool,
    placeholderMin: PropTypes.string,
    placeholderMax: PropTypes.string,
    onChange      : PropTypes.func,
    format        : PropTypes.string,
    time          : PropTypes.bool,
    disabled      : PropTypes.bool,
    disableClear  : PropTypes.bool,
    labelClass    : PropTypes.string,
    className     : PropTypes.string,
};

CalendarRange.defaultProps = {
    id          : '',
    size        : 'df',
    label       : '',
    minData     : '',
    maxData     : '',
    days        : 30,
    summary     : '',
    readOnly    : false,
    disabled    : false,
    disableClear: false,
    format: 'YYYY-MM-DD'
};

export default CalendarRange;