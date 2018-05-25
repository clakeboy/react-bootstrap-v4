import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Icon from './Icon';

class Button extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {

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
            base = classNames(base,"btn-"+this.props.size);
        }

        //block
        if (this.props.block) {
            base = classNames(base,'btn-block');
        }

        return classNames(base,this.props.className);
    }

    clickHandler = (e) => {
        if (this.props.onClick) {
            this.props.onClick(e)
        }
    };

    render() {
        console.log('render Button');
        return (
            <button onClick={this.clickHandler} className={this.getClasses()} >
                {this.renderIcon()}{this.props.children}
            </button>
        );
    }

    renderIcon() {
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
    size: PropTypes.oneOf(['df','sm','lg']),
    onClick: PropTypes.func,
    icon: PropTypes.string,
    block: PropTypes.bool,
};

Button.defaultProps = {
    theme: 'primary',
    outline: false,
    size: 'df',
};

export default Button;