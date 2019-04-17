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

    /**
     * 选择事件
     */
    selectHandler = (item,id) => {
        return (e)=>{
            if (typeof this.props.onClick === 'function') {
                this.props.onClick(item,id);
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
            // let parent = this.parents[id];
            // if (parent) {
            //     if (parent.dataset.show === '0') {
            //         // jq.removeClass('d-none');
            //         // jq.slideDown(300);
            //         // parent.style.height = 'unset';
            //         parent.dataset.show = '1';
            //         parent.classList.remove('d-none');
            //         e.currentTarget.querySelector('i').classList.add('ck-tree-icon-down');
            //         // $(e.currentTarget).find('.ck-tree-icon').addClass('ck-tree-icon-down');
            //     } else {
            //         // jq.addClass('d-none');
            //         // jq.slideUp(300);
            //         // parent.style.height = 0;
            //         parent.dataset.show = '0';
            //         parent.classList.add('d-none');
            //         e.currentTarget.querySelector('i').classList.remove('ck-tree-icon-down');
            //         // $(e.currentTarget).find('.ck-tree-icon').removeClass('ck-tree-icon-down');
            //     }
            // }
        };
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
            return <div className='ck-tree-item' style={style}>
                <div className='ck-tree-content d-flex' >
                    {val.children?<span className='ck-tree-icon' onClick={this.iconHandler(val,id)}>
                        <Icon icon={val.children?'angle-right':val.icon}/>
                    </span>:<span className='ck-tree-icon'/>}
                    <span className='ck-tree-item-text'
                          onDoubleClick={this.dbClickHandler(val,id)}
                          onClick={this.selectHandler(val,id)}>{val.text}{id}</span>
                </div>
                {val.children?<div id={this.domId+'-'+id} className='ck-tree-children d-none' data-show="0" ref={c=>this.parents[id]=c}>
                    {this.renderItem(val.children,val,level+1,id)}
                </div>:null}
            </div>
        });
    }

    render() {
        return (
            <div className={this.getClasses()}>
                {this.renderItem(this.state.data)}
            </div>
        );
    }
}

Tree.propTypes = {
    data: PropTypes.object,
    onClick: PropTypes.func,
    onDbClick: PropTypes.func
};

Tree.defaultProps = {

};

export default Tree;