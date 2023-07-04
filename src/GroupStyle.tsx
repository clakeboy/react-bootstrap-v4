import React from 'react';
import classNames from 'classnames/bind';
import './css/GroupStyle.less';
interface Props extends React.ComponentProps<any>{
    right: string | JSX.Element | undefined //组右边内容
    left: string | JSX.Element | undefined //组左边内容
    leftClass: string
    rightClass: string
    size?: string
    className: string
}

// interface State {
//     value: string
// }

class GroupStyleContent extends React.Component<any, any> {
    render() {
        return <div className="input-group-append">
                <div className={'custom custom-right bg-white'}>
                    {this.props.children}
                </div>
        </div>;
    }
}

export class GroupStyle extends React.Component<Props, null> {

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
        const isStr = typeof this.props.left === 'string'
        return (
            <div className="input-group-prepend">
                {isStr ?
                    <div className={classNames('input-group-text',this.props.leftClass)}>
                        {this.props.left}
                    </div>:
                    <div className={classNames('custom custom-left',this.props.leftClass)}>
                        {this.props.left}
                    </div>}
            </div>
        )
    }

    renderRight() {
        if (!this.props.right) return null
        const isStr = typeof this.props.right === 'string'
        return (
            <div className="input-group-append">
                {isStr ?
                    <div className={classNames('input-group-text',this.props.rightClass)}>
                        {this.props.right}
                    </div>:
                    <div className={classNames('custom custom-right',this.props.rightClass)}>
                        {this.props.right}
                    </div>}
            </div>
        )
    }
}

export default GroupStyle;