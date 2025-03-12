import React from 'react';
import classNames from 'classnames/bind';
import './css/Load.less';
import { ComponentProps } from './components/common';

export class Load extends React.Component<ComponentProps,any> {
    constructor(props:any) {
        super(props);
    }

    shouldComponentUpdate() {
        return false;
    }

    componentDidMount() {

    }

    getClasses() {
        const base = 'ck-load';

        return classNames(base,this.props.className);
    }

    render() {
        return (
            <div className={this.getClasses()}>
                <span className='ck-load-circle ck-load-small'/>
                <span className='ck-load-circle ck-load-big'/>
                <span className='ck-load-circle ck-load-small'/>
                {<span>{'\u0020'}{this.props.children}</span>||null}
            </div>
        );
    }
}

export default Load;