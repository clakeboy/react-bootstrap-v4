import React, { KeyboardEvent } from 'react';
import classNames from 'classnames/bind';
import common from './Common';
import Calendar, { format } from './Calendar';
import Combo, { ComboProps } from './Combo';
import Icon, { IconRef } from './Icon';
import i18n from './components/i18n';

import './css/Input.less';
import { ComponentProps, StrObject } from './components/common';
import { Tooltip } from 'bootstrap';
const stopEvent = function (e: Event) {
  e.stopPropagation();
};

interface CalendarProps {
  format?: string;
  time?: boolean;
  limit?: { lt?: string; gt?: string };
}

export interface ValidateProps {
  text?: string;
  rule?: RegExp | ((val: string) => boolean);
  tip?: boolean;
}

interface Props extends ComponentProps {
  label?: any;
  type?: string;
  data?: any;
  summary?: string;
  readOnly?: boolean;
  locked?: boolean | string;
  placeholder?: string;
  calendar?: CalendarProps; //{format:'',time:false,limit:{lt:'',gt:''}}
  onChange?: (val: any, row: any, obj?: any) => void;
  onEnter?: (val: any) => void;
  onDblClick?: () => void;
  plaintext?: boolean;
  calendarFormat?: string;
  calendarTime?: boolean;
  validate?: ValidateProps; //{text:'',rule:/asdf/,tip:false}
  disabled?: boolean;
  combo?: ComboProps;
  comboData?: any;
  align?: string;
  textClass?: string;
  textStyle?: StrObject;
  labelClass?: string;
  disableClear?: boolean;
  multi?: { height?: string }; //
  max?: any;
  min?: any;
  underline?: boolean
  color?: string
  hidden?: boolean //是否隐藏
  onFormat?: (val: any) => any; //格式化数据
}

interface State {
  value: any;
  validate: boolean;
  disabled: boolean;
  comboData: any;
  icon: string;
  originValue: any;
}

export class Input extends React.Component<Props, State> {
  static defaultProps = {
    size: 'df',
    label: '',
    data: null,
    summary: '',
    readOnly: false,
    disabled: false,
    disableClear: false,
  };

  domId: string;
  isFocus: boolean;
  input: HTMLInputElement;
  calendar: Calendar;
  combo: Combo;
  clearIcon: IconRef;
  tip: Tooltip;
  mainDom: HTMLElement;
  constructor(props: any) {
    super(props);

    this.state = {
      value: this.formatValue(this.props.data),
      validate: true,
      disabled: this.props.disabled ?? false,
      comboData: this.props.comboData,
      icon: this.props.combo ? 'angle-down' : this.props.calendar ? 'calendar-alt' : '',
      originValue: this.props.data,
    };

    this.domId = this.props.id ?? 'input-' + common.RandomString(16);

    this.isFocus = false;
  }

  componentDidMount() {
    if (this.props.calendar) {
      this.input.addEventListener(
        'focus',
        (e) => {
          if (!this.props.disabled && !this.props.locked) {
            this.calendar.show(e.currentTarget as HTMLElement);
          }
        },
        false
      );

      // $(ReactDOM.findDOMNode(this.input)).on('focus', (e) => {
      //     this.calendar.show(e.currentTarget);
      // });
      // $(ReactDOM.findDOMNode(this.input)).on('mousedown', (e) => {
      //     e.stopPropagation();
      // });
    }
    if (this.props.combo) {
      this.input.addEventListener(
        'focus',
        (e) => {
          this.combo.show(this.state.value, e.currentTarget as HTMLElement);
        },
        false
      );
    }
    this.input.addEventListener('focus', this.focusClearHandler, false);
    this.input.addEventListener('blur', this.blurClearHandler, false);
    this.input.addEventListener('blur', this.blurHandler, false);
    this.input.addEventListener('mousedown', stopEvent, false);
    if (this.props.validate && this.props.validate?.tip) {
      this.tip = new Tooltip(document.getElementById(this.domId) as HTMLElement, {
        trigger: 'manual',
        template:
          '<div class="tooltip ck-input-tip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner bg-danger"></div></div>',
      })
    }

    if (this.props.multi) {
      this.input.addEventListener('focus', this.showMulti, false);
      this.input.addEventListener('blur', this.hideMulti, false);
    }
  }

  componentWillUnmount() {
    if (this.props.validate && this.props.validate?.tip) {
      this.tip.hide()
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    this.setState({
      value: this.formatValue(nextProps.data),
      originValue: nextProps.data,
      comboData: nextProps.comboData,
    });
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    if (nextProps.comboData !== this.props.comboData) {
      return true;
    }
    if (nextProps.disabled !== this.props.disabled) {
      return true;
    }
    if (nextProps.hidden !== this.props.hidden) {
      return true;
    }
    if (nextProps.locked !== this.props.locked) {
      return true;
    }
    if (nextProps.label !== this.props.label) {
      return true;
    }
    if (nextState.validate !== this.state.validate) {
      return true;
    }
    if (nextState.icon !== this.state.icon) {
      return true;
    }
    return nextState.value !== this.state.value;
  }

  formatValue(val: string) {
    if (this.props.calendar && val) {
      //判断是否是日期格式
      if (isNaN((new Date(val)).getTime())) {
        return val
      }
      val = format(this.props.calendar?.format ?? this.props.calendarFormat ?? '', new Date(val))
    } else if (this.props.onFormat && val) {
      val = this.props.onFormat(val);
    }
    return val
  }

  getValue() {
    return this.state.value;
  }

  setValue(val: any) {
    this.setState({ value: val });
  }

  getMainClasses() {
    let base = this.props.label ? 'mb-3' : '';
    if (this.props.hidden) {
      base = classNames(base, 'd-none');
    }
    return classNames(base, this.props.className);
  }

  getMainStyles() {
    //default style
    const base: StrObject = { position: 'relative' };
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
      if (this.props.multi) {
        base.height = 'calc(1.5em + .75rem + 2px)'
      }
    }
    return common.extend(base, this.props.style);
  }

  getInputClasses(append: string) {
    let base = 'form-control ck-input';
    //readonly
    if (this.props.plaintext) {
      base = 'form-control-plaintext';
      // this.props.readOnly = true;
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
        size = '';
    }

    base = classNames(base, size);

    if (!this.state.validate) {
      base = classNames(base, 'ck-input-valid');
    }

    if ((this.props.calendar || this.props.combo || this.state.icon) && (!this.state.disabled && !this.props.locked)) {
      base = classNames(base, 'ck-input-icon');
    }

    if (this.props.readOnly && (this.props.calendar || this.props.combo)) {
      base = classNames(base, 'ck-input-select');
    }

    if (this.props.align) {
      if (this.props.align === 'left') {
        base = classNames(base, `text-start`);
      } else if (this.props.align === 'right') {
        base = classNames(base, `text-end`);
      } else {
        base = classNames(base, `text-${this.props.align}`);
      }
    }

    if (this.props.multi) {
      base = classNames(base, `ck-input-multi`);
    }

    if (this.props.underline) {
      base = classNames(base, 'ck-input-underline');
    }

    return classNames(base, this.props.textClass, append);
  }

  getInputStyle() {
    const base: StrObject = {};
    if (this.props.width) {
      base.width = this.props.width;
    }
    if (this.props.height) {
      base.height = this.props.height;
    } else if (this.props.multi) {
      base.height = 'calc(1.5em + .75rem + 2px)';
    }
    if (this.props.color) {
      base.color = this.props.color;
    }
    return common.extend(base, this.props.textStyle);
  }

  check(flag?: boolean) {
    const validate = flag ?? this.validate(this.state.value);
    this.setState({
      validate: validate,
    });
    return validate;
  }

  validate(val: string) {
    if (this.props.validate) {
      const vali = this.props.validate;
      let valid: boolean;
      if (typeof vali.rule === 'function') {
        valid = vali.rule(val);
      } else {
        valid = (vali.rule as RegExp).test(val);
      }
      if (vali.tip) {
        if (valid) {
          this.tip.hide()
        } else {
          this.tip.show()
        }
        // $('#' + this.domId).tooltip(valid ? 'hide' : 'show');
      }
      return valid;
    }
    return true;
  }

  /*********************
   * Event
   *********************/
  changeHandler = (e: any) => {
    const state = {
      value: e.target ? e.target.value : e,
      originValue: e.target ? e.target.value : e,
    };

    this.setState(state, () => {
      if (typeof this.props.onChange === 'function'
        && !this.props.calendar 
        && !this.props.onFormat) {
        this.props.onChange(state.value, null, this);
      }
      if (this.combo) {
        this.combo.filter(state.value);
      }
    });
  };

  blurHandler = (e: FocusEvent) => {
    this.setState({
      validate: this.validate((e.target as HTMLInputElement).value),
      value: this.formatValue(this.state.originValue),
    },()=>{
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(this.state.originValue, null, this);
      }
    });
  };

  /**
   * Combo select event
   * @param text stringminimist
   * @param row object
   */
  selectHandler = (text: string, row: any) => {
    this.setState({ value: text }, () => {
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(text, row, this);
      }
    });
  };

  setSelectRows(key: any, val: any) {
    if (this.props.combo) {
      this.combo.setSelectRows(key, val);
    }
  }

  keyUpHandler = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (typeof this.props.onEnter === 'function') {
        this.props.onEnter((e.target as HTMLInputElement).value);
      }
    }
  };

  focusClearHandler = () => {
    this.isFocus = true;
    if (this.clearIcon) {
      this.setState({
        icon: 'times-circle',
      });
      // this.clearIcon.setIcon('times-circle');
    }
    if (this.props.onFormat) {
      this.setState({
        value: this.state.originValue
      });
    }
  };

  //is multi show
  showMulti = () => {
    // let width = this.input.offsetWidth;
    // let xy = common.GetDomXY(this.input,this.input.parentNode);
    // this.input.style.width = width+'px';
    // this.multi.classList.remove('d-none');
    // this.multi.style.left = xy.left+'px';
    // this.multi.style.top = xy.top+'px';
    // this.multi.style.width = width+'px';
    // this.multi.style.height = this.props.multi.height ?? '100px';
    // this.input.style.height = this.props.multi.height ?? '100px';

    this.input.style.width = window.getComputedStyle(this.input).width;
    this.input.classList.add('ck-input-multi-show', 'shadow');

    this.input.style.height = this.props?.multi?.height ?? '100px';
  };

  //is multi hide
  hideMulti = () => {
    this.input.style.height = 'calc(1.5em + .75rem + 2px)';
    setTimeout(() => {
      this.input.classList.remove('ck-input-multi-show', 'shadow');
      this.input.style.width = '100%'
    }, 210);
  };

  blurClearHandler = () => {
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
  /**
   * input dblclick event
   * @param e
   */
  dblHandler = () => {
    if (this.calendar && !this.state.value) {
      this.calendar.setCurrentDate(new Date());
      this.setState({ value: this.calendar.format() }, () => {
        if (typeof this.props.onChange === 'function') {
          this.props.onChange(this.state.value, null, this);
        }
        this.calendar.hide();
      });
    }
  };

  mainDblHandler = () => {
    if (typeof this.props.onDblClick === 'function') {
      this.props.onDblClick();
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
      <label htmlFor={this.domId} className={'form-label ' + this.props.labelClass}>
        {this.props.label}
      </label>
    );
  }

  renderSummary() {
    if (!this.state.validate && !this.props?.validate?.tip) {
      return (
        <div className="invalid-feedback" style={{ display: 'block' }}>
          {this.props?.validate?.text}
        </div>
      );
    }
    if (!this.props.summary) {
      return null;
    }
    return <small className="form-text text-muted text-truncate">{this.props.summary}</small>;
  }

  renderCalendar() {
    if (!this.props.calendar || this.props.locked) {
      return null;
    }
    let input_icon = 'ck-input-calendar-icon';
    if (this.props.size) {
      input_icon = classNames(input_icon, 'ck-input-calendar-icon-' + this.props.size);
    }
    const lang = i18n.getLang();
    const props = {
      format: this.props.calendar?.format ?? this.props.calendarFormat,
      timeBar: this.props.calendar?.time ?? this.props.calendarTime,
      limit: this.props.calendar?.limit,
    };
    return (
      <div className="ck-input-calendar">
        <Calendar
          ref={(c: any) => (this.calendar = c)}
          onSelect={(val: any) => {
            this.setState({
              value: val,
            });
            if (this.props.onChange && typeof this.props.onChange === 'function') {
              this.props.onChange(val, this);
            }
          }}
          value={this.state.value}
          format={props.format}
          timeBar={props.timeBar}
          limit={props.limit}
          lang={lang.short}
          none
          shadow
          absolute
          sm={this.props.size === 'xs'}
          triangular="up"
        />
        {(!this.props.disabled && !this.props.locked) ? (
          <div
            className={input_icon}
            onMouseDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
              if (this.isFocus) {
                this.changeHandler('');
              } else {
                this.input.focus();
              }
            }}>
            <Icon ref={(c: any) => (this.clearIcon = c)} icon={this.state.icon} />
          </div>
        ) : null}
      </div>
    );
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
      <div className="ck-input-calendar">
        <Combo
          ref={(c: any) => (this.combo = c)}
          {...this.props.combo}
          sm={this.props.size === 'sm' || this.props.size === 'xs'}
          data={this.state.comboData}
          noSearch={this.props.readOnly}
          onShow={() => { }}
          onSelect={this.selectHandler}
        />
        <div
          className={input_icon}
          onMouseDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
            if (this.isFocus) {
              this.changeHandler('');
              if (this.props?.combo?.multi) {
                this.combo.clearMulti();
              }
            } else {
              this.input.focus();
            }
          }}>
          <Icon ref={(c: any) => (this.clearIcon = c)} icon={this.state.icon} />
        </div>
      </div>
    );
  }

  renderClear() {
    if (
      this.props.disabled ||
      this.props.combo ||
      this.props.calendar ||
      this.props.plaintext ||
      this.props.disableClear ||
      this.props.readOnly ||
      this.props.locked
    ) {
      return null;
    }
    let input_icon = 'ck-input-calendar-icon';
    if (this.props.size) {
      input_icon = classNames(input_icon, 'ck-input-calendar-icon-' + this.props.size);
    }
    return (
      <div className="ck-input-calendar">
        <div
          className={input_icon}
          onMouseDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
            if (this.isFocus) {
              this.changeHandler('');
            } else {
              this.input.focus();
            }
          }}>
          <Icon ref={(c: any) => (this.clearIcon = c)} icon={this.state.icon} />
        </div>
      </div>
    );
  }

  //build tooltip
  renderValidateTip() {
    if (this.props.validate) {
      return {
        'data-toggle': 'tooltip',
        'data-placement': 'right',
        title: this.props.validate.text,
      };
    }
    return {};
  }

  renderDisableMask() {
    if (!this.props.disabled || !this.props.onDblClick) return null;
    return <div className="position-absolute w-100 h-100" style={{ top: 0, left: 0 }}></div>;
  }

  render() {
    if (this.props.multi) {
      return this.renderMulti();
    }
    const inputProps: Props = { ...this.props }
    delete inputProps.absolute
    delete inputProps.disableClear
    delete inputProps.calendar
    delete inputProps.plaintext
    delete inputProps.onDblClick
    delete inputProps.calendarTime
    delete inputProps.calendarFormat
    delete inputProps.comboData
    delete inputProps.underline
    if (this.props.locked) {
      inputProps.readOnly = true;
      inputProps.locked = "true";
    }
    const val: string = this.state.value ?? '';

    return (
      <div ref={(c: any) => { this.mainDom = c }}
        id={this.domId + '-main'}
        className={this.getMainClasses()}
        style={this.getMainStyles()}
        onDoubleClick={this.mainDblHandler}>
        {this.renderLabel()}
        {this.renderDisableMask()}
        <input
          type="text"
          autoComplete='off'
          {...inputProps}
          size={undefined}
          ref={(c: any) => (this.input = c)}
          onChange={this.changeHandler}
          onKeyUp={this.keyUpHandler}
          onDoubleClick={this.dblHandler}
          value={val}
          className={this.getInputClasses('')}
          style={this.getInputStyle()}
          id={this.domId}
          {...this.renderValidateTip()}
        />
        {this.renderCalendar()}
        {this.renderCombo()}
        {this.renderClear()}
        {this.renderSummary()}
      </div>
    );
  }

  renderMulti() {
    return (
      <div id={this.domId + '-main'} ref={(c: any) => { this.mainDom = c }} className={this.getMainClasses()} style={this.getMainStyles()}>
        {this.renderLabel()}
        <textarea
          {...this.props}
          ref={(c: any) => (this.input = c)}
          onChange={this.changeHandler}
          onKeyUp={this.keyUpHandler}
          onDoubleClick={this.dblHandler}
          value={this.state.value ?? ''}
          className={this.getInputClasses('')}
          style={this.getInputStyle()}
          id={this.domId}
          {...this.renderValidateTip()}
        />
        {/* {this.renderClear()} */}
        {this.renderSummary()}
      </div>
    );
  }
}

export default Input;
