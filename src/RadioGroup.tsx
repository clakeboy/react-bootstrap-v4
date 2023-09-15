import React from 'react';
import PropTypes from 'prop-types';
import Radio from './Radio';
import {RandomString} from "./Common";
import { ComponentProps } from './components/common';

interface Props extends ComponentProps {
    name?: string
    onChange?: (e:any,obj?:Radio) => void
    data?: any
}

interface State {
    value: any
}


export class RadioGroup extends React.Component<Props,State> {
    static propTypes = {
        onChange: PropTypes.func,
        data : PropTypes.any,
        disabled: PropTypes.bool,
        name: PropTypes.string,
    };
    domId:string
    name:string
    constructor(props:any) {
        super(props);
        this.state = {
            value: this.props.data
        };
        if (!this.props.name) {
            this.name = 'radiop-'+RandomString(16);
        }
        this.domId = 'radiop-' + RandomString(16);
        if (this.props.id) {
            this.domId = this.props.id;
        }
    }

    UNSAFE_componentWillReceiveProps(nextProp:Props) {
        this.setState({value: nextProp.data});
    }

    shouldComponentUpdate(nextProps:Props, nextState:State) {
        if (this.props.disabled !== nextProps.disabled) {
            return true
        }
        return nextState.value !== this.state.value;
    }

    changeHandler = (e:any)=>{
        this.setState({
            value: e.target.value
        },()=>{
            if (typeof this.props.onChange === 'function') {
                this.props.onChange(this.state.value);
            }
        });
    };

    render() {
        return (
            <>
                {React.Children.map(this.props.children,(item)=>{
                    if (item.type === Radio) {
                        item.props.onChange = this.changeHandler;
                        item.props.checked = item.props.data === this.state.value;
                        item.props.disabled = this.props.disabled;
                        item.props.name = this.name;
                    }
                    return React.cloneElement(item,item.props)
                })}
            </>
        );
    }
}

export default RadioGroup;
