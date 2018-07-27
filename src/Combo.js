import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

class Combo extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    getClasses() {
        let base = '';

        return classNames(base,this.props.className);
    }

    render() {
        return (
            <div className={this.getClasses()}>

            </div>
        );
    }
}

Combo.propTypes = {

};

Combo.defaultProps = {

};

export default Combo;