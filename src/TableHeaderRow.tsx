import React from 'react';
import PropTypes from 'prop-types';

interface Props {
    cols?: number
    text?: string
    align?: string
}

export class TableHeaderRow extends React.PureComponent<Props> {

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