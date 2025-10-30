import React from 'react';
import Input from "./Input";
import { ComponentProps } from './components/common';

interface Props extends ComponentProps {
    data?: any
    text?: string
    label?: any
    value?: any
    onChange?: (val:string,row:any) => void
    showRows?: number
    dropWidth?: string
    validate?: any
}

interface State {
    data: any
}

interface ValueProps {
    text: any
    value: any
    format?: any
    active?: boolean
}

export class CDropdownValue extends React.Component<ValueProps,any> {

}

export class CDropdown extends React.Component<Props,State> {
    static Value = CDropdownValue

    static defaultProps = {
        data: '',
        text: '',
        showRows: 8,
        dropWidth: '100%',
    };

    main: Input
    listData:any
    constructor(props:any) {
        super(props);

        this.listData = this.props.data;
        this.state = {
            data:this.props.data
        };
    }

    check() {
        return this.main.check()
    }

    render() {
        let active;
        if (React.Children.count(this.props.children)) {
            const list:any[] = [];
            React.Children.forEach(this.props.children, (item) => {
                if (item.type === CDropdownValue) {
                    list.push({
                        text: item.props.text,
                        value: item.props.value,
                        format: item.props.format,
                    });
                    if (item.props.active) {
                        active = item.props.text;
                    }
                }
            });
            this.listData = list;
        }
        return (
            <Input ref={(c:any)=>this.main=c} className={this.props.className} width={this.props.width} combo={{
                searchColumn:'text',
                noSearch:true,
                width: this.props.dropWidth,
                filterColumns: ['text'],
                showRows: this.props.showRows,
            }} comboData={this.listData} label={this.props.label} readOnly
                   onChange={this.props.onChange}
                   placeholder={this.props.text}
                   data={active??this.props.data}
                   size={this.props.size}
                   validate={this.props.validate}
                   disabled={this.props.disabled}
            />
        );
    }
}

export default CDropdown;