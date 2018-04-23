import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import common from './Common';

class Dropdown extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text,
            value: '',
            list: this.props.data,
        };

        if (!this.props.id) {
            this.props.id = common.RandomString(16);
        }
    };

    componentWillReceiveProps(nextProp) {
        this.setState({list: nextProp.data})
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
        let base = 'dropdown';
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
            return null;
        }

        return list.map((item)=>{
            if (typeof item === 'string') {
                return <button className="dropdown-item" onClick={this.selectHandler} data-value={item}>{item}</button>
            }
            return <button className="dropdown-item" onClick={this.selectHandler} data-value={item.value}>{item.text}</button>
        });
    }

    render() {
        return (
            <div className={this.getClasses()} style={this.getStyles()}>
                <button className="btn btn-secondary dropdown-toggle" style={this.getStyles()} role="button" id={this.props.id} data-toggle="dropdown">
                    {this.state.text}
                </button>

                <div className="dropdown-menu">
                    {this.renderList()}
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
};

Dropdown.defaultProps = {
    data: [],
    text: '',
};

export default Dropdown;