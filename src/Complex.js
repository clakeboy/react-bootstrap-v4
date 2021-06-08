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
            list:[],
        }
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            list    : nextProps.list,
        });
    }

    getClasses() {
        let base = 'form-control complex-main d-flex align-items-center';

        return classNames(base,this.props.className);
    }

    getInputCss() {
        let base = {};
        base.width = this.props.inputWidth;
        return base;
    }

    keyUpHandler = (e)=>{
        if (e.keyCode === 13) {
            if (typeof this.props.onEnter === 'function') {
                this.props.onEnter(e.target.value);
            }

        }
    };

    deleteHandler = (e)=>{

    };

    render() {
        return (
            <div ref={c=>this.main=c} className={this.getClasses()}>
                {}
                <div className="val badge badge-info"><span>asdfasf</span><Icon className='ml-1' icon='times-circle'/></div>
                <div className="val badge badge-info"><span>中文</span></div>
                <div>
                    <input onKeyUp={this.keyUpHandler} className="input" style={this.getInputCss()}/>
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
                       data={this.state.comboData} noSearch={this.props.readOnly} onShow={()=>{}}
                       onSelect={this.selectHandler}/>
                <div className={input_icon} onMouseDown={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    if (this.isFocus) {
                        this.changeHandler("");
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
    list: PropTypes.array,
    dataType: PropTypes.oneOf(['string','object'])
};

Complex.defaultProps = {
    inputWidth: "200px",
    dataType: "string"
};

export default Complex;