import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import './css/Calender.less';
import Icon from './Icon';
import common, { strpad } from './Common';
import Scroll from "./Scroll";
import { ComponentProps } from './components/common';
const i18n:{[propName:string]:any} = {
    'zh': {
        'week': [
            '日',
            '一',
            '二',
            '三',
            '四',
            '五',
            '六',
        ],
        'month': [
            '一月',
            '二月',
            '三月',
            '四月',
            '五月',
            '六月',
            '七月',
            '八月',
            '九月',
            '十月',
            '十一月',
            '十二月',
        ],
        'time': {
            'hour': '时',
            'min': '分',
            'sec': '秒',
            'time': '时间',
            'confirm': '确定',
        }
    },
    'en': {
        'week': [
            'Su',
            'Mo',
            'Tu',
            'We',
            'Th',
            'Fr',
            'Sa',
        ],
        'month': [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ],
        'time': {
            'hour': 'hour',
            'min': 'min',
            'sec': 'sec',
            'time': 'time',
            'confirm': 'Confirm',
        }
    }
};

interface Props extends ComponentProps {
    none?: boolean
    shadow?: boolean
    value?: string
    lang?: string
    onSelect?: any
    triangular?: 'up' | 'left' | 'bottom' | 'right'
    format?: string
    sm?: boolean
    timeBar?: boolean
    target?: HTMLElement
    limit?: { lt?: any, gt?: any } //{lt:'',gt:''}
}

interface State {
    days: any[][]
    month: boolean
    year: boolean
    time: boolean
    hour: string
    minute: string
    second: string
}

export class Calendar extends React.PureComponent<Props, State, any> {

    static defaultProps = {
        lang: 'zh',
        format: 'YYYY-MM-DD'//unix,
    }

    yearSpan = 30
    panelIsOpen = false
    isClose = true
    hours: string[]
    minute: string[]
    sec: string[]
    current_date: Date
    parentDom: HTMLElement
    failRange?: { start: any, end: any }
    domId: string
    show_date: Date
    mainDom: HTMLDivElement
    constructor(props: any) {
        super(props);

        this.setCurrentDate(this.props.value ?? '');

        this.hours = [...Array(24).keys()].map((item, idx) => {
            return strpad(idx.toString(), 2, '0');
        });
        this.minute = [...Array(60).keys()].map((item, idx) => {
            return strpad(idx.toString(), 2, '0');
        });
        this.sec = this.minute.slice();

        this.parentDom = this.props.target as HTMLElement;

        this.failRange = this.initFailRange(this.props.limit);
        // this.failRange = {
        //     start: null,
        //     end: null
        // };
        this.domId = 'cale-' + common.RandomString(8);

        this.state = {
            days: this.fillDateList(),
            month: false,
            year: false,
            time: false,
            hour: '00',
            minute: '00',
            second: '00'
        };
    }

    componentWillUnmount() {
        // $(window).off('mousedown',this.hide);
        window.removeEventListener('mousedown', this.hide, false);
        if (this.props.absolute) {
            window.removeEventListener('scroll', this.fixPosition, true);
        }
        if (this.parentDom) {
            this.parentDom.removeEventListener('blur', this.hide, false);
            this.parentDom.removeEventListener('keypress', this.keyPressHandler, false);
            this.parentDom.removeEventListener('click', this.checkShow, false);
        }
        this.unTouchScrollHandler()
    }

    componentDidUpdate(): void {
        if (this.state.time) {
            this.touchScrollHandler();
        }
        const is_open = this.state.year || this.state.month;
        if (is_open && !this.panelIsOpen) {
            this.panelIsOpen = true;
            this.locatePanel();
        } else if (!is_open) {
            this.panelIsOpen = false;
        }
    }

    locatePanel() {
        const panel = document.getElementById(this.domId + '-panel');
        const active = panel?.querySelector('.active') as HTMLElement | null;
        if (panel && active) {
            panel.scrollTop = active.offsetTop - (panel.clientHeight - active.offsetHeight) / 2;
        }
    }

    UNSAFE_componentWillReceiveProps(nextProp: Props) {
        if (this.props.value !== nextProp.value) {
            this.setCurrentDate(nextProp.value);
            this.setState({
                days: this.fillDateList(),
                hour: this.current_date.getHours().toString().padStart(2,'0'),
                minute: this.current_date.getMinutes().toString().padStart(2,'0'),
                second: this.current_date.getSeconds().toString().padStart(2,'0')
            });
        }
    }

    isTimeBar() {
        if (this.props.format?.includes("HH")) {
            return true
        }
        return this.props.timeBar
    }

    initFailRange(limit?: { lt?: any, gt?: any }) {
        if (!limit) return undefined
        return {
            start: limit?.gt ? new Date(limit.gt) : null,
            end: limit?.lt ? new Date(limit.lt) : null
        }
    }

    keyPressHandler = (e: any) => {
        if (e.keyCode === 13) {
            this.autoComplete(e.target.value);
        }
    };

    setCurrentDate(value: any) {
        if (value) {
            if (/^\d{1,10}$/.test(value)) {
                this.current_date = new Date(value * 1000);
            } else if (/^\d{1,2}(\.|-|\/)\d{1,2}$/g.test(value)) {
                const arr = value.split(/\.|-|\//);
                const month = parseInt(arr[0]);
                const day = parseInt(arr[1]);
                const currDate = new Date();
                currDate.setMonth(month - 1);
                currDate.setDate(day);
                this.current_date = currDate;
            } else {
                this.current_date = new Date(value);
            }
            if (this.current_date.toDateString() === "Invalid Date") {
                this.current_date = new Date();
            }
        } else {
            this.current_date = new Date();
        }
        this.show_date = new Date(this.current_date);
    }

    fillDateList() {
        const first = new Date(
            this.show_date.getFullYear(),
            this.show_date.getMonth(),
            1,
        );
        first.setDate(first.getDay() === 0 ? -7 : -first.getDay());
        const count = 42;
        const date = []
        let week: ({value:number,disabled:boolean}|undefined)[] = new Array(7);
        for (let i = 1; i <= count; i++) {
            first.setDate(first.getDate() + 1);
            const day = {
                value: first.getDate(),
                disabled: this.show_date.getMonth() !== first.getMonth(),
            };
            
            if (!day.disabled && this.failRange) {
                if (this.failRange.start && first < this.failRange.start) {
                    day.disabled = true;
                }

                if (this.failRange.end && first > this.failRange.end) {
                    day.disabled = true;
                }
            }
            week[first.getDay()] = day
            if (first.getDay() === 6) {
                date.push(week);
                week = new Array(7);
            }
        }
        return date;
    }

    privMonth() {
        this.setMonth(this.show_date.getMonth() - 1)
    }

    nextMonth() {
        this.setMonth(this.show_date.getMonth() + 1)
    }

    setMonth(month:any) {
        // console.log(month);
        // console.log(this.show_date.toLocaleDateString());
        this.show_date.setDate(1);
        this.show_date.setMonth(month);
        // console.log(this.show_date.toLocaleDateString());
        // console.log("set month:",this.show_date.getMonth());
        this.setState({
            days: this.fillDateList(),
            month: false,
            year: false,
        });
    }

    setYear(year:any) {
        this.show_date.setFullYear(year)
        this.setState({
            days: this.fillDateList(),
            month: false,
            year: false,
        });
    }

    setFailRange(start_date:Date, days:number) {
        if (!start_date.valueOf()) {
            start_date = new Date();
        }
        start_date.setDate(start_date.getDate() - 1);
        const start = new Date(start_date);
        const end = new Date(start_date);
        const showMonth = new Date(start_date);
        showMonth.setDate(showMonth.getDate() + 1);
        end.setDate(end.getDate() + days)
        this.failRange = {
            start: start,
            end: end,
        }
        this.show_date = showMonth;

        this.setState({
            days: this.fillDateList()
        });

        return !(this.current_date <= start ||
            this.current_date > end);
    }

    choseDay(year:any, month:any, day:any) {
        const date = new Date(year, month, day,parseInt(this.state.hour),parseInt(this.state.minute),parseInt(this.state.second));
        this.setCurrentDate(date);
        this.setState({
            days: this.fillDateList()
        });
        if (typeof this.props.onSelect === 'function') {
            this.props.onSelect(this.format());
        }
        if (this.props.absolute) {
            this.hide();
        }
    }

    selectTimeHandler = () => {
        this.setState({
            month: false,
            year: false,
            time: !this.state.time,
        }, () => {
            if (!this.state.time) {
                if (typeof this.props.onSelect === 'function')
                    this.props.onSelect(this.format());
            }
        });
    };

    format(formatStr?:string) {
        const time_str = formatStr ?? this.props.format as string;
        
        return format(time_str,this.show_date);
    }

    hide = (e?:Event) => {
        if (e && e.type === 'blur') {
            this.autoComplete((e?.target as HTMLInputElement).value);
        }
        // $(ReactDOM.findDOMNode(this)).hide();
        this.mainDom.classList.add('ck-calendar-none');
        this.isClose = true;
        window.removeEventListener('mousedown', this.hide, false);
        if (this.props.absolute) {
            window.removeEventListener('scroll', this.fixPosition, true);
        }
        // this.parentDom.removeEventListener('blur',this.hide,false);
        // this.parentDom.removeEventListener('click',this.checkShow,false);
        // this.parentDom.removeEventListener('keypress',this.keyPressHandler,false);
    };

    show(dom:HTMLElement) {
        this.parentDom = dom;
        this.isClose = false;
        // document.querySelectorAll('.ck-calendar-absolute').forEach((item)=>{
        //     item.classList.add('ck-calendar-none');
        // });
        if (this.props.absolute) {
            window.addEventListener('mousedown', this.hide, false);
            window.addEventListener('scroll', this.fixPosition, true);
            this.mainDom.classList.remove('ck-calendar-none');
            this.fixPosition();
        }
        this.parentDom.addEventListener('blur', this.hide, false);
        this.parentDom.addEventListener('click', this.checkShow, false);
        this.parentDom.addEventListener('keypress', this.keyPressHandler, false);
    }

    fixPosition = () => {
        if (!this.parentDom || !this.mainDom) {
            return
        }
        const rect = this.parentDom.getBoundingClientRect();
        const scrollX = window.scrollX || document.documentElement.scrollLeft;
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        
        this.mainDom.style.left = (rect.left + scrollX) + 'px';
        
        const calendarHeight = this.mainDom.offsetHeight;
        if (rect.bottom + calendarHeight > window.innerHeight) {
            this.mainDom.style.top = (rect.top + scrollY - calendarHeight) + 'px';
            this.mainDom.classList.remove('ck-calendar-up');
            this.mainDom.classList.add('ck-calendar-bottom');
            if (this.props.sm) {
                this.mainDom.classList.remove('ck-calendar-up-sm');
                this.mainDom.classList.add('ck-calendar-bottom-sm');
            }
        } else {
            this.mainDom.style.top = (rect.bottom + scrollY) + 'px';
            this.mainDom.classList.remove('ck-calendar-bottom');
            this.mainDom.classList.add('ck-calendar-up');
            if (this.props.sm) {
                this.mainDom.classList.remove('ck-calendar-bottom-sm');
                this.mainDom.classList.add('ck-calendar-up-sm');
            }
        }
    }

    checkShow = () => {
        if (this.isClose) {
            this.show(this.parentDom);
        }
    };

    autoComplete(val:string) {
        const reg = /^\d{1,2}(\.|-|\/)\d{1,2}$/g;
        if (reg.test(val)) {
            const arr = val.split(/\.|-|\//);
            const month = parseInt(arr[0]);
            const day = parseInt(arr[1]);
            if (month < 1 || month > 12) {
                return
            }
            if (day < 1 || day > 31) {
                return
            }
            const currDate = new Date();
            currDate.setMonth(month - 1);
            currDate.setDate(day);
            this.setCurrentDate(currDate)
            if (typeof this.props.onSelect === 'function') {
                this.props.onSelect(this.format());
            }
        } else if (val === '') {
            if (typeof this.props.onSelect === 'function') {
                this.props.onSelect("");
            }
        }
    }

    getClasses() {
        let base = 'ck-calendar calendar-v2-main';
        //display none
        if (this.props.none) {
            base = classNames(base, 'ck-calendar-none');
        }
        //shadow
        if (this.props.shadow) {
            base = classNames(base, 'ck-shadow');
        }
        //absolute
        if (this.props.absolute) {
            base = classNames(base, 'ck-calendar-absolute');
        }
        //triangular
        if (this.props.triangular) {
            const cls = 'ck-calendar-' + this.props.triangular;
            base = classNames(base, cls);
            if (this.props.sm) {
                base = classNames(base, cls + '-sm');
            }
        }
        return classNames(base, this.props.className);
    }

    getSizeClass() {
        if (this.props.sm || this.props.size === 'sm') {
            return 'sm';
        }
        if (this.props.size === 'lg') {
            return 'lg';
        }
        return '';
    }


    touchStartX: number;
    touchStartY: number;
    touchScrollX: number;
    touchScrollY: number;

    touchStartHandler = (e: TouchEvent) => {
        if (e.touches.length === 1 && e.currentTarget) {
            const touch = e.touches[0];
            const dom = e.currentTarget as HTMLElement
            this.touchStartX = touch.pageX;
            this.touchStartY = touch.pageY;
            this.touchScrollX = dom.scrollLeft
            this.touchScrollY = dom.scrollTop
        }
    }

    touchMoveHandler = (e: TouchEvent) => {
        if (e.touches.length === 1 && e.currentTarget) {
            e.preventDefault();
            const dom = e.currentTarget as HTMLElement
            const touch = e.touches[0];
            const diffX = this.touchStartX - touch.pageX;
            const diffY = this.touchStartY - touch.pageY;
            dom.scrollTo({
                left: this.touchScrollX + diffX,
                top: this.touchScrollY + diffY,
                behavior: 'auto'
            })
            // this.mainDom.scrollLeft = this.touchScrollX + diffX;
            // this.mainDom.scrollTop = this.touchScrollY + diffY;
        }
    }
    //touch scroll event
    touchScrollHandler() {
        if (!this.isTimeBar()) return
        if ('ontouchstart' in document.documentElement) {
            const hdom = document.querySelector<HTMLDivElement>('#'+this.domId + '-h')
            hdom?.addEventListener('touchstart', this.touchStartHandler)
            hdom?.addEventListener('touchmove', this.touchMoveHandler)
            const mdom = document.querySelector<HTMLDivElement>('#'+this.domId + '-m')
            mdom?.addEventListener('touchstart', this.touchStartHandler)
            mdom?.addEventListener('touchmove', this.touchMoveHandler)
            const sdom = document.querySelector<HTMLDivElement>('#'+this.domId + '-s')
            sdom?.addEventListener('touchstart', this.touchStartHandler)
            sdom?.addEventListener('touchmove', this.touchMoveHandler)
            // this.mainDom.addEventListener('touchstart', this.touchStartHandler);
            // this.mainDom.addEventListener('touchmove', this.touchMoveHandler)
        }
    }

    unTouchScrollHandler() {
        if (!this.isTimeBar()) return
        if ('ontouchstart' in document.documentElement) {
            const hdom = document.querySelector<HTMLDivElement>('#'+this.domId + '-h')
            hdom?.removeEventListener('touchstart', this.touchStartHandler)
            hdom?.removeEventListener('touchmove', this.touchMoveHandler)
            const mdom = document.querySelector<HTMLDivElement>('#'+this.domId + '-m')
            mdom?.removeEventListener('touchstart', this.touchStartHandler)
            mdom?.removeEventListener('touchmove', this.touchMoveHandler)
            const sdom = document.querySelector<HTMLDivElement>('#'+this.domId + '-s')
            sdom?.removeEventListener('touchstart', this.touchStartHandler)
            sdom?.removeEventListener('touchmove', this.touchMoveHandler)
            // this.mainDom.addEventListener('touchstart', this.touchStartHandler);
            // this.mainDom.addEventListener('touchmove', this.touchMoveHandler)
        }
    }

    yearList() {
        const year = this.show_date.getFullYear();
        const list: number[] = [];
        for (let i = year - this.yearSpan; i <= year + this.yearSpan; i++) {
            list.push(i);
        }
        return list;
    }

    renderPanel() {
        const { year, month } = this.state;
        if (!year && !month) {
            return null;
        }
        const lang = i18n[this.props.lang as string];
        const list: any[] = year ? this.yearList() : lang['month'];
        return (
            <React.Fragment>
                <div id={this.domId + '-panel'} className={classNames('year', this.getSizeClass())}>
                    {list.map((item, i) => {
                        const is_active = year
                            ? item === this.show_date.getFullYear()
                            : i === this.show_date.getMonth();
                        let class_name = 'item';
                        if (is_active) {
                            class_name = 'item active';
                        }
                        return <div key={i} className={class_name} onClick={() => {
                            if (year) {
                                this.setYear(item);
                            } else {
                                this.setMonth(i);
                            }
                        }}>{item}</div>
                    })}
                </div>
                <Scroll selector={'#' + this.domId + '-panel'} />
            </React.Fragment>
        )
    }

    renderDays() {
        const cells: React.ReactNode[] = [];
        this.state.days.forEach((row, k) => {
            row.forEach((item: any, i: number) => {
                const key = k + '-' + i;
                if (!item) {
                    cells.push(<div key={key} className='item empty' />);
                    return;
                }
                if (item.disabled) {
                    cells.push(<div key={key} className='item disable'>{item.value}</div>);
                    return;
                }
                let class_name = 'item c-btn';
                if (item.value === this.current_date.getDate() &&
                    this.current_date.getFullYear() === this.show_date.getFullYear() &&
                    this.current_date.getMonth() === this.show_date.getMonth()) {
                    class_name = classNames(class_name, 'active');
                }

                cells.push(<div key={key} className={class_name} onClick={() => {
                    this.choseDay(this.show_date.getFullYear(), this.show_date.getMonth(), item.value);
                }}>{item.value}</div>);
            });
        });
        return cells;
    }

    render() {
        const lang = i18n[this.props.lang as string];
        const content = (
            <div ref={c => this.mainDom = c as HTMLDivElement} className={this.getClasses()} onMouseDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
            }}>
                {this.state.time ? this.renderTimePanel() : this.renderPanel()}
                <div className={classNames('calendar-v2', this.getSizeClass())}>
                    <div className='head-btn btn-pr w-100 c-btn' onClick={() => this.privMonth()}><Icon icon='chevron-left' /></div>
                    <div className="header d-flex">
                        <div className='head-btn c-btn py-2 w-50' onClick={() => {
                            this.setState({
                                month: false,
                                year: true,
                                time: false,
                            });
                        }}>{this.show_date.getFullYear()}</div>
                        <div className='head-btn c-btn py-2 w-50' onClick={() => {
                            this.setState({
                                month: true,
                                year: false,
                                time: false,
                            });
                        }}>
                            {lang['month'][this.show_date.getMonth()]}
                        </div>
                    </div>
                    <div className='head-btn btn-nx w-100 c-btn' onClick={() => this.nextMonth()}><Icon icon='chevron-right' /></div>
                    {lang.week.map((item:any,i:number) => {
                        return <div key={i} className='title'>{item}</div>
                    })}
                    {this.renderDays()}
                    {this.isTimeBar() ? this.renderTimeBar() : null}
                </div>
            </div>
        );

        if (this.props.absolute) {
            return ReactDOM.createPortal(content, document.body);
        }
        return content;
    }

    renderTimeBar() {
        const lang = i18n[this.props.lang as string];
        return (
            <div className='timer'>
                <div className='time text-center'>
                    {this.state.hour}:{this.state.minute}:{this.state.second}
                </div>
                <div className='time-btn c-btn text-center rounded' onClick={this.selectTimeHandler}>
                    {this.state.time ? lang['time']['confirm'] : lang['time']['time']}
                </div>
            </div>
        );
    }

    renderTimePanel() {
        const lang = i18n[this.props.lang as string];
        return (
            <div className={classNames('time-panel', this.getSizeClass())}>
                <div className='time-head'>
                    {lang['time']['hour']}
                </div>
                <div className='time-head'>
                    {lang['time']['min']}
                </div>
                <div className='time-head'>
                    {lang['time']['sec']}
                </div>
                <div className='time-col'>
                    <div id={this.domId + '-h'} className='time-list'>
                        {this.hours.map((item,i) => {
                            if (item === this.state.hour) {
                                return <div key={i} className='item active'>{item}</div>
                            }
                            return <div key={i} className='item' onClick={() => {
                                this.setState({
                                    hour: item
                                },()=>{
                                    this.show_date.setHours(parseInt(item))
                                });
                            }}>{item}</div>
                        })}
                    </div>
                    <Scroll selector={'#' + this.domId + '-h'} />
                </div>
                <div className='time-col'>
                    <div id={this.domId + '-m'} className='time-list'>
                        {this.minute.map((item,i) => {
                            if (item === this.state.minute) {
                                return <div key={i} className='item active'>{item}</div>
                            }
                            return <div key={i} className='item' onClick={() => {
                                this.setState({
                                    minute: item
                                },()=>{
                                    this.show_date.setMinutes(parseInt(item))
                                });
                            }}>{item}</div>
                        })}
                    </div>
                    <Scroll selector={'#' + this.domId + '-m'} />
                </div>
                <div className='time-col'>
                    <div id={this.domId + '-s'} className='time-list'>
                        {this.sec.map((item,i) => {
                            if (item === this.state.second) {
                                return <div key={i} className='item active'>{item}</div>
                            }
                            return <div key={i} className='item' onClick={() => {
                                this.setState({
                                    second: item
                                },()=>{
                                    this.show_date.setSeconds(parseInt(item))
                                });
                            }}>{item}</div>
                        })}
                    </div>
                    <Scroll selector={'#' + this.domId + '-s'} />
                </div>
                <div className='time-foot'>
                    <div className='time-btn c-btn text-center rounded' onClick={this.selectTimeHandler}>
                        {lang['time']['confirm']}
                    </div>
                </div>
            </div>
        );
    }
}

const sortMonth:string[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];

export function format(formatStr:string,date:Date) {
    const keys:{key:string,value:any}[] = [
        {key:"unix",value: Math.round(date.valueOf() / 1000)},
        {key:"YYYY",value: date.getFullYear().toString()},
        {key:"MMM",value: sortMonth[date.getMonth()]},
        {key:"MM",value: common.strpad((date.getMonth() + 1).toString(), 2, "0")},
        // {key:"M",value: (date.getMonth() + 1).toString()},
        {key:"DD",value: common.strpad(date.getDate().toString(), 2, "0")},
        // {key:"D",value: common.strpad(date.getDate().toString(), 2, "0")},
        {key:"yy",value: date.getFullYear().toString().substring(2)},
        {key:"dd",value: date.getDate().toString()},
        {key:"HH",value:common.strpad(date.getHours().toString(),2,"0")},
        // "HH": this.state.hour,
        {key:"h",value:date.getHours().toString()},
        // "h": this.state.hour,
        {key:"II",value:common.strpad(date.getMinutes().toString(),2,"0")},
        {key:"mm",value:common.strpad(date.getMinutes().toString(),2,"0")},
        // "II": this.state.minute,
        {key:"i",value:date.getMinutes().toString()},
        // "i": this.state.minute,
        {key:"SS",value: common.strpad(date.getSeconds().toString(),2,"0")},
        {key:"ss",value: common.strpad(date.getSeconds().toString(),2,"0")},
        // "SS": this.state.second,
        {key:"s",value:date.getSeconds().toString()},
        // "s": this.state.second,
    ];
    let time_str = formatStr
    let regx;
    keys.forEach((item)=>{
        regx = new RegExp(item.key, "g");
        time_str = time_str.replace(regx, item.value);
        regx = null;
    })
    return time_str;
}

export default Calendar;