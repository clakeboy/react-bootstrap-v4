import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

export class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fluid: this.props.fluid
        };
    }

    componentDidMount() {

    }

    getClasses() {
        let cls_name = "container";
        if (this.state.fluid) {
            cls_name = "container-fluid";
        }
        let inline;
        if (this.props.inline) {
            inline = 'form-inline';
        }
        return classNames(cls_name, inline, this.props.className);
    }

    render() {


        return (
            <div className={this.getClasses()}>
                {this.props.children}
            </div>
        )
    }
}

Container.propTypes = {
    fluid : PropTypes.bool,
    inline: PropTypes.bool,
};

Container.defaultProps = {
    fluid : false,
    inline: false,
};

export default Container;