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
        let base,icon;
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
        icon = 'fa-'+this.props.icon;

        return classNames(base,icon);
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
};

Icon.defaultProps = {
    iconType: 'solid',
    icon: '',
};

export default Icon;