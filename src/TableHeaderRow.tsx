import React from 'react';
import PropTypes from 'prop-types';

interface Props {
    cols?: number
    text?: string
    align?: string
}

export class TableHeaderRow extends React.PureComponent<Props> {
    static propTypes = {
        cols: PropTypes.number,
        text: PropTypes.string,
        align: PropTypes.string
    };

    static defaultProps = {
        align: 'center'
    };
    constructor(props:any) {
        super(props);
    }

    render() {
        return null;
    }
}


export default TableHeaderRow;