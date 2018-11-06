import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import common from "./Common";

class Checkbox extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            value  : this.props.data,
            checked: this.props.checked,
        };

        this.domId = 'check-'+common.RandomString(16);
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

    /**
     * get checked
     * @returns {Boolean|*}
     */
    getChecked() {
        return this.state.checked;
    }

    /**
     * set checked
     * @param val
     */
    setChecked(val) {
        this.setState({checked: val});
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

    /*********************
     * Event
     *********************/
    changeHandler = (e) => {
        this.setState({
            checked: e.target.checked
        });

        if (typeof this.props.onChange === 'function') {
            this.props.onChange(e, this);
        }
    };

    /*********************
     * render method
     *********************/
    render() {
        // console.log('render Checkbox');
        return (
            <div className={this.getClasses()} style={this.getStyles()}>
                <input {...this.props} onChange={this.changeHandler} checked={this.state.checked} className="form-check-input" type="checkbox" id={this.domId}/>
                <label className="form-check-label" htmlFor={this.domId}>
                    {this.props.label}
                </label>
            </div>
        );
    }
}

Checkbox.propTypes = {
    id      : PropTypes.string,
    label   : PropTypes.string,
    inline  : PropTypes.bool,
    data    : PropTypes.any,
    checked : PropTypes.bool,
    onChange: PropTypes.func,
    absolute: PropTypes.bool,
    x       : PropTypes.string,
    y       : PropTypes.string
};

Checkbox.defaultProps = {
    inline: false,
    label : '',
};

export default Checkbox;