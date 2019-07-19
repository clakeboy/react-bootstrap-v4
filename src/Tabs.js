import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import common from "./Common";
import './css/Tabs.less';
import Icon from "./Icon";

class Tabs extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            currentShow: this.props.showTab,
            disabled:this.props.disabled,
        };

        this.domId = 'tabs-' + common.RandomString(16);
        if (this.props.id) {
            this.domId = this.props.id;
        }
    }

    componentWillReceiveProps(nextProps) {
        let stateData = {};
        if (nextProps.showTab) {
            stateData.currentShow = nextProps.showTab;
        }

        if (typeof nextProps.disabled !== 'undefined') {
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

    selectHandler = (e) => {
        this.setState({
            currentShow: e.currentTarget.dataset.tabid
        }, () => {
            if (typeof this.props.onSelect === 'function') {
                this.props.onSelect(this.state.currentShow);
            }
        });
    };

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
        let base = {};
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
            base.top      = this.props.y;
            base.left     = this.props.x;
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
                        this.state.currentShow = item.props.id;
                        class_name = classNames(class_name, 'active');
                    } else if (this.state.currentShow === item.props.id) {
                        class_name = classNames(class_name, 'active');
                    }
                    if (typeof item.props.disabled === 'undefined') {
                        item.props.disabled = this.props.disabled;
                    }
                    if (item.props.disabled) {
                        class_name = classNames(class_name, 'disabled');
                    }
                    let clickEvt = null;

                    if (!item.props.disabled) {
                        if (typeof item.props.onClick === 'function') {
                            clickEvt = (e) => {
                                item.props.onClick(e.currentTarget.dataset.tabid);
                            }
                        } else {
                            clickEvt = this.selectHandler;
                        }
                    }
                    let is_close = typeof this.props.onClose === 'function';
                    return (
                        <li className="nav-item">
                            <a className={class_name} data-tabid={item.props.id} onClick={clickEvt}>
                                {is_close?<Icon className='mr-2' icon='times-circle' onClick={(e)=>{
                                    e.stopPropagation();
                                    if (this.state.currentShow === item.props.id) {
                                        this.state.currentShow = null;
                                    }
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

        let style = {};
        if (this.props.absolute && this.props.height) {
            style.marginTop = this.props.sm ? '-28px' : '-42px';
        }
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
            <div {...this.props} className={this.getMainClasses()} style={this.getStyle()}>
                {this.renderTabs()}
                {this.renderContents()}
            </div>
        );
    }
}

Tabs.propTypes = {
    pills   : PropTypes.bool,
    border  : PropTypes.bool,
    content : PropTypes.bool,
    onSelect: PropTypes.func,
    absolute: PropTypes.bool,
    x       : PropTypes.string,
    y       : PropTypes.string,
    width   : PropTypes.string,
    height  : PropTypes.string,
    sm      : PropTypes.bool,
    showTab : PropTypes.string,
    position: PropTypes.object,
    disabled: PropTypes.bool,
    onClose: PropTypes.func
};

Tabs.defaultProps = {
    border  : true,
    content : true,
    showTab : '',
    disabled: false
};

export default Tabs;