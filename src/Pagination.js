import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Icon from './Icon';
import Dropdown from "./Dropdown";
import {Input} from "./index";
import Select from "./Select";
class Pagination extends React.PureComponent {
    constructor(props) {
        super(props);

        this.show_pages = this.props.showPages;
        this.current = this.props.current;
        this.count = calculatePages(this.props.count,this.props.number);
        this.is_more = false;
        this.is_after = false;

        this.state = {
            data: this.showPages(),
            showNumber:this.props.number
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.count !== nextProps.count ||
            this.props.current !== nextProps.current ||
            this.props.number !== nextProps.number) {
            this.current = nextProps.current;
            this.count = calculatePages(nextProps.count,this.props.number);
            this.setState({
                data:this.showPages(),
                showNumber:nextProps.number
            });
        }
    }

    clickHandler(page) {
        return (e)=>{
            e.preventDefault();
            switch (page){
                case 'first':
                    this.props.onSelect(1,this.state.showNumber);
                    break;
                case 'prev':
                    this.props.onSelect(this.current-1<1 ? 1 : this.current-1,this.state.showNumber);
                    break;
                case 'next':
                    this.props.onSelect(this.current+1>this.count ? this.count : this.current+1,this.state.showNumber);
                    break;
                case 'last':
                    this.props.onSelect(this.count,this.state.showNumber);
                    break;
                case 'stop':
                    break;
                default:
                    this.props.onSelect(page,this.state.showNumber);
            }

        };
    }

    showPages() {
        let cut = this.current % this.show_pages;
        let pages = cut === 0 ? this.current - this.show_pages : this.current-cut;
        let start = pages +1;
        let end = pages+this.show_pages;
        let arr = [];

        if (this.current > this.show_pages) {
            this.is_after = start - 1;
        } else {
            this.is_after = false;
        }

        // this.is_more = end + 1;
        if (this.count > this.show_pages) {
            this.is_more = end + 1;
        } else {
            this.is_more = false;
        }

        for (let i=start;i<=end;i++) {
            if (i <= this.count) {
                arr.push(i);
            } else {
                this.is_more = false;
                break;
            }
        }
        return arr
    }

    getClasses() {
        let base = 'pagination';

        switch (this.props.align) {
            case 'right':
                base = classNames(base,'justify-content-end');
                break;
            case 'center':
                base = classNames(base,'justify-content-center');
                break;
        }

        if (this.props.size) {
            base = classNames(base,`pagination-${this.props.size}`);
        }

        return base;
    }

    render() {
        return (
            <nav {...this.props}>
                <ul className={this.getClasses()}>
                    {this.props.numberList && this.props.numberList.length > 0 ? <li>
                        <Select size={this.props.size} className='mr-1'
                                data={this.props.numberList}
                                value={this.state.showNumber}
                                onSelect={(e)=>{
                                    this.props.onSelect(1,e.currentTarget.value);
                                }}
                        />
                    </li>:null}

                    <li className="page-item disabled">
                        {this.renderInfo()}
                    </li>
                    <li className="page-item"><a className="page-link" href="javascript://" onClick={this.clickHandler('first')}>首页</a></li>
                    <li className="page-item"><a className="page-link" href="javascript://" onClick={this.clickHandler('prev')}><Icon icon='angle-double-left'/></a></li>
                    {this.is_after?this.renderMore(this.is_after):null}
                    {this.renderPages()}
                    {this.is_more?this.renderMore(this.is_more):null}
                    <li className="page-item"><a className="page-link" href="javascript://" onClick={this.clickHandler('next')}><Icon icon='angle-double-right'/></a></li>
                    <li className="page-item"><a className="page-link" href="javascript://" onClick={this.clickHandler('last')}>末页</a></li>
                </ul>
            </nav>
        );
    }

    renderInfo() {
        if (this.props.info) {
            return this.props.info;
        }
        return (
            <span className="page-link text-nowrap">
                总记录<span className='text-info'>{this.props.count}</span> 条,
                共有 <span className='text-info'>{this.count}</span> 页
            </span>
        )
    }

    renderMore(page) {
        return (
            <li className="page-item"><a className="page-link" href="javascript://" onClick={this.clickHandler(page)}>...</a></li>
        )
    }

    renderPages() {
        return this.state.data.map((v)=>{
            return (
                <li className={this.current === v?"page-item active":"page-item"}>
                    {this.current === v?<a className="page-link" href="javascript://" onClick={this.clickHandler('stop')}>{v}</a>:<a className="page-link" href="javascript://" onClick={this.clickHandler(v)}>{v}</a>}
                </li>
            )
        });
    }
}

function calculatePages(count,number) {
    let pages;
    if (count % number === 0) {
        pages = parseInt(count/number);
    } else {
        pages = parseInt(count/number) + 1
    }
    return pages;
}

Pagination.propTypes = {
    current: PropTypes.number,
    count: PropTypes.number,
    number: PropTypes.number,
    showPage: PropTypes.number,
    onSelect: PropTypes.func,
    align: PropTypes.oneOf(['left','center','right']),
    size: PropTypes.oneOf(['sm','lg']),
    info: PropTypes.any,//任意显示
    numberList: PropTypes.array,
};

Pagination.defaultProps = {
    current : 1,
    count   : 1,
    number  : 50,
    showPages : 10,
    align: 'right',
    numberList: [
        // {text:'显示50条',value:50},
        // {text:'显示100条',value:100},
        // {text:'显示150条',value:150}
    ],
    info:null,
};

export default Pagination;