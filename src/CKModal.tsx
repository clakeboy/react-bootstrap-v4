import React from 'react';
import classNames from 'classnames/bind';
import common from "./Common";
import ReactDOM from "react-dom";
import Button from './Button';
import Load from "./Load";
import './css/Modal.less';
import ButtonGroup from "./ButtonGroup";
import { ComponentProps, Theme } from './components/common';
import i18n from './components/i18n';

const ModalAlert = 0;
const ModalConfirm = 1;
const ModalLoading = 2;
const ModalView = 3;
const BaseModal = 1050;

//Alert options
interface Options {
    title?: string
    content: any
    close?: boolean
    header?: boolean
    center?: boolean
    width?: string
    btns?: {[propsName:string]:string}
    shadowClose?: boolean
    fade?: boolean
    callback?: any
    empty?: boolean
}

interface ViewOptions extends Options {
    size?: string
    onClose?: ()=>void
}

let defBtns = {
    ok:'确定',
    cancel:'取消',
};

interface Props extends ComponentProps {
    onOpen?: ()=>void
    onClose?: ()=>void
    center?: boolean
    fade?: boolean
    header?: boolean
    blurSelector?: string
    isCloseBtn?: boolean
    shadowClose?: boolean
    id?: string
    btns?: {[propsName:string]:string}
}

interface State {
    content: any
    title: string
    isCloseBtn?: boolean
    header?: boolean
    type: number
    center?: boolean
    fade?: boolean
    show: boolean
    width: string | null
    size: string
    btns: {[propName:string]:string}
    shadowClose?: boolean
    empty: boolean
}

export class CKModal extends React.Component<Props,State> {
    static defaultProps = {
        isCloseBtn: true,
        header: false,
        center: false,
        fade: false,
        shadowClose:false,
    }
    domId = 'modal-'+common.RandomString(16);
    //modal type
    modalType = ModalAlert
    //alert confirm callback function
    callback:any;
    evtClosed:any;
    evtOpened:any;
    offsetIndex = document.querySelectorAll(".modal").length * 10;
    is_open = false;
    _modal:HTMLDivElement
    _shadow:HTMLDivElement
    constructor(props:any) {
        super(props);
        this.state = {
            empty:false,
            content:'',
            title:'',
            isCloseBtn:this.props.isCloseBtn??true,
            header:this.props.header??true,
            type:ModalAlert,
            center:this.props.center??true,
            fade:this.props.fade??false,
            show:false,
            size:'lg',
            width:null,
            btns:defBtns,
            shadowClose:this.props.shadowClose??false
        };
        
        if (this.props.id) {
            this.domId = this.props.id;
        }
    }

    shouldComponentUpdate(nextProps:Props, nextState:State) {
        if (nextState.content !== null && nextState.content.props) {
            nextState.content = React.cloneElement(nextState.content,{...nextState.content.props,parent:this})
        }
        if (this.state.content !== nextState.content) {
            return true;
        }
        return this.state.show !== nextState.show
    }

    componentDidMount() {
        if (i18n.getLang().short === "en") {
            defBtns = {
                ok:'Ok',
                cancel:'Cancel',
            }
        }
    }

    componentWillUnmount() {

    }

    hasScrollbar() {
        return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight);
    }

    open() {
        this.setState({
            show: true
        },()=>{
            if (this.is_open) return
            this.is_open = true
            let modals = parseInt(document.body.dataset.modals??'0');
            if (!modals) {
                modals = 0;
            }
            modals += 1;
            this.offsetIndex = modals * 10
            this._modal.style.zIndex = `${BaseModal+this.offsetIndex+2}`
            this._shadow.style.zIndex = `${BaseModal+this.offsetIndex+1}`
            document.body.dataset.modals = modals+'';
            document.body.classList.add("modal-open");
            if (this.hasScrollbar()) {
                document.body.style.paddingRight = '15px';
            }
            if (this.props.blurSelector) {
                const selector = document.querySelector(this.props.blurSelector);
                if (selector) {
                    selector.classList.add("ck-model-blur");
                }
            }
        });
        // if (this.state.fade) {
        //     this._modal.classList.add("ck-modal-fade");
        //     this._shadow.classList.add('ck-modal-shadow-fade');
        // }
        // this._modal.classList.add("visible");
        // this._modal.classList.remove("invisible",'ck-modal-close-an');
        // this._shadow.classList.add('visible');
        // this._shadow.classList.remove("invisible",'ck-modal-shadow-close');
        
        // document.body.classList.add("ck-model-blur")
    }

    close() {
        this.setState({
            show: false
        },()=>{
            if (!this.is_open) return
            this.is_open = false
            let modals = parseInt(document.body.dataset.modals??'1');
            modals -= 1;
            document.body.dataset.modals = modals+'';
            if (modals === 0) {
                setTimeout(()=>{
                    document.body.classList.remove("modal-open");
                    if (this.hasScrollbar()) {
                        document.body.style.paddingRight = '0';
                    }
                },this.state.fade?300:0)
                if (this.props.blurSelector) {
                    const selector = document.querySelector(this.props.blurSelector);
                    if (selector) {
                        selector.classList.remove("ck-model-blur");
                    }
                }
            }
            this.closeHandler();
        });
        // this._modal.classList.remove("visible");
        // this._shadow.classList.remove("visible");
        // this._modal.classList.add("invisible");
        // this._shadow.classList.add("invisible");
        // if (this.state.fade) {
        //     this._modal.classList.add("ck-modal-close-an");
        //     this._shadow.classList.add('ck-modal-shadow-close');
        // }
        
    }

    closeHandler = ()=>{
        if (typeof this.props.onClose === 'function') {
            this.props.onClose();
        }
        if (typeof this.evtClosed === 'function') {
            this.evtClosed();
            this.evtClosed = null;
        }
    };

    openHandler = () =>{
        if (typeof this.props.onOpen === 'function') {
            this.props.onOpen();
        }
    };

    alert(opt:Options|any,cb?:()=>void):void {
        const opts:Options = typeof opt === 'object'? opt:{
            content: opt
        }
        this.callback = opts.callback||cb||null;
        this.modalType = ModalAlert;
        this.setState({
            title:opts.title??'',
            content:opts.content||opt||'',
            isCloseBtn:opts.close??true,
            header:!opts.title?false:opts.header??this.props.header,
            type:ModalAlert,
            center:opts.center??this.props.center,
            width:opts.width??null,
            btns: opts.btns??defBtns,
            shadowClose:opts.shadowClose??this.props.shadowClose,
            fade:opts.fade??this.props.fade,
            empty:opts.empty??false,
        },()=>{
            // this.open({
            //     backdrop:'static',
            //     keyboard:false,
            // });
            this.open()
        });
    }

    /**
     * modal confirm method
     * opt example
     * {
     *      title:'',
     *      content:'',
     *      [callback: func]
     * }
     * @param opt
     */
    confirm(opt:Options|any,cb?:(flag:number)=>void) {
        const opts:Options = typeof opt === 'object'? opt:{
            content: opt
        }
        this.callback = opts.callback||cb||null;
        this.modalType = ModalConfirm;
        this.setState({
            title:opts.title??'',
            content:opts.content||opts||'',
            isCloseBtn:opts.close??true,
            header:!opts.title?false:opts.header??this.props.header,
            type:ModalConfirm,
            center:opts.center??this.props.center,
            width:opts.width??null,
            btns: opts.btns??defBtns,
            shadowClose:opts.shadowClose??this.props.shadowClose,
            fade:opts.fade??this.props.fade,
            empty:opts.empty??false,
            // show:true,
        },()=>{
            this.open();
        });
    }

    /**
     * modal loading method
     * @param opt
     */
    loading(opt:Options|string) {
        const opts:Options = typeof opt === 'object'? opt:{
            content: opt
        }
        this.modalType = ModalLoading;
        this.setState({
            title:opts.title??'',
            content:opts.content||opt||'',
            isCloseBtn:opts.close??true,
            header:!opts.title?false:opts.header??this.props.header,
            type:ModalLoading,
            center:opts.center??this.props.center,
            width:opts.width??null,
            shadowClose:opts.shadowClose??this.props.shadowClose,
            fade:opts.fade??this.props.fade,
            empty:opts.empty??false,
            // show:true,
        },()=>{
            this.open();
        });
    }

    /**
     * modal view method
     * opt example
     * {
     *      title:'',
     *      content:flex,
     *      [callback:func]
     * }
     * @param opt
     */
    view(opts:ViewOptions) {
        this.callback = opts.callback||null;
        this.modalType = ModalView;
        this.setState({
            title:opts.title??'',
            content:opts.content||opts||'',
            isCloseBtn:opts.close??true,
            header:!opts.title?false:opts.header??this.props.header,
            type:ModalView,
            center:opts.center??this.props.center,
            width:opts.width??null,
            shadowClose:opts.shadowClose??this.props.shadowClose,
            fade:opts.fade??this.props.fade,
            size: opts.size??'lg',  // sm,lg(default),xl
            empty:opts.empty??false,
            // show:true,
        },()=>{
            this.open();
        });
    }

    getClasses() {
        let base = 'modal d-block';
        if (this.modalType === ModalView) {
            base = classNames(base,"bd-example-modal-lg");
        }
        if (this.state.fade) {
            base = classNames(base,'ck-modal-fade');
        }

        if (this.state.show) {
            base = classNames(base,'visible');
        } else {
            base = classNames(base,'invisible',this.state.fade?'ck-modal-close-an':'');
        }

        if (this.state.empty) {
            base = classNames(base,'ck-modal-empty');
        }

        return classNames(base,this.props.className);
    }

    getDialogClasses() {
        let base = 'modal-dialog';
        if (this.modalType === ModalView) {
            base = classNames(base,"modal-"+this.state.size);
        }
        if (this.state.center) {
            base = classNames(base,"modal-dialog-centered");
        }

        return classNames(base,this.props.className);
    }

    getDialogStyles() {
        const base:{[propName:string]:string} = {};
        if (this.state.width) {
            base['maxWidth'] = this.state.width;
        }
        return base;
    }

    getShadowClasses() {
        let base = 'modal-backdrop ck-modal-shadow';

        if (this.state.show) {
            base = classNames(base,'visible');
        } else {
            base = classNames(base,'invisible',this.state.fade?'ck-modal-shadow-close':'');
        }

        if (this.state.fade) {
            base = classNames(base,'ck-modal-shadow-fade');
        }

        return classNames(base,this.props.className);
    }

    renderFooter() {
        let content = null;
        switch (this.state.type) {
            case ModalAlert:
                content = (
                    <Button className='' block data-dismiss="modal" onClick={()=>{
                        this.close();
                        if (typeof this.callback === 'function') {
                            this.callback(1);
                        }
                    }}>{this.state.btns['ok']}</Button>
                );
                break;
            case ModalConfirm:
                content = (
                        <ButtonGroup className='w-100'>
                            <Button className='w-100' onClick={()=>{
                                this.close();
                                if (typeof this.callback === 'function') {
                                    this.callback(1);
                                }
                            }}>{this.state.btns['ok']}</Button>
                            <Button className='w-100' onClick={()=>{
                                this.close();
                                if (typeof this.callback === 'function') {
                                    this.callback(0);
                                }
                            }} theme={Theme.secondary}>{this.state.btns['cancel']}</Button>
                        </ButtonGroup>
                );
                break;
            default:
                return null;
        }

        return (
            <div className='p-2'>
                {content}
            </div>
        )
    }

    render() {
        const content =  (
                <>
                    <div ref={c=>this._modal=c as HTMLDivElement} className={this.getClasses()}  tabIndex={-1} id={this.domId} role="dialog" onMouseUp={this.state.shadowClose ? ()=>{
                        this.close()
                    }:undefined}>
                        <div className={this.getDialogClasses()} style={this.getDialogStyles()} role="document" onMouseUp={this.state.shadowClose ? (e)=>{
                            e.stopPropagation()
                            e.preventDefault()
                        }:undefined}>
                            <div className="modal-content">
                                {this.state.header?<div className="modal-header">
                                    <h5 className="modal-title">{this.state.title}</h5>
                                    {this.state.isCloseBtn?<button type="button" className="btn-close" onClick={()=>{
                                        this.close();
                                    }}>
                                    </button>:null}
                                </div>:null}
                                <div className="modal-body">
                                    {this.state.type === ModalLoading?<React.Fragment>
                                        <Load/>&nbsp;&nbsp;&nbsp;{this.state.content}
                                    </React.Fragment>:this.state.content}
                                </div>
                                {this.renderFooter()}
                            </div>
                        </div>
                    </div>
                    <div ref={c=>this._shadow=c as HTMLDivElement} className={this.getShadowClasses()} id={`${this.domId}-shadow`}/>
                </>
            );
        // }

        return ReactDOM.createPortal(
            content,document.body
        );
    }
}

const Modal = CKModal
export default Modal;