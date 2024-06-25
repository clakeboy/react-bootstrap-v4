import React from 'react';
import classNames from 'classnames';
import TableHeader from './TableHeader';
import TableHeaderRow from "./TableHeaderRow";
import CCheckbox from "./CCheckbox";
import Button from './Button';
import common, { GetDomXY, hasScrolledParent } from "./Common";
import Icon from './Icon';
import './css/Table.less';
import Scroll from "./Scroll";
import HScroll from "./HScroll";
import Menu from "./Menu";
import { AnyObject, ComponentProps, StrObject, Theme } from './components/common';
import Load from './Load';

interface Props extends ComponentProps {
    theme?: Theme
    headerTheme?: Theme
    headerAlign?: string
    headClass?: string
    data?: any[]
    dataCount?: number
    select?: boolean
    header?: boolean
    center?: boolean
    currentPage?: number
    striped?: boolean
    bordered?: boolean
    hover?: boolean
    sm?: boolean
    fontSm?: boolean
    responsive?: boolean
    align?: string
    tree?: boolean
    onClickTree?: (row: any, callback: (data: any) => any) => void
    onClick?: (row: any, i: string) => void
    onCheck?: (chk: boolean, row: any) => void
    move?: boolean
    onRefresh?: () => void
    refreshText?: string
    scroll?: boolean
    emptyText?: string
    fixed?: boolean
    serialNumber?: boolean//是否显示序列号
    truncate?: boolean//文字是否截断
    menu?: any
    sticky?: boolean
    columnStyle?: StrObject
    loading?: boolean
}

interface State {
    data: any[]
    select: boolean
    tree: AnyObject
    refresh: boolean
    selectRows: any
    selectAll: boolean
    selectHalf: boolean
}

export class Table extends React.Component<Props, State> {
    static Header = TableHeader;
    static HeaderRow = TableHeaderRow;

    static defaultProps = {
        data: [],
        dataCount: 1,
        select: true,
        header: true,
        currentPage: 1,
        hover: true,
        striped: true,
        fixed: false,
        align: 'left',
        emptyText: 'Not data',
        serialNumber: true,
        truncate: false,
        headerTheme: Theme.light
    };
    treeOpens: AnyObject
    select_all: boolean
    selectRows: any[]
    treeHeader: AnyObject
    sortList: AnyObject
    afterFields: any[]
    beforeFields: any[]
    tableHeaderRows: any[]
    headers: any[]
    width: number
    beforeHoldWidth: number
    afterHoldWidth: number
    domId: string
    mainDom: HTMLDivElement
    rootDom: HTMLDivElement
    stickyDom: HTMLElement
    tableHeader?: HTMLElement
    afterHeader?: HTMLElement
    beforeHeader?: HTMLElement
    beforeBody?: HTMLTableElement
    afterBody?: HTMLTableElement
    tableBody: HTMLTableElement
    hScroll: HScroll
    menu: any
    mainMenu: Menu
    allchk: CCheckbox
    renderCheckes: any[]
    constructor(props: any) {
        super(props);

        this.state = {
            data: this.props.data ?? [],
            select: this.props.select ?? false,
            tree: {},
            refresh: typeof this.props.onRefresh === 'function',
            selectRows: {},
            selectAll: false,
            selectHalf: false,
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

        this.initTableWidth(this.props.children);

        this.domId = 'table-' + common.RandomString(16);
        if (this.props.id) {
            this.domId = this.props.id;
        }
    }

    componentDidMount() {
        this.mainDom.addEventListener('scroll', this.scrollHandler, false);
        window.addEventListener('resize', this.holdShow, false);
        this.syncRowsHeight();
        this.holdShow();
        this.sticky();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.holdShow, false);
        this.unSticky();
    }

    sticky() {
        if (!this.props.sticky) return
        const parentScroll = hasScrolledParent(this.mainDom)
        if (parentScroll === undefined) {
            document.addEventListener('scroll', this.stickyHeader, false)
            this.stickyDom = document.documentElement
        } else {
            parentScroll.addEventListener('scroll', this.stickyHeader, false)
            this.stickyDom = parentScroll
        }
    }

    unSticky() {
        if (this.props.sticky && this.stickyDom) {
            if (this.stickyDom === document.documentElement) {
                document.removeEventListener('scroll', this.stickyHeader)
            } else {
                this.stickyDom.removeEventListener('scroll', this.stickyHeader)
            }
        }
    }

    stickyHeader = () => {
        let hxy;
        if (this.stickyDom === document.documentElement) {
            hxy = GetDomXY(this.mainDom)
        } else {
            hxy = GetDomXY(this.mainDom, this.stickyDom)
        }

        if (hxy.top < this.stickyDom.scrollTop) {
            const y = this.stickyDom.scrollTop - hxy.top - 2
            if (this.tableHeader)
                this.tableHeader.style.transform = `translate3d(0,${y}px,10px)`;
            if (this.afterHeader) {
                this.afterHeader.style.transform = `translate3d(0,${y}px,10px)`;
            }
            if (this.beforeHeader) {
                this.beforeHeader.style.transform = `translate3d(0,${y}px,10px)`;
            }
        } else {
            if (this.tableHeader)
                this.tableHeader.style.transform = `translate3d(0,0,10px)`;
            if (this.afterHeader) {
                this.afterHeader.style.transform = `translate3d(0,0,10px)`;
            }
            if (this.beforeHeader) {
                this.beforeHeader.style.transform = `translate3d(0,0,10px)`;
            }
        }
    }

    syncRowsHeight() {
        if (this.beforeBody) {
            this.setRowsHeight(this.beforeBody?.tHead?.rows, this.tableBody?.tHead?.rows);
            // this.beforeBody.tHead.rows[0].style.height = this.tableBody.tHead.rows[0].clientHeight + 'px';
        }
        if (this.afterBody) {
            this.setRowsHeight(this.afterBody?.tHead?.rows, this.tableBody?.tHead?.rows);
        }

        if (this.afterBody || this.beforeBody) {
            for (let i = 0; i < this.tableBody.tBodies[0].rows.length; i++) {
                // console.log(beforeTable.tBodies[0].rows[i]);
                let height = this.tableBody.tBodies[0].rows[i].getBoundingClientRect().height
                if (this.beforeBody) {
                    height = this.beforeBody.tBodies[0].rows[i].getBoundingClientRect().height > height ? this.beforeBody.tBodies[0].rows[i].getBoundingClientRect().height : height
                }
                if (this.afterBody) {
                    height = this.afterBody.tBodies[0].rows[i].getBoundingClientRect().height > height ? this.afterBody.tBodies[0].rows[i].getBoundingClientRect().height : height
                }
                if (this.beforeBody) {
                    this.beforeBody.tBodies[0].rows[i].style.height = height + 'px';
                }
                if (this.afterBody) {
                    this.afterBody.tBodies[0].rows[i].style.height = height + 'px';
                }

                if (this.tableBody.tBodies[0].rows[i].getBoundingClientRect().height < height) {
                    this.tableBody.tBodies[0].rows[i].style.height = height + 'px';
                }
            }
        }

        if (this.tableHeader) {
            // this.tableHeader.style.transform = `translateY(${e.currentTarget.scrollTop}px)`;
            // this.tableHeader.style.transform = `translate3d(0,0,10px)`;
        }
    }

    setRowsHeight(rows: any, heightRows: any) {
        for (let i = 0; i < rows.length; i++) {
            rows[i].style.height = heightRows[i].getBoundingClientRect().height + 'px';
        }
    }

    holdShow = () => {
        if (this.mainDom.clientWidth >= this.tableBody.clientWidth) {
            if (this.afterBody && this.afterBody.parentNode) {
                (this.afterBody.parentNode as HTMLElement).style.right = (this.mainDom.clientWidth - this.tableBody.clientWidth) + 'px';
            }
        } else {
            if (this.afterBody && this.afterBody.parentNode) {
                (this.afterBody.parentNode as HTMLElement).style.right = '0'
            }
        }
        this.holdShadow();
    };

    componentDidUpdate() {
        this.syncRowsHeight();
        this.holdShow();
        this.unSticky();
        this.sticky()
    }

    UNSAFE_componentWillReceiveProps(nextProps: Props) {
        if (this.props.data !== nextProps.data) {
            // this.select_all = false;
            // this.selectRows = [];
            // if (this.allchk) {
            //     this.allchk.setChecked(false);
            //     this.allchk.setHalf(false);
            // }
            const treeData:AnyObject = {}
            this.initTreeData(nextProps.data??[], treeData)
            this.setState({
                data: nextProps.data ?? [],
                selectAll: false,
                selectHalf: false,
                selectRows: {},
                tree:treeData
            }, () => {
                if (this.hScroll) {
                    this.hScroll.initAlignParent();
                }
            });
        }
    }

    shouldComponentUpdate(nextProps: Props, nextState: State) {
        if (nextProps.children !== this.props.children) {
            this.headers = []
            this.initTableWidth(nextProps.children)
        }
        if (nextState.selectRows !== this.state.selectRows) {
            return true
        }
        if (nextState.data !== this.state.data) {
            return true
        }
        if (nextProps.loading !== this.props.loading) {
            return true
        }
        return nextState.tree !== this.state.tree;
    }

    initTreeData(data:any[],treeData:AnyObject): AnyObject {
        data.forEach((item:any,i:number)=>{
            if (item.children) {
                treeData[i.toString()] = item.children
                this.initTreeData(item.children,treeData)
            }
        })
        return treeData
    }

    initTableWidth(children:any) {
        // if (this.props.width) {
        this.width = 0;
        this.beforeHoldWidth = 0;
        this.afterHoldWidth = 0;
        const reg = /(\d+)(px|rem|cm|mm|pt)$/;
        let unit = 0;
        React.Children.map(children, (item) => {
            if (item.type === TableHeader) {
                if (item.props.hide) {
                    return
                }
                let matchs;
                if (item.props.width && item.props.width.match) {
                    matchs = item.props.width.match(reg);
                    this.width += parseInt(matchs[1]);
                    unit = parseInt(matchs[2]) ?? 0;
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
            } else if (item.type === Menu) {
                this.menu = React.cloneElement(item, { ref: (c: any) => { this.mainMenu = c } });
                // this.menu.props.ref=(c)=>{this.mainMenu=c};
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

    initTableHeaderRow(row: any) {
        const headerRow: any[] = [];
        React.Children.map(row.props.children, (item) => {
            if (item.type === TableHeader) {
                headerRow.push(item)
            }
        });
        this.tableHeaderRows.push(headerRow);
    }

    //checkbox handler
    changeHandler(row: any, i: string) {
        return (checked: boolean) => {
            this.setRowCheck(checked, i);
            const [allChecked, half] = this.checkAllCheckHalf();
            const selectRows = Object.assign({}, this.state.selectRows)
            selectRows[i] = checked
            this.setState({
                selectRows: selectRows,
                selectAll: allChecked,
                selectHalf: half
            })
            if (typeof this.props.onCheck === "function") {
                this.props.onCheck(checked, row);
            }
        };
    }
    checkAllCheckHalf() {
        if (!this.allchk) {
            return [false, false];
        }

        if (this.selectRows.length > 0 && this.selectRows.length !== this.renderCheckes.length) {
            // this.allchk.setHalf(true);
            return [false, true]
        }
        if (this.selectRows.length === 0) {
            return [false, false]
            // this.allchk.setHalf(false);
            // this.allchk.setChecked(false);
        } else if (this.selectRows.length === this.renderCheckes.length) {
            return [true, false]
            // this.allchk.setHalf(false);
            // this.allchk.setChecked(true);
        }
        return [false, false]
    }
    setRowCheck(checked: boolean, rowIdx: string) {
        // let selectedIdx;
        // let chkRow = this.renderCheckes.find((item,idx)=>{
        //     return item.idx === rowIdx
        // })
        if (checked) {
            if (!this.selectRows.includes(rowIdx)) {
                this.selectRows.push(rowIdx);
            }
            // this.selectRows[rowIdx] = this.state.data[rowIdx];
        } else {
            if (this.selectRows.includes(rowIdx)) {
                this.selectRows.splice(this.selectRows.indexOf(rowIdx), 1);
            }
        }

        // if (checked) {
        //     ReactDOM.findDOMNode(chkRow.ref).parentNode.parentNode.classList.add('ck-table-selected');
        // } else {
        //     ReactDOM.findDOMNode(chkRow.ref).parentNode.parentNode.classList.remove('ck-table-selected');
        // }
        // console.log(this.selectRows)
    }

    refCheck(row: any, rowIdx: string) {
        return (c: any) => {
            if (!c) return
            this.renderCheckes.push({
                ref: c,
                idx: rowIdx,
                data: row
            })
            // this.renderRows.push(row)
        }
    }

    //table row check handler
    clickHandler(row: any, i: string) {
        return () => {
            if (typeof this.props.onClick === 'function') {
                this.props.onClick(row, i);
            }
        }
    }
    //table head sort
    sortHandler(field: string, callback: (field: string, type: string) => void) {
        return (e: React.MouseEvent) => {
            const dom = e.currentTarget as HTMLElement;
            let sort_type:string
            if (dom.dataset.sort) {
                sort_type = dom.dataset.sort === 'asc' ? 'desc' : 'asc';
            } else {
                sort_type = 'asc'
            }
            callback(field, sort_type);
            dom.dataset.sort = sort_type ;
            this.sortList[field] = sort_type;
            const child = dom.querySelector('i') as HTMLElement;
            child.classList.remove('fa-sort', 'fa-sort-alpha-up', 'fa-sort-alpha-down');
            child.classList.add('fa-sort-alpha-' + (sort_type === 'asc' ? 'down' : 'up'));
        }
    }

    selectAll = (checked: boolean) => {
        this.select_all = checked;
        const selectRows: any = {}
        this.renderCheckes.forEach((item) => {
            item.ref.setChecked(this.select_all);
            this.setRowCheck(this.select_all, item.idx);
            selectRows[item.idx] = checked
        });
        const [, half] = this.checkAllCheckHalf();
        this.setState({
            selectRows: selectRows,
            selectAll: checked,
            selectHalf: half
        })
    };

    /**
     * 得到所有选中的行
     * @returns {*}
     */
    getSelectRows() {
        return this.selectRows.map((item) => {
            const chkItem = this.renderCheckes.find((chk) => {
                return chk.idx === item
            })
            return chkItem.data
        });
    }

    /**
     * 设置选中的行
     * @param key 对应行数据的KEY值
     * @param list 要选中的数据值
     */
    setSelectRows(key: string, list: any[]): void {
        const selectRows: any = {}
        this.renderCheckes.forEach((chk) => {
            const checked = list.includes(chk.data[key])
            chk.ref.setChecked(checked);
            this.setRowCheck(checked, chk.idx);
            selectRows[chk.idx] = checked
        });
        const [allChecked, half] = this.checkAllCheckHalf();
        this.setState({
            selectRows: selectRows,
            selectAll: allChecked,
            selectHalf: half
        })
    }

    getClasses(css?: string) {
        let base = 'table ck-table';
        //striped
        if (this.props.striped) {
            base = classNames(base, 'table-striped');
        }
        //theme
        if (this.props.theme !== undefined) {
            base = classNames(base, 'table-' + Theme[this.props.theme]);
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

        if (this.props.height) {
            base = classNames(base, 'sticky-thead')
        }

        return classNames(base, css);
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
        return base;
    }

    getStyles() {
        //default style
        const base: StrObject = {};
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
        const base: StrObject = {};
        if (this.props.absolute) {
            base.position = 'absolute';
            base.top = this.props.y ?? '';
            base.left = this.props.x ?? '';
        }
        if (this.props.height) {
            base.overflow = 'hidden'
            base.height = this.props.height;
        }
        return common.extend(base, this.props.style)
    }

    getTableStyles(width?: number) {
        const base: StrObject = {};
        if (this.props.width) {
            base.width = this.width.toString() + 'px';
        }
        if (width) {
            base.width = width.toString() + 'px';
        }
        if (this.props.height || this.props.sticky) {
            base.transformStyle = 'preserve-3d';
        }
        return base;
    }

    getHeaderClasses() {
        let base = '';
        if (this.props.headerTheme !== undefined) {
            base = 'table-' + Theme[this.props.headerTheme];
        }
        if (this.props.sticky) {
            base = classNames(base, 'sticky-thead-row')
        }
        return classNames(base, this.props.headClass);
    }

    scrollHandler = (e: Event) => {
        if (this.beforeBody) {
            const dom = document.querySelector('.ck-table-hold-before') as HTMLElement;
            dom.scrollTop = (e.currentTarget as HTMLElement).scrollTop
            // let head = this.beforeBody.querySelector('thead')
            // if (head) head.style.transform = `translate3d(0,${e.currentTarget.scrollTop}px,10px)`;
        }
        if (this.afterBody) {
            const dom = document.querySelector('.ck-table-hold-after') as HTMLElement
            dom.scrollTop = (e.currentTarget as HTMLElement).scrollTop
            // let head = this.afterBody.querySelector('thead')
            // if (head) head.style.transform = `translate3d(0,${e.currentTarget.scrollTop}px,10px)`;
        }
        this.holdShadow();
    };

    holdShadow() {
        if (this.beforeBody) {
            const parent = this.beforeBody.parentNode as HTMLElement
            if (this.mainDom.scrollLeft === 0) {
                parent.classList.remove('shadow');
            } else {
                parent.classList.add('shadow');
            }
        }

        if (this.afterBody) {
            const parent = this.afterBody.parentNode as HTMLElement
            const diff = this.mainDom.scrollWidth - this.mainDom.clientWidth;
            if (diff === this.mainDom.scrollLeft || diff - 1 === this.mainDom.scrollLeft) {
                parent.classList.remove('shadow');
            } else {
                parent.classList.add('shadow');
            }
        }
    }

    setHeight(height: string) {
        this.mainDom.style.height = height;
        this.rootDom.style.height = height;
    }

    render() {
        let divClass = 'position-relative'
        if (this.props.height) {
            divClass += ' ck-table-fixed-h'
        }
        divClass = classNames(divClass, this.props.className)
        this.renderCheckes = [];
        return (
            <div ref={(c: any) => this.rootDom = c} className={divClass} id={this.domId + '_main'} style={this.getMainStyle()}>
                <div ref={(c: any) => this.mainDom = c} id={this.domId} className={this.getMainClass()} style={this.getStyles()}>
                    {this.state.refresh ? (
                        <Button className='ck-table-refresh-btn' icon='sync-alt' onClick={this.props.onRefresh} size="sm" theme={Theme.dark}>
                            {this.props.refreshText}
                        </Button>) : null}
                    <table ref={(c: any) => this.tableBody = c} id={this.domId + '_body'} className={this.getClasses()} style={this.getTableStyles()}>
                        {this.props.width ? this.renderCol() : null}
                        {this.props.header ? this.renderHeader() : null}
                        <tbody key={"main"}>
                            {this.renderBody(this.beforeFields.concat(this.afterFields), 'main')}
                        </tbody>
                    </table>
                </div>
                {this.renderHoldBefore()}
                {this.renderHoldAfter()}
                {this.props.height ? <Scroll selector={`#${this.domId}`} /> : null}
                {this.props.width ? <HScroll ref={(c: any) => this.hScroll = c} showSelector={`#${this.domId}_main`} selector={`#${this.domId}`} alignParent /> : null}
                {this.menu}
                <div className={'ck-table-loading '+(this.props.loading?'':'d-none')}>
                    <div className='text-center mt-5'>
                        <Load/>
                    </div>
                </div>
            </div>
        );
    }

    renderCol(filter?: string[], filter_type?: string) {
        return <colgroup>
            {this.props.serialNumber && filter_type !== 'after' ? <col width='30px' /> : null}
            {this.state.select && filter_type !== 'after' ? <col width={'30px'} /> : null}
            {this.headers.map((item,idx) => {
                //hold column
                if (filter && filter.indexOf(item.props.field) === -1) {
                    return null;
                }
                if (item.props.hide) {
                    return null;
                }
                return <col key={idx} width={item.props.width} />
            })}
        </colgroup>
    }

    renderHeaderRow(filter?: string[], filter_type?: string) {
        if (this.tableHeaderRows.length <= 0) return null;
        const headers: any[] = [];

        this.tableHeaderRows.forEach((list) => {
            let offset = 0;
            // if (index === 0) {
            if (this.props.serialNumber) offset++;
            if (this.props.select) offset++;
            // }
            let totalCols = 0;
            headers.push(
                <tr>
                    {offset > 0 && filter_type !== 'after' ? <th colSpan={offset} /> : null}
                    {list.map((item: any,idx:number) => {
                        let colsCount = item.props.cols;
                        if (filter && totalCols >= filter.length) return null;
                        if (filter && colsCount > filter.length) {
                            colsCount = filter.length;
                        }
                        totalCols += item.props.cols;
                        return <th key={idx} colSpan={colsCount} className='colspan' style={{ textAlign: item.props.align }}>
                            {item.props.text}
                        </th>
                    })}
                </tr>
            )
        });

        return headers;
    }

    renderHeader(filter?: string[], filter_type?: string) {
        return (
            <thead ref={(c: any) => {
                if (!filter) {
                    this.tableHeader = c
                } else {
                    switch (filter_type) {
                        case 'after':
                            this.afterHeader = c
                            break
                        case 'before':
                            this.beforeHeader = c
                            break
                    }
                }
            }} className={this.getHeaderClasses()}>
                {this.renderHeaderRow(filter, filter_type)}
                <tr>
                    {this.props.serialNumber && filter_type !== 'after' ? <th style={{ width: '30px', textAlign: 'center' }} /> : null}
                    {this.state.select && filter_type !== 'after' ?
                        <th className='chk' style={{ textAlign: 'center', width: '30px' }}>
                            <CCheckbox ref={(c: any) => { this.allchk = c }} onChange={this.selectAll} checked={this.state.selectAll} half={this.state.selectHalf} />
                        </th> : null}
                    {this.headers.map((item:TableHeader, key) => {
                        if (!item || item.props.hide) {
                            return null;
                        }
                        //hold column
                        if (filter && filter.indexOf(item.props.field) === -1) {
                            return null;
                        }
                        const align = this.props.headerAlign || item.props.align || this.props.align;
                        const style: StrObject = {
                            'textAlign': align??'',
                        };
                        if (item.props.width) {
                            style.width = item.props.width;
                        }
                        if (item.props.textOver) {
                            style.textOverflow = 'ellipsis'
                        }
                        let sort_icon = 'sort';
                        if (item.props.sort) {
                            this.sortList[item.props.field] = item.props.sort
                        }
                        if (this.sortList[item.props.field]) {
                            sort_icon = 'sort-alpha-' + (this.sortList[item.props.field] === 'asc' ? 'down' : 'up');
                        }
                        return (
                            <th key={key} data-key={'head_' + key} style={style}>
                                {item.props.onSort ? <a href='javascript://' data-sort={item.props.sort??undefined}
                                    onClick={this.sortHandler(item.props.field, item.props.onSort)}>
                                    {item.props.text}{'\u0020'}
                                    <Icon icon={sort_icon} /></a> : item.props.text}
                                {this.props.move ? <span className='column-split' /> : null}
                            </th>
                        );
                    })}
                </tr>
            </thead>
        );
    }

    renderBody(filter?: string[], filter_type?: string) {
        if (!this.state.data || this.state.data.length <= 0) {
            let columnCount = React.Children.count(this.props.children);
            if (this.props.select) columnCount += 1;
            if (this.props.serialNumber) columnCount += 1;
            return <tr key={0}>
                <td key={0} align="center" colSpan={columnCount}>{this.props.emptyText}</td>
            </tr>;
        }

        return this.state.data.map((row, i) => {
            return this.renderRow(row, i.toString(), null, 0, filter, filter_type);
        });
    }

    formatSn(i: string | number) {
        if (typeof i === 'string') {
            const arr = i.split('-');
            for (let i = 0; i < arr.length; i++) {
                arr[i] = (parseInt(arr[i]) + 1).toString();
            }
            return arr.join('-');
        } else {
            return i + 1;
        }
    }

    hoverAuthorRow = (e: React.MouseEvent) => {
        const row = e.currentTarget as HTMLTableRowElement;
        const id = (row?.parentNode?.parentNode as HTMLElement).id;
        if (id.includes('after') || id.includes('before')) {
            // this.tableBody.tBodies[0].rows[row.sectionRowIndex].style.backgroundColor = (e.type === "mouseover" ? 'var(--bs-table-hover-bg)' : '')
            this.tableBody.tBodies[0].rows[row.sectionRowIndex].classList.toggle('ck-table-hover')
            if (id.includes('after') && this.beforeBody) {
                this.beforeBody.tBodies[0].rows[row.sectionRowIndex].classList.toggle('ck-table-hover')
                // this.beforeBody.tBodies[0].rows[row.sectionRowIndex].style.backgroundColor = (e.type === "mouseover" ? 'var(--bs-table-hover-bg)' : '')
            } else if (id.includes('before') && this.afterBody) {
                this.afterBody.tBodies[0].rows[row.sectionRowIndex].classList.toggle('ck-table-hover')
                // this.afterBody.tBodies[0].rows[row.sectionRowIndex].style.backgroundColor = (e.type === "mouseover" ? 'var(--bs-table-hover-bg)' : '')
            }
        } else {
            if (this.beforeBody) {
                // this.beforeBody.tBodies[0].rows[row.sectionRowIndex].style.backgroundColor = (e.type === "mouseover" ? 'var(--bs-table-hover-bg)' : '')
                this.beforeBody.tBodies[0].rows[row.sectionRowIndex].classList.toggle('ck-table-hover')
            }
            if (this.afterBody) {
                // this.afterBody.tBodies[0].rows[row.sectionRowIndex].style.backgroundColor = (e.type === "mouseover" ? 'var(--bs-table-hover-bg)' : '')
                this.afterBody.tBodies[0].rows[row.sectionRowIndex].classList.toggle('ck-table-hover')
            }
        }
    }

    renderRow(row: any, i: string, parentRow: any, indent: number, filter?: string[], filter_type?: string) {
        let tree_status = 'close';
        if (row.children) {
            if (!this.treeOpens[i] || this.treeOpens[i] === 'open') {
                // this.state.tree[i] = row.children;
                tree_status = 'open';
            } else {
                // delete this.state.tree[i];
                tree_status = 'close';
            }
        }
        const dynamic_tree = typeof this.props.onClickTree === 'function';
        let classString = this.props.onClick ? 'click-row' : ''
        if (this.props.sticky) {
            classString += ' sticky-thead-row'    
        }
        classString += this.state.selectRows[i] ? ' ck-table-selected' : '';
        return (
            <React.Fragment key={i}>
                <tr key={i} onContextMenu={(e) => {
                    if (!this.mainMenu) return;
                    e.preventDefault();
                    this.mainMenu.show({ evt: e, type: 'mouse', data: row });
                }} onMouseOver={this.hoverAuthorRow} onMouseOut={this.hoverAuthorRow} className={classString} onClick={this.clickHandler(row, i)}>
                    {this.props.serialNumber && filter_type !== 'after' ?
                        <th className={'sn text-nowrap' + (this.props.headerTheme?' table-' + Theme[this.props.headerTheme]:'')} style={{ textAlign: 'center', width: '30px' }}>
                            {this.formatSn(i)}
                        </th> : null}
                    {this.state.select && filter_type !== 'after' ?
                        <td className='chk' style={{ textAlign: 'center', width: '30px' }}>
                            {filter_type === 'main' && this.beforeFields.length > 0 ? null : <CCheckbox ref={this.refCheck(row, i)} onChange={this.changeHandler(row, i)} checked={!!this.state.selectRows[i]} />}
                        </td> : null}
                    {this.headers.map((item, key) => {
                        if (!item || item.props.hide) {
                            return null;
                        }
                        //set style
                        const style = { ...this.props.columnStyle };

                        style.textAlign = item.props.align || this.props.align;
                        if (item.props.width) {
                            style.width = item.props.width;
                        }
                        //hold column
                        if (filter) {
                            if (filter_type === 'main') {
                                if (filter.includes(item.props.field)) {
                                    return <td className={this.props.truncate ? 'text-truncate' : ''} style={style} key={'col_' + key} />
                                }
                            } else {
                                if (!filter.includes(item.props.field)) {
                                    return null
                                }
                            }
                        }

                        //set tree
                        let tree, parent;
                        if (item.props.tree) {
                            if (parentRow) {
                                parent = [];
                                for (let i = 0; i < indent; i++) {
                                    parent.push(<span key={i} className='me-4' />)
                                }
                            }
                            tree = <Icon data-open={tree_status} onClick={(e: React.MouseEvent) => {
                                const target = e.currentTarget as HTMLElement;
                                if (target.dataset.open === 'close') {
                                    if (typeof this.props.onClickTree === 'function') {
                                        this.props.onClickTree(row, (data: any) => {
                                            if (!data) {
                                                return
                                            }
                                            const tree = Object.assign({}, this.state.tree);
                                            tree[i] = data;
                                            // this.state.tree = null;
                                            this.setState({
                                                tree: tree
                                            })
                                        });
                                    } else {
                                        this.treeOpens[i] = 'open';
                                        const tree = Object.assign({}, this.state.tree);
                                        tree[i] = row.children;
                                        // this.state.tree = null;
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
                                    const tree = Object.assign({}, this.state.tree);
                                    delete tree[i];
                                    // this.state.tree = null;
                                    this.setState({
                                        tree: tree
                                    })
                                }
                            }} className='me-1 text-primary' icon={tree_status === 'open' ? 'minus-square' : 'plus-square'} iconType='regular' />
                        }

                        if (item.props.children) {
                            return (
                                <td className={item.props.className} style={style} key={'col_' + key}>{parent}{tree}{React.cloneElement(item, {
                                    text: item.props.text,
                                    row: row,
                                    value: row[item.props.field]
                                })}</td>
                            );
                        } else {
                            return <td className={this.props.truncate ? 'text-truncate' : ''} style={style} key={'col_' + key}>{parent}{dynamic_tree || row.children ? tree : null}{item.props.onFormat ? item.props.onFormat(row[item.props.field], row, i) : row[item.props.field]}</td>;
                        }
                    })}
                </tr>
                {this.props.tree ? this.renderTreeRow(row, i, indent + 1, filter, filter_type) : null}
            </React.Fragment>
        );
    }

    renderTreeRow(row: any, i: string, indent: number, filter?: string[], filter_type?: string) {
        const data: any = this.state.tree[i];
        if (!data) {
            return null;
        }
        return data.map((item: any, idx: number) => {
            return this.renderRow(item, `${i}-${idx}`, row, indent, filter, filter_type);
        });
    }

    renderHoldBefore() {
        if (!this.state.data) return null;
        if (this.beforeFields.length <= 0) {
            return null;
        }
        const style: StrObject = {}
        if (this.props.height) {
            style.overflow = 'hidden'
        }
        return (
            <div className='ck-table-hold-before' style={style}>
                <table ref={(c: any) => this.beforeBody = c} id={this.domId + '_before_body'} className={this.getClasses()} style={this.getTableStyles(this.beforeHoldWidth)}>
                    {this.renderCol(this.beforeFields)}
                    {this.props.header ? this.renderHeader(this.beforeFields, 'before') : null}
                    <tbody>
                        {this.renderBody(this.beforeFields)}
                    </tbody>
                </table>
            </div>
        )
    }

    renderHoldAfter() {
        if (!this.state.data) return null;
        if (this.afterFields.length <= 0) {
            return null;
        }
        const style: StrObject = {}
        if (this.props.height) {
            style.overflow = 'hidden'
        }
        return (
            <div className='ck-table-hold-after shadow' style={style}>
                <table ref={(c: any) => this.afterBody = c} id={this.domId + '_after_body'} className={this.getClasses('')} style={this.getTableStyles(this.afterHoldWidth)}>
                    {this.renderCol(this.afterFields, 'after')}
                    {this.props.header ? this.renderHeader(this.afterFields, 'after') : null}
                    <tbody >
                        {this.renderBody(this.afterFields, 'after')}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Table;