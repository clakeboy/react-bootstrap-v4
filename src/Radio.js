import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import common from "./Common";

export class Radio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value  : this.props.data,
            checked: this.props.checked
        };

        this.domId = 'input-' + common.RandomString(16);
        if (this.props.id) {
            this.domId = this.props.id;
        }
    }

    componentWillReceiveProps(nextProp) {
        this.setState({checked: nextProp.checked});
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.disabled !== this.props.disabled) {
            return true
        }
        if (nextProps.label !== this.props.label) {
            return true
        }
        return nextState.checked !== this.state.checked;
    }

    getClasses() {
        let base = 'form-check';
        if (this.props.inline) {
            base = classNames(base, 'form-check-inline');
        }

        if (this.props.absolute) {
            base = classNames(base, 'position-absolute');
        }

        return classNames(base, this.props.className);
    }

    getStyles() {
        let base = {};
        if (this.props.absolute) {
            base.top  = this.props.y;
            base.left = this.props.x;
        }
        return base;
    }

    inputClasses() {
        let base = 'form-check-input';
        return classNames(base, this.props.inputClass);
    }

    /*********************
     * Event
     *********************/
    changeHandler = (e) => {
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(e, this);
        }
    };

    render() {
        return (
            <div className={this.getClasses()} style={this.getStyles()}>
                <input {...this.props}
                       onChange={this.changeHandler}
                       className={this.inputClasses()}
                       type="radio"
                       name={this.props.name}
                       id={this.domId}
                       value={this.state.value} checked={this.state.checked}/>
                <label className="form-check-label" htmlFor={this.domId}>
                    {this.props.label}
                </label>
            </div>
        );
    }
}

Radio.propTypes = {
    id          : PropTypes.string,
    checked     : PropTypes.bool,
    name        : PropTypes.string,
    label       : PropTypes.string,
    onChange    : PropTypes.func,
    absolute    : PropTypes.bool,
    data        : PropTypes.any,
    x           : PropTypes.string,
    y           : PropTypes.string,
    inputClass  : PropTypes.string,
};

Radio.defaultProps = {
    inline: false,
    label : '',
};

export default Radio;
