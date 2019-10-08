import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Icon from './Icon';
import './css/Button.less';

class Button extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    getClasses() {
        let base = 'btn';
        let base_style = ['btn'];
        //is outline theme
        if (this.props.outline) {
            base_style.push('outline');
        }
        //apply style
        base_style.push(this.props.theme);
        //merge class
        base = classNames(base,base_style.join('-'));

        //size
        if (this.props.size !== 'df') {
            if (this.props.size ==='xs') {
                base = classNames(base,"ck-btn-xs");
            } else {
                base = classNames(base,"btn-"+this.props.size);
            }
        }

        //block
        if (this.props.block) {
            base = classNames(base,'btn-block');
        }

        return classNames(base,this.props.className);
    }

    getStyles() {
        let base = {};
        if (this.props.width) {
            base.width = this.props.width;
        }

        if (this.props.height) {
            base.height = this.props.height;
        }

        if (this.props.absolute) {
            base.position = 'absolute';
            base.left     = this.props.x;
            base.top      = this.props.y;
        }

        return base;
    }

    clickHandler = (e) => {
        if (this.props.onClick) {
            this.props.onClick(e)
        }
    };

    render() {
        return (
            <button {...this.props} disabled={this.props.disabled} onClick={this.clickHandler} className={this.getClasses()} style={this.getStyles()}>
                {this.renderIcon()}{this.props.children}
            </button>
        );
    }

    renderIcon() {
        if (this.props.loading) {
            return (
                <>
                    <span className="spinner-border spinner-border-sm" role="status"/>{'\u0020'}
                </>
            )
        }
        if (this.props.icon) {
            return (
                <React.Fragment>
                    <Icon icon={this.props.icon}/>{'\u0020'}
                </React.Fragment>
            )
        }
        return null;
    }
}

Button.propTypes = {
    theme: PropTypes.oneOf(['primary','secondary','success','danger','warning','info','light','dark','link']),
    outline: PropTypes.bool,
    size: PropTypes.oneOf(['df','sm','lg','xs']),
    onClick: PropTypes.func,
    icon: PropTypes.string,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    block: PropTypes.bool,
    absolute   : PropTypes.bool,
    x          : PropTypes.string,
    y          : PropTypes.string,
    width      : PropTypes.string,
    height     : PropTypes.string
};

Button.defaultProps = {
    theme: 'primary',
    outline: false,
    size: 'df',
    loading: false,
};

export default Button;