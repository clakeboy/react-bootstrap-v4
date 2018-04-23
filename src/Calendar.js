import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import './css/Calender.less';
import Icon from './Icon';

let i18n = {
    'cn': {
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
        };
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
            this.current_date = new Date(value);
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
        this.show_date.setMonth(this.show_date.getMonth() - 1);
        this.setState({
            days: this.fillDateList()
        });
    }

    nextMonth() {
        this.show_date.setMonth(this.show_date.getMonth() + 1);
        this.setState({
            days: this.fillDateList()
        });
    }

    choseDay(year, month, day) {
        let date = new Date(year, month, day);
        this.setCurrentDate(date);
        this.setState({
            days: this.fillDateList()
        });
        if (typeof this.props.onSelect === 'function') {
            this.props.onSelect(year, month, day);
        }
    }

    getClasses() {
        let base = 'ck-calendar ck-calendar-up border p-1';
        //display none
        if (this.props.none) {
            base = classNames(base, 'none');
        }
        //shadow
        if (this.props.shadow) {
            base = classNames(base, 'ck-shadow');
        }
        return classNames(base, this.props.className);
    }

    render() {
        let lang = i18n[this.props.lang];
        return (
            <div className={this.getClasses()}>
                <table>
                    <thead>
                    <tr className='top-header'>
                        <th className='th-btn' onClick={e => this.privMonth()}><Icon icon='arrow-left'/></th>
                        <th colSpan={5}>
                            <div className='row no-gutters'>
                                <div className='col-6 text-center th-btn th-div'>{this.show_date.getFullYear()}</div>
                                <div className='col-6 text-center th-btn th-div'>{lang['month'][this.show_date.getMonth()]}</div>
                            </div>
                        </th>
                        <th className='th-btn' onClick={e => this.nextMonth()}><Icon icon='arrow-right'/></th>
                    </tr>
                    <tr className='header'>
                        <th>{lang['week'][0]}</th>
                        <th>{lang['week'][1]}</th>
                        <th>{lang['week'][2]}</th>
                        <th>{lang['week'][3]}</th>
                        <th>{lang['week'][4]}</th>
                        <th>{lang['week'][5]}</th>
                        <th>{lang['week'][6]}</th>
                    </tr>
                    </thead>
                    <tbody>
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
                    </tbody>
                </table>
            </div>
        );
    }
}

Calendar.propTypes = {
    none    : PropTypes.bool,
    shadow  : PropTypes.bool,
    value   : PropTypes.string,
    lang    : PropTypes.string,
    onSelect: PropTypes.func,
};

Calendar.defaultProps = {
    lang: 'cn'
};

export default Calendar;