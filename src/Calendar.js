import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import './css/Calander.less';
import Icon from './Icon';

class Calendar extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    getClasses() {
        let base = 'ck-calendar border';
        //display none
        if (this.props.none) {
            base = classNames(base,'none');
        }
        return classNames(base,this.props.className);
    }

    render() {
        let current_date = new Date();
        let next_month = new Date();
        current_date.getDate();
        return (
            <div className={this.getClasses()}>
                <table>
                    <thead>
                    <tr className='top-header'>
                        <th className='th-btn'><Icon icon='arrow-left'/></th>
                        <th colSpan={5}>
                            <div className='row no-gutters'>
                                <div className='col-6 text-center th-btn'>2018</div>
                                <div className='col-6 text-center th-btn'>一月</div>
                            </div>
                        </th>
                        <th className='th-btn'><Icon icon='arrow-right'/></th>
                    </tr>
                    <tr className='header'>
                        <th>日</th>
                        <th>一</th>
                        <th>二</th>
                        <th>三</th>
                        <th>四</th>
                        <th>五</th>
                        <th>六</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className='day'>1</td>
                        <td className='day'>2</td>
                        <td className='day'>3</td>
                        <td className='day'>4</td>
                        <td className='day'>5</td>
                        <td className='day'>6</td>
                        <td className='day'>7</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

Calendar.propTypes = {
    none: PropTypes.bool,
};

Calendar.defaultProps = {

};

export default Calendar;