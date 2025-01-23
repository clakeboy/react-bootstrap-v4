import React from 'react';
import classNames from 'classnames/bind';
import Icon from './Icon';
import CDropdown from "./CDropdown";
import { ComponentProps } from './components/common';
import './css/Pagination.less';
interface Props extends ComponentProps {
    current?: number
    count?: number
    number?: number
    showPages?: number
    onSelect?: (page:any,showNumber:number,txt?:any)=>void
    align?: string
    info?: any //任意显示
    numberList?: any[]
    sticky?: boolean
}

interface State {
    data: number[]
    showNumber:number
}

export class Pagination extends React.PureComponent<Props,State> {
    static defaultProps = {
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
        sticky:true
    };

    show_pages:number
    current:number
    count:number
    is_more:boolean
    is_after:boolean
    constructor(props:any) {
        super(props);

        this.show_pages = this.props.showPages??Pagination.defaultProps.showPages;
        this.current = this.props.current??1;
        this.count = calculatePages(this.props.count??1,this.props.number??1);
        this.is_more = false;
        this.is_after = false;

        this.state = {
            data: this.showPages(),
            showNumber:this.props.number??1
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps:Props) {
        if (this.props.count !== nextProps.count ||
            this.props.current !== nextProps.current ||
            this.props.number !== nextProps.number) {
            this.current = nextProps.current??1;
            this.count = calculatePages(nextProps.count??1,nextProps.number??1);
            this.setState({
                data:this.showPages(),
                showNumber:nextProps.number??1
            });
        }
    }

    clickHandler(page:string) {
        return (e:React.MouseEvent)=>{
            e.preventDefault();
            if (!this.props.onSelect) return
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
        const cut = this.current % this.show_pages;
        const pages = cut === 0 ? this.current - this.show_pages : this.current-cut;
        const start = pages +1;
        const end = pages+this.show_pages;
        const arr = [];

        this.is_after = this.current > this.show_pages

        // this.is_more = end + 1;
        this.is_more = this.count > this.show_pages

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

        if (this.props.sticky) {
            base = classNames(base,"pagination-sticky");
        }

        return base;
    }

    render() {
        return (
            <nav className={this.getClasses()}>
                <ul>
                    {this.props.numberList && this.props.numberList.length > 0 ? <li>
                        <CDropdown className='me-1' size={this.props.size??''} text='下拉选择' onChange={(val,row)=>{
                            if (this.props.onSelect)
                                this.props.onSelect(1,row.value,val);
                        }}>
                            {this.props.numberList.map((item,idx)=>{
                                return <CDropdown.Value key={idx} text={item.text} value={item.value} active={this.state.showNumber===item.value}/>
                            })}
                        </CDropdown>
                    </li>:null}

                    <li className="page-item disabled">
                        {this.renderInfo()}
                    </li>
                    <li className="page-item"><a className="page-link" onClick={this.clickHandler('first')}><Icon icon='step-backward'/></a></li>
                    <li className="page-item"><a className="page-link" onClick={this.clickHandler('prev')}><Icon icon='angle-double-left'/></a></li>
                    {this.is_after?this.renderMore(this.is_after):null}
                    {this.renderPages()}
                    {this.is_more?this.renderMore(this.is_more):null}
                    <li className="page-item"><a className="page-link" onClick={this.clickHandler('next')}><Icon icon='angle-double-right'/></a></li>
                    <li className="page-item"><a className="page-link" onClick={this.clickHandler('last')}><Icon icon='step-forward'/></a></li>
                </ul>
            </nav>
        );
    }

    renderInfo() {
        let content = `总记录 ${this.props.count} 条,共有 ${this.count} 页`
        if (typeof this.props.info === 'string') {
            content = this.props.info.replaceAll('${count}',this.props.count?.toString()??'')
            content = content.replaceAll('${page}',this.count?.toString());
        }
        return (
            <span className="page-link text-nowrap">
                {content}
            </span>
        )
    }

    renderMore(page:any) {
        return (
            <li className="page-item"><a className="page-link" onClick={this.clickHandler(page)}>...</a></li>
        )
    }

    renderPages() {
        return this.state.data.map((v,idx)=>{
            return (
                <li key={idx} className={this.current === v?"page-item active":"page-item"}>
                    {this.current === v?<a className="page-link" onClick={this.clickHandler('stop')}>{v}</a>:<a className="page-link" onClick={this.clickHandler(v.toString())}>{v}</a>}
                </li>
            )
        });
    }
}

function calculatePages(count:number,number:number) {
    let pages;
    if (count % number === 0) {
        pages = Math.floor(count/number);
    } else {
        pages = Math.floor(count/number) + 1
    }
    return pages;
}

export default Pagination;