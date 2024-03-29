import React from 'react';
import classNames from 'classnames/bind';
import {GetDomXY} from "./Common";
import './css/Scroll.less';
import { ComponentProps } from './components/common';

interface Props extends ComponentProps {
    parent?: any
    selector?: string
    speed?: number
    align?: string
    onScroll?: (scrollTop:number)=>void
}

interface State {
    show: boolean
}

export class Scroll extends React.PureComponent<Props,State> {
    static defaultProps = {
        speed: 5,
        align: 'right',
    };
    wheelSpeed:number
    scrollProportion:number
    offsetTop:number
    isShow:boolean
    x:number
    y:number
    scrollX:number
    scrollY:number
    domLeft:number
    domXY:any
    parent?: HTMLElement
    parentDom: HTMLElement
    showDom?: HTMLElement
    dom:HTMLDivElement
    scrollDom:HTMLDivElement
    constructor(props:any) {
        super(props);
        this.parent = this.props.parent || undefined;
        //scroll speed
        this.wheelSpeed = (this.props.speed??1)/10;
        //scroll height to component height Proportion
        this.scrollProportion = 0;
        //scroll offset top
        this.offsetTop = 0;
        //display status
        this.isShow = false;
        //move xy
        this.x = 0;
        this.y = 0;
        this.scrollX = 0;
        this.scrollY = 0;
        //scroll top xy
        this.domXY = {};
        //
        this.state = {
            show: false
        };
    }

    componentDidMount() {
        this.initParentEvent();
    }

    componentWillUnmount() {
        if (this.parentDom) {
            this.parentDom.classList.remove('ck-scroll-over');
            this.parentDom.removeEventListener('wheel',this.scrollHandler);
            this.parentDom.removeEventListener('mouseover',this.showHandler);
            this.parentDom.removeEventListener('mouseout',this.hideHandler);
        }

        // this.dom.addEventListener("mousedown",this.beginDragHandler,false);
        this.dom.removeEventListener("wheel",this.scrollHandler);
    }

    initParentEvent() {
        if (this.parent) {
            this.parentDom = this.parent
        } else if (this.props.selector) {
            const dom = document.querySelector(this.props.selector)
            if (dom === null) {
                throw `can not found selector "${this.props.selector}"`
            }
            this.parentDom = dom as HTMLElement
        } else {
            this.parentDom = this.dom.parentNode as HTMLElement;
        }

        if (this.parentDom) {
            this.parentDom.classList.add('ck-scroll-over');
            this.parentDom.addEventListener('wheel',this.scrollHandler,{passive:false});
            this.parentDom.addEventListener('mouseover',this.showHandler,false);
            this.parentDom.addEventListener('mouseout',this.hideHandler,false);
        }

        // this.dom.addEventListener("mousedown",this.beginDragHandler,false);
        this.dom.addEventListener("wheel",this.scrollHandler,{passive:false});
    }

    getClasses() {
        const base = 'ck-scroll ck-scroll-v';

        return classNames(base,this.props.className);
    }

    showHandler = ()=>{
        this.scrollProportion = this.parentDom.offsetHeight/this.parentDom.scrollHeight;
        if (this.scrollProportion === 1) {
            this.isShow = false;
            this.dom.classList.add('d-none');
            return;
        }
        this.dom.classList.remove('d-none');
        this.scrollDom.style.height = (this.parentDom.offsetHeight*this.scrollProportion) + 'px';
        this.dom.style.top = this.parentDom.offsetTop+'px';
        this.dom.style.height = this.parentDom.offsetHeight+'px';
        this.scrollDom.style.top = (this.parentDom.scrollTop * this.scrollProportion) + 'px';
        this.dom.classList.add('ck-scroll-show');
        this.isShow = true;
        this.domXY = GetDomXY(this.dom);
    };

    hideHandler = ()=>{
        this.isShow = false;
        this.dom.classList.remove('ck-scroll-show');
    };

    scrollHandler = (e:WheelEvent)=>{
        if (e.deltaY !== 0) {
            e.preventDefault();
        }
        if (!this.isShow) {
            this.showHandler();
        }
        const scrollTop = this.parentDom.scrollTop+(e.deltaY * this.wheelSpeed);

        this.setScrollTop(scrollTop);
        if (typeof this.props.onScroll === 'function') {
            this.props.onScroll(scrollTop)
        }
    };

    scrollClickHandler = (e:React.MouseEvent)=>{
        this.setBarTop(e.pageY-this.domXY.top-this.scrollDom.clientHeight/2);
        // this.scrollX = parseInt(this.scrollDom.style.left);
        // this.scrollY = parseInt(this.scrollDom.style.top);
        // this.x = parseInt(e.pageX);
        // this.y = parseInt(e.pageY);
        this.beginDragHandler(e);
    };

    beginDragHandler = (e:React.MouseEvent)=>{
        e.stopPropagation();
        e.preventDefault();
        this.scrollY = parseInt(this.scrollDom.style.top);
        this.y = e.pageY;
        this.dom.classList.add('ck-scroll-scrolling-v');
        window.addEventListener('mousemove',this.moveDragHandler,false);
        window.addEventListener('mouseup',this.endDragHandler,false);
    };

    moveDragHandler = (e:MouseEvent)=>{
        this.setBarTop((e.pageY - this.y)+this.scrollY);
    };

    endDragHandler = ()=>{
        this.dom.classList.remove('ck-scroll-scrolling-v');
        window.removeEventListener('mousemove',this.moveDragHandler);
        window.removeEventListener('mouseup',this.endDragHandler);
    };

    setScrollTop(top:number) {
        this.parentDom.scrollTop = top;
        this.scrollDom.style.top = (this.parentDom.scrollTop * this.scrollProportion) + 'px';
    }

    setBarTop(top:number) {
        if (top < 0) {
            top = 0;
        } else if (top > this.dom.clientHeight-this.scrollDom.clientHeight) {
            top = this.dom.clientHeight-this.scrollDom.clientHeight;
        }
        this.scrollDom.style.top = top + 'px';
        this.parentDom.scrollTop = top/this.scrollProportion;
    }

    render() {

        return (
            <div ref={(c:any)=>this.dom=c} className={this.getClasses()} onMouseDown={this.scrollClickHandler}>
                <div ref={(c:any)=>this.scrollDom=c} className='ck-scroll-bar ck-scroll-bar-v' onMouseDown={this.beginDragHandler}/>
            </div>
        );
    }
}



export default Scroll;