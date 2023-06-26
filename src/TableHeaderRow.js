import React from 'react';
import PropTypes from 'prop-types';

export class TableHeaderRow extends React.PureComponent {
    static propTypes = {
        cols: PropTypes.number,
        text: PropTypes.string,
        align: PropTypes.string
    };

    static defaultProps = {
        align: 'center'
    };
    constructor(props) {
        super(props);
    }

    render() {
        return null;
    }
}


export default TableHeaderRow;