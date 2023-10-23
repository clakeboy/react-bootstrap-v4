import React from 'react';
import classNames from 'classnames/bind';
import './css/Complex.less'
import Icon from './Icon';
import Combo, { ComboProps } from "./Combo";
import { ComponentProps, StrObject, Theme } from './components/common';

interface Props extends ComponentProps {
    inputWidth ?: string
    onChange ?: (data:any,list:any) => void
    onSelect ?: (val:any,row:any) => void
    list?: any[]
    dataType?: string
    dataField?: string
    data?: any[]
    placeholder?: string
    combo?:ComboProps
    comboData?: any
    duplicate?: boolean
    readOnly?: boolean
}

interface State {
    list: any[]
    value: string
    icon: string
}

export class Complex extends React.Component<Props,State> {

    static defaultProps = {
        inputWidth: "200px",
        dataType: "string",
        dataField: "",
        data: [],
        duplicate: false
    };

    combo: Combo
    input: HTMLInputElement
    isFocus: boolean
    clearIcon: Icon
    main:HTMLDivElement
    constructor(props:any) {
        super(props);
        this.state = {
            list:this.props.data??[],
            value:"",
            icon:'',
        }
    }

    componentDidMount() {
        if (this.combo) {
            this.input.addEventListener('focus', (e) => {
                this.combo.show(this.state.value,e.currentTarget as HTMLElement);
            }, false);
        }
        this.input.addEventListener('mousedown',(e)=>{e.stopPropagation()}, false);
        this.input.addEventListener('focus', this.focusClearHandler, false);
        this.input.addEventListener('blur', this.blurClearHandler, false);
    }

    UNSAFE_componentWillReceiveProps(nextProps:Props) {
        if (this.state.list === nextProps.data) return;
        this.setState({
            list    : nextProps.data??[],
        });
    }

    getClasses() {
        const base = 'complex-main d-flex flex-wrap align-items-center';

        return classNames(base,this.props.className);
    }

    getInputCss() {
        const base:StrObject = {};
        base.width = this.props.inputWidth??'';
        return base;
    }
    /*********************
     * Event
     *********************/
    focusClearHandler = ()=>{
        this.isFocus = true;
        if (this.clearIcon) {
            this.setState({
                icon: 'times-circle',
            });
            // this.clearIcon.setIcon('times-circle');
        }
    };

    blurClearHandler = ()=>{
        this.isFocus = false;
        if (this.clearIcon) {
            this.setState({
                icon: 'angle-down',
            });
        }
    };

    searchHandler = (e:any)=> {
        const state = {
            value: e.target?e.target.value:e,
        };
        this.setState(state, () => {
            if (this.combo) {
                this.combo.filter(state.value);
            }
        });
    };

    selectHandler = (val:any,row:any)=>{
        this.addNewData(val,row);
    };

    clickHandler = ()=>{
        this.input.focus();
    };

    keyUpHandler = (e:React.KeyboardEvent)=>{
        if (this.combo) return;
        if (e.key === 'Enter') {
            const val = e.target?(e.target as HTMLInputElement).value:e;
            if (val === '') return;
            this.addNewData(val)
        }
    };

    deleteHandler(idx:number) {
        return (e:React.MouseEvent)=>{
            e.stopPropagation();
            const list = this.state.list.slice(0);
            const del = list.splice(idx,1);
            this.setState({list:list},()=>{
                if (typeof this.props.onChange === "function") {
                    this.props.onChange(del[0],list)
                }
            })
        }
    }

    addNewData(val:any,row?:any) {
        if (!this.props.duplicate) {
            const isDup = this.state.list.some((item)=>{
                if (this.props.dataType === 'string') {
                    return item === val
                } else {
                    return item === row
                }
            });
            if (isDup) {
                this.setState({value:''},()=>{
                    if (this.combo) {
                        this.combo.setSearchText('');
                    }
                });

                return
            }
        }

        const list = this.state.list.slice(0);
        if (this.props.dataType === 'string') {
            list.push(val);
        } else {
            list.push(row);
        }

        const state = {
            value:'',
            list:list,
        };

        this.setState(state,()=>{
            if (this.combo) {
                this.combo.setSearchText('');
                if (typeof this.props.onSelect === 'function') {
                    this.props.onSelect(val,row)
                }
            }
            if (typeof this.props.onChange === "function") {
                this.props.onChange(val,list)
            }
        });
    }

    render() {
        const bgClass = this.props.theme !== undefined ? ` bg-${Theme[this.props.theme]}`:' bg-primary';
        return (
            <div ref={(c:any)=>this.main=c} className={this.getClasses()} onClick={this.clickHandler}>
                {this.state.list.map((item,idx)=>{
                    return (<div key={idx} className={"val badge"+bgClass}>
                        <span>{this.props.dataType==='string'?item:item[this.props.dataField as string]}</span>
                        <Icon className='ms-1' icon='times-circle' onClick={this.deleteHandler(idx)}/>
                    </div>)
                })}
                <div>
                    <input ref={(c:any)=>this.input=c}
                           onKeyUp={this.keyUpHandler}
                           placeholder={this.props.placeholder}
                           className="input" style={this.getInputCss()}
                           value={this.state.value}
                           onChange={this.searchHandler}/>
                    {this.renderCombo()}
                </div>
            </div>
        );
    }

    renderCombo() {
        if (!this.props.combo) {
            return null;
        }
        let input_icon = 'ck-input-calendar-icon';
        if (this.props.size) {
            input_icon = classNames(input_icon, 'ck-input-calendar-icon-' + this.props.size);
        }
        return (
            <div className='ck-input-calendar'>
                <Combo ref={(c:any) => this.combo = c} {...this.props.combo} sm={this.props.size === 'sm' || this.props.size === 'xs'}
                       data={this.props.comboData} noSearch={this.props.readOnly} onShow={()=>{}}
                       onSelect={this.selectHandler}/>
                <div className={input_icon} onMouseDown={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    if (this.isFocus) {
                        this.searchHandler("");
                        if (this.props?.combo?.multi) {
                            this.combo.clearMulti();
                        }
                    } else {
                        this.input.focus();
                    }
                }}><Icon ref={(c:any)=>this.clearIcon=c} icon={this.state.icon}/></div>
            </div>
        )
    }
}

export default Complex;