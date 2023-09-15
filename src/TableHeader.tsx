import React from 'react';
import PropTypes from 'prop-types';

interface Props {
    onFormat?: (val: any, row: any) => void
    text?: string
    field?: string
    value?: string
    row?: any
    onSort?: (field: string, sort: string) => void
    align?: string
    hide?: boolean
    tree?: boolean
    width?: string
    onClickTree?: () => void
    //static head
    afterHold?: boolean
    beforeHold?: boolean
    //edit
    edit?: any
}

export class TableHeader extends React.PureComponent<Props> {
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
        text: '',
        field: '',
        value: '',
        row: null,
        onFormat: null,
        onSort: null,
        align: 'left',
        hold: false,
        edit: null,
    };
    constructor(props: any) {
        super(props);
    }

    render() {
        const value = typeof this.props.onFormat === 'function' ? this.props.onFormat(this.props.value, this.props.row) : this.props.value;

        return <>{value}</>;
    }
}

export default TableHeader;