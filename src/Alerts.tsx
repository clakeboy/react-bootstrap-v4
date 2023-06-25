/**
 * Created by clakeboy on 2023/6/1.
 */
import React from 'react';
import Icon from './Icon';
import classNames from 'classnames/bind';
import './css/Alerts.less';
import Load from "./Load";

interface Props extends React.HTMLProps<any>{
    theme: string
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
    theme?: string
    isClose?: boolean
}

class Alerts extends React.Component<Props, State> {

    timeout: number

    public static defaultProps:any = {
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
            theme: this.props.theme,
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
        this.setState({
            content: (opt as ShowOptions)?.content ?? opt,
            autoHide: (opt as ShowOptions)?.autoHide ?? this.props.autoHide,
            width: (opt as ShowOptions)?.width ?? this.props.width,
            theme: (opt as ShowOptions)?.theme ?? this.props.theme,
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
        let base = 'main shadow d-flex';
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