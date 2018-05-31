import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import common from "./Common";

import './css/Tabs.less';

class Tabs extends React.PureComponent {
    constructor(props) {
        super(props);

        this.domId = common.RandomString(16);
        if (this.props.id) {
            this.domId = this.props.id;
        }
    }

    componentDidMount() {

    }

    getClasses() {
        let base = 'nav';
        if (this.props.pills) {
            base = classNames(base,'nav-pills');
        } else {
            base = classNames(base,'nav-tabs');
        }
        return classNames(base);
    }

    renderTabs() {
        return (
            <ul className={this.getClasses()} id={`${this.domId}`} role="tablist">
                {React.Children.map(this.props.children,(item)=>{
                    let class_name = 'nav-link';
                    if (item.props.active) {
                        class_name = classNames(class_name,'active');
                    }
                    return (
                        <li className="nav-item">
                            <a className={class_name} id={`${item.props.id}-tab`} href={`#${item.props.id}`}
                               data-toggle="tab" role="tab" aria-controls={item.props.id} aria-selected={this.props.active?'true':'false'}>
                                {item.props.text}
                            </a>
                        </li>
                    )
                })}
            </ul>
        )
    }

    renderContents() {
        let base = 'tab-content ck-tabs-content';
        if (this.props.border) {
            base = classNames(base,'ck-tabs-border');
        }
        return (
            <div className={base} id={`${this.domId}Content`}>
                {React.Children.map(this.props.children,(item)=>{
                    let class_name = 'tab-pane';
                    if (item.props.fade) {
                        class_name = classNames(class_name,'fade');
                    }
                    if (item.props.active) {
                        class_name = classNames(class_name,'show','active');
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
            <div {...this.props}>
                {this.renderTabs()}
                {this.renderContents()}
            </div>
        );
    }
}

Tabs.propTypes = {
    pills: PropTypes.bool,
    border: PropTypes.bool,
};

Tabs.defaultProps = {
    border: true
};

export default Tabs;