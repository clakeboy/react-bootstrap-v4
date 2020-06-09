import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/dedupe';
import Icon from './Icon';
import CCheckbox from "./CCheckbox";
import './css/Tree.less';
import common from "./Common";

class Tree extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data : this.props.data
        };
        this.currentSelected;
        this.parents = {};
        this.domId = 'tree-' + common.RandomString(8);
        //ccheck components
        this.checkObjList = {};
        //checked list
        this.checkSelectList = {};
        //check parent list
        this.checkItems = {};
    }

    componentDidMount() {
        let item = {
            icon:'',
            key:'',
            text:'',
            children:[]
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.data !== this.state.data) {
            this.setState({
                data:nextProps.data
            })
        }
    }

    /**
     * 选择事件
     */
    selectHandler = (item,id) => {
        return (e)=>{
            if (typeof this.props.onClick === 'function') {
                this.props.onClick(e,item,id);
            }

            if (this.props.showSelected && !this.parents[id]) {
                let active = this.mainDom.querySelector('.active');
                if (active) {
                    active.classList.remove('active');
                }
                e.currentTarget.parentNode.classList.add('active');
            }
        };
    };

    dbClickHandler = (item,id)=>{
        return (e)=> {
            if (typeof this.props.onDbClick === 'function') {
                let isShowChild = this.props.onDbClick(item,id);
                if (isShowChild !== false) {
                    this.showChild(id);
                }
            } else {
                this.showChild(id);
            }
        }
    };

    iconHandler = (item,id)=>{
        return (e)=>{
            this.showChild(id);
        };
    };

    menuHandler = (item,id)=>{
        return (e)=>{
            if (typeof this.props.onMenu === 'function') {
                this.props.onMenu(e,item,id);
            }
        }
    };

    changeHandler(item,id,parent) {
        return (check) => {
            this.setCheckObj(check,item,id,parent);
        }
    }

    setCheckObj(check,item,id,parent) {
        if (typeof this.props.onSelect === 'function') {
            this.props.onSelect(check,item);
        }
        if (check) {
            this.checkSelectList[parent].push(item);
        } else {
            let idx = this.checkSelectList[parent].indexOf(item);
            this.checkSelectList[parent].splice(idx,1);
        }

        if (this.checkItems[id] && this.checkItems[id].length > 0) {
            this.checkItems[id].forEach((data)=>{
                this.setCheckObj(check,data.data,data.id,id);
                this.checkObjList[data.id].setChecked(check);
            });
        }

        //set parent check status
        if (this.props.check && this.checkObjList[parent]) {
            if (this.checkSelectList[parent].length === this.checkItems[parent].length) {
                this.checkObjList[parent].setChecked(true);
            } else if (this.checkSelectList[parent].length > 0) {
                this.checkObjList[parent].setHalf(true);
            } else {
                this.checkObjList[parent].setChecked(false);
            }
        }
    }

    showChild(id) {
        let parent = this.parents[id];
        if (parent) {
            if (parent.dataset.show === '0') {
                parent.dataset.show = '1';
                parent.classList.remove('d-none');
                parent.previousElementSibling.querySelector('i').classList.add('ck-tree-icon-down');
            } else {
                parent.dataset.show = '0';
                parent.classList.add('d-none');
                parent.previousElementSibling.querySelector('i').classList.remove('ck-tree-icon-down');
            }
        }
    }

    getSelected() {
        return this.checkSelectList;
    }

    /**
     * get main div class name
     * @returns {*}
     */
    getClasses() {
        let base = 'ck-tree';

        return classNames(base,this.props.className);
    }

    renderItem(list,parent,level,parent_key) {
        if (!(list instanceof Array)) {
            return null
        }
        if (!level) {
            level = 0;
        }
        if (!parent_key) {
            parent_key = 0;
        }
        let pad = parent?1:0;
        this.checkSelectList[parent_key] = [];
        this.checkItems[parent_key] = [];
        return list.map((val,idx)=>{
            let style = {
                'marginLeft':pad+'rem'
            };
            let id = `${parent_key}-${idx}`;
            this.checkItems[parent_key].push({id:id,data:val});
            if (val?.checked) {
                this.checkSelectList[parent_key].push(val);
            }
            return (
                <div className='ck-tree-item' style={style}>
                    <div className='ck-tree-content d-flex' onContextMenu={this.menuHandler(val,id)}>
                        {val.children?<span className='ck-tree-icon' onClick={this.iconHandler(val,id)}>
                            <Icon className={val.show?'ck-tree-icon-down':''} icon={val.children?'angle-right':val.icon}/>
                        </span>:<span className='ck-tree-icon'/>}
                        {this.props.check ? <CCheckbox ref={c=>this.checkObjList[id]=c} checked={val?.checked} className='mr-1' inline onChange={this.changeHandler(val,id,parent_key)}/>:null}
                        <span className='ck-tree-item-text'
                              onDoubleClick={this.dbClickHandler(val,id,parent_key)}
                              onClick={this.selectHandler(val,id,parent_key)}>
                            {val.icon?<><Icon icon={val.icon}/>{'\u0020'}</>:null}
                            {val.text}
                        </span>
                    </div>
                    {val.children?<div id={this.domId+'-'+id} className={'ck-tree-children'+(val.show?'':' d-none')} data-show={val.show?'1':'0'} ref={c=>this.parents[id]=c}>
                        {this.renderItem(val.children,val,level+1,id)}
                    </div>:null}
                </div>
            )
        });
    }

    render() {
        return (
            <div ref={c=>this.mainDom = c} className={this.getClasses()}>
                {this.renderItem(this.state.data,null,0,0)}
            </div>
        );
    }
}

Tree.propTypes = {
    data: PropTypes.object,
    onClick: PropTypes.func,
    onDbClick: PropTypes.func,
    onMenu: PropTypes.func,
    showSelected: PropTypes.bool,
    check: PropTypes.bool,
    onSelect: PropTypes.func,
};

Tree.defaultProps = {

};

export default Tree;