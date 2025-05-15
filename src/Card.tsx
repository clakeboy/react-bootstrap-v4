import React from 'react';
import classNames from 'classnames/bind';
import Title from './Title';
import './css/Card.less'
import Scroll from "./Scroll";
import common from "./Common";
import HScroll from "./HScroll";
import { ComponentProps, StrObject, Theme } from './components/common';

interface Props extends ComponentProps {
    header?: string | any
    border?: string
    custom?: boolean
    sm?: boolean
    scroll?: boolean
    divider?: boolean
    headClass?: string
    bodyClass?: string
}

export class Card extends React.PureComponent<Props,any> {
    static defaultProps = {
        border: 'transparent',
        scroll:false,
        sm:false,
        absolute:false,
        divider:true
    };

    domId:string

    constructor(props:any) {
        super(props);

        this.domId = 'card-'+common.RandomString(16);
        if (this.props.id) {
            this.domId = this.props.id;
        }
    }

    componentDidMount() {

    }

    getClasses() {
        let base = 'card ck-card';
        if (this.props.border) {
            base = classNames(base,`border border-${this.props.border}`);
        }
        if (this.props.divider) {
            base = classNames(base,'ck-card-divider');
        }
        //apply style
        if (this.props.theme !== undefined) {
            const themeStr:string = typeof this.props.theme === 'string'?this.props.theme:Theme[this.props.theme??0]
            base = classNames(base,'bg-'+themeStr);
        }
        return classNames(base,this.props.className);
    }

    getBodyClasses() {
        return classNames('card-body',this.props.bodyClass);
    }

    getStyle() {
        const def:StrObject = {};
        if (this.props.absolute) {
            def.left = this.props.x??'';
            def.top = this.props.y??'';
            def.position = 'absolute';
        }
        if (this.props.width) {
            def.width = this.props.width;
        }
        if (this.props.height) {
            def.height = this.props.height;
        }
        return def;
    }

    renderHeader() {
        if (!this.props.header) {
            return null;
        }
        if (this.props.custom) {
            return <Title text={this.props.header}/>
        }

        let base = 'card-header';
        if (this.props.sm) {
            base = classNames(base,'ck-card-sm');
        }
        base = classNames(base,this.props.headClass);
        return (
            <div className={base}>{this.props.header}</div>
        )
    }

    render() {
        return (
            <div className={this.getClasses()} style={this.getStyle()}>
                {this.renderHeader()}
                <div id={this.domId} className={this.getBodyClasses()}>
                    {this.props.children}
                </div>
                {this.props.scroll?
                    <>
                        <Scroll selector={`#${this.domId}`}/>
                        <HScroll selector={`#${this.domId}`}/>
                    </>
                    :null}
            </div>
        );
    }
}

export default Card;