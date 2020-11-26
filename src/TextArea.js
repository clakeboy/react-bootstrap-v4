import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import common from "./Common";
import './css/TextArea.less';
class TextArea extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            html: this.props.data,
            value: this.props.data
        };

        this.domId = 'text-area-'+common.RandomString(16);
        if (this.props.id) {
            this.domId = this.props.id;
        }
    }

    componentWillReceiveProps(nextProp) {
        this.setState({value: nextProp.data});
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.htmlMode) {
            return nextState.value !== this.state.html;
        }
        return nextState.value !== this.state.value;
    }

    getValue() {
        if (this.props.htmlMode) return this.state.html;
        return this.state.value;
    }

    setValue(val) {
        if (this.props.htmlMode) {
            this.setValue({
                value:val,
                html:val,
            });
            return
        }
        this.setState({value: val});
    }

    getMainClasses() {
        let base = 'form-group ck-text-area';
        if (this.props.absolute) {
            base = classNames(base, 'position-absolute');
        }
        return classNames(base, this.props.className);
    }

    getMainStyles() {
        //default style
        let base = {};
        //width
        if (this.props.width) {
            base.width = this.props.width;
        }
        //height
        if (this.props.height) {
            base.height = this.props.height;
        }

        if (this.props.absolute) {
            base.top  = this.props.y;
            base.left = this.props.x;
        }

        if (!this.props.label) {
            base.marginBottom = '0';
        }

        return common.extend(base, this.props.style)
    }

    getInputClasses() {
        let base = 'form-control';
        //readonly
        if (this.props.plaintext) {
            base = 'form-control-plaintext';
        }
        //html mode
        if (this.props.htmlMode) {
            base = classNames(base,'html');
        }
        //size
        let size;
        switch (this.props.size) {
            case 'lg':
                size = 'form-control-lg';
                break;
            case 'sm':
                size = 'form-control-sm';
                break;
            case 'xs':
                size = 'ck-text-area-xs';
                break;
            default:
                size = ''
        }

        base = classNames(base, size);
        //height
        if (this.props.height) {
            base = classNames(base,'h-100')
        }

        if (this.props.htmlMode) {
            base = classNames(base,'overflow-auto')
        }

        return classNames(base, size);
    }

    /*********************
     * Event
     *********************/
    changeHandler = (e) => {
        this.setState({
            value: e.target.value
        });
        if (this.props.onChange && typeof this.props.onChange === 'function') {
            this.props.onChange(e.target.value, this);
        }
    };

    inputHandler = (e) =>{
        this.setState({
            html: this.input.innerHTML
        },()=>{
            if (this.props.onChange && typeof this.props.onChange === 'function') {
                this.props.onChange(this.state.html, this);
            }
        });
    };

    pasteHandler = (e)=>{
        e.stopPropagation();
        e.preventDefault();
        if (e.clipboardData.types.indexOf('Files') !== -1) {
            let file = e.clipboardData.files[0];
            this.insertImage(file);
        } else {
            let paste = (e.clipboardData || window.clipboardData).getData('text');
            this.insertHtmlNode(document.createTextNode(paste));
        }
    };

    dropHandler = (e)=> {
        e.stopPropagation();
        e.preventDefault();
        if (e.dataTransfer.files.length > 0) {
            for (let file of e.dataTransfer.files) {
                this.insertImage(file);
            }
        }
    };
    /*********************
     * edit html process method
     *********************/
    insertImage(file) {
        let reg = /^image\/(png|jpg|jpeg|gif)/ig;
        if (!reg.test(file.type)) {
            console.log('can not insert non-picture file');
            return
        }
        let read = new FileReader();
        read.onload = e=> {
            let img = document.createElement('img');
            img.src = read.result;
            this.insertHtmlNode(img);
        };
        read.readAsDataURL(file);
    }

    insertHtmlNode(node) {
        const selection = window.getSelection();
        if (!selection.rangeCount) return false;
        selection.deleteFromDocument();
        selection.getRangeAt(0).insertNode(node);
        this.inputHandler(null);
    }
    /*********************
     * render method
     *********************/
    renderLabel() {
        if (this.props.label === '') {
            return null;
        }
        return (
            <label htmlFor={this.domId}>{this.props.label}</label>
        )
    }

    renderSummary() {
        if (this.props.summary === '') {
            return null
        }
        return (
            <small className="form-text text-muted text-truncate">
                {this.props.summary}
            </small>
        )
    }

    render() {
        return (
            <div className={this.getMainClasses()} style={this.getMainStyles()}>
                {this.renderLabel()}
                {this.props.htmlMode?this.renderHtmlEdit():this.renderTextArea()}
                {this.renderSummary()}
            </div>
        );
    }

    renderTextArea() {
        return <textarea ref={c => this.input = c} {...this.props} onChange={this.changeHandler} value={this.state.value??''} className={this.getInputClasses()} id={this.domId}/>
    }

    renderHtmlEdit() {
        console.log(this.state.value);
        return <div ref={c=>this.input=c}
                    {...this.props}
                    contentEditable={!this.props.readOnly}
                    id={this.domId}
                    className={this.getInputClasses()}
                    onInput={this.inputHandler}
                    onPaste={this.pasteHandler}
                    // onDragOver={e=>{e.preventDefault();}}
                    // onDragEnd={this.dragEndHandler}
                    onDrop={this.dropHandler}
                    dangerouslySetInnerHTML={{__html:this.state.value??''}}
                >
                </div>
    }
}

TextArea.propTypes = {
    id         : PropTypes.string,
    label      : PropTypes.string,
    data       : PropTypes.any,
    summary    : PropTypes.string,
    readOnly   : PropTypes.bool,
    width      : PropTypes.string,
    height     : PropTypes.string,
    placeholder: PropTypes.string,
    calendar   : PropTypes.bool,
    onChange   : PropTypes.func,
    plaintext  : PropTypes.bool,
    row        : PropTypes.number,
    absolute: PropTypes.bool,
    x       : PropTypes.string,
    y       : PropTypes.string,
    htmlMode: PropTypes.bool
};

TextArea.defaultProps = {
    label   : '',
    data    : null,
    summary : '',
    readOnly: false,
    htmlMode: false
};

export default TextArea;