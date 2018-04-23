import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

class Card extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    getClasses() {
        let base = 'card';
        return classNames(base,this.props.className);
    }

    renderHeader() {
        if (!this.props.header) {
            return null;
        }
        return (
            <div className='card-header'>{this.props.header}</div>
        )
    }

    render() {
        return (
            <div className={this.getClasses()}>
                {this.renderHeader()}
                <div className="card-body">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

Card.propTypes = {
    header: PropTypes.string,
};

Card.defaultProps = {

};

export default Card;