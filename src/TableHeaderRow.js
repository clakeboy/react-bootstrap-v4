import React from 'react';
import PropTypes from 'prop-types';

class TableHeaderRow extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return null;
    }
}

TableHeaderRow.propTypes = {
    cols: PropTypes.number,
    text: PropTypes.string,
    align: PropTypes.string
};

TableHeaderRow.defaultProps = {
    align: 'center'
};

export default TableHeaderRow;