import React from 'react';
import classNames from 'classnames/bind';
import { ComponentProps } from './components/common';

interface Props extends ComponentProps {
    label      ?: string
    data       ?: any
    summary    ?: string
    placeholder?: string
    disabled?: boolean
    onChange?: (val:any,obj?:any)=>void
}

interface State {
    label: string
    value: any
    disabled: boolean
}

export class InputGroup extends React.PureComponent<Props,State> {

    static defaultProps = {
        label      : "",
        data       : null,
        size       : "",
        summary    : '',
        disabled:false
    };
    constructor(props:any) {
        super(props);
        this.state = {
            label: this.props.label??'',
            value: this.props.data,
            disabled: this.props.disabled??false
        };
    }

    UNSAFE_componentWillReceiveProps(nextProp:Props) {
        this.setState({
            value:nextProp.data
        });
    }

    shouldComponentUpdate(nextProps:Props, nextState:State) {
        if (nextProps.disabled !== this.props.disabled) {
            return true
        }
        return nextState.value !== this.state.value;
    }

    getValue() {
        return this.state.value;
    }

    setValue(val:any) {
        this.setState({value:val});
    }

    /*********************
     * Event
     *********************/
    changeHandler = (e:any) => {
        this.setState({
            value:e.target.value
        });

        if (this.props.onChange && typeof this.props.onChange === 'function') {
            this.props.onChange(e.target.value,this);
        }
    };

    /*********************
     * render method
     *********************/

    renderSummary() {
        if (this.props.summary === '') {
            return null
        }
        return (
            <small className="form-text text-muted text-truncate">
                {this.props.summary}
            </small>
        )
    }

    render() {
        //default style
        const def_style = {
            "width": this.props.width + "px"
        };
        //input size
        let size      = null;
        switch (this.props.size) {
            case "sm":
                size = {
                    main : "input-group-sm",
                    label: "inputGroup-sizing-sm",
                    input: "inputGroup-sizing-sm",
                };
                break;
            case "lg":
                size = {
                    main : "input-group-lg",
                    label: "inputGroup-sizing-lg",
                    input: "inputGroup-sizing-lg",
                };
                break;
            default:
                size = {
                    main : "",
                    label: "inputGroup-sizing-default",
                    input: "inputGroup-sizing-default",
                };
        }
        //merge class name
        let cls_name = "input-group";
        cls_name     = classNames(cls_name, size.main, this.props.className);

        return (
            <div className={cls_name} style={def_style}>
                <div className="input-group-prepend">
                    <div className="input-group-text">{this.state.label}</div>
                </div>
                <input type="text" {...this.props} size={undefined} onChange={this.changeHandler} value={this.state.value} className="form-control"/>
                {this.renderSummary()}
            </div>
        )
    }
}

export default InputGroup;