import React from 'react';
import classNames from 'classnames/bind';
import Icon from './Icon';
import './css/Button.less';
import common from "./Common";
import {ComponentProps, Theme} from './components/common';

interface Props extends ComponentProps {
    theme?: Theme
    outline?: boolean
    icon?: string
    tip?: string
    loading?: boolean
    block?: boolean
    role?:string
    onClick?: (event: React.MouseEvent) => void
}

interface State {
    content: any
    show: boolean
    autoHide: number
    width: string
    theme: string
    isClose: boolean
}

export class Button extends React.PureComponent<Props,State> {
    domId:string

    static defaultProps = {
        theme: Theme.primary,
        outline: false,
        size: 'df',
        loading: false,
    }

    constructor(props:any) {
        super(props);
        this.domId = 'btn-'+common.RandomString(16);
    }

    componentDidMount() {
        if (this.props.tip) {
            $('#'+this.domId).tooltip({'trigger':'hover'});
        }
    }

    componentWillUnmount() {
        if (this.props.tip) {
            $('#'+this.domId).tooltip('dispose');
        }
    }

    getClasses() {
        let base = 'btn ck-btn';
        const base_style = ['btn'];
        //is outline theme
        if (this.props.outline) {
            base_style.push('outline');
        }
        //apply style
        if (this.props.theme !== undefined) {
            base_style.push(Theme[this.props.theme]);
        }
            
        //merge class
        base = classNames(base,base_style.join('-'));

        //size
        if (this.props.size !== 'df') {
            if (this.props.size ==='xs') {
                base = classNames(base,"ck-btn-xs");
            } else {
                base = classNames(base,"btn-"+this.props.size);
            }
        }

        //block
        if (this.props.block) {
            base = classNames(base,'btn-block');
        }

        return classNames(base,this.props.className);
    }

    getStyles() {
        const base:{[propName:string]:string} = {};
        if (this.props.width) {
            base.width = this.props.width;
        }

        if (this.props.height) {
            base.height = this.props.height;
        }

        if (this.props.absolute) {
            base.position = 'absolute';
            base.left     = this.props.x??'';
            base.top      = this.props.y??'';
        }

        return base;
    }

    clickHandler = (e:React.MouseEvent) => {
        if (this.props.onClick) {
            this.props.onClick(e)
        }
    };

    render() {
        return (
            <button {...this.props} {...this.renderTip()} id={this.domId} disabled={this.props.disabled} onClick={this.clickHandler} className={this.getClasses()} style={this.getStyles()} title={this.props.tip}>
                {this.renderIcon()}{this.props.children}
            </button>
        );
    }

    renderTip() {
        if (!this.props.tip) {
            return {}
        }
        return {
            'data-toggle':"tooltip",
            'data-placement':"bottom"
        };
    }

    renderIcon() {
        if (this.props.loading) {
            return (
                <>
                    <span className="spinner-border spinner-border-sm" role="status"/>{'\u0020'}
                </>
            )
        }
        if (this.props.icon) {
            return (
                <>
                    <Icon icon={this.props.icon??''}/>{'\u0020'}
                </>
            )
        }
        return null;
    }
}
export default Button;