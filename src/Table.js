import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import TableHeader from './TableHeader';
import Checkbox from './Checkbox';
import Button from './Button';
import common from "./Common";
import Icon from './Icon';

import './css/Table.less';

class Table extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data:this.props.data,
            select:this.props.select,
            tree:{}
        };

        this.select_all = false;

        this.selectRows = {};

        this.treeHeader = {};

        this.sortList = {};
    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        if (this.state.data !== nextProps.data) {
            this.select_all = false;
            this.selectRows = {};
            this.setState({
                data:nextProps.data
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.data !== this.state.data || nextState.tree !== this.state.tree;
    }

    changeHandler(row,i) {
        return (checked)=>{
            if (checked) {
                this.selectRows[i] = row;
            } else {
                this.selectRows[i] = undefined;
            }
            if (typeof this.props.onCheck === "function") {
                this.props.onCheck(checked,row);
            }
        };
    }

    clickHandler(row,i) {
        return ()=>{
            if (typeof this.props.onClick === 'function') {
                this.props.onClick(row,i);
            }
        }
    }

    sortHandler(field,callback) {
        return (e)=>{
            let dom = e.currentTarget;
            let sort_type = dom.dataset.sort || 'asc';
            callback(field,sort_type);
            dom.dataset.sort = sort_type === 'asc'?'desc':'asc';
            this.sortList[field] = sort_type;
        }
    };

    selectAll = (e)=>{
        this.select_all = e.target.checked;
        common.map(this.refs,(item)=>{
            item.setChecked(this.select_all);
        });
    };

    /**
     * 得到所有选中的行
     * @returns {*}
     */
    getSelectRows() {
        return common.map(this.selectRows,(item)=>{
            return item;
        });
    }

    /**
     * 设置选中的行
     * @param key 对应行数据的KEY值
     * @param list 要选中的数据值
     */
    setSelectRows(key,list) {
        this.state.data.map((row,i)=>{
            if (list.indexOf(row[key]) !== -1) {
                this.refs['row_'+i].setChecked(true);
            }
        });
    }

    getClasses() {
        let base = 'table ck-table';
        //striped
        if (this.props.striped) {
            base = classNames(base,'table-striped');
        }
        //theme
        if (this.props.theme) {
            base = classNames(base,'table-'+this.props.theme);
        }
        //bordered
        if (this.props.bordered) {
            base = classNames(base,'table-bordered');
        }
        //hover
        if (this.props.hover) {
            base = classNames(base,'table-hover');
        }
        //sm
        if (this.props.sm) {
            base = classNames(base,'table-sm');
        }
        //responsive
        if (this.props.responsive) {
            base = classNames(base,'table-responsive');
        }
        return base;
    }

    getHeaderClasses() {
        let base = '';
        if (this.props.headerTheme) {
            base = 'thead-'+this.props.headerTheme;
        }
        return classNames(base,this.props.headClass);
    }

    render() {
        return (
            <div ref={c=>this.mainDom=c} className={this.props.className}>
                {this.state.refresh ? (<Button onClick={this.props.onRefresh} amSize="sm">
                    <Icon icon="refresh" /> 刷新列表
                </Button>) : null}
                <table className={this.getClasses()}>
                    {this.props.header?this.renderHeader():null}
                    <tbody>
                    {this.state.data.map((row,i)=>{
                        return this.renderRow(row,i);
                    })}
                    </tbody>
                </table>
            </div>
        );
    }

    renderHeader() {
        return (
            <thead className={this.getHeaderClasses()}>
            <tr>
                {this.state.select ? <th width={10}><Checkbox onChange={this.selectAll}/></th> : null}
                {React.Children.map(this.props.children, (item, key) => {
                    if (!item || item.props.hide) {
                        return null;
                    }
                    let align = item.props.align || this.props.align;
                    let style = {
                        'textAlign':align
                    };
                    if (item.props.width) {
                        style.width = this.props.width;
                    }
                    return (
                        <th data-key={'head_' + key} style={style}>
                            {item.props.onSort? <a href='javascript://'
                                                   onClick={this.sortHandler(item.props.field,item.props.onSort)}>
                                {item.props.text}{'\u0020'}
                                <Icon icon={this.sortList[item.props.field]?`sort-${this.sortList[item.props.field]}`:'sort'}/></a>:item.props.text}
                            {this.props.move?<span className='column-split'/>:null}
                        </th>
                    );
                })}
            </tr>
            </thead>
        );
    }

    renderRow(row,i,parentRow) {
        let backgroundColor = row['ck_row_color'] ? row['ck_row_color'] : '';
        return (
            <React.Fragment>
            <tr className={this.props.onClick?'click-row':null} onClick={this.clickHandler(row,i)}>
                {this.state.select ? <th><Checkbox ref={'row_'+i} onChange={this.changeHandler(row,i)}/></th> : null}
                {React.Children.map(this.props.children,(item,key)=>{
                    if (!item || item.props.hide) {
                        return null;
                    }
                    let align = item.props.align || this.props.align;

                    let tree,parent;
                    if (item.props.tree) {
                        if (parentRow) {
                            parent = <span className='mr-4'/>
                        }
                        tree = <Icon data-open='close' onClick={()=>{
                                if (typeof this.props.onClickTree === 'function') {
                                    this.props.onClickTree(row,(data)=>{
                                        if (!data) {
                                            return
                                        }
                                        let tree = this.state.tree;
                                        tree[i] = data;
                                        this.state.tree = null;
                                        this.setState({
                                            tree:tree
                                        })
                                    });
                                }

                        }} className='mr-1 text-primary' icon='plus-square' iconType='regular'/>
                    }

                    if (item.props.children) {
                        return (
                            <td className={item.props.className} style={{'text-align':align}} key={'col_'+key}>{parent}{tree}{React.cloneElement(item,{text:item.props.text,row:row,value:row[item.props.field]})}</td>
                        );
                    } else {
                        return <td style={{...item.props.setCssStyle, backgroundColor: backgroundColor,'text-align':align}} key={'col_'+key}>{parent}{tree}{item.props.onFormat?item.props.onFormat(row[item.props.field],row):row[item.props.field]}</td>;
                    }
                })}
            </tr>
                {this.props.tree?this.renderTreeRow(row,i):null}
            </React.Fragment>
        );
    }

    renderTreeRow(row,i) {
        let data = this.state.tree[i];
        if (!data) {
            return null;
        }
        return data.map((item,idx)=>{
            return this.renderRow(item,`${i}-${idx}`,row);
        });
        // return (
        //     <tr className='table-tree-row d-none' id={`tree-${i}`}>
        //         <td colSpan={this.state.select?this.props.children.length+1:this.props.children.length}>
        //             {React.createElement(Table,{data:data},this.props.children)}
        //         </td>
        //     </tr>
        // )
    }

}

Table.propTypes = {
    theme: PropTypes.oneOf(['primary','secondary','success','danger','warning','info','light','dark']),
    headerTheme: PropTypes.oneOf(['primary','secondary','success','danger','warning','info','light','dark']),
    headClass: PropTypes.string,
    data: PropTypes.array,
    dataCount: PropTypes.number,
    select:PropTypes.bool,
    header:PropTypes.bool,
    center:PropTypes.bool,
    currentPage: PropTypes.number,
    striped: PropTypes.bool,
    bordered: PropTypes.bool,
    hover: PropTypes.bool,
    sm: PropTypes.bool,
    responsive: PropTypes.bool,
    align: PropTypes.string,
    tree: PropTypes.string,
    onClickTree: PropTypes.func,
    onClick: PropTypes.func,
    onCheck: PropTypes.func,
    move: PropTypes.bool
};

Table.defaultProps = {
    data:[],
    dataCount:1,
    select:true,
    header:true,
    currentPage:1,
    hover:true,
    striped:true,
    align:'left',
};

Table.Header = TableHeader;

export default Table;