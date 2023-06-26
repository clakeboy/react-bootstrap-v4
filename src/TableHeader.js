import React from 'react';
import PropTypes from 'prop-types';

export class TableHeader extends React.PureComponent {
    static propTypes = {
        onFormat: PropTypes.func,
        text: PropTypes.string,
        field: PropTypes.string,
        value: PropTypes.string,
        row: PropTypes.any,
        onSort: PropTypes.func,
        align: PropTypes.string,
        hide: PropTypes.bool,
        tree: PropTypes.bool,
        width: PropTypes.string,
        onClickTree: PropTypes.func,
        //static head
        afterHold: PropTypes.bool,
        beforeHold: PropTypes.bool,
        //edit
        edit: PropTypes.object,
    };

    static defaultProps = {
        text:'',
        field:'',
        value:'',
        row:null,
        onFormat:null,
        onSort:null,
        align:'left',
        hold:false,
        edit:null,
    };
    constructor(props) {
        super(props);
    }

    render() {
        let value = typeof this.props.onFormat === 'function' ? this.props.onFormat(this.props.value,this.props.row):this.props.value;

        return value;
    }
}

export default TableHeader;