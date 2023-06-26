import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

export class ButtonGroup extends React.PureComponent {
    static propTypes = {}
    static defaultProps = {}
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    getClasses() {
        let base = 'btn-group';

        return classNames(base,this.props.className);
    }

    render() {
        return (
            <div {...this.props} className={this.getClasses()}>
                {this.props.children}
            </div>
        );
    }
}

export default ButtonGroup;