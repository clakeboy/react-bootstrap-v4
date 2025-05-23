import React from 'react';
import classNames from 'classnames/bind';
import './css/GroupStyle.less';
import Button from './Button';
interface Props extends React.ComponentProps<any>{
    right?: string | JSX.Element  //组右边内容
    left?: string | JSX.Element  //组左边内容
    leftClass?: string
    rightClass?: string
    size?: string
}

// interface State {
//     value: string
// }

class GroupStyleContent extends React.Component<any, any> {
    render() {
        return <div className="input-group">
            <div className='custom custom-right bg-body'>
                {this.props.children}
            </div>
        </div>;
    }
}

export class GroupStyle extends React.Component<Props, any> {

    public static defaultProps:any = {
        className: '',
        leftClass: '',
        rightClass:'',
        right: null,
        size: 'df'
    };

    static Content = GroupStyleContent

    constructor(props?: any) {
        super(props);

        // this.state = {
        //     label: this.props.label
        // }
    }

    getClasses() : string {
        let base = "group-style-main input-group"
        if (this.props.size !== 'df') {
            base = classNames(base,'input-group-'+this.props.size)
        }
        if (this.props.right !== null && this.props.left !== null) {
            base = classNames(base,'group-style-middle')
        } else if (this.props.left !== null) {
            base = classNames(base,'group-style-left')
        } else if (this.props.right !== null) {
            base = classNames(base,'group-style-right')
        }
        return classNames(base, this.props.className);
    }

    render(): any {
        return (
            <div className={this.getClasses()}>
                {this.renderLeft()}
                {this.props.children}
                {this.renderRight()}
            </div>
        );
    }

    renderLeft() {
        if (this.props.left === null) return null
        let typeStr = ''
        if (typeof this.props.left === 'string') {
            typeStr = 'string'
        } else if (typeof this.props.left === 'object') {
            if (this.props.left.type === Button) {
                typeStr = 'button'
            } else {
                typeStr = 'component'
            }
        } else {
            typeStr = 'component'
        }
        let con;
        // console.log(typeStr)
        switch (typeStr) {
            case 'string':
                con = <div className={classNames('input-group-text',this.props.leftClass)}>
                        {this.props.left}
                    </div>
                break;
            case 'button':
                con = this.props.left
                break;
            default:
                con = <div className={classNames('custom custom-left',this.props.leftClass)}>
                        {this.props.left}
                    </div>     
        }

        return (
            <>
                {con}
            </>
        )
    }

    renderRight() {
        if (!this.props.right) return null
        let typeStr = ''
        if (typeof this.props.right === 'string') {
            typeStr = 'string'
        } else if (typeof this.props.left === 'object') {
            if (this.props.left.type === Button) {
                typeStr = 'button'
            } else {
                typeStr = 'component'
            }
        }else {
            typeStr = 'component'
        }

        let con;
        switch (typeStr) {
            case 'string':
                con = <div className={classNames('input-group-text',this.props.rightClass)}>
                        {this.props.right}
                    </div>
                break;
            case 'button':
                con = this.props.right
                break;
            default:
                con = <div className={classNames('custom custom-right',this.props.rightClass)}>
                        {this.props.right}
                    </div>     
        }

        return (
            <>
                {con}
            </>
        )
    }
}

export default GroupStyle;