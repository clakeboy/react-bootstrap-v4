import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import common from './Common';
import Calendar from './Calendar';
import Combo from './Combo';
import Icon from "./Icon";
import i18n from './components/i18n';

import './css/Input.less';
const stopEvent  = function (e) {
    e.stopPropagation();
};

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value    : this.props.data,
            validate : true,
            disabled : this.props.disabled,
            comboData: this.props.comboData,
            icon: this.props.combo?'angle-down':this.props.calendar?'calendar-alt':'',
        };

        this.domId = 'input-' + common.RandomString(16);
        if (this.props.id) {
            this.domId = this.props.id;
        }

        this.isFocus = false;
    }

    componentDidMount() {
        if (this.props.calendar) {
            this.input.addEventListener('focus', (e) => {
                this.calendar.show(e.currentTarget);
            }, false);

            // $(ReactDOM.findDOMNode(this.input)).on('focus', (e) => {
            //     this.calendar.show(e.currentTarget);
            // });
            // $(ReactDOM.findDOMNode(this.input)).on('mousedown', (e) => {
            //     e.stopPropagation();
            // });
        }
        if (this.props.combo) {
            this.input.addEventListener('focus', (e) => {
                this.combo.show(this.state.value,e.currentTarget);
            }, false);
        }
        this.input.addEventListener('focus', this.focusClearHandler, false);
        this.input.addEventListener('blur', this.blurClearHandler, false);
        this.input.addEventListener('mousedown',stopEvent, false);
        if (this.props.validate) {
            let options = {
                'trigger':'manual',
                'template':'<div class="tooltip ck-input-tip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner bg-danger"></div></div>',
            };
            $('#'+this.domId).tooltip(options);
        }

        if (this.props.multi) {
            this.input.addEventListener('focus', this.showMulti, false);
            this.input.addEventListener('blur', this.hideMulti, false);
        }
    }

    componentWillUnmount() {
        if (this.props.validate) {
            $('#'+this.domId).tooltip('dispose');
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            value    : nextProps.data,
            comboData: nextProps.comboData
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.comboData !== this.props.comboData) {
            return true;
        }
        if (nextProps.disabled !== this.props.disabled) {
            return true
        }
        if (nextProps.label !== this.props.label) {
            return true
        }
        if (nextState.validate !== this.state.validate) {
            return true
        }
        if (nextState.icon !== this.state.icon) {
            return true
        }
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
        let base = 'form-control ck-input';
        //readonly
        if (this.props.plaintext) {
            base                = 'form-control-plaintext';
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

        if (this.props.calendar || this.props.combo) {
            base = classNames(base, 'ck-input-icon');
        }

        if (this.props.readOnly && (this.props.calendar || this.props.combo)) {
            base = classNames(base, 'ck-input-select');
        }

        if (this.props.align) {
            base = classNames(base, `text-${this.props.align}`)
        }

        if (this.props.multi) {
            base = classNames(base, `ck-input-multi`)
        }

        return classNames(base, this.props.textClass, append);
    }

    getInputStyle() {
        let base = {};
        if (this.props.width) {
            base.width = this.props.width;
        }
        if (this.props.height) {
            base.height = this.props.height;
        } else if (this.props.multi) {
            base.height = 'calc(1.5em + .75rem + 2px)';
        }
        return common.extend(base, this.props.textStyle)
    }

    check() {
        let validate = this.validate(this.state.value);
        this.setState({
            validate: validate
        });
        return validate
    }

    validate(val) {
        if (this.props.validate) {
            let valid = this.props.validate.rule.test(val);
                $('#'+this.domId).tooltip(valid?'hide':'show');
            return valid;
        }
        return true;
    }

    /*********************
     * Event
     *********************/
    changeHandler = (e) => {
        let state = {
            value: e.target?e.target.value:e,
        };

        this.setState(state, () => {
            if (typeof this.props.onChange === 'function') {
                this.props.onChange(state.value, null, this);
            }
            if (this.combo) {
                this.combo.filter(state.value);
            }
        });
    };

    blurHandler = (e) => {
        this.setState({
            validate: this.validate(e.target.value)
        })
    };

    /**
     * Combo select event
     * @param text stringminimist
     * @param row object
     */
    selectHandler = (text, row) => {
        this.setState({value: text}, () => {
            if (typeof this.props.onChange === 'function') {
                this.props.onChange(text, row, this);
            }
        });
    };

    setSelectRows(key,val) {
        if (this.props.combo) {
            this.combo.setSelectRows(key,val);
        }
    }

    keyUpHandler = (e) => {
        if (e.keyCode === 13) {
            if (typeof this.props.onEnter === 'function') {
                this.props.onEnter(e.target.value);
            }
        }
    };

    focusClearHandler = (e)=>{
        this.isFocus = true;
        if (this.clearIcon) {
            this.setState({
                icon: 'times-circle',
            });
            // this.clearIcon.setIcon('times-circle');
        }
    };

    //is multi show
    showMulti = (e) => {
        let width = this.input.offsetWidth;
        // let xy = common.GetDomXY(this.input,this.input.parentNode);
        // this.input.style.width = width+'px';
        // this.multi.classList.remove('d-none');
        // this.multi.style.left = xy.left+'px';
        // this.multi.style.top = xy.top+'px';
        // this.multi.style.width = width+'px';
        // this.multi.style.height = this.props.multi.height ?? '100px';
        // this.input.style.height = this.props.multi.height ?? '100px';
        this.input.classList.add('ck-input-multi-show','shadow');
        this.input.style.height = this.props.multi.height ?? '100px';
    };

    //is multi hide
    hideMulti = (e) => {
        this.input.style.height = 'calc(1.5em + .75rem + 2px)';
        setTimeout(()=>{
            this.input.classList.remove('ck-input-multi-show','shadow');
        },210)
    };

    blurClearHandler = ()=>{
        this.isFocus = false;
        if (this.clearIcon) {
            if (this.props.combo) {
                // this.clearIcon.setIcon('angle-down');
                this.setState({
                    icon: 'angle-down',
                });
            } else if (this.props.calendar) {
                this.setState({
                    icon: 'calendar-alt',
                });
                // this.clearIcon.setIcon('calendar-alt');
            } else {
                this.setState({
                    icon: '',
                });
            }
        }
    };

    dblHandler = (e)=> {
        if (this.calendar && !this.state.value) {
            this.calendar.setCurrentDate(new Date());
            this.setState({value:this.calendar.format()},
                () => {
                    if (typeof this.props.onChange === 'function') {
                        this.props.onChange(this.state.value, null, this);
                    }
                    this.calendar.hide();
                }
            )
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
            <label htmlFor={this.domId} className={this.props.labelClass}>{this.props.label}</label>
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
            input_icon = classNames(input_icon, 'ck-input-calendar-icon-' + this.props.size);
        }
        let lang = i18n.getLang();
        let props = {
            format:this.props.calendar?.format ?? this.props.calendarFormat,
            timeBar: this.props.calendar?.time ?? this.props.calendarTime,
        };
        return (
            <div className='ck-input-calendar'>
                <Calendar ref={c => this.calendar = c} onSelect={(val) => {
                    this.setState({
                        value: val,
                    });
                    if (this.props.onChange && typeof this.props.onChange === 'function') {
                        this.props.onChange(val, this);
                    }
                }} value={this.state.value} format={props.format} timeBar={props.timeBar}
                          lang={lang.short} none shadow absolute
                          sm={this.props.size==='xs'}
                          triangular='up'/>
                {!this.props.disabled?<div className={input_icon} onMouseDown={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    if (this.isFocus) {
                        this.changeHandler("");
                    } else {
                        this.input.focus();
                    }
                }}><Icon ref={c=>this.clearIcon=c} icon={this.state.icon}/></div>:null}
            </div>
        )
    }

    renderCombo() {
        if (!this.props.combo) {
            return null;
        }
        let input_icon = 'ck-input-calendar-icon';
        if (this.props.size) {
            input_icon = classNames(input_icon, 'ck-input-calendar-icon-' + this.props.size);
        }
        return (
            <div className='ck-input-calendar'>
                <Combo ref={c => this.combo = c} {...this.props.combo} sm={this.props.size === 'sm' || this.props.size === 'xs'}
                       data={this.state.comboData} noSearch={this.props.readOnly} onShow={()=>{}}
                       onSelect={this.selectHandler}/>
                <div className={input_icon} onMouseDown={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    if (this.isFocus) {
                        this.changeHandler("");
                        if (this.props.combo.multi) {
                            this.combo.clearMulti();
                        }
                    } else {
                        this.input.focus();
                    }
                }}><Icon ref={c=>this.clearIcon=c} icon={this.state.icon}/></div>
            </div>
        )
    }

    renderClear() {
        if (this.props.disabled || this.props.combo ||
            this.props.calendar || this.props.plaintext ||
            this.props.disableClear) {
            return null
        }
        let input_icon = 'ck-input-calendar-icon';
        if (this.props.size) {
            input_icon = classNames(input_icon, 'ck-input-calendar-icon-' + this.props.size);
        }
        return (
            <div className='ck-input-calendar'>
                <div className={input_icon} onMouseDown={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    if (this.isFocus) {
                        this.changeHandler("");
                    } else {
                        this.input.focus();
                    }
                }}><Icon ref={c=>this.clearIcon=c} icon={this.state.icon}/></div>
            </div>
        )
    }

    //build tooltip
    renderValidateTip() {
        if (this.props.validate) {
            return {
                'data-toggle':'tooltip',
                'data-placement':'right',
                'title':this.props.validate.text,
            };
        }
        return {}
    }

    render() {
        if (this.props.multi) {
            return this.renderMulti();
        }
        return (
            <div id={this.domId+'-main'} className={this.getMainClasses()} style={this.getMainStyles()} >
                {this.renderLabel()}
                <input type='text' {...this.props} ref={c => this.input = c} onBlur={this.blurHandler}
                       onChange={this.changeHandler}
                       onKeyUp={this.keyUpHandler}
                       onDoubleClick={this.dblHandler}
                       value={this.state.value??""}
                       className={this.getInputClasses()}
                       style={this.getInputStyle()}
                       id={this.domId} {...this.renderValidateTip()}/>
                {this.renderCalendar()}
                {this.renderCombo()}
                {this.renderClear()}
                {this.renderSummary()}
            </div>
        );
    }

    renderMulti() {
        return (
            <div id={this.domId+'-main'} className={this.getMainClasses()} style={this.getMainStyles()} >
                {this.renderLabel()}
                <textarea {...this.props} ref={c => this.input = c} onBlur={this.blurHandler}
                    onChange={this.changeHandler}
                    onKeyUp={this.keyUpHandler}
                    onDoubleClick={this.dblHandler}
                    value={this.state.value??""}
                    className={this.getInputClasses()}
                    style={this.getInputStyle()}
                    id={this.domId} {...this.renderValidateTip()}/>
                {this.renderClear()}
                {this.renderSummary()}
            </div>
        );
    }
}

Input.propTypes = {
    id            : PropTypes.string,
    size          : PropTypes.oneOf(['df', 'sm', 'lg', 'xs']),
    label         : PropTypes.string,
    data          : PropTypes.any,
    summary       : PropTypes.string,
    readOnly      : PropTypes.bool,
    width         : PropTypes.string,
    height        : PropTypes.string,
    placeholder   : PropTypes.string,
    calendar      : PropTypes.object,
    onChange      : PropTypes.func,
    onEnter       : PropTypes.func,
    plaintext     : PropTypes.bool,
    calendarFormat: PropTypes.string,
    calendarTime  : PropTypes.bool,
    validate      : PropTypes.object,  //{text:'',rule:/asdf/}
    disabled      : PropTypes.bool,
    combo         : PropTypes.object,
    comboData     : PropTypes.object,
    absolute      : PropTypes.bool,
    x             : PropTypes.string,
    y             : PropTypes.string,
    align         : PropTypes.string,
    textClass     : PropTypes.string,
    textStyle     : PropTypes.object,
    labelClass    : PropTypes.string,
    disableClear  : PropTypes.bool,
    multi         : PropTypes.object, //多行文本输入
};

Input.defaultProps = {
    id      : '',
    size    : 'df',
    label   : '',
    data    : null,
    summary : '',
    readOnly: false,
    disabled: false,
    disableClear: false,
};

export default Input;