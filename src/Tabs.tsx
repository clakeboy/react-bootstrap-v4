import React from 'react';
import classNames from 'classnames/bind';
import common from "./Common";
import './css/Tabs.less';
import Icon from "./Icon";
import { ComponentProps, StrObject } from './components/common';

interface Props extends ComponentProps {
    pills   ?: boolean
    border  ?: boolean
    content ?: boolean
    onSelect?: (tab:string)=>void
    showTab ?: string
    position?: any
    onClose?: (tab:string,idx:number)=>void
    sm?: boolean
}

interface State {
    currentShow:string
    disabled:boolean
}

export class Tabs extends React.PureComponent<Props,State> {
    static defaultProps = {
        border  : true,
        content : true,
        showTab : '',
        disabled: false
    };

    domId:string
    constructor(props:any) {
        super(props);

        this.state = {
            currentShow: this.props.showTab??'',
            disabled:this.props.disabled??false,
        };

        this.domId = 'tabs-' + common.RandomString(16);
        if (this.props.id) {
            this.domId = this.props.id;
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps:Props) {
        const stateData:any = {};
        if (nextProps.showTab) {
            stateData.currentShow = nextProps.showTab;
        }

        if (nextProps.disabled !== undefined) {
            stateData.disabled = nextProps.disabled;
        }

        this.setState(stateData);
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     if (this.state.currentShow !== nextState.currentShow) {
    //         return true;
    //     }
    //     return this.state.disabled !== nextState.disabled
    // }

    selectHandler = (e:React.MouseEvent) => {
        this.setState({
            currentShow: (e.currentTarget as HTMLElement).dataset.tabid ?? ''
        }, () => {
            if (typeof this.props.onSelect === 'function') {
                this.props.onSelect(this.state.currentShow);
            }
        });
    };

    setSelect(tab_id:string) {
        this.setState({
            currentShow: tab_id
        });
    }

    getMainClasses() {
        let base = 'ck-tabs';

        if (this.props.sm) {
            base = classNames(base, 'ck-tabs-sm');
        }

        return classNames(base, this.props.className);
    }

    getClasses() {
        let base = 'nav ck-tabs-header';
        if (this.props.pills) {
            base = classNames(base, 'nav-pills');
        } else {
            base = classNames(base, 'nav-tabs');
        }
        return classNames(base);
    }

    getStyle() {
        //default style
        const base:StrObject = {};
        //width
        if (this.props.width) {
            base.width = this.props.width;
        }
        //height
        if (this.props.height) {
            base.height = this.props.height;
        }

        if (this.props.absolute) {
            base.position = 'absolute';
            base.top      = this.props.y ?? '';
            base.left     = this.props.x ?? '';
            if (typeof this.props.position === 'object') {
                base.top    = this.props.position.top || this.props.y;
                base.left   = this.props.position.left || this.props.x;
                base.right  = this.props.position.right || 'unset';
                base.bottom = this.props.position.bottom || 'unset';
                if (this.props.position.left && this.props.position.right) {
                    base.width = 'unset';
                }
                if (this.props.position.top && this.props.position.bottom) {
                    base.height = 'unset';
                }
            }
        }

        return common.extend(base, this.props.style)
    }

    renderTabs() {
        return (
            <ul className={this.getClasses()} id={`${this.domId}`}>
                {React.Children.map(this.props.children, (item, index) => {
                    let class_name = 'nav-link';
                    if (!this.state.currentShow && index === 0) {
                        // this.state.currentShow = item.props.id as string;
                        class_name = classNames(class_name, 'active');
                    } else if (this.state.currentShow === item.props.id) {
                        class_name = classNames(class_name, 'active');
                    }

                    if (item.props.disabled || this.props.disabled) {
                        class_name = classNames(class_name, 'disabled');
                    }
                    let clickEvt = undefined;

                    if (!item.props.disabled) {
                        if (typeof item.props.onClick === 'function') {
                            clickEvt = (e:React.MouseEvent) => {
                                item.props.onClick((e.currentTarget as HTMLElement).dataset.tabid);
                            }
                        } else {
                            clickEvt = this.selectHandler;
                        }
                    }
                    const is_close = typeof this.props.onClose === 'function';
                    return (
                        <li className="nav-item">
                            <a className={class_name} data-tabid={item.props.id} onClick={clickEvt}>
                                {is_close?<Icon className='me-2' icon='times-circle' onClick={(e)=>{
                                    e.stopPropagation();
                                    if (this.state.currentShow === item.props.id) {
                                        this.setState({
                                            currentShow: ''
                                        })
                                    }
                                    if (typeof this.props.onClose === 'function')
                                        this.props.onClose(item.props.id,index);
                                }}/>:null}
                                {item.props.text}
                            </a>
                        </li>
                    )
                })}
            </ul>
        )
    }

    renderContents() {
        if (!this.props.content) {
            return null;
        }
        let base = 'tab-content ck-tabs-content';
        if (this.props.border) {
            base = classNames(base, 'ck-tabs-border');
        }

        const style = {};
        // if (this.props.absolute && this.props.height) {
        //     style.marginTop = this.props.sm ? '-28px' : '-42px';
        // }
        return (
            <div className={base} id={`${this.domId}-content`} style={style}>
                {React.Children.map(this.props.children, (item, index) => {
                    let class_name = 'tab-pane';
                    if (item.props.fade) {
                        class_name = classNames(class_name, 'fade');
                    }
                    if (!this.state.currentShow && index === 0) {
                        class_name = classNames(class_name, 'show', 'active');
                    } else if (this.state.currentShow === item.props.id) {
                        class_name = classNames(class_name, 'show', 'active');
                    }
                    return (
                        <div className={class_name} id={item.props.id}>
                            {item.props.children}
                        </div>
                    )
                })}
            </div>
        )
    }

    render() {
        return (
            <div className={this.getMainClasses()} style={this.getStyle()}>
                {this.renderTabs()}
                {this.renderContents()}
            </div>
        );
    }
}


export default Tabs;