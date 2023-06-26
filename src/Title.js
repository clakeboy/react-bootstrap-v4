import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import './css/Title.less';

export class Title extends React.PureComponent {
    static propTypes = {
        text: PropTypes.string,
        sm: PropTypes.bool
    };
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

export default Title;