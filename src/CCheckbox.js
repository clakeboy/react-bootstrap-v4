import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import common from "./Common";
import Icon from "./Icon";
import './css/CCheck.less';

class CCheckbox extends React.PureComponent {
    constructor(props) {
        super(props);

        this.domId = 'ccheck-' + common.RandomString(16);
        if (this.props.id) {
            this.domId = this.props.id;
        }

        this.state = {
            checked: this.props.checked,
            half   : this.props.half
        }
    }

    componentWillReceiveProps(nextProp) {
        this.setState({checked: nextProp.checked, half:nextProp.half});
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.disabled !== this.props.disabled) {
            return true
        }
        if (nextProps.label !== this.props.label) {
            return true
        }
        if (nextState.half !== this.state.half) {
            return true
        }
        return nextState.checked !== this.state.checked;
    }

    getClasses() {
        let base = 'ck-check';
        if (this.props.inline) {
            base = classNames(base, 'ck-check-inline');
        }

        if (this.props.disabled) {
            base = classNames(base, 'ck-check-disabled')
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

    setValue = this.setChecked;

    setChecked(checked) {
        this.setState({checked: checked,half:false})
    }

    setHalf(flag) {
        this.setState({half: flag})
    }

    getChecked() {
        return this.state.checked;
    }

    getCheckedIcon(t) {
        if (this.state.half) {
            if (t === 'icon') {
                return 'minus-square';
            }

            if (t === 'type') {
                return 'solid';
            }
        }

        if (t === 'icon') {
            return this.state.checked ? 'check-square' : 'square';
        }

        if (t === 'type') {
            return this.state.checked ? 'solid' : 'regular';
        }
    }

    changeHandler = (e) => {
        if (this.props.disabled) return;
        let chk = !this.state.checked;
        this.setState({checked: chk, half: false});
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(chk, e)
        }
    };

    render() {
        return (
            <div {...this.props} className={this.getClasses()} style={this.getStyles()} onClick={this.changeHandler}>
                <Icon ref={c => this.icon = c} className='ck-check-icon' icon={this.getCheckedIcon('icon')}
                      iconType={this.getCheckedIcon('type')}/>
                {this.props.label === '' ? null : <span className="ck-check-label">{this.props.label}</span>}
            </div>
        );
    }
}

CCheckbox.propTypes = {
    inline  : PropTypes.bool,
    id      : PropTypes.string,
    label   : PropTypes.string,
    checked : PropTypes.bool,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    half    : PropTypes.bool,
    absolute: PropTypes.bool,
    x       : PropTypes.string,
    y       : PropTypes.string
};

CCheckbox.defaultProps = {
    label   : '',
    checked : false,
    disabled: false,
    inline  : false,
    half:     false,
};

export default CCheckbox;