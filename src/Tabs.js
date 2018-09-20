import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import common from "./Common";
import $ from 'jquery';
import './css/Tabs.less';

class Tabs extends React.PureComponent {
    constructor(props) {
        super(props);

        this.domId = 'tabs-'+common.RandomString(16);
        if (this.props.id) {
            this.domId = this.props.id;
        }
    }

    componentDidMount() {
        $('#' + this.domId).on('show.bs.tab', this.selectHandler);
    }

    selectHandler = (e) => {
        if (typeof this.props.onSelect === 'function') {
            this.props.onSelect(e.target.dataset.tabid, e.relatedTarget.dataset.tabid);
        }
    };

    getMainClasses() {
        let base = 'ck-tabs';

        if (this.props.sm) {
            base = classNames(base, 'ck-tabs-sm');
        }

        return classNames(base, this.props.className);
    }

    getClasses() {
        let base = 'nav';
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
        }

        return common.extend(base, this.props.style)
    }

    renderTabs() {
        return (
            <ul className={this.getClasses()} id={`${this.domId}`} role="tablist">
                {React.Children.map(this.props.children, (item) => {
                    let class_name = 'nav-link';
                    if (item.props.active) {
                        class_name = classNames(class_name, 'active');
                    }
                    return (
                        <li className="nav-item">
                            <a className={class_name} id={`${item.props.id}-tab`} href={`#${item.props.id}`}
                               data-tabid={item.props.id} data-toggle="tab" role="tab" aria-controls={item.props.id} aria-selected={this.props.active ? 'true' : 'false'}>
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
            <div className={base} id={`${this.domId}Content`} style={style}>
                {React.Children.map(this.props.children, (item) => {
                    let class_name = 'tab-pane';
                    if (item.props.fade) {
                        class_name = classNames(class_name, 'fade');
                    }
                    if (item.props.active) {
                        class_name = classNames(class_name, 'show', 'active');
                    }
                    return (
                        <div className={class_name} id={item.props.id} role="tabpanel" aria-labelledby={`${item.props.id}-tab`}>
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
    sm      : PropTypes.bool
};

Tabs.defaultProps = {
    border : true,
    content: true
};

export default Tabs;