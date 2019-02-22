import React from 'react';
import PropTypes from 'prop-types';
import Radio from './Radio';
import {RandomString} from "./Common";

class RadioGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.data
        };
        if (!this.props.name) {
            this.name = 'radio-'+RandomString(16);
        }
    }

    componentWillReceiveProps(nextProp) {
        this.setState({value: nextProp.data});
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.disabled !== nextProps.disabled) {
            return true
        }
        return nextState.value !== this.state.value;
    }

    changeHandler = (e)=>{
        this.setState({
            value: e.target.value
        });

        if (typeof this.props.onChange === 'function') {
            this.props.onChange(e.target.value);
        }
    };

    render() {
        return (
            <React.Fragment>
                {React.Children.map(this.props.children,(item)=>{
                    if (item.type === Radio) {
                        item.props.onChange = this.changeHandler;
                        item.props.checked = item.props.data === this.state.value;
                        item.props.disabled = this.props.disabled;
                        item.props.name = this.name;
                    }
                    return React.cloneElement(item,item.props)
                })}
            </React.Fragment>
        );
    }
}

RadioGroup.propTypes = {
    onChange: PropTypes.func,
    data : PropTypes.any,
    disabled: PropTypes.bool,
    name: PropTypes.string,
};

RadioGroup.defaultProps = {
};

export default RadioGroup;
