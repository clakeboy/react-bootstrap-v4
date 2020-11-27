import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import common from './Common';
import Button from "./Button";
import CDropdown from "./CDropdown";

class Dropdown extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text,
            value: '',
            list: this.props.data,
        };

        if (!this.props.id) {
            this.props.id = 'drop-'+common.RandomString(16);
        }
    };

    componentWillReceiveProps(nextProp) {
        this.setState({
            text: nextProp.text,
            list: nextProp.data
        })
    }

    selectHandler = (e) => {
        this.setState({
            text: e.target.textContent,
            value: e.target.dataset.value,
        });
        if (this.props.onChange && typeof this.props.onChange === 'function') {
            this.props.onChange(e.target.textContent,e.target.dataset.value);
        }
    };

    setValue(val) {
        let text,value;

        switch (typeof val) {
            case 'string':
                text = val;
                value = val;
                break;
            case 'object':
                text = val.text;
                value = val.value;
                break;
            default:
                return
        }

        this.setState({
            text:text,
            value:value,
        })
    }

    getValue() {
        return this.state.value;
    }

    getJsonValue() {
        return {text:this.state.text,value:this.state.value};
    }

    getClasses() {
        let base = 'dropdown btn-group';
        return classNames(base,this.props.className);
    }

    getStyles() {
        //default style
        let def_style = {
            "width": this.props.width + "px"
        };

        return common.extend(def_style, this.props.style)
    }

    renderList() {
        let list = this.state.list;
        if (!list || !list instanceof Array) {
            if (React.Children.count(this.props.children)) {
                list = [];
                React.Children.forEach(this.props.children, (item, key) => {
                    if (item.type === DropdownValue) {
                        list.push({
                            text: item.props.text,
                            value: item.props.value,
                            active: item.props.active,
                        });
                    }
                });
            } else {
                return null
            }
        }
        return list.map((item)=>{
            let classList = 'dropdown-item';
            if (item.active) {
                classList += ' active';
            }
            if (typeof item === 'string') {
                return <Button className={classList} size={this.props.size} onClick={this.selectHandler} data-value={item}>{item}</Button>
            }
            return <Button className={classList} size={this.props.size} onClick={this.selectHandler} data-value={item.value}>{item.text}</Button>
        });
    }

    renderGrid() {
        let list = this.state.list;
        if (!list || !list instanceof Array) {
            return null;
        }
        let domList = [];
        for (let row=0;row<list.length;row++) {
            let rowList = list[row];
            if (!rowList || !rowList instanceof Array) {
                continue
            }
            let rowDom = <div className='px-2 d-flex d-inline mt-1'>
                {rowList.map((item)=>{
                    return <button className='flex-fill bd-highlight border' style={{backgroundColor:item,height:'24px'}} data-value={item} onClick={this.selectHandler}/>
                })}
            </div>;
            domList.push(rowDom);
        }

        return domList;
    }

    render() {
        return (
            <div className={this.getClasses()} style={this.getStyles()}>
                <Button className='dropdown-toggle' theme={this.props.theme} size={this.props.size} icon={this.props.icon} outline={this.props.outline} style={this.getStyles()} role="button" id={this.props.id} data-toggle="dropdown">
                    {this.state.text}
                </Button>
                {/*<Button className="btn btn-secondary dropdown-toggle" style={this.getStyles()} role="button" id={this.props.id} data-toggle="dropdown">*/}
                {/*    {this.state.text}*/}
                {/*</Button>*/}

                <div className="dropdown-menu">
                    {this.props.grid?this.renderGrid():this.renderList()}
                </div>
            </div>
        );
    }
}

Dropdown.propTypes = {
    data: PropTypes.array,
    width: PropTypes.number,
    text: PropTypes.string,
    onChange: PropTypes.func,
    outline: PropTypes.bool,
    theme: PropTypes.string,
    size: PropTypes.string,
    icon: PropTypes.string,
    grid: PropTypes.bool,
};

Dropdown.defaultProps = {
    data: [],
    text: '',
    theme: 'secondary',
    outline: false,
};

class DropdownValue extends React.Component {}
DropdownValue.propTypes = {
    text: PropTypes.string,
    value: PropTypes.string,
    active: PropTypes.bool
};

Dropdown.Value = DropdownValue;

export default Dropdown;