import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import CCheckbox from './CCheckbox';
import Select from './Select';
import TextArea from './TextArea';
import {map} from './Common';
import Dropdown from "./Dropdown";
import Switch from './Switch';
import CDropdown from './CDropdown';
import ComboBox from "./ComboBox";
import CalendarRange from "./CalendarRange";
import RadioGroup from "./RadioGroup";

export class Form extends React.PureComponent {
    static propTypes = {
        onChange: PropTypes.func,
    };
    constructor(props) {
        super(props);
        this.vals = {};
        this.components = {};
        this.events = {};
        this.newColumn = {};
    }

    componentDidMount() {

    }

    getValues()  {
        return this.vals;
    }

    getNew() {
        return Object.assign({},this.newColumn);
    }

    setValue(field,val) {
        this.vals[field] = val;
        if (this.components[field]) {
            // console.log(this.components.current);
            // this.components[field].setValue(val);
        }
    }

    check() {
        let valid = true
        map(this.components,(item,key)=>{
            if (typeof item.check === 'function') {
                if (!item.check()) {
                    valid = false
                }
            }
        })
        return valid;
    }

    setValues(vals) {
        this.vals = Object.assign(this.vals,vals);
        map(vals,(item,key)=>{
            if (this.components[key]) {
                // console.log(this.components);
                // this.components[key].setValue(item);
            }
        });
    }

    inputChangeHandler(field) {
        return (val)=>{
            this.vals[field] = val;
            if (typeof this.props.onChange === 'function') {
                this.props.onChange(field,val);
            }
            if (typeof this.events[field] === 'function') {
                this.events[field](val);
            }
        };
    };

    comboChangeHandler(field) {
        return (val,row)=>{
            this.vals[field] = {text:val,value:row};
            if (typeof this.props.onChange === 'function') {
                this.props.onChange(field,val,row,true);
            }
            if (typeof this.events[field] === 'function') {
                this.events[field](val,row);
            }
        };
    };

    selectChangeHandler(field) {
        return (e)=>{
            this.vals[field] = e.target.value;
            if (typeof this.props.onChange === 'function') {
                this.props.onChange(field,e.target.value);
            }
            if (typeof this.events[field] === 'function') {
                this.events[field](e);
            }
        };
    };

    dropdownChangeHandler(field) {
        return (text,val)=>{
            this.vals[field] = text;
            if (typeof this.props.onChange === 'function') {
                this.props.onChange(field,text,val);
            }
            if (typeof this.events[field] === 'function') {
                this.events[field](text,val);
            }
        }
    }

    cdropdownChangeHandler(field) {
        return (text,row)=>{
            this.vals[field] = row?.value;
            if (typeof this.props.onChange === 'function') {
                this.props.onChange(field,row?.text,row?.value);
            }
            if (typeof this.events[field] === 'function') {
                this.events[field](row?.text,row?.value);
            }
        }
    }

    checkChangeHandler(field) {
        return (checked)=>{
            this.vals[field] = checked;
            if (typeof this.props.onChange === 'function') {
                this.props.onChange(field,checked);
            }
            if (typeof this.events[field] === 'function') {
                this.events[field](checked);
            }
        };
    };

    switchChangeHandler(field) {
        return (checked)=>{
            this.vals[field] = checked;
            if (typeof this.props.onChange === 'function') {
                this.props.onChange(field,checked);
            }
            if (typeof this.events[field] === 'function') {
                this.events[field](checked);
            }
        };
    }

    calendarRangeChangeHandler(field) {
        return (min,max)=>{
            this.vals[field] = {min:min,max:max};
            if (typeof this.props.onChange === 'function') {
                this.props.onChange(field,min,max);
            }
            if (typeof this.events[field] === 'function') {
                this.events[field](min,max);
            }
        }
    }

    radioChangeHandler(field) {
        return (val)=>{
            this.vals[field] = val;
            if (typeof this.props.onChange === 'function') {
                this.props.onChange(field,val);
            }
            if (typeof this.events[field] === 'function') {
                this.events[field](val);
            }
        };
    }

    refComponent(field,orgRef) {
        return (c)=>{
            this.components[field] = c;
            if (typeof orgRef === 'function') {
                orgRef(c)
            }
        }
    }

    bindingComponent(item) {
        if (typeof item !== 'object' || item === null) {
            return item;
        }
        if (item.props && typeof item.props.children === 'object' &&
            item.type !== CDropdown &&
            item.type !== ComboBox &&
            item.type !== RadioGroup) {
            let children = React.Children.map(item.props.children,(child_item)=>{
                return this.bindingComponent(child_item);
            });
            return React.cloneElement(item,{...item.props},children)
        } else {
            let props = {};
            let field;
            if (typeof item.props.field === 'string') {
                field = item.props.field;
            } else if (typeof item.props.field === 'object') {
                field = item.props.field.key;
            } else {
                return item;
            }
            this.newColumn[field] = '';
            if (item.type === Input) {
                if (typeof item.props.onChange === 'function') {
                    this.events[field] = item.props.onChange;
                }

                if (item.props.combo) {
                    props.onChange = this.comboChangeHandler(field);
                } else {
                    props.onChange = this.inputChangeHandler(field);
                }
                // this.components[field] = React.createRef();
                // item.props.ref = this.components[field];
            } else if (item.type === Select) {
                if (typeof item.props.onSelect === 'function') {
                    this.events[field] = item.props.onSelect;
                }
                props.onSelect = this.selectChangeHandler(field);
                // item.props.ref = this.refComponent(field);
            } else if (item.type === CCheckbox) {
                if (typeof item.props.onChange === 'function') {
                    this.events[field] = item.props.onChange;
                }
                props.onChange = this.checkChangeHandler(field);
                // item.props.ref = this.refComponent(field);
            } else if (item.type === TextArea) {
                if (typeof item.props.onChange === 'function') {
                    this.events[field] = item.props.onChange;
                }
                props.onChange = this.inputChangeHandler(field);
                // item.props.ref = this.refComponent(field);
            } else if (item.type === Dropdown) {
                if (typeof item.props.onChange === 'function') {
                    this.events[field] = item.props.onChange;
                }
                props.onChange = this.dropdownChangeHandler(field);
            } else if (item.type === CDropdown) {
                if (typeof item.props.onChange === 'function') {
                    this.events[field] = item.props.onChange;
                }
                props.onChange = this.cdropdownChangeHandler(field);
            } else if (item.type === Switch) {
                if (typeof item.props.onChange === 'function') {
                    this.events[field] = item.props.onChange;
                }
                props.onChange = this.switchChangeHandler(field);
            } else if (item.type === ComboBox) {
                if (typeof item.props.onChange === 'function') {
                    this.events[field] = item.props.onChange;
                }
                props.onChange = this.comboChangeHandler(field);
            } else if (item.type === CalendarRange) {
                if (typeof item.props.onChange === 'function') {
                    this.events[field] = item.props.onChange;
                }
                props.onChange = this.calendarRangeChangeHandler(field);
            } else if (item.type === RadioGroup) {
                if (typeof item.props.onChange === 'function') {
                    this.events[field] = item.props.onChange;
                }
                props.onChange = this.radioChangeHandler(field);
            }
            // return React.cloneElement(item,Object.assign({},item.props,props))
            props.ref = this.refComponent(field,item.ref);
            return React.cloneElement(item,{...item.props,...props})
        }
    }

    render() {
        return (
            <>
                {React.Children.map(this.props.children,(item)=>{
                    return this.bindingComponent(item);
                    // return item;
                })}
            </>
        );
    }
}

export default Form;