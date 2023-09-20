import React from 'react';
import classNames from 'classnames/bind';

import './css/Switch.less'
import common from "./Common";
import { ComponentProps, StrObject, Theme } from './components/common';

interface Props extends ComponentProps {
    checked?: boolean
    onChange?: (chk:boolean)=>void
}

interface State {
    content: any
    show: boolean
    autoHide: number
    width: string
    theme: string
    isClose: boolean
}

export class Switch extends React.PureComponent<Props,State> {
    static defaultProps = {
        theme: Theme.primary,
        checked: false
    };
    checked:boolean
    bg_color:string
    move_class:string
    circle:HTMLDivElement
    bg:HTMLDivElement
    constructor(props:any) {
        super(props);
        this.checked = this.props.checked??false;
        this.bg_color = `bg-${Theme[this.props.theme??0]}`;
        this.move_class = `ck-switch-circle-right`;
        if (this.props.size) {
            this.move_class += `-${this.props.size}`;
        }
    }

    componentDidMount() {

    }

    UNSAFE_componentWillReceiveProps(nextProps:Props) {
        if (this.checked !== nextProps.checked) {
            this.checked = nextProps.checked??false;
            this.changeStatus(this.checked);
        }
    }

    getChecked() {
        return this.checked;
    }

    setChecked(check:boolean) {
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
        const base:StrObject = {};
        //width
        if (this.props.width) {
            base.width = this.props.width;
        }
        //height
        if (this.props.height) {
            base.height = this.props.height;
        }

        if (this.props.absolute) {
            base.top  = this.props.y??'';
            base.left = this.props.x??'';
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

        return base;
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

    changeStatus(flag: boolean): void {
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
            <div ref={(c:any) => this.bg = c} className={this.getClasses()} onClick={this.clickHandler} style={this.getStyles()}>
                <div className={this.getCircleClasses()} ref={(c:any) => this.circle = c}/>
            </div>
        );
    }
}

export default Switch;