/**
 * Created by clakeboy on 2023/6/1.
 */
import React from 'react';
import Icon from './Icon';
import classNames from 'classnames/bind';
import './css/Alerts.less';
import Load from "./Load";
import { Theme } from './components/common';

interface Props extends React.HTMLProps<any>{
    theme?: Theme | string
    autoHide: number
    width: string
}

interface State {
    content: any
    show: boolean
    autoHide: number
    width: string
    theme: string
    isClose: boolean
}

interface ShowOptions {
    content: string | JSX.Element
    autoHide?: number
    width?: string
    theme?: Theme | string
    isClose?: boolean
}

export class Alerts extends React.Component<Props, State> {

    timeout: any

    public static defaultProps:Props = {
        theme: 'danger',
        autoHide: 3000,
        width: '50%'
    };

    constructor(props?: any) {
        super(props);

        this.state = {
            content: this.props.content,
            show:false,
            autoHide: this.props.autoHide,
            width: this.props.width,
            theme: typeof this.props.theme === 'string'?this.props.theme:Theme[this.props.theme??0],
            isClose: true
        }

        this.timeout = 0;
    }

    shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>): boolean {
        if (nextState.content !== this.state.content) {
            return true
        }

        if (nextState.show !== this.state.show) {
            return true
        }

        return nextState.autoHide !== this.state.autoHide;
    }

    show(opt:ShowOptions|JSX.Element|string) {
        let theme:string|undefined
        if ((opt as ShowOptions)?.theme) {
            const opts = (opt as ShowOptions)
            theme = typeof opts.theme === 'string'?opts.theme:Theme[opts.theme??0]
        }
        console.log(theme);
        
        this.setState({
            content: (opt as ShowOptions)?.content ?? opt,
            autoHide: (opt as ShowOptions)?.autoHide ?? this.props.autoHide,
            width: (opt as ShowOptions)?.width ?? this.props.width,
            theme: theme ?? (typeof this.props.theme === 'string'?this.props.theme:Theme[this.props.theme??0]),
            isClose: (opt as ShowOptions)?.isClose ?? true,
            show: true
        },()=>{
            if (this.state.autoHide !== 0) {
                clearTimeout(this.timeout)
                this.timeout = setTimeout(()=>{
                    this.setState({show:false})
                },this.state.autoHide)
            }
        })
    }

    loading(msg:any) {
        this.show({
            content:<><Load/>&nbsp;{msg}</>,
            theme:'info',
            autoHide:0
        })
    }

    hide() {
        clearTimeout(this.timeout)
        this.setState({
            show: false
        })
    }

    getClasses() : string {
        let base = 'ck-alerts-main';
        if (this.state.show) {
            base = classNames(base, 'visible')
        }
        return classNames(base, this.props.className);
    }

    getContentClasses(): string {
        let base = 'main shadow d-flex alert';
        base = classNames(base,`alert-${this.state.theme}`)
        if (this.state.show) {
            base = classNames(base, 'show')
        }
        return classNames(base, this.props.className);
    }

    getContentStyle() {
        const base = {width:this.state.width}
        return base
    }

    clickHandler = ()=>{
        this.hide()
    }

    render() {
        return (
            <div className={this.getClasses()}>
                <div className={this.getContentClasses()} style={this.getContentStyle()} onClick={this.clickHandler}>
                    <div className='flex-grow-1'>{this.state.content}</div>
                    <div><Icon icon='times'/></div>
                </div>
            </div>
        );
    }
}

export default Alerts;