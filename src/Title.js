import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import './css/Title.less';

class Title extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    getClasses() {
        let base = 'ck-title';

        if (this.props.sm) {
            base = classNames(base,'ck-title-sm');
        }

        return classNames(base,this.props.className);
    }

    render() {
        return (
            <div className={this.getClasses()}>
                {this.props.text}{this.props.children}
            </div>
        );
    }
}

Title.propTypes = {
    text: PropTypes.string,
    sm: PropTypes.bool
};

Title.defaultProps = {

};

export default Title;