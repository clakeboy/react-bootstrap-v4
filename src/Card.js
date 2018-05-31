import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Title from './Title';

class Card extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    getClasses() {
        let base = 'card';
        if (this.props.border) {
            base = classNames(base,`border-${this.props.border}`);
        }
        return classNames(base,this.props.className);
    }

    renderHeader() {
        if (!this.props.header) {
            return null;
        }
        if (this.props.custom) {
            return <Title text={this.props.header}/>
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
    border: PropTypes.oneOf(['primary','secondary','success','danger','warning','info','light','dark','transparent']),
    custom: PropTypes.bool,
};

Card.defaultProps = {
    border: 'transparent'
};

export default Card;