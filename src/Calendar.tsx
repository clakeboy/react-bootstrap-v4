import React from 'react';
import classNames from 'classnames/bind';
import './css/Calender.less';
import Icon from './Icon';
import common, { strpad } from './Common';
import Button from "./Button";
import Scroll from "./Scroll";
import { ComponentProps, Theme } from './components/common';
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

    year:{start:number,end:number} = {start:0,end:0}
    isClose = true
    hours: string[]
    minute: string[]
    sec: string[]
    current_date: Date
    parentDom: HTMLElement
    failRange?: { start: any, end: any }
    domId: string
    show_date: Date
    mainTable: HTMLTableElement
    clientWidth: number
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

    componentDidMount() {
        this.clientWidth = this.mainTable.clientWidth;
    }

    componentWillUnmount() {
        // $(window).off('mousedown',this.hide);
        window.removeEventListener('mousedown', this.hide, false);
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
        if (this.state.year) {
            this.setYear(this.year.end - 10, true);
        } else {
            this.setMonth(this.show_date.getMonth() - 1)
        }
    }

    nextMonth() {
        if (this.state.year) {
            this.setYear(this.year.end + 10, true);
        } else {
            this.setMonth(this.show_date.getMonth() + 1)
        }
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

    setYear(year:any, show:any) {
        this.show_date.setFullYear(year)
        this.setState({
            days: this.fillDateList(),
            month: false,
            year: show,
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
            //fixed out window area
            this.fixPosition();
            this.mainDom.classList.remove('ck-calendar-none');
        }
        this.parentDom.addEventListener('blur', this.hide, false);
        this.parentDom.addEventListener('click', this.checkShow, false);
        this.parentDom.addEventListener('keypress', this.keyPressHandler, false);

        this.refreshWidth();
    }

    refreshWidth() {
        this.clientWidth = this.mainTable.clientWidth;
    }

    fixPosition() {
        const scrollParent = common.hasScrolledParent(this.parentDom) ?? document.documentElement;
        const position = common.GetDomXY(this.parentDom, null);
        if (position.top + this.parentDom.clientHeight + this.mainDom.offsetHeight >
            scrollParent.scrollTop + scrollParent.clientHeight) {
            this.mainDom.style.top = -(this.parentDom.offsetHeight + this.mainDom.offsetHeight) + 'px';
            this.mainDom.classList.remove('ck-calendar-up');
            this.mainDom.classList.add('ck-calendar-bottom');
            if (this.props.sm) {
                this.mainDom.classList.remove('ck-calendar-up-sm');
                this.mainDom.classList.add('ck-calendar-bottom-sm');
            }
        } else {
            this.mainDom.style.top = '0';
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
        }
    }

    getClasses() {
        let base = 'ck-calendar border p-1';
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
        //small
        if (this.props.sm || this.props.size === 'sm') {
            base = classNames(base, 'ck-calendar-sm');
        }

        if (this.props.size === 'lg') {
            base = classNames(base, 'ck-calendar-lg');
        }
        return classNames(base, this.props.className);
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
        if (!this.props.timeBar) return
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
        if (!this.props.timeBar) return
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

    renderMonth() {
        const divStyle = {
            width: this.clientWidth + 'px'
        };
        const lang = i18n[this.props.lang as string];
        return (
            <tr>
                <td colSpan={7}>
                    <div className='ck-calendar-list' style={divStyle}>
                        {lang.month.map((item:any, i:number) => {
                            let class_name = 'item';
                            if (this.show_date.getMonth() === i) {
                                class_name = 'item active';
                            }
                            return <span key={i} className={class_name} onClick={() => {
                                this.setMonth(i)
                            }}>{item}</span>
                        })}
                    </div>
                </td>
            </tr>
        )
    }

    renderYear() {
        let cur_year = this.show_date.getFullYear();
        while (cur_year % 10 !== 0) {
            cur_year += 1;
        }
        const start_year = cur_year - 11;
        this.year.start = start_year;
        this.year.end = cur_year;
        const year_list = [];
        for (let i = start_year; i < start_year + 12; i++) {
            year_list.push(i);
        }
        const divStyle = {
            width: this.clientWidth + 'px'
        };
        return (
            <tr>
                <td colSpan={7}>
                    <div className='ck-calendar-list' style={divStyle}>
                        {year_list.map((item,i) => {
                            let class_name = 'item';
                            if (this.show_date.getFullYear() === item) {
                                class_name = 'item active';
                            }
                            return <span key={i} className={class_name} onClick={() => {
                                this.setYear(item, false);
                            }}>{item}</span>
                        })}
                    </div>
                </td>
            </tr>
        )
    }

    renderDays() {
        const lang = i18n[this.props.lang as string];
        return (
            <React.Fragment>
                <tr className='header'>
                    {lang.week.map((item:any,i:number) => {
                        return <th key={i}>{item}</th>
                    })}
                </tr>
                {this.state.days.map((row,k) => {
                    return <tr key={k}>
                        {row.map((item:any,i:number) => {
                            if (item.disabled) {
                                return <td key={i} className='disable'>{item.value}</td>
                            }
                            let class_name = 'day';
                            if (item.value === this.current_date.getDate() &&
                                this.current_date.getFullYear() === this.show_date.getFullYear() &&
                                this.current_date.getMonth() === this.show_date.getMonth()) {
                                class_name = classNames(class_name, 'active');
                            }

                            return <td key={i} className={class_name} onClick={() => {
                                this.choseDay(this.show_date.getFullYear(), this.show_date.getMonth(), item.value);
                            }}>{item.value}</td>
                        })}
                    </tr>
                })}
            </React.Fragment>
        )
    }

    render() {
        const lang = i18n[this.props.lang as string];
        const content = (
            <div ref={c => this.mainDom = c as HTMLDivElement} className={this.getClasses()} onMouseDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
            }}>
                <table ref={c => this.mainTable = c as HTMLTableElement}>
                    <thead>
                        <tr className='top-header'>
                            <th className='th-btn' onClick={() => this.privMonth()}><Icon icon='arrow-left' /></th>
                            <th colSpan={5}>
                                <div className='row no-gutters'>
                                    <div className='col-6 text-center th-btn th-div' onClick={() => {
                                        this.setState({
                                            month: false,
                                            year: true,
                                            time: false,
                                        });
                                    }}>{this.show_date.getFullYear()}</div>
                                    <div className='col-6 text-center th-btn th-div' onClick={() => {
                                        this.setState({
                                            month: true,
                                            year: false,
                                            time: false,
                                        });
                                    }}>
                                        {lang['month'][this.show_date.getMonth()]}
                                    </div>
                                </div>
                            </th>
                            <th className='th-btn' onClick={() => this.nextMonth()}><Icon icon='arrow-right' /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderContent()}
                        {this.isTimeBar() ? this.renderTimeBar() : null}
                    </tbody>
                </table>
            </div>
        );

        return content;
    }

    renderTimeBar() {
        const lang = i18n[this.props.lang as string];
        return (
            <tr>
                <td colSpan={7}>
                    <div className='row no-gutters border-top'>
                        <div className='col p-1 d-flex align-items-center justify-content-center'>
                            <span>{this.state.hour}:{this.state.minute}:{this.state.second}</span>
                        </div>
                        <div className='col'>
                            <Button onClick={this.selectTimeHandler} theme={Theme.link} size={this.props.sm ? 'sm' : undefined} block>
                                {this.state.time ? lang['time']['confirm'] : lang['time']['time']}
                            </Button>
                        </div>
                    </div>
                </td>
            </tr>
        );
    }

    renderTime() {
        const lang = i18n[this.props.lang as string];
        return (
            <tr>
                <td colSpan={7}>
                    <div className='row no-gutters bd-highlight'>
                        <div className='col bd-highlight'>
                            {lang['time']['hour']}
                        </div>
                        <div className='col bd-highlight'>
                            {lang['time']['min']}
                        </div>
                        <div className='col bd-highlight'>
                            {lang['time']['sec']}
                        </div>
                    </div>
                    <div className='row no-gutters bd-highlight' style={{
                        'height': '150px'
                    }}>
                        <div className='col h-100 bd-highlight border position-relative'>
                            <div id={this.domId + '-h'} className='h-100'>
                                {this.hours.map((item,i) => {
                                    if (item === this.state.hour) {
                                        return <div key={i} className='ck-calendar-time-item active'>{item}</div>
                                    }
                                    return <div key={i} className='ck-calendar-time-item' onClick={() => {
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
                        <div className='col h-100 bd-highlight border position-relative'>
                            <div id={this.domId + '-m'} className='h-100'>
                                {this.minute.map((item,i) => {
                                    if (item === this.state.minute) {
                                        return <div key={i} className='ck-calendar-time-item active'>{item}</div>
                                    }
                                    return <div key={i} className='ck-calendar-time-item' onClick={() => {
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
                        <div className='col h-100 bd-highlight border position-relative'>
                            <div id={this.domId + '-s'} className='h-100'>
                                {this.sec.map((item,i) => {
                                    if (item === this.state.second) {
                                        return <div key={i} className='ck-calendar-time-item active'>{item}</div>
                                    }
                                    return <div key={i} className='ck-calendar-time-item' onClick={() => {
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
                    </div>
                </td>
            </tr>
        );
    }

    renderContent() {
        if (this.state.month) {
            return this.renderMonth();
        } else if (this.state.year) {
            return this.renderYear();
        } else if (this.state.time) {
            return this.renderTime();
        } else {
            return this.renderDays();
        }
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
    'Sept',
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
        {key:"M",value: (date.getMonth() + 1).toString()},
        {key:"DD",value: common.strpad(date.getDate().toString(), 2, "0")},
        {key:"D",value: common.strpad(date.getDate().toString(), 2, "0")},
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