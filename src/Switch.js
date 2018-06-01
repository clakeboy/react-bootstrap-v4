import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import './css/Switch.less'

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
            this.changeStatus();
        }
    }

    getChecked() {
        return this.checked;
    }

    setChecked(check) {
        this.checked = check;
        this.changeStatus();
    }

    getClasses() {
        let base = 'ck-switch';

        if (this.checked) {
            base = classNames(base, this.bg_color);
        }

        if (this.props.size) {
            base = classNames(base, `ck-switch-${this.props.size}`);
        }

        return classNames(base, this.props.className);
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
        this.changeStatus();
        this.checked = !this.checked;
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(this.checked);
        }
    };

    changeStatus() {
        if (this.checked) {
            this.circle.classList.remove(this.move_class);
            this.bg.classList.remove(this.bg_color);
        } else {
            this.circle.classList.add(this.move_class);
            this.bg.classList.add(this.bg_color);
        }
    }

    render() {
        return (
            <div ref={c => this.bg = c} className={this.getClasses()} onClick={this.clickHandler}>
                <div className={this.getCircleClasses()} ref={c => this.circle = c}/>
            </div>
        );
    }
}

Switch.propTypes = {
    theme: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']),
    checked: PropTypes.bool,
    size: PropTypes.oneOf(['sm','lg']),
    onChange: PropTypes.func,
};

Switch.defaultProps = {
    theme: 'primary',
    checked: false
};

export default Switch;