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
    checked: boolean
}

export class Switch extends React.Component<Props,State> {
    static defaultProps = {
        theme: Theme.primary,
        checked: false
    };
    checked:boolean
    bg_color:string
    text_color:string
    move_class:string
    circle:HTMLDivElement
    bg:HTMLDivElement
    constructor(props:any) {
        super(props);
        const themeStr:string = typeof this.props.theme === 'string'?this.props.theme:Theme[this.props.theme??0]
        this.checked = this.props.checked??false;
        this.bg_color = `bg-${themeStr}`;
        this.text_color = `text-${themeStr}`;
        this.move_class = `ck-switch-circle-right`;
        if (this.props.size) {
            this.move_class += `-${this.props.size}`;
        }

        this.state = {
            checked: this.props.checked??false
        }
    }

    componentDidMount() {

    }

    UNSAFE_componentWillReceiveProps(nextProps:Props) {
        if (this.state.checked !== nextProps.checked) {
            this.setState({checked:nextProps.checked??false})
        }
    }

    getChecked() {
        return this.checked;
    }

    setChecked(check:boolean) {
        this.setState({checked:check})
        // this.changeStatus(check);
    }

    getClasses() {
        let base = 'ck-switch';
        
        if (this.state.checked) {
            base = classNames(base, this.bg_color,this.text_color);
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
        let base = 'ck-switch-circle rounded-circle d-flex align-items-center justify-content-center';

        if (this.state.checked) {
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
        this.setState({checked: !this.state.checked},()=>{
            if (typeof this.props.onChange === 'function') {
                this.props.onChange(this.state.checked);
            }
        })
        // this.checked = !this.checked;
        // this.changeStatus(this.checked);
        
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
                <div className={this.getCircleClasses()} ref={(c:any) => this.circle = c}>
                    <div className='text-center'>
                    {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default Switch;