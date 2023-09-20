import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import './css/Input.less';
import './css/CalendarRange.less';
import common from "./Common";
import { Calendar } from "./index";
import Button from "./Button";
import { ComponentProps, StrObject, Theme } from './components/common';

const stopEvent = function (e: Event) {
    e.stopPropagation();
};

interface Props extends ComponentProps {
    id?: string
    label?: string
    minData?: string
    maxData?: string
    days?: number
    readOnly?: boolean
    placeholderMin?: string
    placeholderMax?: string
    onChange?: (min:any,max:any) => void
    format?: string
    time?: boolean
    disabled?: boolean
    disableClear?: boolean
    labelClass?: string
    className?: string
    textClass?: string
    width?: string
    data?: string
}

interface State {
    value: string
    min: string
    max: string
    validate: boolean
    disabled: boolean
    icon: string
}

export class CalendarRange extends React.PureComponent<Props,State> {
    static propTypes = {
        id: PropTypes.string,
        label: PropTypes.string,
        minData: PropTypes.string,
        maxData: PropTypes.string,
        days: PropTypes.number,  //时间跨度 单位天
        readOnly: PropTypes.bool,
        placeholderMin: PropTypes.string,
        placeholderMax: PropTypes.string,
        onChange: PropTypes.func,
        format: PropTypes.string,
        time: PropTypes.bool,
        disabled: PropTypes.bool,
        disableClear: PropTypes.bool,
        labelClass: PropTypes.string,
        className: PropTypes.string,
        width: PropTypes.string,
    };
    static defaultProps = {
        id: '',
        size: 'df',
        label: '',
        minData: '',
        maxData: '',
        days: 30,
        summary: '',
        readOnly: false,
        disabled: false,
        disableClear: false,
        format: 'YYYY-MM-DD'
    };

    domId:string
    isFocus:boolean
    inputDom:HTMLDivElement
    inputMin:HTMLInputElement
    inputMax:HTMLInputElement
    calendar_panel:HTMLDivElement
    mainDom: HTMLDivElement
    maxCalendar:Calendar
    minCalendar:Calendar
    constructor(props:any) {
        super(props);
        this.state = {
            value: this.props.data??'',
            min: this.props.minData??'',
            max: this.props.maxData??'',
            validate: true,
            disabled: this.props.disabled??false,
            icon: 'calendar-alt',
        };

        this.domId = 'calendar-range-' + common.RandomString(16);
        if (this.props.id) {
            this.domId = this.props.id;
        }

        this.isFocus = false;
    }

    componentDidMount() {
        this.inputDom.addEventListener('focus', this.show);
        this.inputMin.addEventListener('focus', this.show);
        this.inputMax.addEventListener('focus', this.show);
        this.calendar_panel.addEventListener('mousedown', stopEvent);
        this.inputDom.addEventListener('mousedown', stopEvent);
        this.inputMin.addEventListener('mousedown', stopEvent);
        this.inputMax.addEventListener('mousedown', stopEvent);
        window.addEventListener('mousedown', this.hide, false);
        this.maxCalendar.setFailRange(new Date(this.state.min), this.props.days as number);
    }

    componentWillUnmount() {
        this.inputDom.removeEventListener('focus', this.show);
        this.inputMin.removeEventListener('focus', this.show);
        this.inputMax.removeEventListener('focus', this.show);
        this.calendar_panel.removeEventListener('focus', stopEvent);
        this.inputDom.removeEventListener('mousedown', stopEvent);
        this.inputMin.removeEventListener('mousedown', stopEvent);
        this.inputMax.removeEventListener('mousedown', stopEvent);
        window.removeEventListener('mousedown', this.hide, false);
    }

    UNSAFE_componentWillReceiveProps(nextProps:Props) {
        if (this.state.min !== nextProps.minData ||
            this.state.max !== nextProps.maxData) {
            this.setState({
                min: nextProps.minData as string,
                max: nextProps.maxData as string,
            })
        }
    }

    getClasses() {
        const base = 'form-group ck-calendar-range';
        return classNames(base, this.props.className);
    }

    getMainStyles() {
        //default style
        const base:StrObject = { "position": "relative" };
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

    getInputClasses(append:string) {
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
        this.calendar_panel.style.top = this.mainDom.offsetHeight + 'px'
        this.minCalendar.refreshWidth();
        this.maxCalendar.refreshWidth();
    }

    hide = () => {
        this.calendar_panel.classList.remove('d-flex')

    }

    changeHandler = () => {
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(this.state.min, this.state.max)
        }
    }

    clearHandler = () => {
        this.setState({
            min: '',
            max: '',
        }, () => {
            this.changeHandler();
        })
    }

    render() {
        return (
            <div ref={c => { this.mainDom = c as HTMLDivElement }} id={this.domId} className={this.getClasses()} style={this.getMainStyles()}>
                {this.renderLabel()}
                <div ref={c => { this.inputDom = c as HTMLDivElement }} className={this.getInputClasses('')} tabIndex={1}>
                    <input ref={c => this.inputMin = c as HTMLInputElement} disabled value={this.state.min} className='c-input w-50 text-center' placeholder={this.props.placeholderMin ?? this.props.format} />
                    <span>{'\u0020-\u0020'}</span>
                    <input ref={c => this.inputMax = c as HTMLInputElement} disabled value={this.state.max} className='c-input w-50 text-center' placeholder={this.props.placeholderMax ?? this.props.format} />
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
        return <div ref={c => this.calendar_panel = c as HTMLDivElement} className='c-panel d-none p-1 shadow rounded'>
            <Calendar ref={(c:any) => this.minCalendar = c} target={this.inputMin} value={this.state.min} onSelect={(val:any) => {
                let max = this.state.max;
                const flag = this.maxCalendar.setFailRange(new Date(val), this.props.days as number);
                if (!flag) {
                    max = '';
                }
                this.setState({
                    min: val,
                    max: max,
                }, () => {
                    this.changeHandler();
                })
            }} />
            <Calendar ref={(c:any) => this.maxCalendar = c} target={this.inputMax} value={this.state.max} onSelect={(val:any) => {
                this.setState({
                    max: val
                }, () => {
                    this.changeHandler();
                })
            }} />
            <div className='d-flex flex-column'>
                <Button className='ml-1 mt-1' size='sm' theme={Theme.danger} icon='trash-alt' tip='清除选择' onClick={this.clearHandler} />
                <Button className='ml-1 mt-auto' size='sm' theme={Theme.secondary} icon='times-circle' tip='关闭' onClick={this.hide} />
            </div>
        </div>
    }
}

export default CalendarRange;