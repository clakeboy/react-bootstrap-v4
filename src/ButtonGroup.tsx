import React from 'react';
import classNames from 'classnames/bind';

export class ButtonGroup extends React.PureComponent<any,any> {
    static propTypes = {}
    static defaultProps = {}
    constructor(props:any) {
        super(props);
    }

    componentDidMount() {

    }

    getClasses() {
        const base = 'btn-group';

        return classNames(base,this.props.className);
    }

    render() {
        return (
            <div {...this.props} className={this.getClasses()}>
                {this.props.children}
            </div>
        );
    }
}

export default ButtonGroup;