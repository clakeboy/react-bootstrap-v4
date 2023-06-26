import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

export class TabsContent extends React.PureComponent {
    static propTypes = {
        id      : PropTypes.string,
        text    : PropTypes.string,
        active  : PropTypes.bool,
        fade    : PropTypes.bool,
        disabled: PropTypes.bool,
        onClick : PropTypes.func,
    };

    static defaultProps = {
        fade: false,
    };
    constructor(props) {
        super(props);
    }

    render() {
        return null;
    }
}

export default TabsContent;