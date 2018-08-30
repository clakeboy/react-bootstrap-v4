import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Table from './Table';
import TableHeader from './TableHeader';
import {map} from './Common';
import "./css/Combo.less";
import Load from "./Load";

class Combo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.isRemote = this.props.onSearch?true:false;
        this.state = {
            data:this.props.data,
            loading:this.isRemote
        };

        this.filterTime = null;
        this.search = this.props.search;
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.data !== this.props.data) {
            return {data:nextProps.data}
        }
        return null
    }

    componentDidUpdate() {
        if (this.table) {
            if (this.state.data.length > 5) {
                let mainDom = this.table.mainDom;
                let height = mainDom.querySelector('tr').clientHeight;
                this.conDom.style.overflowY = 'auto';
                this.conDom.style.height = (height*this.props.showRows)+'px';
            } else {
                this.conDom.style.overflowY = 'none';
                this.conDom.style.height = '100%';
            }
        }
    }

    show(search) {
        window.addEventListener('mousedown',this.hide,false);
        document.querySelectorAll('.ck-combo').forEach((item)=>{
            item.classList.add('d-none');
        });
        this.mainDom.classList.remove("d-none");
        this.filter(search||'');
    }

    hide = () => {
        window.removeEventListener('mousedown',this.hide,false);
        this.mainDom.classList.add("d-none");
        this.conDom.style.overflowY = 'none';
        this.conDom.style.height = '100%';
        if (this.isRemote) {
            this.setState({
                loading:true
            });
        }
    };

    selectHandler = (row,i)=>{
        if (typeof this.props.onSelect === 'function') {
            this.props.onSelect(row[this.props.searchColumn],row);
        }
        this.hide();
    };

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
            },500);
            return;
        }
        let data = [];
        let reg = new RegExp("^"+search);
        this.props.data.forEach((item)=>{
            if (reg.test(item[this.props.searchColumn])) {
                data.push(item);
            }
        });
        if (data.length === 0) {
            this.setState({data:null});
        } else {
            this.setState({data:data});
        }
    }

    filterColumns() {
        if (this.props.filterColumns) {
            return this.props.filterColumns.map((item)=>{
                let is_obj = typeof item === 'object';

                return {
                    field: is_obj?item.field:item,
                    width:  is_obj?item.width:null
                };
            });
        } else {
            let row = this.state.data[0];
            return map(row,(item,key)=>{
                return {
                    field: key,
                    width: null
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
            base = classNames(base,'ck-combo-sm','ck-combo-up-sm');
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
        if (this.props.width) {
            base.width = this.props.width
        }
        return base;
    }

    render() {
        return (
            <div ref={c=>this.mainDom=c} className={this.getClasses()} style={this.getStyles()}
                 onMouseDown={(e)=>{
                     e.stopPropagation();
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
                <Table ref={c=>this.table=c} select={false} header={false} striped={false} sm={this.props.sm} data={this.state.data} onClick={this.selectHandler}>
                    {map(columns,(item)=>{
                        return <TableHeader field={item.field} width={item.width}/>
                    })}
                </Table>
            </div>
        )
    }
}

Combo.propTypes = {
    searchColumn: PropTypes.string,
    data: PropTypes.array,
    height: PropTypes.string,
    showRows: PropTypes.number,
    search: PropTypes.string,
    onSearch: PropTypes.func,
    onSelect: PropTypes.func,
    sm: PropTypes.bool,
    //filter column exp: ['name','age'] or [{field:'name',width:'100px'},{field:'age',width:'100px'}]
    filterColumns: PropTypes.array
};

Combo.defaultProps = {
    showRows:5
};

export default Combo;