import React from 'react';
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
                        const props:any = {...item.props}
                        props.onChange = this.changeHandler;
                        props.checked = item.props.data === this.state.value;
                        props.disabled = this.props.disabled;
                        props.name = this.name;
                        return React.cloneElement(item,props)
                    }
                })}
            </>
        );
    }
}

export default RadioGroup;
