import React from 'react';
import PropTypes, {instanceOf} from 'prop-types';
import classNames from 'classnames/bind';
import ReactDOM from "react-dom";
import {GetDomXY,hasScrolledParent} from "./Common";

class HScroll extends React.PureComponent {
    constructor(props) {
        super(props);
        this.parent = this.props.parent || null;
        //scroll speed
        this.wheelSpeed = this.props.speed/10;
        //scroll height to component height Proportion
        this.scrollProportion = 0;
        //scroll offset left
        this.offsetLeft = 0;
        //display status
        this.isShow = false;
        //move xy
        this.x = 0;
        this.y = 0;
        this.scrollX = 0;
        this.scrollY = 0;
        //scroll top xy
        this.domXY = {};
        //offset dom body left
        this.domLeft = 0;
        //parent scroll dom
        this.alignParent = null;
    }

    componentDidMount() {
        this.initParentEvent();
    }

    componentWillUnmount() {
        if (this.parentDom) {
            this.parentDom.classList.remove('ck-scroll-over');
            if (!this.showDom) {
                this.parentDom.removeEventListener('wheel',this.scrollHandler);
                this.parentDom.removeEventListener('mouseenter',this.showHandler);
                this.parentDom.removeEventListener('mouseleave',this.hideHandler);
            }
        }

        if (this.showDom) {
            this.showDom.removeEventListener('wheel',this.scrollHandler);
            this.showDom.removeEventListener('mouseenter',this.showHandler);
            this.showDom.removeEventListener('mouseleave',this.hideHandler);
        }

        // this.dom.addEventListener("mousedown",this.beginDragHandler,false);
        this.dom.removeEventListener("wheel",this.scrollHandler);
        if (this.props.alignParent) {
            if (this.alignParent === document.documentElement) {
                document.removeEventListener('scroll',this.setPosition);
            } else {
                this.alignParent.removeEventListener('scroll',this.setPosition);
            }
        }
    }

    initParentEvent() {
        if (this.parent) {
            this.parentDom = ReactDOM.findDOMNode(this.parent);
        } else {
            this.parentDom = document.querySelector(this.props.selector);
        }

        if (this.props.showSelector) {
            this.showDom = document.querySelector(this.props.showSelector);
            this.showDom.addEventListener('wheel',this.scrollHandler,false);
            this.showDom.addEventListener('mouseenter',this.showHandler,false);
            this.showDom.addEventListener('mouseleave',this.hideHandler,false);
        }

        if (this.parentDom) {
            this.parentDom.classList.add('ck-scroll-over');
            if (!this.showDom) {
                this.parentDom.addEventListener('wheel',this.scrollHandler,false);
                this.parentDom.addEventListener('mouseenter',this.showHandler,false);
                this.parentDom.addEventListener('mouseleave',this.hideHandler,false);
            }
        }

        // this.dom.addEventListener("mousedown",this.beginDragHandler,false);
        this.dom.addEventListener("wheel",this.scrollHandler,false);

        if (this.props.alignParent) {
            this.initAlignParent();
        }
    }
    //align parent scroll bottom
    initAlignParent() {
        if (this.props.alignParent && this.alignParent) {
            if (this.alignParent === document.documentElement) {
                document.removeEventListener('scroll',this.setPosition);
            } else {
                this.alignParent.removeEventListener('scroll',this.setPosition);
            }
        }

        this.alignParent = hasScrolledParent(this.dom) ?? document.documentElement;
        if (this.alignParent === document.documentElement) {
            document.addEventListener('scroll',this.setPosition,false);
        } else {
            this.alignParent.addEventListener('scroll',this.setPosition,false);
        }
    }

    setPosition = (e) => {
        let scrollTop = this.alignParent.scrollTop;
        if (this.alignParent === document.documentElement) {
            scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
        }
        let clientHeight = this.alignParent.clientHeight;
        let bottom = this.parentDom.clientHeight + this.domXY.top - clientHeight - scrollTop;
        if (bottom < 0 || bottom >= this.parentDom.clientHeight) {
            this.dom.style.bottom = '0';
        } else {
            this.dom.style.bottom = bottom + 2 + 'px';
        }
    };

    getClasses() {
        let base = 'ck-scroll ck-scroll-h';

        return classNames(base,this.props.className);
    }

    showHandler = (e)=>{
        if (this.isShow) return false;
        this.scrollProportion = this.parentDom.offsetWidth/this.parentDom.scrollWidth;
        if (this.scrollProportion === 1) {
            return;
        }
        this.scrollDom.style.width = (this.parentDom.offsetWidth*this.scrollProportion) + 'px';
        // this.dom.style.top = this.parentDom.offsetTop+'px';
        this.dom.style.width = this.parentDom.offsetWidth+'px';
        this.scrollDom.style.left = (this.parentDom.scrollLeft * this.scrollProportion) + 'px';
        this.dom.classList.add('ck-scroll-show');
        this.isShow = true;

        this.domLeft = GetDomXY(this.dom).left;
        this.domXY = GetDomXY(this.dom.offsetParent,this.alignParent);
        if (this.props.alignParent) {
            this.setPosition();
        }
    };

    hideHandler = (e)=>{
        if (!this.isShow) return;
        this.isShow = false;
        this.dom.classList.remove('ck-scroll-show');
    };

    scrollHandler = (e)=>{
        if (e.deltaX !== 0) {
            e.preventDefault();
        }
        if (!this.isShow) {
            this.showHandler();
        }
        this.setScrollLeft(this.parentDom.scrollLeft+(e.deltaX * this.wheelSpeed));
    };

    scrollClickHandler = (e)=>{
        let bar_left = e.pageX-this.domXY.left-this.scrollDom.clientWidth/2;
        if (this.alignParent !== document.documentElement) {
            bar_left -= this.domLeft;
        }
        this.setBarLeft(bar_left);
        // this.scrollX = parseInt(this.scrollDom.style.left);
        // this.scrollY = parseInt(this.scrollDom.style.top);
        // this.x = parseInt(e.pageX);
        // this.y = parseInt(e.pageY);
        this.beginDragHandler(e);
    };

    beginDragHandler = (e)=>{
        e.stopPropagation();
        e.preventDefault();
        this.scrollX = parseInt(this.scrollDom.style.left);
        this.x = parseInt(e.pageX);
        this.dom.classList.add('ck-scroll-scrolling-h');
        window.addEventListener('mousemove',this.moveDragHandler,false);
        window.addEventListener('mouseup',this.endDragHandler,false);
    };

    moveDragHandler = (e)=>{
        this.setBarLeft((parseInt(e.pageX) - this.x)+this.scrollX);
    };

    endDragHandler = (e)=>{
        this.dom.classList.remove('ck-scroll-scrolling-h');
        window.removeEventListener('mousemove',this.moveDragHandler);
        window.removeEventListener('mouseup',this.endDragHandler);
    };

    setScrollLeft(left) {
        this.parentDom.scrollLeft = left;
        this.scrollDom.style.left = (this.parentDom.scrollLeft * this.scrollProportion) + 'px';
    }

    setBarLeft(left) {
        if (left < 0) {
            left = 0;
        } else if (left > this.dom.clientWidth-this.scrollDom.clientWidth) {
            left = this.dom.clientWidth-this.scrollDom.clientWidth;
        }
        this.scrollDom.style.left = left + 'px';
        this.parentDom.scrollLeft = left/this.scrollProportion;
    }

    render() {
        return (
            <div ref={c=>this.dom=c} className={this.getClasses()} onMouseDown={this.scrollClickHandler}>
                <div ref={c=>this.scrollDom=c} className='ck-scroll-bar ck-scroll-bar-h' onMouseDown={this.beginDragHandler}/>
            </div>
        );
    }
}

HScroll.propTypes = {
    parent: PropTypes.any,
    selector: PropTypes.string,
    showSelector: PropTypes.string,
    speed: PropTypes.number,
    align: PropTypes.oneOf(['top','bottom']),
    alignParent: PropTypes.bool,
};

HScroll.defaultProps = {
    speed: 5,
    align: 'bottom',
    alignParent: false,
};

export default HScroll;