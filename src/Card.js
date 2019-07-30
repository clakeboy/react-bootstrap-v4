import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Title from './Title';
import './css/Card.less'
import Scroll from "./Scroll";
import common from "./Common";
import HScroll from "./HScroll";

class Card extends React.PureComponent {
    constructor(props) {
        super(props);

        this.domId = 'card-'+common.RandomString(16);
        if (this.props.id) {
            this.domId = this.props.id;
        }
    }

    componentDidMount() {

    }

    getClasses() {
        let base = 'card ck-card';
        if (this.props.border) {
            base = classNames(base,`border border-${this.props.border}`);
        }
        if (this.props.divider) {
            base = classNames(base,'ck-card-divider');
        }
        return classNames(base,this.props.className);
    }

    getStyle() {
        let def = {};
        if (this.props.absolute) {
            def.left = this.props.x;
            def.top = this.props.y;
            def.position = 'absolute';
        }
        if (this.props.width) {
            def.width = this.props.width;
        }
        if (this.props.height) {
            def.height = this.props.height;
        }
        return def;
    }

    renderHeader() {
        if (!this.props.header) {
            return null;
        }
        if (this.props.custom) {
            return <Title text={this.props.header}/>
        }

        let base = 'card-header';
        if (this.props.sm) {
            base = classNames(base,'ck-card-sm');
        }
        return (
            <div className={base}>{this.props.header}</div>
        )
    }

    render() {
        return (
            <div {...this.props} className={this.getClasses()} style={this.getStyle()}>
                {this.renderHeader()}
                <div id={this.domId} className="card-body">
                    {this.props.children}
                </div>
                {this.props.scroll?
                    <>
                        <Scroll selector={`#${this.domId}`}/>
                        <HScroll selector={`#${this.domId}`}/>
                    </>
                    :null}
            </div>
        );
    }
}

Card.propTypes = {
    header: PropTypes.string,
    border: PropTypes.oneOf(['primary','secondary','success','danger','warning','info','light','dark','transparent']),
    custom: PropTypes.bool,
    absolute: PropTypes.bool,
    x: PropTypes.string,
    y: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    sm: PropTypes.bool,
    scroll: PropTypes.bool,
    divider: PropTypes.bool
};

Card.defaultProps = {
    border: 'transparent',
    scroll:false,
    sm:false,
    absolute:false,
    divider:true
};

export default Card;