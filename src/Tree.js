import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/dedupe';
import Icon from './Icon';
import $ from 'jquery';

import './css/Tree.less';

class Tree extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data : this.props.data
        };

        this.parents = {};
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
            let parent = this.parents[id];
            if (parent) {
                let jq = $(parent);
                if (jq.data('show') === 0) {
                    // jq.removeClass('d-none');
                    jq.slideDown(300);
                    jq.data('show',1);
                    $(e.currentTarget).find('.ck-tree-icon').addClass('ck-tree-icon-down');
                } else {
                    // jq.addClass('d-none');
                    jq.slideUp(300);
                    jq.data('show',0);
                    $(e.currentTarget).find('.ck-tree-icon').removeClass('ck-tree-icon-down');
                }
                return
            }
            if (typeof this.props.onSelect === 'function') {
                this.props.onSelect(item,id);
            }
        };
    };

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
            let id = `${parent_key}_${idx}`;
            return <div className='ck-tree-item' style={style}>
                <div className='ck-tree-content' onClick={this.selectHandler(val,id)}>
                    <Icon className='ck-tree-icon' icon={val.children?'caret-right':val.icon}/>{'\u0020'}{val.text}{id}
                </div>
                {val.children?<div id={id} className='ck-tree-children' data-show="0" ref={c=>this.parents[id]=c}>
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
    onSelect: PropTypes.func,
};

Tree.defaultProps = {

};

export default Tree;