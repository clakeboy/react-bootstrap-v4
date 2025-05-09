import React from 'react';
import classNames from 'classnames/bind';
import { ComponentProps } from './components/common';

interface Props extends ComponentProps {
    iconType?: string
    icon?: string
    //icon to rotate
    spin?: boolean
    //bootstrap font icons
    bs?: boolean
    onClick?: (event: React.MouseEvent) => void
}

interface State {
    icon:string
}

export class Icon extends React.PureComponent<Props,State> {
    static defaultProps = {
        iconType: 'solid',
        icon: '',
    };
    constructor(props:any) {
        super(props);
        this.state = {
            icon:this.props.icon??''
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps:Props) {
        // this.setState({
        //     icon: nextProps.icon,
        // });
        this.setIcon(nextProps.icon??'');
    }

    setIcon(icon:string) {
        this.setState({
            icon: icon
        });
    }

    getClasses() {
        if (this.props.bs) {
            return this.getBsClasses();
        }
        let base;
        switch(this.props.iconType) {
            case 'regular':
                base = 'far';
                break;
            case 'light':
                base = 'fal';
                break;
            case 'brands':
                base = 'fab';
                break;
            default:
                base = 'fas';
        }
        if (this.state.icon) {
            base = classNames(base,'fa-'+this.state.icon);
        }
        if (this.props.spin) {
            base = classNames(base,'fa-spin');
        }

        return classNames(base,this.props.className);
    }

    getBsClasses() {
        let base;
        if (this.state.icon) {
            base = classNames(base, this.state.icon);
        }
        return classNames(base,this.props.className);
    }

    render() {
        return (
            <i {...this.props} className={this.getClasses()} onClick={this.props.onClick}/>
        );
    }
}

export default Icon;