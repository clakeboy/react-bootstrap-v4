import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Input from './Input';
import Checkbox from './Checkbox';
import Select from './Select';
import TextArea from './TextArea';
import {map} from './Common';

class Form extends React.PureComponent {
    constructor(props) {
        super(props);
        this.vals = {};
        this.components = {};
    }

    componentDidMount() {

    }

    getValues()  {
        return this.vals;
    }

    setValue(field,val) {
        this.vals[field] = val;
        if (this.components[field]) {
            console.log(this.components.current);
            // this.components[field].setValue(val);
        }
    }

    setValues(vals) {
        this.vals = vals;
        map(vals,(item,key)=>{
            if (this.components[key]) {
                console.log(this.components);
                // this.components[key].setValue(item);
            }
        });
    }

    inputChangeHandler(field) {
        return (val)=>{
            this.vals[field] = val;
            if (typeof this.props.onChange === 'function') {
                this.props.onChange(val);
            }
        };
    };

    comboChangeHandler(field) {
        return (val,row)=>{
            this.vals[field] = {text:val,value:row};
            if (typeof this.props.onChange === 'function') {
                this.props.onChange(val,row);
            }
        };
    };

    selectChangeHandler(field) {
        return (e)=>{
            this.vals[field] = e.target.value;
            if (typeof this.props.onChange === 'function') {
                this.props.onChange(e.target.value);
            }
        };
    };

    checkChangeHandler(field) {
        return (e)=>{
            this.vals[field] = e.target.checked;
            if (typeof this.props.onChange === 'function') {
                this.props.onChange(e.target.checked);
            }
        };
    };

    refComponent(field) {
        return (c)=>{
            this.components[field] = c;
            console.log(this.components);
        }
    }

    bindingComponent(item) {
        if (typeof item.props.children === 'object') {
            React.Children.map(item.props.children,(child_item)=>{
                this.bindingComponent(child_item);
            });
        } else {
            let field;
            if (typeof item.props.field === 'string') {
                field = item.props.field;
            } else if (typeof item.props.field === 'object') {
                field = item.props.field.key;
            } else {
                return;
            }
            if (item.type === Input) {
                if (item.props.combo) {
                    item.props.onChange = this.comboChangeHandler(field);
                } else {
                    item.props.onChange = this.inputChangeHandler(field);
                }
                // this.components[field] = React.createRef();
                // item.props.ref = this.components[field];
                item.props.ref = this.refComponent(field);
            } else if (item.type === Select) {
                item.props.onSelect = this.selectChangeHandler(field);
                // item.props.ref = this.refComponent(field);
            } else if (item.type === Checkbox) {
                item.props.onChange = this.checkChangeHandler(field);
                // item.props.ref = this.refComponent(field);
            } else if (item.type === TextArea) {
                item.props.onChange = this.inputChangeHandler(field);
                // item.props.ref = this.refComponent(field);
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                {React.Children.map(this.props.children,(item)=>{
                    this.bindingComponent(item);
                    return item;
                })}
            </React.Fragment>
        );
    }
}

Form.propTypes = {
    onChange: PropTypes.func,
};

Form.defaultProps = {

};

export default Form;