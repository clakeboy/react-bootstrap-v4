import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

class Icon extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            icon:this.props.icon
        };
    }

    componentWillReceiveProps(nextProps) {
        // this.setState({
        //     icon: nextProps.icon,
        // });
        this.setIcon(nextProps.icon);
    }

    setIcon(icon) {
        this.setState({
            icon: icon
        });
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
        if (this.state.icon) {
            base = classNames(base,'fa-'+this.state.icon);
        }
        if (this.props.spin) {
            base = classNames(base,'fa-spin');
        }

        return classNames(base,this.props.className);
    }

    render() {
        return (
            <i {...this.props} className={this.getClasses()}/>
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