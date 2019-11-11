import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import common from './Common';
import Calendar from './Calendar';
import Combo from './Combo';
import Icon from "./Icon";
import i18n from './components/i18n';

import './css/Input.less';

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value    : this.props.data,
            validate : true,
            disabled : this.props.disabled,
            comboData: this.props.comboData
        };

        this.domId = 'input-' + common.RandomString(16);
        if (this.props.id) {
            this.domId = this.props.id;
        }

        //combo show

    }

    componentDidMount() {
        if (this.props.calendar) {
            this.input.addEventListener('focus', (e) => {
                this.calendar.show(e.currentTarget);
            }, false);
            this.input.addEventListener('mousedown', (e) => {
                e.stopPropagation();
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
            this.input.addEventListener('mousedown', (e) => {
                e.stopPropagation();
            }, false);
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

    getInputClasses() {
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

        return classNames(base, this.props.textClass);
    }

    getInputStyle() {
        let base = {};
        if (this.props.width) {
            base.width = this.props.width;
        }
        if (this.props.height) {
            base.height = this.props.height;
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
            return this.props.validate.rule.test(val);
        }
        return true;
    }

    /*********************
     * Event
     *********************/
    changeHandler = (e) => {
        let state = {
            value: e.target.value
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
            input_icon = classNames(input_icon, 'ck-input-calendar-icon-' + this.props.size);
        }
        let lang = i18n.getLang();
        return (
            <div className='ck-input-calendar'>
                <Calendar ref={c => this.calendar = c} onSelect={(val) => {
                    this.setState({
                        value: val,
                    });
                    if (this.props.onChange && typeof this.props.onChange === 'function') {
                        this.props.onChange(val, this);
                    }
                }} value={this.state.value} format={this.props.calendarFormat}
                          lang={lang.short} none shadow absolute
                          sm={this.props.size==='xs'}
                          triangular='up'/>
                <div className={input_icon} onClick={() => {
                    this.input.focus();
                }}><Icon iconType='regular' icon='calendar-alt'/></div>
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
                <div className={input_icon} onClick={() => {
                    this.input.focus();
                }}><Icon icon='angle-down'/></div>
            </div>
        )
    }

    render() {
        return (
            <div className={this.getMainClasses()} style={this.getMainStyles()}>
                {this.renderLabel()}
                <input type='text' {...this.props} ref={c => this.input = c} onBlur={this.blurHandler}
                       onChange={this.changeHandler}
                       onKeyUp={this.keyUpHandler}
                       value={this.state.value}
                       className={this.getInputClasses()}
                       style={this.getInputStyle()}
                       id={this.domId}/>
                {this.renderCalendar()}
                {this.renderCombo()}
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
    calendar      : PropTypes.bool,
    onChange      : PropTypes.func,
    onEnter       : PropTypes.func,
    plaintext     : PropTypes.bool,
    calendarFormat: PropTypes.string,
    validate      : PropTypes.object,  //{text:'',rule:/asdf/}
    disabled      : PropTypes.bool,
    combo         : PropTypes.object,
    comboData     : PropTypes.object,
    absolute      : PropTypes.bool,
    x             : PropTypes.string,
    y             : PropTypes.string,
    align         : PropTypes.string,
    textClass     : PropTypes.string,
    textStyle     : PropTypes.object
};

Input.defaultProps = {
    id      : '',
    size    : 'df',
    label   : '',
    data    : null,
    summary : '',
    readOnly: false,
    disabled: false
};

export default Input;