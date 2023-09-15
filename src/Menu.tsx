import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { GetDomXY } from "./Common";
import Icon from './Icon';
import './css/Menu.less';
import common from "./Common";
import { ComponentProps, StrObject } from './components/common';

interface MenuItemProps extends ComponentProps {
    step?: boolean
    field: string
    onClick?: (e: any, field: string, data?: any) => void
    child?: boolean
    text?: string
    icon?: string
    parent?: Menu
}

export class MenuItem extends React.PureComponent<MenuItemProps, any> {
    static propTypes = {
        step: PropTypes.bool,
        field: PropTypes.string,
        onClick: PropTypes.func,
        child: PropTypes.bool,
        text: PropTypes.string,
        icon: PropTypes.string,
    };
    parent: Menu
    childMenu: Menu
    constructor(props: any) {
        super(props);
        this.parent = this.props.parent??new Menu(props);
    }

    componentDidMount() {

    }

    clickHandler = (e: React.MouseEvent) => {
        if (typeof this.props.onClick === "function") {
            this.props.onClick(e, this.props.field, this.parent.data);
            this.parent.hide(e);
        }
        this.parent.clickHandler(e, this.props.field);
    };

    showChildHandler = (e: any) => {
        this.parent.closeChild(e);
        this.childMenu.show({ evt: e, type: 'dom', data: this.parent.data });
    };

    closeChildHandler = (e:React.MouseEvent) => {
        this.parent.closeChild(e);
    };

    getClasses() {
        const base = 'ck-menu-item d-flex align-items-center';

        return classNames(base, this.props.className);
    }

    render() {
        if (this.props.step) {
            return <hr />
        }

        if (this.props.child) {
            return this.renderChildMenu();
        }

        return <div className={this.getClasses()}
            onMouseDown={this.clickHandler}
            onMouseOver={this.closeChildHandler}>
            {this.props.icon && this.renderIcon()}
            {this.props.children}
        </div>
    }

    renderIcon() {
        return (
            <span className='text-center' style={{ width: '20px' }}>
                <Icon icon={this.props.icon} />
            </span>
        )
    }

    renderChildMenu() {
        const zIndex = this.parent.props.zIndex ?? 0
        return (
            <>
                <div className={this.getClasses()}
                    onMouseDown={this.showChildHandler}
                    onMouseOver={this.showChildHandler}>
                    <span>{this.props.text}</span>
                    <span className='ml-auto'>
                        &nbsp;&nbsp;<Icon icon='caret-right' />
                    </span>
                </div>
                <Menu ref={(c:any) => { 
                    this.childMenu = c; 
                    this.parent.childMenus.push(c) 
                }} zIndex={zIndex + 1} onClick={(key) => {
                    this.parent.clickHandler(key);
                }}>
                    {this.props.children}
                </Menu>
            </>
        )
    }
}

interface MenuProps extends ComponentProps {
    onClick?: (field: any, data?: any) => void
    onClose?: (e:any) => void
    onShow?: () => void
    zIndex?: number
}

interface State {
    menu_list: any[]
}

export class Menu extends React.PureComponent<MenuProps, State> {
    static Item = MenuItem;
    static propTypes = {
        onClick: PropTypes.func,
        onClose: PropTypes.func,
        onShow: PropTypes.func,
        zIndex: PropTypes.number,
        width: PropTypes.string
    };
    static defaultProps = {
        zIndex: 1200
    };

    domId: string
    data: any
    childMenus: any[]
    evt_close?: (e: any) => void
    mainDom: HTMLDivElement
    height: number
    width: number
    constructor(props: any) {
        super(props);
        this.childMenus = [];
        this.domId = 'menu-' + common.RandomString(16);

        this.evt_close = this.props.onClose;
        this.state = {
            menu_list: this.initMenuData()
        }
    }

    initMenuData() {
        const data: any[] = []
        React.Children.map(this.props.children, (item: any) => {
            if (item && item.type === MenuItem) {
                const props = Object.assign(item.props, { parent: this })
                data.push({ ...props })
            }
        })
        return data
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        window.removeEventListener("mousedown", this.hide);
    }

    clickHandler = (e: any, key?: any) => {
        if (typeof this.props.onClick === 'function') {
            this.props.onClick(key, this.data);
        }
        this.hide(e);
    };

    show(option: any) {
        if (option?.menu_list) {
            option.evt = Object.assign({}, option.evt)
            this.setState({
                menu_list: option.menu_list
            }, () => {
                this.showHandler(option)
            })
        } else {
            this.showHandler(option)
        }
    }

    showHandler(option: any) {
        this.data = option.data ?? '';
        this.evt_close = option.close ?? null;
        this.mainDom.classList.remove('d-none');
        this.position(option);
        window.addEventListener("mousedown", this.hide, false);
    }

    position(option: any) {
        this.height = this.mainDom.clientHeight;
        this.width = this.mainDom.clientWidth;
        if (option.type === 'mouse') {
            const fixPosition = this.fixPositionScreen(option.evt.pageX, option.evt.pageY);
            this.mainDom.style.top = fixPosition.y + 'px';
            this.mainDom.style.left = fixPosition.x + 'px';
        } else {
            const pos = GetDomXY(option.evt.currentTarget);
            let fixPos;
            switch (option.type) {
                case 'dom-top':
                    fixPos = {
                        x: pos.left,
                        y: (pos.top - this.height)
                    };
                    break;
                case 'dom-bottom':
                    fixPos = {
                        x: pos.left,
                        y: (pos.top + option.evt.currentTarget.clientHeight)
                    };
                    break;
                case 'dom-left':
                    fixPos = {
                        x: (pos.left - this.width),
                        y: pos.top
                    };
                    break;
                case 'dom-right':
                default:
                    fixPos = this.fixPositionScreen(
                        pos.left + option.evt.currentTarget.clientWidth,
                        pos.top,
                        -option.evt.currentTarget.clientWidth,
                        option.evt.currentTarget.clientHeight);

            }
            this.mainDom.style.top = fixPos.y + 'px';
            this.mainDom.style.left = fixPos.x + 'px';
        }
    }

    fixPositionScreen(x: number, y: number, offx = 0, offy = 0) {
        let fx = x, fy = y;
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
        return { x: fx, y: fy }
    }

    hide = (e: any) => {
        this.mainDom.classList.add('d-none');
        window.removeEventListener("mousedown", this.hide);
        if (typeof this.evt_close === 'function') {
            this.evt_close(e);
        }
    };

    closeChild(e:any) {
        this.childMenus.forEach((item) => {
            if (item && typeof item.hide === 'function') {
                item.hide(e);
                item.closeChild(e);
            }
        })
    }

    getClasses() {
        const base = 'ck-menu border shadow d-none';

        return classNames(base, this.props.className);
    }

    getStyles() {
        const base: StrObject = {
            zIndex: this.props.zIndex?.toString()??''
        };

        if (this.props.width) {
            base.width = this.props.width;
        }

        return base;
    }

    render() {
        const content = (
            <div onContextMenu={(e) => {
                e.stopPropagation()
            }} id={this.domId} ref={(c: any) => this.mainDom = c} onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }} className={this.getClasses()} style={this.getStyles()}>
                {/*{React.Children.map(this.props.children,(item)=>{*/}
                {/*    if (item) {*/}
                {/*        item.props.parent = this;*/}
                {/*        return React.cloneElement(item,item.props)*/}
                {/*    }*/}
                {/*})}*/}
                {this.state.menu_list.map((item) => {
                    return <MenuItem key={undefined} parent={this} {...item} />
                })}
            </div>
        );

        return ReactDOM.createPortal(
            content, document.body
        );
    }
}

export default Menu;