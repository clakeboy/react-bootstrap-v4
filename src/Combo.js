import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Table from './Table';
import TableHeader from './TableHeader';
import {map} from './Common';
import "./css/Combo.less";
import Load from "./Load";
import common from "./Common";

class Combo extends React.Component {
    constructor(props) {
        super(props);
        this.isRemote = !!this.props.onSearch;
        this.state = {
            data:this.props.data,
            loading:this.isRemote
        };

        this.filterTime = null;
        this.search = this.props.search;

        this.parentDom = null;

        this.currentSelect = null;
        this.nodeList = null;
        this.isClose = true;
    }

    componentDidMount() {
        // if (this.props.multiDef) {
        //     common.map(this.props.multiDef,(val,key)=>{
        //         this.table.setSelectRows(key,val);
        //     });
        // }
    }

    componentWillUnmount() {

        window.removeEventListener('mousedown',this.hide,false);
        if (this.parentDom) {
            this.parentDom.removeEventListener('keydown',this.keyDownHandler,false);
            this.parentDom.removeEventListener('blur',this.hide,false);
            this.parentDom.removeEventListener('click',this.checkShow,false);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.data !== nextProps.data) {
            this.setState({data:nextProps.data});
        }
    }

    componentDidUpdate() {
        if (this.table) {
            let mainDom = this.table.mainDom;
            let height = mainDom.querySelector('tbody>tr').clientHeight;
            let fixHeader = 0;
            if (this.props.header) {
                fixHeader = mainDom.querySelector('thead').clientHeight;
            }
            if (this.state.data.length > this.props.showRows) {
                // let mainDom = this.table.mainDom;
                // let height = mainDom.querySelector('tr').clientHeight;
                // this.conDom.style.overflowY = 'auto';
                // this.conDom.style.height = (height*this.props.showRows)+'px';
                this.table.setHeight((height*this.props.showRows+fixHeader)+'px');
            } else {
                // this.table.setHeight((height*this.state.data.length+fixHeader)+'px');
                this.table.setHeight('auto');
            }
            if (!this.props.multi) {
                this.clearSelect();
            }
            this.nodeList = this.table.mainDom.querySelectorAll('tbody tr');
        }
    }

    setSelectRows(key,val) {
        this.table.setSelectRows(key,val);
    }

    setSearchText(text) {
        this.search = text;
    }

    show(search,dom) {
        this.parentDom = dom;
        this.parentDom.addEventListener('keydown',this.keyDownHandler,false);
        this.parentDom.addEventListener('blur',this.hide,false);
        this.parentDom.addEventListener('click',this.checkShow,false);
        window.addEventListener('mousedown',this.hide,false);
        // document.querySelectorAll('.ck-combo').forEach((item)=>{
        //     item.classList.add('d-none');
        // });
        this.mainDom.classList.remove("d-none");
        this.filter(search||'');
        if (typeof this.props.onShow === 'function') {
            this.props.onShow();
        }
        this.isClose = false;
    }

    checkShow = (e)=> {
        if (this.isClose) {
            this.show(this.search,this.parentDom);
        }
    };

    keyDownHandler = (e)=>{
        if (this.isClose) {
            this.show(this.search,this.parentDom);
        }
        switch (e.keyCode) {
            case 38: //key up
                e.preventDefault();
                e.stopPropagation();
                this.moveItem(-1);
                break;
            case 40: //key down
                e.preventDefault();
                e.stopPropagation();
                this.moveItem(1);
                break;
            case 32: //key space
                if (this.props.noSearch) {
                    this.selectItem();
                }
                break;
            case 13: //key enter
                this.selectItem();
                break;
            case 27: //key esc
                this.hide();
                break;
            case 9: //key tab
                this.selectItem();
                break;
        }
    };

    clearSelect() {
        if (this.currentSelect === null) {
            return
        }
        // let nodeList = document.querySelectorAll(`${this.table.domId} tbody tr`);
        if (this.nodeList.length > 0 && this.nodeList[this.currentSelect]) {
            let node = this.nodeList[this.currentSelect];
            node.classList.remove('ck-combo-selected')
        }
        this.currentSelect = null;
        this.nodeList = null;
    }

    moveItem(step) {
        if (!this.nodeList) {
            return
        }
        if (this.currentSelect === null) {
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
            let fixHeight = 0;
            if (this.props.header) {
                fixHeight = this.table.mainDom.querySelector('thead').clientHeight;
            }
            let scrollDom = this.table.mainDom;//this.conDom
            let node = this.nodeList[this.currentSelect];
            node.classList.add('ck-combo-selected');
            // console.log(this.conDom.scrollHeight,this.conDom.scrollTop,this.conDom.clientHeight);
            if (scrollDom.scrollHeight === scrollDom.clientHeight) {
                return
            }

            let nodePos = common.GetDomXY(node,scrollDom);
            let start = nodePos.top - fixHeight;
            let end = start+node.clientHeight;
            let posStart = scrollDom.scrollTop;
            let posEnd = scrollDom.scrollTop + scrollDom.clientHeight-fixHeight;
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
        if (this.nodeList && this.nodeList[this.currentSelect]) {
            this.nodeList[this.currentSelect].click();
        }
    }

    fixPosition() {
        let scrollParent = common.hasScrolledParent(this.parentDom) ?? document.documentElement;
        let position = common.GetDomXY(this.parentDom,null);
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
        this.mainDom.classList.add("d-none");
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

    selectHandler = (row,i)=>{
        if (this.props.multi) {
            let node = this.nodeList[i];
            node.firstChild.firstChild.click();
            return
        }
        if (typeof this.props.onSelect === 'function') {
            this.props.onSelect(row[this.props.searchColumn],row);
        }
        this.search = row[this.props.searchColumn];
        this.hide();
    };

    multiSelectHandler = (check)=>{
        if (typeof this.props.onSelect === 'function') {
            let valList = [];
            this.table.getSelectRows().forEach((item)=>{
                valList.push(item[this.props.searchColumn]);
            });

            this.props.onSelect(valList.join(','),this.table.getSelectRows());
        }
    };

    clearMulti() {
        this.table.selectAll(false);
    }

    filter(search) {
        this.search = search;
        if (typeof this.props.onSearch === 'function') {
            clearTimeout(this.filterTime);
            this.filterTime = setTimeout(()=>{
                this.setState({
                    loading:true,
                },()=>{
                    this.props.onSearch(search,(data)=>{
                        this.setState({
                            loading:false,
                            data:data
                        });
                    });
                });
            },300);
            return;
        }
        let data = [];
        if (this.props.noSearch) {
            data = this.props.data;
        } else if (this.props.data) {
            //replace regex key word
            let searchStr = search.replace(/\\/g,"\\\\");
            searchStr = searchStr.replace(/\[/g,'\\[');
            searchStr = searchStr.replace(/\(/g,'\\(');
            searchStr = searchStr.replace(/\)/g,'\\)');
            let reg;
            if (this.props.searchType === 'include') {
                reg = new RegExp(searchStr,'i');
            } else {
                reg = new RegExp("^"+searchStr,'i');
            }
            this.props.data.forEach((item)=>{
                if (reg.test(item[this.props.searchColumn])) {
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
            return this.props.filterColumns.map((item)=>{
                let is_obj = typeof item === 'object';

                return {
                    field: is_obj?item.field:item,
                    width: is_obj?item.width:null,
                    text:  is_obj?item.text:item.field,
                    format:is_obj?item.format:null
                };
            });
        } else {
            let row = this.state.data[0];
            return map(row,(item,key)=>{
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
        let base = 'ck-combo border d-none shadow';

        if (this.props.triangular) {
            base = classNames(base,'ck-calendar-'+this.props.triangular)
        }
        if (this.props.sm) {
            base = classNames(base,'ck-combo-sm','ck-combo-up ck-combo-up-sm');
        } else {
            base = classNames(base,'ck-combo-up');
        }

        return classNames(base,this.props.className);
    }

    getStyles() {
        let base = {};
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
            <div ref={c=>this.mainDom=c} className={this.getClasses()} style={this.getStyles()}
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
            <div className='ck-combo-nofound' style={{height:'100%'}}><Load/></div>
        )
    }

    renderNotResult() {
        return (
            <div className='ck-combo-nofound' style={{height:'100%'}}>no data</div>
        )
    }
    renderList() {
        let columns = this.filterColumns();
        return (
            <div ref={c=>this.conDom=c} className='ck-combo-content'>
                <Table ref={c=>this.table=c} height='100px' select={this.props.multi}
                       header={this.props.header}
                       headerTheme='light'
                       truncate={true}
                       striped={false}
                       sm={this.props.sm}
                       serialNumber={false}
                       data={this.state.data}
                       fixed={!!this.props.width}
                       onCheck={this.props.multi?this.multiSelectHandler:null}
                       onClick={this.selectHandler}>
                    {map(columns,(item)=>{
                        return <TableHeader field={item.field} width={item.width} text={item.text}
                                            onFormat={item.field === this.props.searchColumn?this.filterFormat:item.format}/>
                    })}
                </Table>
            </div>
        )
    }
    filterFormat = (val,row)=>{
        let con = (val||'').toString();
        this.search = (this.search||'').toString();
        let idx = con.toLowerCase().indexOf(this.search.toLowerCase());
        if (idx === -1) {
            return val;
        }
        let first = con.substring(0,idx);
        let center = con.substr(idx,this.search.length);
        let end = con.substr(idx+this.search.length);
        return <React.Fragment>
            {first}<span className='text-danger'>{center}</span>{end}
        </React.Fragment>;
    }
}

Combo.propTypes = {
    searchColumn: PropTypes.string,
    data: PropTypes.array,
    height: PropTypes.string,
    width: PropTypes.string,
    showRows: PropTypes.number,
    search: PropTypes.string,
    onSearch: PropTypes.func,
    onSelect: PropTypes.func,
    onClose: PropTypes.func,
    onShow: PropTypes.func,
    sm: PropTypes.bool,
    multi: PropTypes.bool,
    multiDef: PropTypes.object,
    //filter column exp: ['name','age'] or [{field:'name',width:'100px'},{field:'age',width:'100px'}]
    filterColumns: PropTypes.array,
    noSearch: PropTypes.bool,
    header: PropTypes.bool,
    searchType: PropTypes.string // 'start','include'
};

Combo.defaultProps = {
    showRows:5,
    data:[],
    search:"",
    multi:false,
    multiDef:null,
    header:false,
    searchType: 'start'
};

export default Combo;