import React from 'react';
import classNames from "classnames/bind";

interface Props extends React.HTMLProps<any>{
    noGutters?: boolean
}

interface State {
    val: string
}

export class Row extends React.Component<Props, State> {

    public static defaultProps:any = {
        noGutters: false
    };

    constructor(props?: any) {
        super(props);

        this.state = {
            val: 'default',
        }
    }

    getClasses() : string {
        let base = 'row';
        //no-gutters
        if (this.props.noGutters) {
            base = classNames(base,'no-gutters');
        }

        return classNames(base, this.props.className);
    }

    render() {
        return (
            <div className={this.getClasses()}>
                {this.props.children}
            </div>
        );
    }
}

export default Row;