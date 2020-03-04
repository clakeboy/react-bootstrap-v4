import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/dedupe';
import Icon from './Icon';
import $ from 'jquery';

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
        return list.map((val,idx)=>{
            let style = {
                'marginLeft':pad+'rem'
            };
            let id = `${parent_key}-${idx}`;
            return (
                <div className='ck-tree-item' style={style}>
                    <div className='ck-tree-content d-flex' onContextMenu={this.menuHandler(val,id)}>
                        {val.children?<span className='ck-tree-icon' onClick={this.iconHandler(val,id)}>
                            <Icon className={val.show?'ck-tree-icon-down':''} icon={val.children?'angle-right':val.icon}/>
                        </span>:<span className='ck-tree-icon'/>}
                        <span className='ck-tree-item-text'
                              onDoubleClick={this.dbClickHandler(val,id)}
                              onClick={this.selectHandler(val,id)}>
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
                {this.renderItem(this.state.data)}
            </div>
        );
    }
}

Tree.propTypes = {
    data: PropTypes.object,
    onClick: PropTypes.func,
    onDbClick: PropTypes.func,
    onMenu: PropTypes.func,
    showSelected: PropTypes.bool
};

Tree.defaultProps = {

};

export default Tree;