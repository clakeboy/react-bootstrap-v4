import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import TableHeader from './TableHeader';
import TableHeaderRow from "./TableHeaderRow";
import CCheckbox from "./CCheckbox";
import Button from './Button';
import common from "./Common";
import Icon from './Icon';

import './css/Table.less';
import * as ReactDOM from "react-dom";
import Scroll from "./Scroll";
import HScroll from "./HScroll";

class Table extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data   : this.props.data,
            select : this.props.select,
            tree   : {},
            refresh: typeof this.props.onRefresh === 'function'
        };

        this.treeOpens = {};

        this.select_all = false;

        this.selectRows = [];

        this.treeHeader = {};

        this.sortList = {};

        this.afterFields = [];

        this.beforeFields = [];

        this.tableHeaderRows = [];

        this.headers = [];

        this.width = 0;
        this.beforeHoldWidth = 0;
        this.afterHoldWidth = 0;

        this.initTableWidth();

        // this.initHold();

        this.domId = 'table-'+common.RandomString(16);
        if (this.props.id) {
            this.domId = this.props.id;
        }
    }

    componentDidMount() {
        this.mainDom.addEventListener('scroll', this.scrollHandler, false);
        window.addEventListener('resize',this.holdShow,false);
        this.syncRowsHeight();
        this.holdShow();
    }

    componentWillUnmount() {
        window.removeEventListener('resize',this.holdShow,false);
    }

    syncRowsHeight() {
        if (this.beforeBody) {
            this.setRowsHeight(this.beforeBody.tHead.rows,this.tableBody.tHead.rows);
            // this.beforeBody.tHead.rows[0].style.height = this.tableBody.tHead.rows[0].clientHeight + 'px';
        }
        if (this.afterBody) {
            this.setRowsHeight(this.afterBody.tHead.rows,this.tableBody.tHead.rows);
        }

        if (this.afterBody || this.beforeBody) {
            for (let i=0; i < this.tableBody.tBodies[0].rows.length;i++) {
                // console.log(beforeTable.tBodies[0].rows[i]);
                if (this.beforeBody){
                    this.beforeBody.tBodies[0].rows[i].style.height = this.tableBody.tBodies[0].rows[i].getBoundingClientRect().height + 'px';
                }
                if (this.afterBody) {
                    this.afterBody.tBodies[0].rows[i].style.height = this.tableBody.tBodies[0].rows[i].getBoundingClientRect().height + 'px';
                }
            }
        }

        if (this.tableHeader) {
            // this.tableHeader.style.transform = `translateY(${e.currentTarget.scrollTop}px)`;
            this.tableHeader.style.transform = `translate3d(0,0,10px)`;
        }
    }

    setRowsHeight(rows,heightRows) {
        for (let i=0;i<rows.length;i++) {
            rows[i].style.height = heightRows[i].getBoundingClientRect().height+'px';
        }
    }

    holdShow = (e) => {
        if (this.mainDom.clientWidth >= this.tableBody.clientWidth) {
            if (this.beforeBody) {
                this.beforeBody.classList.add('d-none')
            }
            if (this.afterBody) {
                this.afterBody.classList.add('d-none')
            }
        } else {
            if (this.beforeBody) {
                this.beforeBody.classList.remove('d-none')
            }
            if (this.afterBody) {
                this.afterBody.classList.remove('d-none')
            }
        }
        if (e) {
            this.holdShadow(e);
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.syncRowsHeight();
        this.holdShow();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.data !== nextProps.data) {
            this.select_all = false;
            this.selectRows = [];
            if (this.allchk) {
                this.allchk.setChecked(false);
                this.allchk.setHalf(false);
            }
            this.setState({
                data: nextProps.data
            },()=>{
                if (this.hScroll) {
                    this.hScroll.initAlignParent();
                }
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.data !== this.state.data || nextState.tree !== this.state.tree;
    }

    initTableWidth() {
        // if (this.props.width) {
            this.width = 0;
            this.beforeHoldWidth = 0;
            this.afterHoldWidth = 0;
            let reg    = /(\d+)(px|rem|cm|mm|pt)$/;
            let unit   = '';
            React.Children.map(this.props.children, (item, key) => {
                if (item.type === TableHeader) {
                    if (item.props.hide) {
                        return
                    }
                    let matchs;
                    if (item.props.width && item.props.width.match) {
                        matchs = item.props.width.match(reg);
                        this.width += parseInt(matchs[1]);
                        unit       = matchs[2];
                    } else {
                        unit = 100;
                    }
                    this.headers.push(item);
                    if (item.props.beforeHold) {
                        if (matchs) {
                            this.beforeHoldWidth += parseInt(matchs[1]);
                        }
                        this.beforeFields.push(item.props.field);
                    } else if (item.props.afterHold) {
                        if (matchs) {
                            this.afterHoldWidth += parseInt(matchs[1]);
                        }
                        this.afterFields.push(item.props.field);
                    }
                } else if (item.type === TableHeaderRow) {
                    this.initTableHeaderRow(item)
                }
            });
            if (this.props.select) {
                this.width += 30;
                this.beforeHoldWidth += 30;
            }
            if (this.props.serialNumber) {
                this.width += 30;
                this.beforeHoldWidth += 30;
            }
            this.width += unit;
            this.beforeHoldWidth += unit;
            this.afterHoldWidth += unit;

    }

    initTableHeaderRow(row) {
        let headerRow = [];
        React.Children.map(row.props.children,(item)=>{
            if (item.type === TableHeader) {
                headerRow.push(item)
            }
        });
        this.tableHeaderRows.push(headerRow);
    }

    //checkbox handler
    changeHandler(row, i) {
        return (checked,e) => {
            this.setRowCheck(checked,i);
            this.checkAllCheckHalf();
            if (typeof this.props.onCheck === "function") {
                this.props.onCheck(e.target.checked, row);
            }
        };
    }
    checkAllCheckHalf() {
        if (!this.allchk) {
            return;
        }

        if (this.selectRows.length > 0 && this.selectRows.length !== this.state.data.length) {
            this.allchk.setHalf(true);
        }
        if (this.selectRows.length === 0) {
            this.allchk.setHalf(false);
            this.allchk.setChecked(false);
        } else if (this.selectRows.length === this.state.data.length) {
            this.allchk.setHalf(false);
            this.allchk.setChecked(true);
        }
    }
    setRowCheck(checked,rowIdx) {
        if (checked) {
            if (this.selectRows.indexOf(rowIdx) === -1) {
                this.selectRows.push(rowIdx);
            }
            // this.selectRows[rowIdx] = this.state.data[rowIdx];
        } else {
            if (this.selectRows.indexOf(rowIdx) !== -1) {
                this.selectRows.splice(this.selectRows.indexOf(rowIdx),1);
            }
        }
        let row = this.refs['row_'+rowIdx];
        if (checked) {
            ReactDOM.findDOMNode(row).parentNode.parentNode.classList.add('ck-table-selected');
        } else {
            ReactDOM.findDOMNode(row).parentNode.parentNode.classList.remove('ck-table-selected');
        }
    }

    //table row check handler
    clickHandler(row, i) {
        return () => {
            if (typeof this.props.onClick === 'function') {
                this.props.onClick(row, i);
            }
        }
    }
    //table head sort
    sortHandler(field, callback) {
        return (e) => {
            let dom       = e.currentTarget;
            let sort_type = dom.dataset.sort || 'asc';
            callback(field, sort_type);
            dom.dataset.sort     = sort_type === 'asc' ? 'desc' : 'asc';
            this.sortList[field] = sort_type;
            let child            = dom.querySelector('i');
            child.classList.remove('fa-sort', 'fa-sort-alpha-up', 'fa-sort-alpha-down');
            child.classList.add('fa-sort-alpha-' + (sort_type === 'asc' ? 'down' : 'up'));
        }
    };

    selectAll = (checked) => {
        this.select_all = checked;
        common.map(this.refs, (item,key,idx) => {
            item.setChecked(this.select_all);
            this.setRowCheck(this.select_all,idx);
        });
        this.checkAllCheckHalf();
    };

    /**
     * 得到所有选中的行
     * @returns {*}
     */
    getSelectRows() {
        return this.selectRows.map((item)=>{
            return this.state.data[item];
        });
    }

    /**
     * 设置选中的行
     * @param key 对应行数据的KEY值
     * @param list 要选中的数据值
     */
    setSelectRows(key, list) {
        this.state.data.forEach((row, i) => {
            if (list.indexOf(row[key]) !== -1) {
                this.refs['row_' + i].setChecked(true);
                this.setRowCheck(true,i);
            } else {
                this.refs['row_' + i].setChecked(false);
                this.setRowCheck(false,i);
            }
        });
        this.checkAllCheckHalf();
    }

    getClasses(css) {
        let base = 'table ck-table';
        //striped
        if (this.props.striped) {
            base = classNames(base, 'table-striped');
        }
        //theme
        if (this.props.theme) {
            base = classNames(base, 'table-' + this.props.theme);
        }
        //bordered
        if (this.props.bordered) {
            base = classNames(base, 'table-bordered');
        }
        //hover
        if (this.props.hover) {
            base = classNames(base, 'table-hover');
        }
        //sm
        if (this.props.sm) {
            base = classNames(base, 'table-sm');
        }
        if (this.props.fontSm) {
            base = classNames(base, 'table-font-sm');
        }
        //responsive
        if (this.props.responsive) {
            base = classNames(base, 'table-responsive');
        }
        //fixed
        if ((this.props.fixed || this.props.scroll || this.props.width)) {
            base = classNames(base, 'fixed');
        }


        return classNames(base,css);
    }

    getMainClass() {
        let base = 'ck-table-main';
        if (this.props.scroll) {
            base = classNames(base, 'ck-table-scroll');
        }
        if (this.props.height) {
            base = classNames(base, 'ck-table-scroll-height');
        }
        if (this.props.width) {
            base = classNames(base, 'ck-table-scroll-width');
        }
        return classNames(base, this.props.className);
    }

    getStyles() {
        //default style
        let base = {};
        //width
        if (this.props.width) {
            base.width = this.props.width;
        }
        //height
        if (this.props.height) {
            base.height = this.props.height;
        }

        return base;
    }

    getMainStyle() {
        //default style
        let base = {};
        if (this.props.absolute) {
            base.position = 'absolute';
            base.top      = this.props.y;
            base.left     = this.props.x;
        }
        return common.extend(base, this.props.style)
    }

    getTableStyles(width) {
        let base = {};
        if (this.props.width) {
            base.width = this.width;
        }
        if (width) {
            base.width = width;
        }
        if (this.props.height) {
            base.transformStyle = 'preserve-3d';
        }
        return base;
    }

    getHeaderClasses() {
        let base = '';
        if (this.props.headerTheme) {
            base = 'thead-' + this.props.headerTheme;
        }
        return classNames(base, this.props.headClass);
    }

    scrollHandler = (e) => {
        if (this.tableHeader && e.currentTarget.scrollHeight > e.currentTarget.clientHeight) {
            // this.tableHeader.style.transform = `translateY(${e.currentTarget.scrollTop}px)`;
            this.tableHeader.style.transform = `translate3d(0,${e.currentTarget.scrollTop}px,10px)`;
        }
        this.holdShadow(e);
    };

    holdShadow(e) {
        if (this.beforeBody) {
            if (e.currentTarget.scrollLeft === 0) {
                this.beforeBody.classList.remove('shadow');
            } else {
                this.beforeBody.classList.add('shadow');
            }
        }

        if (this.afterBody) {
            let diff = e.currentTarget.scrollWidth-e.currentTarget.clientWidth;
            if (diff === e.currentTarget.scrollLeft || diff-1 === e.currentTarget.scrollLeft) {
                this.afterBody.classList.remove('shadow');
            } else {
                this.afterBody.classList.add('shadow');
            }
        }
    }

    setHeight(height) {
        this.mainDom.style.height = height;
    }

    render() {
        return (
            <div className='position-relative' id={this.domId+'_main'} style={this.getMainStyle()}>
                <div ref={c => this.mainDom = c} id={this.domId}  className={this.getMainClass()} style={this.getStyles()}>
                    {this.state.refresh ? (
                        <Button className='ck-table-refresh-btn' icon='sync-alt' onClick={this.props.onRefresh} size="sm" theme='dark'>
                            {this.props.refreshText}
                        </Button>) : null}
                    <table ref={c=>this.tableBody = c} id={this.domId+'_body'} className={this.getClasses()} style={this.getTableStyles()}>
                        {this.props.width?this.renderCol():null}
                        {this.props.header ? this.renderHeader() : null}
                        <tbody>
                        {this.renderBody()}
                        </tbody>
                    </table>
                </div>
                {this.renderHoldBefore()}
                {this.renderHoldAfter()}
                {this.props.height?<Scroll selector={`#${this.domId}`}/>:null}
                {this.props.width?<HScroll ref={c=>this.hScroll = c} showSelector={`#${this.domId}_main`} selector={`#${this.domId}`} alignParent/>:null}
            </div>
        );
    }

    renderCol(filter,filter_type) {
        return <colgroup>
            {this.props.serialNumber&&filter_type !== 'after'?<col width='30px'/>:null}
            {this.state.select &&filter_type !== 'after'? <col width={'30px'}/> : null}
            {this.headers.map((item)=>{
                //hold column
                if (filter && filter.indexOf(item.props.field) === -1) {
                    return null;
                }
                if (item.props.hide) {
                    return null;
                }
                return <col width={item.props.width}/>
            })}
        </colgroup>
    }

    renderHeaderRow(filter,filter_type) {
        if (this.tableHeaderRows.length <= 0) return null;
        let headers = [];

        this.tableHeaderRows.forEach((list,index)=>{
            let offset = 0;
            // if (index === 0) {
                if (this.props.serialNumber) offset++;
                if (this.props.select) offset++;
            // }
            let totalCols = 0;
            headers.push(
                <tr>
                    {offset>0&&filter_type !== 'after'?<th colSpan={offset}/>:null}
                    {list.map((item)=>{
                        let colsCount = item.props.cols;
                        if (filter && totalCols >= filter.length) return null;
                        if (filter && colsCount > filter.length) {
                            colsCount = filter.length;
                        }
                        totalCols += item.props.cols;
                        return <th colSpan={colsCount} className='colspan' style={{textAlign:item.props.align}}>
                            {item.props.text}
                        </th>
                    })}
                </tr>
             )
        });

        return headers;
    }

    renderHeader(filter,filter_type) {
        return (
            <thead ref={c => {if (!filter) this.tableHeader = c}} className={this.getHeaderClasses()}>
            {this.renderHeaderRow(filter,filter_type)}
            <tr>
                {this.props.serialNumber&&filter_type !== 'after'?<th style={{width:'30px',textAlign:'center'}}/>:null}
                {this.state.select &&filter_type !== 'after'?
                    <th className='chk' style={{textAlign:'center',width:'30px'}}>
                        <CCheckbox ref={c=>{this.allchk=c}} onChange={this.selectAll}/>
                    </th> : null}
                {this.headers.map((item, key) => {
                    if (!item || item.props.hide) {
                        return null;
                    }
                    //hold column
                    if (filter && filter.indexOf(item.props.field) === -1) {
                        return null;
                    }
                    let align = item.props.align || this.props.align;
                    let style = {
                        'textAlign': align
                    };
                    if (item.props.width) {
                        style.width = item.props.width;
                    }
                    let sort_icon = 'sort';
                    if (this.sortList[item.props.field]) {
                        sort_icon = 'sort-alpha-' + (this.sortList[item.props.field] === 'asc' ? 'down' : 'up');
                    }
                    return (
                        <th data-key={'head_' + key} style={style}>
                            {item.props.onSort ? <a href='javascript://'
                                                    onClick={this.sortHandler(item.props.field, item.props.onSort)}>
                                {item.props.text}{'\u0020'}
                                <Icon icon={sort_icon}/></a> : item.props.text}
                            {this.props.move ? <span className='column-split'/> : null}
                        </th>
                    );
                })}
            </tr>
            </thead>
        );
    }

    renderBody(filter,filter_type) {
        if (!this.state.data || this.state.data.length <= 0) {
            let columnCount = React.Children.count(this.props.children);
            if (this.props.select) columnCount += 1;
            if (this.props.serialNumber) columnCount += 1;
            return <tr>
                <td align="center" colSpan={columnCount}>{this.props.emptyText}</td>
            </tr>;
        }

        return this.state.data.map((row, i) => {
            return this.renderRow(row, i,null,0,filter,filter_type);
        });
    }

    formatSn(i) {
        if (typeof i === 'string') {
            let arr = i.split('-');
            for (let i=0;i<arr.length;i++) {
                arr[i] = parseInt(arr[i])+1;
            }
            return arr.join('-');
        } else {
            return i+1;
        }
    }

    renderRow(row, i, parentRow,indent,filter,filter_type) {
        let tree_status = 'close';
        if (row.children) {
            if (!this.treeOpens[i] || this.treeOpens[i] === 'open') {
                this.state.tree[i] = row.children;
                tree_status = 'open';
            } else {
                delete this.state.tree[i];
                tree_status = 'close';
            }
        }
        let dynamic_tree = typeof this.props.onClickTree === 'function';
        return (
            <React.Fragment>
                <tr className={this.props.onClick ? 'click-row' : this.getHeaderClasses()} onClick={this.clickHandler(row, i)}>
                    {this.props.serialNumber && filter_type !== 'after' ?
                        <th className='sn text-nowrap' style={{textAlign:'center',width:'30px'}}>
                            {this.formatSn(i)}
                        </th> : null}
                    {this.state.select && filter_type !== 'after' ?
                        <td className='chk' style={{textAlign:'center',width:'30px'}}>
                            <CCheckbox ref={'row_' + i} onChange={this.changeHandler(row, i)}/>
                        </td> : null}
                    {this.headers.map((item, key) => {
                        if (!item || item.props.hide) {
                            return null;
                        }
                        //hold column
                        if (filter && filter.indexOf(item.props.field) === -1) {
                            return null;
                        }
                        //set style
                        let style = {...this.props.columnStyle};

                        style.textAlign = item.props.align || this.props.align;
                        if (item.props.width) {
                            style.width = item.props.width;
                        }
                        //set tree
                        let tree, parent;
                        if (item.props.tree) {
                            if (parentRow) {
                                parent = [];
                            }
                            for (let i=0;i<indent;i++) {
                                parent.push(<span className='mr-4'/>)
                            }
                            tree = <Icon data-open={tree_status} onClick={(e) => {
                                let target = e.currentTarget;
                                if (target.dataset.open === 'close') {
                                    if (typeof this.props.onClickTree === 'function') {
                                        this.props.onClickTree(row, (data) => {
                                            if (!data) {
                                                return
                                            }
                                            let tree        = this.state.tree;
                                            tree[i]         = data;
                                            this.state.tree = null;
                                            this.setState({
                                                tree: tree
                                            })
                                        });
                                    } else {
                                        this.treeOpens[i] = 'open';
                                        let tree        = this.state.tree;
                                        tree[i] = row.children;
                                        this.state.tree = null;
                                        this.setState({
                                            tree: tree
                                        })
                                    }
                                    target.dataset.open = 'open';
                                    target.classList.remove('fa-plus-square');
                                    target.classList.add('fa-minus-square');
                                } else {
                                    this.treeOpens[i] = 'close';
                                    target.dataset.open = 'close';
                                    target.classList.remove('fa-minus-square');
                                    target.classList.add('fa-plus-square');
                                    let tree        = this.state.tree;
                                    delete tree[i];
                                    this.state.tree = null;
                                    this.setState({
                                        tree: tree
                                    })
                                }
                            }} className='mr-1 text-primary' icon={tree_status==='open'?'minus-square':'plus-square'} iconType='regular'/>
                        }

                        if (item.props.children) {
                            return (
                                <td className={item.props.className} style={{'text-align': align}} key={'col_' + key}>{parent}{tree}{React.cloneElement(item, {
                                    text : item.props.text,
                                    row  : row,
                                    value: row[item.props.field]
                                })}</td>
                            );
                        } else {
                            return <td className={this.props.truncate?'text-truncate':''} style={style} key={'col_' + key}>{parent}{dynamic_tree||row.children?tree:null}{item.props.onFormat ? item.props.onFormat(row[item.props.field], row,i) : row[item.props.field]}</td>;
                        }
                    })}
                </tr>
                {this.props.tree ? this.renderTreeRow(row, i,indent+1,filter,filter_type) : null}
            </React.Fragment>
        );
    }

    renderTreeRow(row, i,indent,filter,filter_type) {
        let data = this.state.tree[i];
        if (!data) {
            return null;
        }
        return data.map((item, idx) => {
            return this.renderRow(item, `${i}-${idx}`, row,indent,filter,filter_type);
        });
    }

    renderHoldBefore() {
        if (this.beforeFields.length <= 0) {
            return null;
        }
        return (
            <div className='ck-table-hold-before'>
                <table ref={c=>this.beforeBody=c} id={this.domId+'_before_body'} className={this.getClasses()} style={this.getTableStyles(this.beforeHoldWidth)}>
                    {this.renderCol(this.beforeFields)}
                    {this.props.header ? this.renderHeader(this.beforeFields) : null}
                    <tbody>
                    {this.renderBody(this.beforeFields)}
                    </tbody>
                </table>
            </div>
        )
    }

    renderHoldAfter() {
        if (this.afterFields.length <= 0) {
            return null;
        }
        return (
            <div className='ck-table-hold-after'>
                <table ref={c=>this.afterBody=c} id={this.domId+'_after_body'} className={this.getClasses('shadow')} style={this.getTableStyles(this.afterHoldWidth)}>
                    {this.renderCol(this.afterFields,'after')}
                    {this.props.header ? this.renderHeader(this.afterFields,'after') : null}
                    <tbody >
                    {this.renderBody(this.afterFields,'after')}
                    </tbody>
                </table>
            </div>
        )
    }
}

Table.propTypes = {
    theme      : PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']),
    headerTheme: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']),
    headClass  : PropTypes.string,
    data       : PropTypes.array,
    dataCount  : PropTypes.number,
    select     : PropTypes.bool,
    header     : PropTypes.bool,
    center     : PropTypes.bool,
    currentPage: PropTypes.number,
    striped    : PropTypes.bool,
    bordered   : PropTypes.bool,
    hover      : PropTypes.bool,
    sm         : PropTypes.bool,
    fontSm     : PropTypes.bool,
    responsive : PropTypes.bool,
    align      : PropTypes.string,
    tree       : PropTypes.bool,
    onClickTree: PropTypes.func,
    onClick    : PropTypes.func,
    onCheck    : PropTypes.func,
    move       : PropTypes.bool,
    onRefresh  : PropTypes.func,
    refreshText: PropTypes.string,
    absolute   : PropTypes.bool,
    x          : PropTypes.string,
    y          : PropTypes.string,
    width      : PropTypes.string,
    height     : PropTypes.string,
    scroll     : PropTypes.bool,
    emptyText  : PropTypes.string,
    fixed: PropTypes.bool,
    serialNumber: PropTypes.bool, //是否显示序列号
    truncate: PropTypes.bool,//文字是否截断
};

Table.defaultProps = {
    data       : [],
    dataCount  : 1,
    select     : true,
    header     : true,
    currentPage: 1,
    hover      : true,
    striped    : true,
    fixed:     false,
    align      : 'left',
    emptyText  : 'Not data',
    serialNumber: true,
    truncate: false,
};

Table.Header = TableHeader;
Table.HeaderRow = TableHeaderRow;

export default Table;