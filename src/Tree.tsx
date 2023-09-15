import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/dedupe';
import Icon from './Icon';
import CCheckbox from "./CCheckbox";
import './css/Tree.less';
import common from "./Common";
import {SvgEl, SvgElm} from "./components/Svg";
import { ComponentProps, StrObject } from './components/common';

interface Props extends ComponentProps {
    data?: any
    onClick?: (event: React.MouseEvent,data:any,id:string) => void
    onDbClick?: (data:any,id:string) => boolean
    onMenu?: (event: React.MouseEvent,data:any,id:string) => void
    showSelected?: boolean
    check?: boolean
    onSelect?: (checked:boolean,data:any) => void
}

interface State {
    data:any
}

export class Tree extends React.PureComponent<Props,State> {
    static propTypes = {
        data: PropTypes.object,
        onClick: PropTypes.func,
        onDbClick: PropTypes.func,
        onMenu: PropTypes.func,
        showSelected: PropTypes.bool,
        check: PropTypes.bool,
        onSelect: PropTypes.func,
    };

    domId:string
    parents:any
    currentSelected:any
    checkObjList:any
    checkSelectList:any
    checkItems:any
    svgList:any[]
    checkedList:any[]
    mainDom:HTMLElement
    constructor(props:any) {
        super(props);
        this.state = {
            data : this.props.data??''
        };
        this.parents = {};
        this.domId = this.props.id ?? 'tree-' + common.RandomString(8);
        //ccheck components
        this.checkObjList = {};
        //checked list
        this.checkSelectList = {};
        //check parent list
        this.checkItems = {};
        //this svg list
        this.svgList = [];
        //checkedList
        this.checkedList = [];
    }

    componentDidMount() {
        // let item = {
        //     icon:'',
        //     key:'',
        //     text:'',
        //     children:[]
        // };
    }

    UNSAFE_componentWillReceiveProps(nextProps:Props) {
        if (nextProps.data !== this.state.data) {
            this.setState({
                data:nextProps.data
            })
        }
    }

    /**
     * 选择事件
     */
    selectHandler = (item:any,id:string) => {
        return (e:React.MouseEvent)=>{
            if (typeof this.props.onClick === 'function') {
                this.props.onClick(e,item,id);
            }

            if (this.props.showSelected && !this.parents[id]) {
                const active = this.mainDom?.querySelector('.active');
                if (active) {
                    active.classList.remove('active');
                }
                if (e.currentTarget?.parentNode) {
                    (e.currentTarget?.parentNode as HTMLElement).classList.add('active');
                }
            }
        };
    };

    dbClickHandler = (item:any,id:string)=>{
        return ()=> {
            if (typeof this.props.onDbClick === 'function') {
                const isShowChild = this.props.onDbClick(item,id);
                if (isShowChild !== false) {
                    this.showChild(id);
                }
            } else {
                this.showChild(id);
            }
        }
    };

    iconHandler = (item:any,id:string)=>{
        return ()=>{
            this.showChild(id);
        };
    };

    menuHandler = (item:any,id:string)=>{
        return (e: React.MouseEvent)=>{
            if (typeof this.props.onMenu === 'function') {
                this.props.onMenu(e,item,id);
            }
        }
    };

    changeHandler(item:any,id:string,parent:string) {
        return (check:boolean) => {
            this.setCheckObj(check,item,id,parent);
        }
    }

    setCheckObj(check:boolean,item:any,id:string,parent:string) {
        item.id = id
        if (typeof this.props.onSelect === 'function') {
            this.props.onSelect(check,item);
        }

        if (check) {
            this.checkSelectList[parent].push(item);
            const idx = this.checkedList.findIndex((val)=>{
                return val.id === id
            })
            if (idx === -1) {
                this.checkedList.push(item)
            }
        } else {
            const idx = this.checkSelectList[parent].indexOf(item);
            this.checkSelectList[parent].splice(idx,1);
            const chk_idx = this.checkedList.findIndex((val)=>{
                return val.id === id
            })
            if (chk_idx !== -1) {
                this.checkedList.splice(chk_idx,1)
            }
        }

        if (this.checkItems[id] && this.checkItems[id].length > 0) {
            this.checkItems[id].forEach((data:any)=>{
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

    showChild(id:string) {
        const parent = this.parents[id];
        if (parent) {
            if (parent.dataset.show === '0') {
                parent.dataset.show = '1';
                parent.classList.remove('d-none');
                parent.previousElementSibling.querySelector('i').classList.add('ck-tree-icon-down');
                // this.drawLines(parent.querySelector('.ck-tree-svg'))
            } else {
                parent.dataset.show = '0';
                parent.classList.add('d-none');
                parent.previousElementSibling.querySelector('i').classList.remove('ck-tree-icon-down');
            }
        }
    }

    getSelected() {
        return this.checkedList;
    }

    /**
     * get main div class name
     * @returns {*}
     */
    getClasses() {
        const base = 'ck-tree';

        return classNames(base,this.props.className);
    }

    drawLines(item:any) {
        if (item.dataset?.done === 'true') return
        let path = "M 4 0 "
            // x=3,
            // y=0;
        const numChild = parseInt(item.dataset.length)
        console.log(item.clientHeight,item.clientWidth)
        const itemHeight = (item.clientHeight / numChild)
        const itemHalf = (itemHeight/2)
        for (let i = 0;i<numChild;i++) {
            // y += (itemHeight*i)
            if (i+1 === numChild) {
                path += `v ${itemHalf.toFixed(2)} h 17`
            } else {
                path += `v ${itemHalf.toFixed(2)} h 17 m -17 0 v ${itemHalf.toFixed(2)} `
            }
        }
        // path += 'Z'
        const svg:SvgEl = SvgElm(item)
        svg.add('path')
            .attr('class','path-line')
            .attr('d',path)
        item.dataset.done = 'true'
    }

    renderItem(list:any,parent:any,level:number,parent_key:any) {
        if (!(list instanceof Array)) {
            return null
        }
        if (!level) {
            level = 0;
        }
        if (!parent_key) {
            parent_key = 0;
        }
        const pad = parent?'20':0;
        this.checkSelectList[parent_key] = [];
        this.checkItems[parent_key] = [];
        return list.map((val,idx)=>{
            const style:StrObject = {
                'marginLeft':pad+'px'
            };
            const id = `${parent_key}-${idx}`;
            this.checkItems[parent_key].push({id:id,data:val});
            if (val?.checked) {
                this.checkSelectList[parent_key].push(val);
                val.id = id
                this.checkedList.push(val)
            }
            return (
                <div key={undefined} className='ck-tree-item' style={style}>
                    <div className='ck-tree-content d-flex' onContextMenu={this.menuHandler(val,id)}>
                        {val.children?<span className='ck-tree-icon' onClick={this.iconHandler(val,id)}>
                            <Icon className={val.show?'ck-tree-icon-down':''} icon={val.children?'angle-right':val.icon}/>
                        </span>:<span className='ck-tree-icon'/>}
                        {this.props.check ? <CCheckbox ref={(c:any)=>this.checkObjList[id]=c} checked={val?.checked} className='chk mr-1' inline onChange={this.changeHandler(val,id,parent_key)}/>:null}
                        <span className='ck-tree-item-text'
                              onDoubleClick={this.dbClickHandler(val,id)}
                              onClick={this.selectHandler(val,id)}>
                            {val.icon?<><Icon icon={val.icon}/>{'\u0020'}</>:null}
                            {val.text}
                        </span>
                    </div>
                    {val.children?<div id={this.domId+'-'+id} className={'ck-tree-children'+(val.show?'':' d-none')} data-show={val.show?'1':'0'} ref={c=>this.parents[id]=c}>
                        {this.renderSvg(val.children)}
                        {this.renderItem(val.children,val,level+1,id)}
                    </div>:null}
                </div>
            )
        });
    }

    renderSvg(children:any) {
        return <svg className='ck-tree-svg' data-length={children.length}>
            {/*<path d={`M3 3 V ${line_height} z`} className='path-line'/>*/}
        </svg>
    }

    render() {
        return (
            <div ref={(c:any)=>this.mainDom = c} className={this.getClasses()}>
                {this.renderItem(this.state.data,null,0,0)}
            </div>
        );
    }
}

export default Tree;