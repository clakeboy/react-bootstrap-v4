import React from 'react';
import PropTypes from 'prop-types';
import Input from "./Input";
import { ComponentProps } from './components/common';

interface ColumnProps extends ComponentProps {
    field: string
    text: string
    format?: (val:any,row?:any)=>any //func (val,row)=>{return val;}
    width?: string
}

class ComboBoxColumn extends React.Component<ColumnProps,any> {
    static propTypes = {
        field: PropTypes.string,
        text: PropTypes.string,
        format: PropTypes.func, //func (val,row)=>{return val;}
        width: PropTypes.string, //100px 100pt...
    };
}

interface Props extends ComponentProps {
    label?: string
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
    static propTypes = {
        label: PropTypes.string,
        searchColumn: PropTypes.string,
        data: PropTypes.array,
        height: PropTypes.string,
        width: PropTypes.string,
        showRows: PropTypes.number,
        search: PropTypes.string,
        onSearch: PropTypes.func,
        onSelect: PropTypes.func,
        onClose: PropTypes.func,
        onShow: PropTypes.func,
        onChange: PropTypes.func,
        sm: PropTypes.bool,
        multi: PropTypes.bool,
        multiDef: PropTypes.object,
        //filter column exp: ['name','age'] or [{field:'name',width:'100px'},{field:'age',width:'100px'}]
        filterColumns: PropTypes.array,
        noSearch: PropTypes.bool,
        header: PropTypes.bool,
        size: PropTypes.string,
        value: PropTypes.string,
        text: PropTypes.string,
        validate: PropTypes.object
    };
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
        const props:{[propName:string]:any} = Object.assign(this.props, {});
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