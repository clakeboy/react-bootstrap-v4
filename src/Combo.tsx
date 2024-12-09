import React from 'react';
import classNames from 'classnames/bind';
import Table from './Table';
import TableHeader from './TableHeader';
import Common, {map} from './Common';
import "./css/Combo.less";
import Load from "./Load";
import common from "./Common";
import { ComponentProps, StrObject, Theme } from './components/common';

export interface ComboProps extends ComponentProps {
    searchColumn?: string
    data?: any
    showRows?: number,
    search?: string
    onSearch?: (search:string,callback:(data:any)=>void)=>void
    onSelect?: (val:any,row:any)=>void
    onClose?: ()=>void
    onShow?: ()=>void
    sm?: boolean
    multi?: boolean
    multiDef?: any
    //filter column exp: ['name','age'] or [{field:'name',width:'100px'},{field:'age',width:'100px'}]
    filterColumns?: any[]
    noSearch?: boolean
    header?: boolean
    searchType?: string // 'start','include'
    triangular?: string
    empty?: string //empty data show text
}

interface State {
    data: any
    loading: boolean
    emptyText: string
}

export class Combo extends React.Component<ComboProps,State> {
    static defaultProps = {
        showRows:8,
        data:[],
        search:"",
        multi:false,
        multiDef:null,
        header:false,
        searchType: 'start'
    };

    isRemote:boolean
    parentDom: HTMLElement
    search:string
    isClose:boolean
    table:Table
    nodeList?: NodeListOf<HTMLElement>
    mainDom:HTMLElement
    conDom:HTMLElement
    currentSelect?:number
    filterTime?:any
    isMobile:boolean
    constructor(props:any) {
        super(props);
        this.isRemote = !!this.props.onSearch;
        this.state = {
            data:this.props.data,
            loading:this.isRemote,
            emptyText:this.props.empty??'Not Data'
        };

        this.search = this.props.search??'';
        this.isClose = true;
        this.isMobile = Common.Version().mobile;
    }

    componentDidMount() {
        // if (this.props.multiDef) {
        //     common.map(this.props.multiDef,(val,key)=>{
        //         this.table.setSelectRows(key,val);
        //     });
        // }
        if (this.isMobile) {
            this.mainDom.addEventListener("click",this.hide)
        }
        
    }

    componentWillUnmount() {
        window.removeEventListener('mousedown',this.hide,false);
        if (this.parentDom) {
            this.parentDom.removeEventListener('keydown',this.keyDownHandler,false);
            this.parentDom.removeEventListener('blur',this.hide,false);
            this.parentDom.removeEventListener('click',this.checkShow,false);
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps:ComboProps) {
        if (this.props.data !== nextProps.data) {
            this.setState({data:nextProps.data});
        }
    }

    componentDidUpdate() {
        if (this.table) {
            const mainDom = this.table.mainDom as HTMLElement;
            const height = mainDom.querySelector('tbody>tr')?.clientHeight as number;
            let fixHeader = 0;
            if (this.props.header) {
                fixHeader = mainDom.querySelector('thead')?.clientHeight as number;
            }
            const showRows = this.props.showRows ?? 1
            if (this.state.data.length > showRows) {
                // let mainDom = this.table.mainDom;
                // let height = mainDom.querySelector('tr').clientHeight;
                // this.conDom.style.overflowY = 'auto';
                // this.conDom.style.height = (height*this.props.showRows)+'px';
                this.table.setHeight((height*showRows+fixHeader)+'px');
            } else {
                // this.table.setHeight((height*this.state.data.length+fixHeader)+'px');
                this.table.setHeight('auto');
            }
            if (!this.props.multi) {
                this.clearSelect();
            }
            this.nodeList = mainDom.querySelectorAll('tbody tr');
        }
    }

    setSelectRows(key:any,val:any) {
        this.table.setSelectRows(key,val);
    }

    setSearchText(text:string) {
        this.search = text;
    }

    show(search:any,dom:HTMLElement) {
        this.parentDom = dom;
        this.parentDom.addEventListener('keydown',this.keyDownHandler,false);
        this.parentDom.addEventListener('blur',this.hide,false);
        this.parentDom.addEventListener('click',this.checkShow,false);
        window.addEventListener('mousedown',this.hide,false);
        // document.querySelectorAll('.ck-combo').forEach((item)=>{
        //     item.classList.add('d-none');
        // });
        this.mainDom.classList.remove("ck-none");
        this.filter(search??'');
        if (typeof this.props.onShow === 'function') {
            this.props.onShow();
        }
        this.isClose = false;
        
    }

    checkShow = ()=> {
        if (this.isClose) {
            this.show(this.search,this.parentDom as HTMLElement);
        }
    };

    keyDownHandler = (e:KeyboardEvent)=>{
        if (this.isClose) {
            this.show(this.search,this.parentDom as HTMLElement);
        }
        switch (e.key) {
            case 'ArrowUp': //key up
                e.preventDefault();
                e.stopPropagation();
                this.moveItem(-1);
                break;
            case 'ArrowDown': //key down
                e.preventDefault();
                e.stopPropagation();
                this.moveItem(1);
                break;
            case ' ': //key space
                if (this.props.noSearch) {
                    this.selectItem();
                }
                break;
            case 'Enter': //key enter
                this.selectItem();
                break;
            case 'Escape': //key esc
                this.hide();
                break;
            case 'Tab': //key tab
                this.selectItem();
                break;
        }
    };

    clearSelect() {
        if (!this.currentSelect) {
            return
        }
        // let nodeList =? document.querySelectorAll(`${this.table.domId} tbody tr`);
        if (this.nodeList && this.nodeList[this.currentSelect]) {
            const node = this.nodeList[this.currentSelect];
            node.classList.remove('ck-combo-selected')
        }
        this.currentSelect = undefined;
        this.nodeList = undefined;
    }

    moveItem(step=0) {
        if (!this.nodeList) {
            return
        }
        if (!this.currentSelect) {
            this.currentSelect = 0;
        } else {
            if (this.nodeList[this.currentSelect]) {
                this.nodeList[this.currentSelect].classList.remove('ck-combo-selected');
            }
            this.currentSelect += step;
            if (this.currentSelect < 0) {
                this.currentSelect = 0;
            }
            if (this.currentSelect >= this.nodeList.length) {
                this.currentSelect = this.nodeList.length-1;
            }
        }

        if (this.nodeList[this.currentSelect]) {
            //this.conDom
            const scrollDom = this.table.mainDom as HTMLDivElement;
            let fixHeight = 0;
            if (this.props.header) {
                fixHeight = this.table.mainDom?.querySelector('thead')?.clientHeight as number;
            }
            
            const node = this.nodeList[this.currentSelect];
            node.classList.add('ck-combo-selected');
            // console.log(this.conDom.scrollHeight,this.conDom.scrollTop,this.conDom.clientHeight);
            if (scrollDom.scrollHeight === scrollDom.clientHeight) {
                return
            }

            const nodePos = common.GetDomXY(node,scrollDom);
            const start = nodePos.top - fixHeight;
            const end = start+node.clientHeight;
            const posStart = scrollDom.scrollTop;
            const posEnd = scrollDom.scrollTop + scrollDom.clientHeight-fixHeight;
            if (start > posStart && end < posEnd) {
                return
            }
            if (start < posStart) {
                // this.conDom.scrollTo(0,start);
                scrollDom.scrollTo(0,start);
            }

            if (end > posEnd) {
                // this.conDom.scrollTo(0,end-this.conDom.clientHeight);
                scrollDom.scrollTo(0,end-(scrollDom.clientHeight-fixHeight));
            }
        }
    }

    selectItem() {
        if (this.nodeList && this.currentSelect && this.nodeList[this.currentSelect]) {
            this.nodeList[this.currentSelect].click();
        }
    }

    fixPosition() {
        if (this.isMobile) {
            return
        }
        const scrollParent = common.hasScrolledParent(this.parentDom) ?? document.documentElement;
        const position = common.GetDomXY(this.parentDom,null);
        if (position.top + this.parentDom.clientHeight + this.mainDom.offsetHeight >
            scrollParent.scrollTop + scrollParent.clientHeight) {
            this.mainDom.style.top = -(this.parentDom.offsetHeight+this.mainDom.offsetHeight)+'px';
            this.mainDom.classList.remove('ck-combo-up');
            this.mainDom.classList.add('ck-combo-bottom');
            if (this.props.sm) {
                this.mainDom.classList.remove('ck-combo-up-sm');
                this.mainDom.classList.add('ck-combo-bottom-sm');
            }
        } else {
            this.mainDom.style.top = '0';
            this.mainDom.classList.remove('ck-combo-bottom');
            this.mainDom.classList.add('ck-combo-up');
            if (this.props.sm) {
                this.mainDom.classList.remove('ck-combo-bottom-sm');
                this.mainDom.classList.add('ck-combo-up-sm');
            }
        }
    }

    hide = () => {
        window.removeEventListener('mousedown',this.hide,false);
        this.mainDom.classList.add("ck-none");
        if (this.conDom) {
            this.conDom.style.overflowY = 'none';
            this.conDom.style.height = '100%';
        }
        if (typeof this.props.onClose === 'function') {
            this.props.onClose();
        }
        if (this.isRemote) {
            this.setState({
                loading:true
            });
        }
        this.clearSelect();
        this.isClose = true;
    };

    selectHandler = (row:any,i:string)=>{
        if (this.props.multi && this.nodeList) {
            const node = this.nodeList[parseInt(i)];
            (node?.firstChild?.firstChild as HTMLElement).click()
            return
        }
        const searchColumn = this.props.searchColumn ?? ''
        if (typeof this.props.onSelect === 'function') {
            this.props.onSelect(row[searchColumn],row);
        }
        this.search = row[searchColumn];
        this.hide();
    };

    multiSelectHandler = ()=>{
        if (typeof this.props.onSelect === 'function') {
            const valList:any[] = [];
            const searchColumn = this.props.searchColumn ?? ''
            this.table.getSelectRows().forEach((item:any)=>{
                valList.push(item[searchColumn]);
            });

            this.props.onSelect(valList.join(','),this.table.getSelectRows());
        }
    };

    clearMulti() {
        this.table.selectAll(false);
    }

    filter(search:string) {
        this.search = search;
        if (typeof this.props.onSearch === 'function') {
            clearTimeout(this.filterTime);
            this.filterTime = setTimeout(()=>{
                this.setState({
                    loading:true,
                },()=>{
                    if (this.props.onSearch) {
                        this.props.onSearch(search,(data)=>{
                            this.setState({
                                loading:false,
                                data:data
                            });
                        });
                    }
                });
            },300);
            return;
        }
        let data:any[] = [];
        if (this.props.noSearch) {
            data = this.props.data;
        } else if (this.props.data) {
            //replace regex key word
            let searchStr = search.replace(/\\/g,"\\\\");
            searchStr = searchStr.replace(/\[/g,'\\[');
            searchStr = searchStr.replace(/\(/g,'\\(');
            searchStr = searchStr.replace(/\)/g,'\\)');
            let reg:RegExp;
            if (this.props.searchType === 'include') {
                reg = new RegExp(searchStr,'i');
            } else {
                reg = new RegExp("^"+searchStr,'i');
            }
            this.props.data.forEach((item:any)=>{
                const searchColumn = this.props.searchColumn ?? ''
                if (reg.test(item[searchColumn])) {
                    data.push(item);
                }
            });
        }

        this.setState({data:data.length === 0?null:data},()=>{
            //fixed out window area
            this.fixPosition();
        });
    }

    filterColumns() {
        if (this.props.filterColumns) {
            return this.props.filterColumns.map((item:any)=>{
                const is_obj = typeof item === 'object';

                return {
                    field: is_obj?item.field:item,
                    width: is_obj?item.width:null,
                    text:  is_obj?item.text:item.field,
                    format:is_obj?item.format:null
                };
            });
        } else {
            const row = this.state.data[0];
            return map(row,(item:any,key:string)=>{
                return {
                    field: key,
                    width: null,
                    text:  key,
                    format:null,
                };
            });
        }
    }

    getClasses() {
        let base = 'ck-combo border ck-none shadow';

        if (this.props.triangular) {
            base = classNames(base,'ck-calendar-'+this.props.triangular)
        }
        if (this.props.sm) {
            base = classNames(base,'ck-combo-sm','ck-combo-up ck-combo-up-sm');
        } else {
            base = classNames(base,'ck-combo-up');
        }

        //mobile show
        if (this.isMobile) {
            base = classNames(base,'ck-combo-mobile');
        }

        return classNames(base,this.props.className);
    }

    getStyles() {
        const base:StrObject = {};
        if (this.props.height) {
            base.height = this.props.height;
        }
        if (this.props.width && !this.state.loading && this.state.data) {
            base.width = this.props.width;
        } else {
            base.width = 'auto';
        }
        return base;
    }

    render() {
        return (
            <div ref={c=>this.mainDom=c as HTMLDivElement} className={this.getClasses()} style={this.getStyles()}
                 onMouseDown={(e)=>{
                     e.stopPropagation();
                     e.preventDefault();
                 }}>
                {this.state.loading?this.renderLoading():
                    this.state.data?this.renderList():this.renderNotResult()}
            </div>
        );
    }

    renderLoading() {
        return (
            <div className='ck-combo-nofound'><Load/></div>
        )
    }

    renderNotResult() {
        return (
            <div className='ck-combo-nofound'>{this.state.emptyText}</div>
        )
    }
    renderList() {
        const columns = this.filterColumns();
        return (
            <div ref={c=>this.conDom=c as HTMLDivElement} className='ck-combo-content'>
                <Table ref={(c:any)=>this.table=c} height='100px' select={this.props.multi}
                       header={this.props.header}
                       headerTheme={Theme.light}
                       truncate={true}
                       striped={false}
                       sm={this.props.sm}
                       serialNumber={false}
                       data={this.state.data}
                       fixed={!!this.props.width}
                       onCheck={this.props.multi?this.multiSelectHandler:undefined}
                       onClick={this.selectHandler}>
                    {map(columns,(item:any,idx:any)=>{
                        return <TableHeader key={idx} field={item.field} width={item.width} text={item.text}
                                            onFormat={item.field === this.props.searchColumn?this.filterFormat:item.format}/>
                    })}
                </Table>
            </div>
        )
    }
    filterFormat = (val:any)=>{
        const con = (val??'').toString();
        this.search = (this.search??'').toString();
        const idx = con.toLowerCase().indexOf(this.search.toLowerCase());
        if (idx === -1) {
            return val;
        }
        const first = con.substring(0,idx);
        const center = con.substr(idx,this.search.length);
        const end = con.substr(idx+this.search.length);
        return <>
            {first}<span className='text-danger'>{center}</span>{end}
        </>;
    }
}

export default Combo;