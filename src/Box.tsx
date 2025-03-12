import React from 'react';
import classNames from 'classnames/bind';

interface Props extends React.HTMLProps<any> {
    absolute: boolean
    x: string
    y: string
    width: string
    height: string
    borderWidth: string
    borderColor: string
    backColor: string
}

interface State {
    content: any
    show: boolean
    autoHide: number
    width: string
    theme: string
    isClose: boolean
}

export class Box extends React.PureComponent<Props, State> {
    constructor(props:any) {
        super(props);
    }

    componentDidMount() {

    }

    getClasses() {
        const base = 'ck-box';

        return classNames(base, this.props.className);
    }

    getStyles() {
        const base: {[propName:string]:string} = {
            borderColor: '#c3c3c3'
        };

        if (this.props.width) {
            base.width = this.props.width;
        }

        if (this.props.height) {
            base.height = this.props.height;
        }

        if (this.props.absolute) {
            base.position = 'absolute';
            base.left = this.props.x;
            base.top = this.props.y;
        }

        if (this.props.borderWidth) {
            base.borderStyle = 'solid';
            base.borderWidth = this.props.borderWidth;
        }

        if (this.props.borderColor) {
            base.borderColor = this.props.borderColor;
        }

        if (this.props.backColor) {
            base.backgroundColor = this.props.backColor;
        }

        return base;
    }

    render() {
        return (
            <div className={this.getClasses()} style={this.getStyles()}>
                {this.props.children}
            </div>
        );
    }
}

export default Box;