import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import common from "./Common";

export class Select extends React.PureComponent {
    static propTypes = {
        id         : PropTypes.string,
        size       : PropTypes.oneOf(['df', 'sm', 'lg']),
        label      : PropTypes.string,
        data       : PropTypes.array,
        summary    : PropTypes.string,
        readOnly   : PropTypes.bool,
        width      : PropTypes.string,
        height     : PropTypes.string,
        placeholder: PropTypes.string,
        onSelect   : PropTypes.func,
        value      : PropTypes.any,
        absolute   : PropTypes.bool,
        x          : PropTypes.string,
        y          : PropTypes.string
    };

    static defaultProps = {
        data: [],
        label: ''
    };
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            data : this.props.data
        };
    }

    componentWillReceiveProps(nextProp) {
        this.setState({
            value: nextProp.value,
            data : nextProp.data
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.disabled !== this.props.disabled) {
            return true
        }
        return nextState.data !== this.state.data || nextState.value !== this.state.value;
    }

    getValue() {
        return this.state.value;
    }

    setValue(val) {
        this.setState({
            value:val
        });
    }

    getClasses() {
        let base = 'form-group';
        if (this.props.absolute) {
            base = classNames(base, 'position-absolute');
        }
        return classNames(base, this.props.className);
    }

    getMainStyles() {
        //default style
        let base = {};
        //width
        if (this.props.width) {
            base.width = this.props.width;
        }
        //height
        if (this.props.height) {
            base.height = this.props.height;
        }

        if (this.props.absolute) {
            base.top  = this.props.y;
            base.left = this.props.x;
        }

        if (!this.props.label) {
            base.marginBottom = '0';
        }

        return common.extend(base, this.props.style)
    }

    getInputClasses() {
        let base = 'form-control';
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
    selectHandler = (e) => {
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
            <label htmlFor={this.domId}>{this.props.label}</label>
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
                <select {...this.props} onChange={this.selectHandler} value={this.state.value} className={this.getInputClasses()} id={this.domId}>
                    {this.state.data.map((item) => {
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
                        return <option value={list.value} selected={this.state.value === list.value}>{list.text}</option>
                    })}
                </select>
                {this.renderSummary()}
            </div>
        );
    }
}


export default Select;