import React from 'react';

interface Props {
    onFormat?: (val: any, row: any, idx:any) => void
    text?: string | any
    field: string
    value?: string
    row?: any
    cols?: number
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
    move?: boolean
    sort?: string
    textOver?: boolean
}

export class TableHeader extends React.PureComponent<Props> {
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
        const value = typeof this.props.onFormat === 'function' ? this.props.onFormat(this.props.value, this.props.row, 0) : this.props.value;

        return <>{value}</>;
    }
}

export default TableHeader;