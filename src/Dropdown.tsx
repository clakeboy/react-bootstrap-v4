import React from 'react';
import classNames from 'classnames/bind';
import common from './Common';
import Button from "./Button";
import { ComponentProps, Theme } from './components/common';

interface ValueProps {
    text?:string
    value?:any
    active?:boolean
}

export class DropdownValue extends React.Component<ValueProps,any> {

}

interface Props extends ComponentProps {
    data?: any
    text?: string
    onChange?: (txt:any,val:any)=>void
    outline?: boolean
    theme?: Theme
    icon?: string
    grid?: boolean
}

interface State {
    text: string
    value: string
    list: any
}

export class Dropdown extends React.PureComponent<Props,State> {
    static Value = DropdownValue;

    static defaultProps = {
        data: [],
        text: '',
        theme: Theme.secondary,
        outline: false,
    };

    domId:string

    constructor(props:any) {
        super(props);
        this.state = {
            text: this.props.text??'',
            value: '',
            list: this.props.data,
        };
        this.domId = this.props.id??'drop-'+common.RandomString(16);
    }

    UNSAFE_componentWillReceiveProps(nextProp:Props) {
        this.setState({
            text: nextProp.text??'',
            list: nextProp.data
        })
    }

    selectHandler = (e:any) => {
        this.setState({
            text: e.target.textContent,
            value: e.target.dataset.value,
        });
        if (this.props.onChange && typeof this.props.onChange === 'function') {
            this.props.onChange(e.target.textContent,e.target.dataset.value);
        }
    };

    setValue(val:any) {
        let text,value;

        switch (typeof val) {
            case 'string':
                text = val;
                value = val;
                break;
            case 'object':
                text = val.text;
                value = val.value;
                break;
            default:
                return
        }

        this.setState({
            text:text,
            value:value,
        })
    }

    getValue() {
        return this.state.value;
    }

    getJsonValue() {
        return {text:this.state.text,value:this.state.value};
    }

    getClasses() {
        const base = 'dropdown btn-group';
        return classNames(base,this.props.className);
    }

    getStyles() {
        //default style
        const def_style = {
            "width": this.props.width + "px"
        };

        return common.extend(def_style, this.props.style)
    }

    renderList() {
        let list = this.state.list;
        if (!list || !(list instanceof Array)) {
            if (React.Children.count(this.props.children)) {
                list = [];
                React.Children.forEach(this.props.children, (item) => {
                    if (item.type === DropdownValue) {
                        list.push({
                            text: item.props.text,
                            value: item.props.value,
                            active: item.props.active,
                        });
                    }
                });
            } else {
                return null
            }
        }
        return list.map((item:any,i:number)=>{
            let classList = 'dropdown-item';
            if (item.active) {
                classList += ' active';
            }
            if (typeof item === 'string') {
                return <Button className={classList} size={this.props.size} onClick={this.selectHandler} data-value={item}>{item}</Button>
            }
            return <Button key={i} className={classList} size={this.props.size} onClick={this.selectHandler} data-value={item.value}>{item.text}</Button>
        });
    }

    renderGrid() {
        const list = this.state.list;
        if (!list || !(list instanceof Array)) {
            return null;
        }
        const domList = [];
        for (let row=0;row<list.length;row++) {
            const rowList = list[row];
            if (!rowList || !(rowList instanceof Array)) {
                continue
            }
            const rowDom = <div className='px-2 d-flex d-inline mt-1'>
                {rowList.map((item,i)=>{
                    return <button key={i} className='flex-fill bd-highlight border' style={{backgroundColor:item,height:'24px'}} data-value={item} onClick={this.selectHandler}/>
                })}
            </div>;
            domList.push(rowDom);
        }

        return domList;
    }

    render() {
        return (
            <div className={this.getClasses()} style={this.getStyles()}>
                <Button className='dropdown-toggle' theme={this.props.theme} size={this.props.size} icon={this.props.icon} outline={this.props.outline} style={this.getStyles()} role="button" id={this.props.id} data-toggle="dropdown">
                    {this.state.text}
                </Button>
                {/*<Button className="btn btn-secondary dropdown-toggle" style={this.getStyles()} role="button" id={this.props.id} data-toggle="dropdown">*/}
                {/*    {this.state.text}*/}
                {/*</Button>*/}

                <div className="dropdown-menu">
                    {this.props.grid?this.renderGrid():this.renderList()}
                </div>
            </div>
        );
    }
}

export default Dropdown;