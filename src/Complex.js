import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import './css/Complex.less'
import Icon from './Icon';
import Combo from "./Combo";

class Complex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list:this.props.data,
            value:"",
            icon:'',
        }
    }

    componentDidMount() {
        if (this.combo) {
            this.input.addEventListener('focus', (e) => {
                this.combo.show(this.state.value,e.currentTarget);
            }, false);
        }
        this.input.addEventListener('mousedown',(e)=>{e.stopPropagation()}, false);
        this.input.addEventListener('focus', this.focusClearHandler, false);
        this.input.addEventListener('blur', this.blurClearHandler, false);
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.list === nextProps.data) return;
        this.setState({
            list    : nextProps.data,
        });
    }

    getClasses() {
        let base = 'complex-main d-flex flex-wrap align-items-center';

        return classNames(base,this.props.className);
    }

    getInputCss() {
        let base = {};
        base.width = this.props.inputWidth;
        return base;
    }
    /*********************
     * Event
     *********************/
    focusClearHandler = (e)=>{
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

    searchHandler = (e)=> {
        let state = {
            value: e.target?e.target.value:e,
        };
        this.setState(state, () => {
            if (this.combo) {
                this.combo.filter(state.value);
            }
        });
    };

    selectHandler = (val,row)=>{
        this.addNewData(val);
    };

    clickHandler = ()=>{
        this.input.focus();
    };

    keyUpHandler = (e)=>{
        if (this.combo) return;
        if (e.keyCode === 13) {
            let val = e.target?e.target.value:e;
            if (val === '') return;
            this.addNewData(val)
        }
    };

    deleteHandler(idx) {
        return (e)=>{
            e.stopPropagation();
            let list = this.state.list.slice(0);
            let del = list.splice(idx,1);
            this.setState({list:list},()=>{
                if (typeof this.props.onChange === "function") {
                    this.props.onChange(del[0],list)
                }
            })
        }
    }

    addNewData(val) {
        if (!this.props.duplicate) {
            let isDup = this.state.list.some((item)=>{
                return item === val
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

        let list = this.state.list.slice(0);
        list.push(val);
        let state = {
            value:'',
            list:list,
        };

        this.setState(state,()=>{
            if (this.combo) {
                this.combo.setSearchText('');
            }
            if (typeof this.props.onChange === "function") {
                this.props.onChange(val,list)
            }
        });
    }

    render() {
        return (
            <div ref={c=>this.main=c} className={this.getClasses()} onClick={this.clickHandler}>
                {this.state.list.map((item,idx)=>{
                    return (<div className="val badge badge-primary">
                        <span>{item}</span>
                        <Icon className='ml-1' icon='times-circle' onClick={this.deleteHandler(idx)}/>
                    </div>)
                })}
                <div>
                    <input ref={c=>this.input=c}
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
                <Combo ref={c => this.combo = c} {...this.props.combo} sm={this.props.size === 'sm' || this.props.size === 'xs'}
                       data={this.props.comboData} noSearch={this.props.readOnly} onShow={()=>{}}
                       onSelect={this.selectHandler}/>
                <div className={input_icon} onMouseDown={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    if (this.isFocus) {
                        this.searchHandler("");
                        if (this.props.combo.multi) {
                            this.combo.clearMulti();
                        }
                    } else {
                        this.input.focus();
                    }
                }}><Icon ref={c=>this.clearIcon=c} icon={this.state.icon}/></div>
            </div>
        )
    }
}

Complex.propTypes = {
    inputWidth: PropTypes.string,
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
    list: PropTypes.array,
    dataType: PropTypes.oneOf(['string','object']),
    data: PropTypes.array,
    placeholder: PropTypes.string,
    combo: PropTypes.object,
    comboData: PropTypes.object,
    duplicate: PropTypes.bool
};

Complex.defaultProps = {
    inputWidth: "200px",
    dataType: "string",
    data: [],
    duplicate: false
};

export default Complex;