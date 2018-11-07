import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import {GetDomXY} from "./Common";
import Icon from './Icon';
import './css/Menu.less';

class Menu extends React.PureComponent {
    constructor(props) {
        super(props);
        this.childMenus = [];
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    clickHandler = (e,key)=>{
        if (typeof this.props.onClick === 'function') {
            this.props.onClick(key,this.data);
        }
        this.hide();
    };

    show(option) {
        this.data = option.data || '';
        this.mainDom.classList.remove('d-none');
        this.position(option);
        window.addEventListener("mousedown",this.hide,false);
    }

    position(option) {
        this.height = this.mainDom.clientHeight;
        this.width = this.mainDom.clientWidth;
        if (option.type === 'mouse') {
            this.mainDom.style.top = option.evt.pageY+'px';
            this.mainDom.style.left = option.evt.pageX+'px';
        } else {
            let pos = GetDomXY(option.evt.currentTarget);
            switch (option.type) {
                case 'dom-top':
                    this.mainDom.style.top = (pos.top-this.height)+'px';
                    this.mainDom.style.left = pos.left+'px';
                    break;
                case 'dom-right':
                    this.mainDom.style.top = pos.top+'px';
                    this.mainDom.style.left = (pos.left+option.evt.currentTarget.clientWidth)+'px';
                    break;
                case 'dom-bottom':
                    this.mainDom.style.top = (pos.top+option.evt.currentTarget.clientHeight)+'px';
                    this.mainDom.style.left = pos.left+'px';
                    break;
                case 'dom-left':
                    this.mainDom.style.top = pos.top+'px';
                    this.mainDom.style.left = (pos.left-this.width)+'px';
                    break;
                default:
                    this.mainDom.style.top = pos.top+'px';
                    this.mainDom.style.left = (pos.left+option.evt.currentTarget.clientWidth)+'px';
            }
        }
    }

    hide = ()=>{
        this.mainDom.classList.add('d-none');
        window.removeEventListener("mousedown",this.hide);
    };

    closeChild() {
        this.childMenus.forEach((item)=>{
            if (typeof item.hide === 'function') {
                item.hide();
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
            <div ref={c=>this.mainDom = c} onMouseDown={(e)=>{e.preventDefault();e.stopPropagation();}} className={this.getClasses()} style={this.getStyles()}>
                {React.Children.map(this.props.children,(item)=>{
                    let props = item.props;
                    props.parent = this;
                    return React.cloneElement(item,{...props},item.props.children)
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
            this.parent.hide();
        } else {
            this.parent.clickHandler(e,this.props.field);
        }
    };

    showChildHandler = (e)=>{
        this.childMenu.show({evt:e,type:'dom',data:this.parent.data});
    };

    closeChildHandler = (e)=>{
        this.parent.closeChild();
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
                        <Icon icon='caret-right'/>
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