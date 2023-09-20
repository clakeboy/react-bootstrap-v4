import React from 'react';
import classNames from 'classnames/bind';
import './css/Label.less';
import { ComponentProps, StrObject } from './components/common';

interface Props extends ComponentProps {
    text     ?: string
    color    ?: string
    backColor?: string
    sm       ?: boolean
    align?: string
}

interface State {
    text:string
}

export class Label extends React.PureComponent<Props,State> {

    constructor(props:any) {
        super(props);
        this.state = {
            text: this.props.text??''
        };
    }

    componentDidMount() {

    }

    static getDerivedStateFromProps(nextProps:Props, prevState:State):State|null {
        if (prevState.text !== nextProps.text) {
            return {
                text: nextProps.text??''
            };
        }

        return null
    }

    getClasses() {
        let base = 'ck-label';
        if (this.props.absolute) {
            base = classNames(base, 'position-absolute');
        }
        if (this.props.sm) {
            base = classNames(base, 'ck-label-sm');
        }
        return classNames(base, this.props.className);
    }

    getStyles() {
        const base:StrObject = {};
        if (this.props.width) {
            base.width = this.props.width;
            base.paddingLeft = '0';
            base.paddingRight = '0';
        }
        if (this.props.height) {
            base.height = this.props.height;
            base.paddingTop = '0';
            base.paddingBottom = '0';
        }
        if (this.props.absolute) {
            base.top  = this.props.y as string;
            base.left = this.props.x as string;
        }
        if (this.props.color) {
            base.color = this.props.color;
        }
        if (this.props.backColor) {
            base.backgroundColor = this.props.backColor;
        }
        if (this.props.align) {
            base.textAlign = this.props.align;
        }
        return base;
    }

    render() {
        return (
            <div className={this.getClasses()} style={this.getStyles()}>
                {this.state.text}
            </div>
        );
    }
}

export default Label;