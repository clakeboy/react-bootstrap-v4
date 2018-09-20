import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import {GetDomXY} from "./Common";
import Drag from './Drag';
import './css/Scroll.less';

class Scroll extends React.PureComponent {
    constructor(props) {
        super(props);
        this.parent = this.props.parent || null;
        //scroll speed
        this.wheelSpeed = this.props.speed/10;
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
    }

    componentDidMount() {
        this.initParentEvent();
    }

    initParentEvent() {
        if (this.parent) {
            this.parentDom = ReactDOM.findDOMNode(this.parent);
        } else {
            this.parentDom = document.querySelector(this.props.selector);
        }

        if (this.parentDom) {
            this.parentDom.classList.add('ck-scroll-over');
            this.parentDom.addEventListener('wheel',this.scrollHandler,false);
            this.parentDom.addEventListener('mouseover',this.showHandler,false);
            this.parentDom.addEventListener('mouseout',this.hideHandler,false);
        }

        this.dom.addEventListener("mousedown",this.beginDragHandler,false);
        this.dom.addEventListener("wheel",this.scrollHandler,false);
    }

    getClasses() {
        let base = 'ck-scroll';

        return classNames(base,this.props.className);
    }

    showHandler = (e)=>{
        this.scrollProportion = this.parentDom.offsetHeight/this.parentDom.scrollHeight;
        this.scrollDom.style.height = (this.parentDom.offsetHeight*this.scrollProportion) + 'px';
        this.dom.style.top = this.parentDom.offsetTop+'px';
        this.dom.style.height = this.parentDom.offsetHeight+'px';
        this.scrollDom.style.top = (this.parentDom.scrollTop * this.scrollProportion) + 'px';
        this.dom.classList.add('ck-scroll-show');
        this.isShow = true;
        this.domXY = GetDomXY(this.dom);
    };

    hideHandler = (e)=>{
        this.isShow = false;
        this.dom.classList.remove('ck-scroll-show');
    };

    scrollHandler = (e)=>{
        e.preventDefault();
        if (!this.isShow) {
            this.showHandler();
        }
        this.setScrollTop(this.parentDom.scrollTop+(e.deltaY * this.wheelSpeed));
    };

    scrollClickHandler = (e)=>{
        this.setBarTop(e.pageY-this.domXY.top-this.scrollDom.clientHeight/2);
        this.scrollX = parseInt(this.scrollDom.style.left);
        this.scrollY = parseInt(this.scrollDom.style.top);
        this.x = parseInt(e.pageX);
        this.y = parseInt(e.pageY);
    };

    beginDragHandler = (e)=>{
        this.dom.classList.add('ck-scroll-scrolling');
        window.addEventListener('mousemove',this.moveDragHandler,false);
        window.addEventListener('mouseup',this.endDragHandler,false);
    };

    moveDragHandler = (e)=>{
        this.setBarTop((parseInt(e.pageY) - this.y)+this.scrollY);
    };

    endDragHandler = (e)=>{
        this.dom.classList.remove('ck-scroll-scrolling');
        window.removeEventListener('mousemove',this.moveDragHandler);
        window.removeEventListener('mouseup',this.endDragHandler);
    };

    setScrollTop(top) {
        this.parentDom.scrollTop = top;
        this.scrollDom.style.top = (this.parentDom.scrollTop * this.scrollProportion) + 'px';
    }

    setBarTop(top) {
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
            <div ref={c=>this.dom=c} className={this.getClasses()} onMouseDown={this.scrollClickHandler}>
                <div ref={c=>this.scrollDom=c} className='ck-scroll-bar' onMouseDown={e=>e.stopPropagation()}/>
            </div>
        );
    }
}

Scroll.propTypes = {
    parent: PropTypes.any,
    selector: PropTypes.string,
    speed: PropTypes.number,
};

Scroll.defaultProps = {
    speed: 5
};

export default Scroll;