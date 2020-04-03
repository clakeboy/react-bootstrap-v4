/**
 * Created by clakeboy on 2018/6/28.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import '../css/TreeMenu.less';
import $ from 'jquery';
import {
    Icon, Scroll,Common
} from '../../src';

class TreeMenu extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state =  {
            data: this.props.data
        };

        this.domId = 'tree-menu-'+Common.RandomString(16);
    }

    componentDidMount() {

    }

    getClasses() {
        let base = 'ck-tree-menu';

        return classNames(base,this.props.className);
    }

    openHandler = (e)=>{
        e.currentTarget.classList.toggle('open');
        // e.currentTarget.parentNode.querySelector('.sub-menu').classList.toggle('show');
        $(e.currentTarget.parentNode.querySelector('.sub-menu')).slideToggle(200);
    };

    clickHandler(item) {
        return (e)=>{
            if (typeof this.props.onClick === 'function') {
                this.props.onClick(item);
            }
            let active = this.main_dom.querySelectorAll('.active');
            if (active) {
                active.forEach((item)=>{
                    item.classList.remove('active');
                });
            }
            let li = e.currentTarget.parentNode;
            li.classList.add('active');
            if (li.parentNode.classList.contains('sub-menu')) {
                li.parentNode.parentNode.classList.add('active');
            }
        }
    }

    render() {
        return (
            <React.Fragment>
            <div id={this.domId} className={this.getClasses()}>
                <ul className='ck-tree-menu-elm' ref={c=>this.main_dom=c}>
                    {this.state.data.map((item)=>{
                        if (item.step==='1') {
                            return <li className='divider'>{item.menu_text}</li>
                        }
                        if (item.sub_menus) {
                            return (
                                <li className='parent'>
                                    <a className='fas' href='javascript://' onClick={this.openHandler}>
                                        <Icon className='icon' icon={item.menu_icon}/>
                                        <span>{item.menu_text}</span>
                                    </a>
                                    <ul className="sub-menu">
                                        {item.sub_menus.map((child)=>{
                                            return (
                                                <li><a href="javascript://" onClick={this.clickHandler(child)}>{child.menu_text}</a></li>
                                            )
                                        })}
                                    </ul>
                                </li>
                            )
                        } else {
                            return (
                                <li>
                                    <a className='fas' href='javascript://' onClick={this.clickHandler(item)}>
                                        <Icon className='icon' icon={item.menu_icon}/>
                                        <span>{item.menu_text}</span>
                                    </a>
                                </li>
                            )
                        }
                    })}
                    {/*<li className='divider'>主页面</li>*/}
                    {/*<li className='active'>*/}
                        {/*<a href='#'>*/}
                            {/*<Icon className='icon' icon='home'/>*/}
                            {/*<span>首页</span>*/}
                        {/*</a>*/}
                    {/*</li>*/}
                    {/*<li className='parent'>*/}
                        {/*<a href='#' onClick={this.openHandler}>*/}
                            {/*<Icon className='icon' icon='address-card'/>*/}
                            {/*<span>这是个连接</span>*/}
                        {/*</a>*/}
                        {/*<ul className="sub-menu">*/}
                            {/*<li><a href="#">Flot</a>*/}
                            {/*</li>*/}
                            {/*<li className='active'><a href="#">中文大小</a>*/}
                            {/*</li>*/}
                            {/*<li><a href="#">Chart.js</a>*/}
                            {/*</li>*/}
                            {/*<li><a href="#">Morris.js</a>*/}
                            {/*</li>*/}
                        {/*</ul>*/}
                    {/*</li>*/}
                    {/*<li className='parent'>*/}
                        {/*<a href='#' onClick={this.openHandler}>*/}
                            {/*<Icon className='icon' icon='address-card'/>*/}
                            {/*<span>这是个连接2</span>*/}
                        {/*</a>*/}
                        {/*<ul className="sub-menu">*/}
                            {/*<li><a href="#">Flot</a>*/}
                            {/*</li>*/}
                            {/*<li><a href="#">Sparklines</a>*/}
                            {/*</li>*/}
                            {/*<li><a href="#">Chart.js</a>*/}
                            {/*</li>*/}
                            {/*<li><a href="#">Morris.js</a>*/}
                            {/*</li>*/}
                        {/*</ul>*/}
                    {/*</li>*/}
                </ul>
            </div>
            <Scroll selector={`#${this.domId}`}/>
            </React.Fragment>
        );
    }
}

TreeMenu.propTypes = {
    onClick: PropTypes.func,
    data: PropTypes.array
};

TreeMenu.defaultProps = {

};

export default TreeMenu;