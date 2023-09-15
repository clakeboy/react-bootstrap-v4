import React from 'react';
import PropTypes from 'prop-types';

interface Props {
    id      ?: string
    text    ?: string
    active  ?: boolean
    fade    ?: boolean
    disabled?: boolean
    onClick ?: () => void
}

export class TabsContent extends React.PureComponent<Props> {
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
    constructor(props:any) {
        super(props);
    }

    render() {
        return null;
    }
}

export default TabsContent;