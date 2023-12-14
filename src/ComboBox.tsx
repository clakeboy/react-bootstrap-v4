import React from 'react';
import Input from "./Input";
import { ComponentProps } from './components/common';

interface ColumnProps extends ComponentProps {
    field: string
    text: string
    format?: (val:any,row?:any)=>any //func (val,row)=>{return val;}
    width?: string
}

class ComboBoxColumn extends React.Component<ColumnProps,any> {

}

interface Props extends ComponentProps {
    label?: any
    searchColumn?: string
    data?: any
    showRows?: number
    search?: string
    onSearch?: (search:string,callback:(data:any)=>void)=>void
    onSelect?: (val:any,row:any)=>void
    onClose?: ()=>void
    onShow?: ()=>void
    sm?: boolean
    multi?: boolean
    multiDef?: any
    onChange?: ()=>void
    //filter column exp: ['name','age'] or [{field:'name',width:'100px'},{field:'age',width:'100px'}]
    filterColumns?: any
    noSearch?: boolean
    header: boolean
    size?: string
    value?: string
    text?: string
    validate?: any
    placeholder?: string
    readOnly?: boolean
}

export class ComboBox extends React.Component<Props,any> {
    static Column = ComboBoxColumn;

    static defaultProps = {
        label:null,
        showRows:5,
        data:[],
        search:"",
        multi:false,
        multiDef:null,
        header:false,
    };
    main:Input
    constructor(props:any) {
        super(props);
    }

    check() {
        return this.main.check()
    }

    render() {
        const props:{[propName:string]:any} = {...this.props};
        if (React.Children.count(this.props.children)) {
            const filterColumn:any[] = [];
            React.Children.forEach(this.props.children, (item) => {
                if (item.type === ComboBoxColumn) {
                    filterColumn.push({
                        field: item.props.field,
                        text: item.props.text,
                        format: item.props.format,
                        width: item.props.width,
                    })
                }
            });
            props.filterColumns = filterColumn;
        }

        return (
            <Input ref={(c:any)=>this.main=c}
                   className={this.props.className}
                   placeholder={this.props.text??this.props.placeholder}
                   label={this.props.label}
                   data={this.props.value}
                   size={this.props.size}
                   readOnly={this.props.readOnly}
                   disabled={this.props.disabled}
                   onChange={this.props.onChange}
                   combo={props}
                   validate={this.props.validate}
                   comboData={this.props.data}/>
        );
    }
}

export default ComboBox;