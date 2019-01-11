import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import common from "./Common";
import ReactDOM from "react-dom";
import Button from './Button';
import Load from "./Load";
import './css/Modal.less';

const ModalAlert = 0;
const ModalConfirm = 1;
const ModalLoading = 2;
const ModalView = 3;
const BaseModal = 1050;

class CKModal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            content:'',
            title:'',
            isCloseBtn:true,
            header:true,
            type:ModalAlert,
            center:this.props.center,
            fade:this.props.fade,
            show:false,
            width:null
        };
        //modal type
        this.modalType = ModalAlert;
        //alert confirm callback function
        this.callback = null;

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
        document.body.style.paddingRight = '15px';
        this.is_open = true;
        if (this.props.blurSelector) {
            let selector = document.querySelector(this.props.blurSelector);
            if (selector) {
                selector.classList.add("ck-model-blur");
            }
        }
    }

    close() {
        this._modal.classList.remove("d-block");
        this._shadow.classList.remove("show");
        this._shadow.classList.add("d-none");
        let modals = parseInt(document.body.dataset.modals);
        modals -= 1;
        document.body.dataset.modals = modals+'';
        if (modals === 0) {
            document.body.classList.remove("modal-open");
            document.body.style.paddingRight = '0';
            if (this.props.blurSelector) {
                let selector = document.querySelector(this.props.blurSelector);
                if (selector) {
                    selector.classList.remove("ck-model-blur");
                }
            }
        }
        this.is_open = false;
    }

    closeHandler = (e)=>{
        if (typeof this.props.onClose === 'function') {
            this.props.onClose();
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
    alert(opt) {
        this.callback = opt.callback||null;
        this.modalType = ModalAlert;
        this.setState({
            title:opt.title||'提示',
            content:opt.content||opt||'',
            isCloseBtn:typeof opt.close !== 'undefined'?opt.close:true,
            header:typeof opt.header !== 'undefined'?opt.header:true,
            type:ModalAlert,
            center:typeof opt.center === 'undefined'?this.props.center:opt.center,
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
    confirm(opt) {
        this.callback = opt.callback||null;
        this.modalType = ModalConfirm;
        this.setState({
            title:opt.title||'提示',
            content:opt.content||'',
            isCloseBtn:typeof opt.close !== 'undefined'?opt.close:true,
            header:typeof opt.header !== 'undefined'?opt.header:true,
            type:ModalConfirm,
            center:typeof opt.center === 'undefined'?this.props.center:opt.center,
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
            header:typeof opt.header !== 'undefined'?opt.header:true,
            type:ModalLoading,
            center:typeof opt.center === 'undefined'?this.props.center:opt.center,
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
        this.setState({
            title:opt.title||'提示',
            content:opt.content||'',
            isCloseBtn:typeof opt.close !== 'undefined'?opt.close:true,
            header:typeof opt.header !== 'undefined'?opt.header:true,
            width:typeof opt.width !== 'undefined'?opt.width:null,
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
            base = classNames(base,"modal-lg");
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
                    <Button data-dismiss="modal" onClick={e=>{
                        this.close();
                        if (typeof this.callback === 'function') {
                            this.callback(1);
                        }
                    }}>确定</Button>
                );
                break;
            case ModalConfirm:
                content = (
                    <React.Fragment>
                        <Button onClick={()=>{
                            this.close();
                            if (typeof this.callback === 'function') {
                                this.callback(1);
                            }
                        }}>确定</Button>
                        <Button onClick={()=>{
                            this.close();
                            if (typeof this.callback === 'function') {
                                this.callback(0);
                            }
                        }} theme='secondary'>取消</Button>
                    </React.Fragment>
                );
                break;
            default:
                return null;
        }

        return (
            <div className="modal-footer">
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
    blurSelector: PropTypes.string
};

CKModal.defaultProps = {
    center:false,
    fade:false
};

export default CKModal;