import React from 'react';
import classNames from 'classnames/bind';
import common from "./Common";
import { ComponentProps, StrObject } from './components/common';

interface Props extends ComponentProps {
    label      ?: string
    data       ?: any[],
    summary    ?: string
    readOnly   ?: boolean
    placeholder?: string
    onSelect   ?: (e:any,obj?:Select)=>void
    value      ?: any
}

interface State {
    value: any
    data: any[]
}
export class Select extends React.Component<Props,State> {
    static defaultProps = {
        data: [],
        label: ''
    };
    domId:string
    constructor(props:any) {
        super(props);
        this.domId = 'select-' + common.RandomString(8);
        this.state = {
            value: this.props.value,
            data : this.props.data??[]
        };
    }

    UNSAFE_componentWillReceiveProps(nextProp:Props) {
        this.setState({
            value: nextProp.value,
            data : nextProp.data??[]
        });
    }

    shouldComponentUpdate(nextProps:Props, nextState:State) {
        if (nextProps.disabled !== this.props.disabled) {
            return true
        }
        return nextState.data !== this.state.data || nextState.value !== this.state.value;
    }

    getValue() {
        return this.state.value;
    }

    setValue(val:any) {
        this.setState({
            value:val
        });
    }

    getClasses() {
        let base = '';
        if (this.props.absolute) {
            base = classNames(base, 'position-absolute');
        }
        if (this.props.label) {
            base = classNames(base, 'mb-3');
        }
        return classNames(base, this.props.className);
    }

    getMainStyles() {
        //default style
        const base:StrObject = {};
        //width
        if (this.props.width) {
            base.width = this.props.width;
        }
        //height
        if (this.props.height) {
            base.height = this.props.height;
        }

        if (this.props.absolute) {
            base.top  = this.props.y??'';
            base.left = this.props.x??'';
        }

        return common.extend(base, this.props.style)
    }

    getInputClasses() {
        let base = 'form-select';
        //readonly
        if (this.props.readOnly) {
            base = 'form-control-plaintext';
        }
        //size
        let size;
        switch (this.props.size) {
            case 'lg':
                size = 'form-control-lg';
                break;
            case 'sm':
                size = 'form-control-sm';
                break;
            default:
                size = ''
        }

        return classNames(base, size);
    }

    /*********************
     * Event
     *********************/
    selectHandler = (e:any) => {
        this.setState({
            value: e.target.value
        });

        if (this.props.onSelect && typeof this.props.onSelect === 'function') {
            this.props.onSelect(e, this);
        }
    };

    /*********************
     * render method
     *********************/

    renderLabel() {
        if (this.props.label === '') {
            return null;
        }
        return (
            <label htmlFor={this.domId} className='form-label'>{this.props.label}</label>
        )
    }

    renderSummary() {
        if (!this.props.summary) {
            return null
        }
        return (
            <small className="form-text text-muted text-truncate">
                {this.props.summary}
            </small>
        )
    }

    render() {
        return (
            <div className={this.getClasses()} style={this.getMainStyles()}>
                {this.renderLabel()}
                <select {...this.props} size={undefined} onChange={this.selectHandler} value={this.state.value} className={this.getInputClasses()} id={this.domId}>
                    {this.state.data.map((item,idx) => {
                        let list;
                        switch (typeof item) {
                            case 'string':
                                list = {text: item, value: item};
                                break;
                            case 'object':
                                list = {text: item.text, value: item.value};
                                break;
                            default:
                                list = {text: '', value: ''};
                        }
                        return <option key={idx} value={list.value} selected={this.state.value === list.value}>{list.text}</option>
                    })}
                </select>
                {this.renderSummary()}
            </div>
        );
    }
}


export default Select;