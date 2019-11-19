import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import {GetDomXY} from "./Common";
import Icon from './Icon';
import './css/Menu.less';
import common from "./Common";

class Menu extends React.PureComponent {
    constructor(props) {
        super(props);
        this.childMenus = [];
        this.domId = 'menu-' + common.RandomString(16);

        this.evt_close = this.props.onClose;
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        window.removeEventListener("mousedown",this.hide);
    }

    clickHandler = (e,key)=>{
        if (typeof this.props.onClick === 'function') {
            this.props.onClick(key,this.data);
        }
        this.hide(e);
    };

    show(option) {
        this.data = option.data || '';
        this.mainDom.classList.remove('d-none');
        this.evt_close = option.close || null;
        this.position(option);
        window.addEventListener("mousedown",this.hide,false);
    }

    position(option) {
        this.height = this.mainDom.clientHeight;
        this.width = this.mainDom.clientWidth;
        if (option.type === 'mouse') {
            let fixPosition = this.fixPositionScreen(option.evt.pageX,option.evt.pageY);

            this.mainDom.style.top = fixPosition.y + 'px';
            this.mainDom.style.left = fixPosition.x + 'px';
        } else {
            let pos = GetDomXY(option.evt.currentTarget);
            let fixPos;
            switch (option.type) {
                case 'dom-top':
                    fixPos = {
                        x:pos.left,
                        y:(pos.top-this.height)
                    };
                    break;
                case 'dom-bottom':
                    fixPos = {
                        x:pos.left,
                        y:(pos.top+option.evt.currentTarget.clientHeight)
                    };
                    break;
                case 'dom-left':
                    fixPos = {
                        x:(pos.left-this.width),
                        y:pos.top
                    };
                    break;
                case 'dom-right':
                default:
                    fixPos = this.fixPositionScreen(
                        pos.left+option.evt.currentTarget.clientWidth,
                        pos.top,
                        -option.evt.currentTarget.clientWidth,
                        option.evt.currentTarget.clientHeight);

            }
            this.mainDom.style.top = fixPos.y + 'px';
            this.mainDom.style.left = fixPos.x + 'px';
        }
    }

    fixPositionScreen(x,y,offx=0,offy=0) {
        let fx=x,fy=y;
        if (y + this.mainDom.clientHeight >
            document.documentElement.scrollTop + document.documentElement.clientHeight) {
            fy = fy - this.mainDom.clientHeight + offy;
            if (fy < 0) fy = 0;
        }

        if (x + this.mainDom.clientWidth >
            document.documentElement.scrollLeft + document.documentElement.clientWidth) {
            fx = fx - this.mainDom.clientWidth + offx;
            if (fx < 0) fx = 0;
        }
        return {x:fx,y:fy}
    }

    hide = (e)=>{
        this.mainDom.classList.add('d-none');
        window.removeEventListener("mousedown",this.hide);
        if (typeof this.evt_close === 'function') {
            this.evt_close(e);
        }
    };

    closeChild(e) {
        this.childMenus.forEach((item)=>{
            if (item && typeof item.hide === 'function') {
                item.hide(e);
                item.closeChild(e);
            }
        })
    }

    getClasses() {
        let base = 'ck-menu border shadow d-none';

        return classNames(base,this.props.className);
    }

    getStyles() {
        let base = {
            zIndex:this.props.zIndex
        };

        if (this.props.width) {
            base.width = this.props.width;
        }

        return base;
    }

    render() {
        let content = (
            <div onContextMenu={(e)=>{
                e.stopPropagation()
            }} id={this.domId} ref={c=>this.mainDom = c} onMouseDown={(e)=>{e.preventDefault();e.stopPropagation();}} className={this.getClasses()} style={this.getStyles()}>
                {React.Children.map(this.props.children,(item)=>{
                    if (item) {
                        item.props.parent = this;
                        return React.cloneElement(item,item.props)
                    }
                })}
                {/*{this.props.children}*/}
            </div>
        );

        return ReactDOM.createPortal(
            content,document.body
        );
    }
}

Menu.propTypes = {
    onClick: PropTypes.func,
    onClose: PropTypes.func,
    onShow: PropTypes.func,
    zIndex: PropTypes.number,
    width: PropTypes.string
};

Menu.defaultProps = {
    zIndex:1200
};

class MenuItem extends React.PureComponent {
    constructor(props) {
        super(props);
        this.parent = this.props.parent;
    }

    componentDidMount() {

    }

    clickHandler = (e)=>{
        if (typeof this.props.onClick === "function") {
            this.props.onClick(e,this.props.field,this.parent.data);
            this.parent.hide(e);
        }
        this.parent.clickHandler(e,this.props.field);
    };

    showChildHandler = (e)=>{
        this.parent.closeChild(e);
        this.childMenu.show({evt:e,type:'dom',data:this.parent.data});
    };

    closeChildHandler = (e)=>{
        this.parent.closeChild(e);
    };

    getClasses() {
        let base = 'ck-menu-item d-flex align-items-center';

        return classNames(base,this.props.className);
    }

    render() {
        if (this.props.step) {
            return <hr/>
        }

        if (this.props.child) {
            return this.renderChildMenu();
        }

        return <div className={this.getClasses()}
                    onMouseDown={this.clickHandler}
                    onMouseOver={this.closeChildHandler}>
            {this.props.children}
        </div>
    }

    renderChildMenu() {
        return (
            <React.Fragment>
                <div className={this.getClasses()}
                     onMouseDown={this.showChildHandler}
                     onMouseOver={this.showChildHandler}>
                    <span>{this.props.text}</span>
                    <span className='ml-auto'>
                        &nbsp;&nbsp;<Icon icon='caret-right'/>
                    </span>
                </div>
                <Menu ref={c=>{this.childMenu=c;this.parent.childMenus.push(c)}} zIndex={this.parent.props.zIndex+1} onClick={(key)=>{
                    this.parent.clickHandler(key);
                }}>
                    {this.props.children}
                </Menu>
            </React.Fragment>
        )
    }
}

MenuItem.propTypes = {
    step: PropTypes.bool,
    field: PropTypes.string,
    onClick: PropTypes.func,
    child: PropTypes.bool,
    text: PropTypes.string
};

MenuItem.defaultProps = {

};

Menu.Item = MenuItem;

export default Menu;