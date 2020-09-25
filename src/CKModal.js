import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import common from "./Common";
import ReactDOM from "react-dom";
import Button from './Button';
import Load from "./Load";
import './css/Modal.less';
import ButtonGroup from "./ButtonGroup";

const ModalAlert = 0;
const ModalConfirm = 1;
const ModalLoading = 2;
const ModalView = 3;
const BaseModal = 1050;

const defBtns = {
    ok:'确定',
    cancel:'取消',
};

class CKModal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            content:'',
            title:'',
            isCloseBtn:true,
            header:this.props.header,
            type:ModalAlert,
            center:this.props.center,
            fade:this.props.fade,
            show:false,
            size:'lg',
            width:null,
            btns:defBtns,
        };
        //modal type
        this.modalType = ModalAlert;
        //alert confirm callback function
        this.callback = null;
        //event
        this.evtClosed = null;
        this.evtOpened = null;

        this.domId = 'modal-'+common.RandomString(16);
        if (this.props.id) {
            this.domId = this.props.id;
        }
        this.offsetIndex = document.querySelectorAll(".modal").length * 10;
        this.is_open = false;
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.content !== nextState.content
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    hasScrollbar() {
        return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight);
    }

    open() {
        this._modal.classList.add("d-block");
        this._shadow.classList.remove("d-none");
        this._shadow.classList.add('show');
        let modals = parseInt(document.body.dataset.modals);
        if (!modals) {
            modals = 0;
        }
        if (!this.is_open) {
            modals += 1;
        }
        document.body.dataset.modals = modals+'';
        document.body.classList.add("modal-open");
        if (this.hasScrollbar()) {
            document.body.style.paddingRight = '15px';
        }
        this.is_open = true;
        if (this.props.blurSelector) {
            let selector = document.querySelector(this.props.blurSelector);
            if (selector) {
                selector.classList.add("ck-model-blur");
            }
        }
    }

    close() {
        if (!this.is_open) {
            return;
        }
        this._modal.classList.remove("d-block");
        this._shadow.classList.remove("show");
        this._shadow.classList.add("d-none");
        let modals = parseInt(document.body.dataset.modals);
        modals -= 1;
        document.body.dataset.modals = modals+'';
        if (modals === 0) {
            document.body.classList.remove("modal-open");
            if (this.hasScrollbar()) {
                document.body.style.paddingRight = '0';
            }
            if (this.props.blurSelector) {
                let selector = document.querySelector(this.props.blurSelector);
                if (selector) {
                    selector.classList.remove("ck-model-blur");
                }
            }
        }
        this.is_open = false;
        this.closeHandler('close');
    }

    closeHandler = (e)=>{
        if (typeof this.props.onClose === 'function') {
            this.props.onClose();
        }
        if (typeof this.evtClosed === 'function') {
            this.evtClosed();
            this.evtClosed = null;
        }
    };

    openHandler = (e) =>{
        if (typeof this.props.onOpen === 'function') {
            this.props.onOpen();
        }
    };

    /**
     * modal alert method
     * opt example
     * {
     *      title: '',
     *      content: ''
     *      [,callback: func]
     * }
     * @param opt object
     */
    alert(opt,cb) {
        this.callback = opt.callback||cb||null;
        this.modalType = ModalAlert;
        this.setState({
            title:opt.title||'提示',
            content:opt.content||opt||'',
            isCloseBtn:typeof opt.close !== 'undefined'?opt.close:true,
            header:typeof opt.header !== 'undefined'?opt.header:this.props.header,
            type:ModalAlert,
            center:typeof opt.center === 'undefined'?this.props.center:opt.center,
            width:typeof opt.width !== 'undefined'?opt.width:null,
            btns: typeof opt.btns != 'undefined' ? opt.btns:defBtns,
        },()=>{
            this.open({
                backdrop:'static',
                keyboard:false,
            });
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
    confirm(opt,cb) {
        this.callback = opt.callback||cb||null;
        this.modalType = ModalConfirm;
        this.setState({
            title:opt.title||'提示',
            content:opt.content||'',
            isCloseBtn:typeof opt.close !== 'undefined'?opt.close:true,
            header:typeof opt.header !== 'undefined'?opt.header:this.props.header,
            type:ModalConfirm,
            center:typeof opt.center === 'undefined'?this.props.center:opt.center,
            width:typeof opt.width !== 'undefined'?opt.width:null,
            btns: typeof opt.btns != 'undefined' ? opt.btns:defBtns,
        },()=>{
            this.open({
                backdrop:'static',
                keyboard:false,
            });
        });
    }

    /**
     * modal loading method
     * @param opt
     */
    loading(opt) {
        this.modalType = ModalLoading;
        this.setState({
            title:opt.title||'提示',
            // content:(
            //     <React.Fragment>
            //         <Icon icon='spinner'/>&nbsp;&nbsp;&nbsp;{content}
            //     </React.Fragment>
            // ),
            content:opt.content||opt||'',
            isCloseBtn:false,
            header:typeof opt.header !== 'undefined'?opt.header:this.props.header,
            type:ModalLoading,
            center:typeof opt.center === 'undefined'?this.props.center:opt.center,
            width:typeof opt.width !== 'undefined'?opt.width:null,
        },()=>{
            this.open({
                backdrop:'static',
                keyboard:false,
            });
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
    view(opt) {
        this.callback = opt.callback||null;
        this.modalType = ModalView;
        this.evtClosed = opt.close||null;
        this.setState({
            title:opt.title||'提示',
            content:opt.content||'',
            isCloseBtn:typeof opt.close !== 'undefined'?opt.close:true,
            header:typeof opt.header !== 'undefined'?opt.header:this.props.header,
            width:typeof opt.width !== 'undefined'?opt.width:null,
            size: typeof opt.size !== 'undefined'?opt.size:'lg',  // sm,lg(default),xl
            type:ModalView,
            center:typeof opt.center === 'undefined'?this.props.center:opt.center,
        },()=>{
            this.open({
                backdrop:'static',
                keyboard:false,
            });
        });
    }

    getClasses() {
        let base = 'modal';
        if (this.modalType === ModalView) {
            base = classNames(base,"bd-example-modal-lg");
        }
        if (this.state.fade) {
            base = classNames(base,'ck-modal-fade');
        }

        if (this.state.show) {
            base = classNames(base,'d-block');
        } else {
            base = classNames(base,'d-none');
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
        let base = {};
        if (this.state.width) {
            base['maxWidth'] = this.state.width;
        }
        return base;
    }

    getShadowClasses() {
        let base = 'modal-backdrop ck-modal-shadow';

        if (this.state.show) {
            base = classNames(base,'show');
        } else {
            base = classNames(base,'d-none');
        }

        return classNames(base,this.props.className);
    }

    renderFooter() {
        let content = null;
        switch (this.state.type) {
            case ModalAlert:
                content = (
                    <Button className='' block data-dismiss="modal" onClick={e=>{
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
                            }} theme='secondary'>{this.state.btns['cancel']}</Button>
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
        let modalIndex = {zIndex:BaseModal+this.offsetIndex+2};
        let shadowIndex = {zIndex:BaseModal+this.offsetIndex+1};
        let content =  (
            <React.Fragment>
                <div ref={c=>this._modal=c} className={this.getClasses()} style={modalIndex} tabIndex="-1" id={this.domId} role="dialog">
                    <div className={this.getDialogClasses()} style={this.getDialogStyles()} role="document">
                        <div className="modal-content">
                            {this.state.header?<div className="modal-header">
                                <h5 className="modal-title">{this.state.title}</h5>
                                {this.state.isCloseBtn?<button type="button" className="close" onClick={()=>{
                                    this.close();
                                }}>
                                    <span aria-hidden="true">&times;</span>
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
                <div ref={c=>this._shadow=c} className={this.getShadowClasses()} style={shadowIndex} id={`${this.domId}-shadow`}/>
            </React.Fragment>
        );

        return ReactDOM.createPortal(
            content,document.body
        );
    }
}

CKModal.propTypes = {
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    center: PropTypes.bool,
    fade: PropTypes.bool,
    header: PropTypes.bool,
    blurSelector: PropTypes.string
};

CKModal.defaultProps = {
    center:false,
    fade:false,
    header:true
};

export default CKModal;