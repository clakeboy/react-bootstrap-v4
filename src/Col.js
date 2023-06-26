import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

export class Col extends React.PureComponent {
    static propTypes = {
        at: PropTypes.number,
        sm: PropTypes.number,
        md: PropTypes.number,
        lg: PropTypes.number,
        xl: PropTypes.number,
    };
    constructor(props) {
        super(props);
    }

    getClasses() {
        let base = ['col'];
        //sm
        if (this.props.sm) {
            base.push('sm',this.props.sm)
        }
        //md
        if (this.props.md) {
            base.push('md',this.props.sm)
        }
        //lg
        if (this.props.lg) {
            base.push('lg',this.props.sm)
        }
        //xl
        if (this.props.xl) {
            base.push('xl',this.props.sm)
        }
        //at
        if (this.props.at) {
            base.push(this.props.sm)
        }

        return classNames(base.join('-'),this.props.className);
    }

    render() {
        return (
            <div className={this.getClasses()}>
                {this.props.children}
            </div>
        );
    }
}

export default Col;
