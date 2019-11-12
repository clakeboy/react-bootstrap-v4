import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import './css/Calender.less';
import Icon from './Icon';
import common from './Common';
const i18n = {
    'zh': {
        'week' : [
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
    },
    'en': {
        'week' : [
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
    }
};

class Calendar extends React.PureComponent {
    constructor(props) {
        super(props);

        this.setCurrentDate(this.props.value);

        this.state = {
            days: this.fillDateList(),
            month: false,
            year: false,
        };

        this.year = {};

        this.isClose = true;
    }

    componentDidMount() {
        if (this.props.absolute) {
            window.addEventListener('mousedown',this.hide,false);
        }
    }

    componentWillUnmount() {
        // $(window).off('mousedown',this.hide);
        window.removeEventListener('mousedown',this.hide,false);
        if (this.parentDom) {
            this.parentDom.removeEventListener('blur',this.hide,false);
            this.parentDom.removeEventListener('click',this.checkShow,false);
        }
    }

    componentWillReceiveProps(nextProp) {
        if (this.props.value !== nextProp.value) {
            this.setCurrentDate(nextProp.value);
            this.setState({
                days: this.fillDateList()
            });
        }
    }

    setCurrentDate(value) {
        if (value) {
            if (/\d{10}/.test(value)) {
                this.current_date = new Date(value*1000);
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
        let first = new Date(
            this.show_date.getFullYear(),
            this.show_date.getMonth(),
            1,
        );
        first.setDate(first.getDay() === 0 ? -7 : -first.getDay());
        let i, count = 42;
        let date     = [], week = [null, null, null, null, null, null, null];
        for (i = 1; i <= count; i++) {
            first.setDate(first.getDate() + 1);
            week[first.getDay()] = {
                value   : first.getDate(),
                disabled: false,
            };
            if (this.show_date.getMonth() !== first.getMonth()) {
                week[first.getDay()]['disabled'] = true;
            }

            if (first.getDay() === 6) {
                date.push(week);
                week = [null, null, null, null, null, null, null];
            }
        }
        return date;
    };

    privMonth() {
        if (this.state.year) {
            this.setYear(this.year.end-10,true);
        } else {
            this.setMonth(this.show_date.getMonth() - 1)
        }
    }

    nextMonth() {
        if (this.state.year) {
            this.setYear(this.year.end+10,true);
        } else {
            this.setMonth(this.show_date.getMonth() + 1)
        }
    }

    setMonth(month) {
        this.show_date.setMonth(month);
        this.setState({
            days: this.fillDateList(),
            month: false,
            year:false,
        });
    }

    setYear(year,show) {
        this.show_date.setYear(year);
        this.setState({
            days: this.fillDateList(),
            month: false,
            year:show,
        });
    }

    choseDay(year, month, day) {
        let date = new Date(year, month, day);
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

    format() {
        let keys = {
            "unix":Math.round(this.show_date.valueOf()/1000),
            "YYYY":this.show_date.getFullYear().toString(),
            "MM":common.strpad(this.show_date.getMonth()+1,2,"0"),
            "DD":common.strpad(this.show_date.getDate(),2,"0"),
            "yy":this.show_date.getFullYear().toString().substr(2),
            "mm":(this.show_date.getMonth()+1).toString(),
            "dd":this.show_date.getDate().toString(),
            "H":common.strpad(this.show_date.getHours(),2,"0"),
            "h":this.show_date.getHours().toString(),
            "I":common.strpad(this.show_date.getMinutes(),2,"0"),
            "i":this.show_date.getMinutes().toString(),
            "S":common.strpad(this.show_date.getSeconds(),2,"0"),
            "s":this.show_date.getSeconds().toString(),
        };
        let time_str = this.props.format;
        let regx;
        for (let s in keys) {
            regx = new RegExp(s,"g");
            time_str = time_str.replace(regx, keys[s]);
            regx = null;
        }
        return time_str;
    }

    hide = (e) => {
        // $(ReactDOM.findDOMNode(this)).hide();
        this.mainDom.classList.add('ck-calendar-none');
        this.isClose = true;
    };

    show(dom) {
        this.parentDom = dom;
        this.isClose = false;
        // document.querySelectorAll('.ck-calendar-absolute').forEach((item)=>{
        //     item.classList.add('ck-calendar-none');
        // });
        this.parentDom.addEventListener('blur',this.hide,false);
        this.parentDom.addEventListener('click',this.checkShow,false);
        this.mainDom.classList.remove('ck-calendar-none');
        //fixed out window area
        let position = common.GetDomXY(dom,null);
        if (position.top + this.mainDom.offsetHeight >
            document.documentElement.scrollTop + document.documentElement.clientHeight) {
            this.mainDom.style.top = -(dom.offsetHeight+this.mainDom.offsetHeight)+'px';
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

        this.clientWidth = this.mainTable.clientWidth;
    }

    checkShow = (e)=> {
        if (this.isClose) {
            this.show(this.parentDom);
        }
    };

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
            base = classNames(base,'ck-calendar-absolute');
        }
        //triangular
        if (this.props.triangular) {
            let cls = 'ck-calendar-'+this.props.triangular;
            base = classNames(base,cls);
            if (this.props.sm) {
                base = classNames(base,cls+'-sm');
            }
        }
        //small
        if (this.props.sm) {
            base = classNames(base,'ck-calendar-sm');
        }
        return classNames(base, this.props.className);
    }

    renderMonth() {
        let divStyle = {
            width:this.clientWidth+'px'
        };
        let lang = i18n[this.props.lang];
        return (
            <tr>
                <td colSpan={7}>
                    <div className='ck-calendar-list' style={divStyle}>
                        {lang.month.map((item,i)=>{
                            let class_name = 'item';
                            if (this.show_date.getMonth() === i) {
                                class_name = 'item active';
                            }
                            return  <span className={class_name} onClick={c=>{
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
        let start_year = cur_year - 11;
        this.year.start = start_year;
        this.year.end = cur_year;
        let year_list = [];
        for (let i=start_year;i<start_year+12;i++) {
            year_list.push(i);
        }
        let divStyle = {
            width:this.clientWidth+'px'
        };
        return (
            <tr>
                <td colSpan={7}>
                    <div className='ck-calendar-list' style={divStyle}>
                        {year_list.map((item)=>{
                            let class_name = 'item';
                            if (this.show_date.getFullYear() === item) {
                                class_name = 'item active';
                            }
                            return  <span className={class_name} onClick={c=>{
                                this.setYear(item,false);
                            }}>{item}</span>
                        })}
                    </div>
                </td>
            </tr>
        )
    }

    renderDays() {
        return (
            <React.Fragment>
            {this.state.days.map((row) => {
                return <tr>
                    {row.map((item) => {
                        if (item.disabled) {
                            return <td className='disable'>{item.value}</td>
                        }
                        let class_name = 'day';
                        if (item.value === this.current_date.getDate() &&
                            this.current_date.getFullYear() === this.show_date.getFullYear() &&
                            this.current_date.getMonth() === this.show_date.getMonth()) {
                            class_name = classNames(class_name, 'active');
                        }

                        return <td className={class_name} onClick={e => {
                            this.choseDay(this.show_date.getFullYear(), this.show_date.getMonth(), item.value);
                        }}>{item.value}</td>
                    })}
                </tr>
            })}
            </React.Fragment>
        )
    }

    render() {
        let lang = i18n[this.props.lang];
        let content = (
            <div ref={c=>this.mainDom=c} className={this.getClasses()} onMouseDown={(e)=>{
                e.stopPropagation();
                e.preventDefault();
            }}>
                <table ref={c=>this.mainTable=c}>
                    <thead>
                    <tr className='top-header'>
                        <th className='th-btn' onClick={e => this.privMonth()}><Icon icon='arrow-left'/></th>
                        <th colSpan={5}>
                            <div className='row no-gutters'>
                                <div className='col-6 text-center th-btn th-div' onClick={e=>{
                                    this.setState({
                                        month:false,
                                        year:true,
                                    });
                                }}>{this.show_date.getFullYear()}</div>
                                <div className='col-6 text-center th-btn th-div' onClick={e=>{
                                    this.setState({
                                        month:true,
                                        year:false,
                                    });
                                }}>
                                    {lang['month'][this.show_date.getMonth()]}
                                </div>
                            </div>
                        </th>
                        <th className='th-btn' onClick={e => this.nextMonth()}><Icon icon='arrow-right'/></th>
                    </tr>
                    <tr className='header'>
                        {lang.week.map((item)=>{
                            return <th>{item}</th>
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderContent()}
                    </tbody>
                </table>
            </div>
        );

        return content;
    }

    renderContent() {
        if (this.state.month) {
            return this.renderMonth();
        } else if (this.state.year) {
            return this.renderYear();
        } else {
            return this.renderDays();
        }
    }
}

Calendar.propTypes = {
    none    : PropTypes.bool,
    shadow  : PropTypes.bool,
    value   : PropTypes.string,
    lang    : PropTypes.string,
    absolute: PropTypes.bool,
    onSelect: PropTypes.func,
    triangular: PropTypes.oneOf(['up','left','bottom','right']),
    format:   PropTypes.string,
    sm: PropTypes.bool
};

Calendar.defaultProps = {
    lang: 'zh',
    format: 'YYYY-MM-DD'//unix,
};

export default Calendar;