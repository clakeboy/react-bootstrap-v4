/**
 * Created by clakeboy on 2018/5/25.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import common from "./Common";
import $ from 'jquery';
import Icon from './Icon';
import Button from './Button';

const ModalAlert = 0;
const ModalConfirm = 1;
const ModalLoading = 2;
const ModalView = 3;

class Modal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            content:'',
            title:'',
            isCloseBtn:true,
            type:ModalAlert
        };
        //modal type
        this.modalType = ModalAlert;
        //alert confirm callback function
        this.callback = null;

        this.domId = common.RandomString(16);
        if (this.props.id) {
            this.domId = this.props.id;
        }
    }

    componentDidMount() {
        $(`#${this.domId}`).on('show.bs.modal',this.openHandler)
            .on('hide.bs.modal',this.closeHandler);
    }

    componentWillUnmount() {
        $(`#${this.domId}`).modal('dispose');
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

    open(opt) {
        $(`#${this.domId}`).modal(opt);
    }

    close() {
        $(`#${this.domId}`).modal('hide');
    }

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
            isCloseBtn:true,
            type:ModalAlert
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
            isCloseBtn:true,
            type:ModalConfirm
        },()=>{
            this.open({
                backdrop:'static',
                keyboard:false,
            });
        });
    }

    /**
     * modal loading method
     * @param content
     */
    loading(content) {
        this.modalType = ModalLoading;
        this.setState({
            title:'提示',
            // content:(
            //     <React.Fragment>
            //         <Icon icon='spinner'/>&nbsp;&nbsp;&nbsp;{content}
            //     </React.Fragment>
            // ),
            content:content,
            isCloseBtn:false,
            type:ModalLoading
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
            isCloseBtn:true,
            type:ModalView
        },()=>{
            this.open({
                backdrop:'static',
                keyboard:false,
            });
        });
    }

    getClasses() {
        let base = 'modal fade';
        if (this.modalType === ModalView) {
            base = classNames(base,"bd-example-modal-lg");
        }

        return classNames(base,this.props.className);
    }

    getDialogClasses() {
        let base = 'modal-dialog';
        if (this.modalType === ModalView) {
            base = classNames(base,"modal-lg");
        }
        if (this.props.center) {
            base = classNames(base,"modal-dialog-centered");
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
                    }}>确定</Button>
                );
                break;
            case ModalConfirm:
                content = (
                    <React.Fragment>
                        <Button onClick={()=>{
                            if (typeof this.callback === 'function') {
                                this.callback(1);
                            }
                            this.close();
                        }}>确定</Button>
                        <Button onClick={()=>{
                            if (typeof this.callback === 'function') {
                                this.callback(0);
                            }
                            this.close();
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
        return (
            <div className={this.getClasses()} tabIndex="-1" id={this.domId} role="dialog">
                <div className={this.getDialogClasses()} role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{this.state.title}</h5>
                            {this.state.isCloseBtn?<button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>:null}
                        </div>
                        <div className="modal-body">
                            {this.state.type === ModalLoading?<React.Fragment>
                                <Icon icon='spinner' spin/>&nbsp;&nbsp;&nbsp;{this.state.content}
                            </React.Fragment>:this.state.content}
                        </div>
                        {this.renderFooter()}
                    </div>
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    center: PropTypes.bool,
};

Modal.defaultProps = {

};

export default Modal;