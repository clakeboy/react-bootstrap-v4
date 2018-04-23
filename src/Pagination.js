import React from 'react';
import PropTypes from 'prop-types';

class Pagination extends React.PureComponent {
    constructor(props) {
        super(props);

        this.show_pages = this.props.showPages;
        this.current = this.props.current;
        this.count = calculatePages(this.props.count,this.props.number);
        this.is_more = false;
        this.is_after = false;

        this.state = {
            data: this.showPages()
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.count !== nextProps.count || this.props.current !== nextProps.current) {
            this.current = nextProps.current;
            this.count = calculatePages(nextProps.count,this.props.number);
            this.setState({data:this.showPages()});
        }
    }

    clickHandler(page) {
        return (e)=>{
            e.preventDefault();
            switch (page){
                case 'first':
                    this.props.onSelect(1);
                    break;
                case 'prev':
                    this.props.onSelect(this.current-1<1 ? 1 : this.current-1);
                    break;
                case 'next':
                    this.props.onSelect(this.current+1>this.count ? this.count : this.current+1);
                    break;
                case 'last':
                    this.props.onSelect(this.count);
                    break;
                case 'stop':
                    break;
                default:
                    this.props.onSelect(page);
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

        this.is_more = end + 1;

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

    render() {
        return (
            <nav>
                <ul className="pagination">
                    <li className="page-item disabled"><span className="page-link">共有{this.props.count}条记录</span></li>
                    <li className="page-item"><a className="page-link" href="javascript://" onClick={this.clickHandler('first')}>首页</a></li>
                    <li className="page-item"><a className="page-link" href="javascript://" onClick={this.clickHandler('prev')}>上一页</a></li>
                    {this.is_after?this.renderMore(this.is_after):null}
                    {this.renderPages()}
                    {this.is_more?this.renderMore(this.is_more):null}
                    <li className="page-item"><a className="page-link" href="javascript://" onClick={this.clickHandler('next')}>下一页</a></li>
                    <li className="page-item"><a className="page-link" href="javascript://" onClick={this.clickHandler('last')}>末页</a></li>
                </ul>
            </nav>
        );
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
};

Pagination.defaultProps = {
    current : 1,
    count   : 1,
    number  : 30,
    showPages : 10,
};

export default Pagination;