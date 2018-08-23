import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import './css/Switch.less'
import common from "./Common";

class Switch extends React.PureComponent {
    constructor(props) {
        super(props);
        this.checked = this.props.checked;
        this.bg_color = `bg-${this.props.theme}`;
        this.move_class = `ck-switch-circle-right`;
        if (this.props.size) {
            this.move_class += `-${this.props.size}`;
        }
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        if (this.checked !== nextProps.checked) {
            this.checked = nextProps.checked;
            this.changeStatus(this.checked);
        }
    }

    getChecked() {
        return this.checked;
    }

    setChecked(check) {
        this.checked = check;
        this.changeStatus(check);
    }

    getClasses() {
        let base = 'ck-switch';

        if (this.checked) {
            base = classNames(base, this.bg_color);
        }

        if (this.props.size) {
            base = classNames(base, `ck-switch-${this.props.size}`);
        }

        if (this.props.disabled) {
            base = classNames(base, 'ck-switch-disable');
        }

        if (this.props.absolute) {
            base = classNames(base, 'position-absolute');
        }

        return classNames(base, this.props.className);
    }

    getStyles() {
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

        return common.extend(base, this.props.style)
    }

    getCircleClasses() {
        let base = 'ck-switch-circle rounded-circle';

        if (this.checked) {
            base = classNames(base, this.move_class);
        }

        if (this.props.size) {
            base = classNames(base, `ck-switch-circle-${this.props.size}`);
        }

        return classNames(base, this.props.className);
    }

    clickHandler = () => {
        if (this.props.disabled) {
            return
        }
        this.checked = !this.checked;
        this.changeStatus(this.checked);
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(this.checked);
        }
    };

    changeStatus(flag) {
        if (flag) {
            this.circle.classList.add(this.move_class);
            this.bg.classList.add(this.bg_color);
        } else {
            this.circle.classList.remove(this.move_class);
            this.bg.classList.remove(this.bg_color);
        }
    }

    render() {
        return (
            <div ref={c => this.bg = c} className={this.getClasses()} onClick={this.clickHandler} style={this.getStyles()}>
                <div className={this.getCircleClasses()} ref={c => this.circle = c}/>
            </div>
        );
    }
}

Switch.propTypes = {
    theme: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']),
    checked: PropTypes.bool,
    size: PropTypes.oneOf(['sm','lg']),
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    absolute   : PropTypes.bool,
    x          : PropTypes.string,
    y          : PropTypes.string
};

Switch.defaultProps = {
    theme: 'primary',
    checked: false
};

export default Switch;