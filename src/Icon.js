import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

class Icon extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    getClasses() {
        let base;
        switch(this.props.iconType) {
            case 'regular':
                base = 'far';
                break;
            case 'light':
                base = 'fal';
                break;
            case 'brands':
                base = 'fab';
                break;
            default:
                base = 'fas';
        }
        base = classNames(base,'fa-'+this.props.icon);
        if (this.props.spin) {
            base = classNames(base,'fa-spin');
        }

        return classNames(base,this.props.className);
    }

    render() {
        return (
            <span className={this.getClasses()}/>
        );
    }
}

Icon.propTypes = {
    iconType: PropTypes.oneOf(['solid','regular','light','brands']),
    icon: PropTypes.string,
    //icon to rotate
    spin: PropTypes.bool,
};

Icon.defaultProps = {
    iconType: 'solid',
    icon: '',
};

export default Icon;