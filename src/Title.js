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
};

Title.defaultProps = {

};

export default Title;