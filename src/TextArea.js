import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import common from "./Common";
import './css/TextArea.less';
import ButtonGroup from "./ButtonGroup";
import Button from "./Button";
import Dropdown from "./Dropdown";
import Drag from './components/Drag';
class TextArea extends React.Component {
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

    componentDidMount() {
        document.execCommand('insertBrOnReturn',false,true);
        document.execCommand("styleWithCSS",false,true);
        this.initImageResize();
    }

    componentWillReceiveProps(nextProp) {
        this.setState({value: nextProp.data,html:nextProp.data});
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.htmlMode) {
            // return true;
            return nextState.value !== this.state.html;
        }
        return nextState.value !== this.state.value;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.htmlMode) {
            this.initImageResize();
            this.input.querySelectorAll("img").forEach((elm)=>{
                elm.addEventListener('focus',this.bindingResize,false);
                elm.addEventListener('blur',this.unBindingResize,false)
            })
        }
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
        //html mode
        if (this.props.htmlMode) {
            base = classNames(base,'ck-text-html');
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
        // if (this.props.height) {
        //     base.height = this.props.height;
        // }

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
        // if (this.props.height) {
        //     base = classNames(base,'h-100')
        // }

        if (this.props.htmlMode) {
            base = classNames(base,'overflow-auto position-relative',this.props.htmlBar?'has-header-bar':'')
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
            html: this.input.innerHTML,
            // value: this.input.innerHTML
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
            paste = paste.replace(/\r\n/g,"\n");
            if (!/\n/.test(paste)) {
                this.insertHtmlNode(document.createTextNode(paste));
                return
            }
            // paste = paste.replace(/\s/g,"&nbsp;");
            let pasteContents = paste.split(/\n/);
            pasteContents.forEach((val)=>{
                if (val === '') {
                    return
                }
                let div = document.createElement("div");
                div.innerHTML = val.replace(/\s/g,"&nbsp;");
                this.insertHtmlNode(div);
            });
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
            img.tabIndex = 1;
            this.insertHtmlNode(img);
            img.addEventListener('focus',this.bindingResize,false)
            img.addEventListener('blur',this.unBindingResize,false)
        };
        read.readAsDataURL(file);
    }

    insertHtmlNode(node) {
        const selection = window.getSelection();
        if (!selection.rangeCount) return false;
        selection.deleteFromDocument();
        selection.getRangeAt(0).insertNode(node);
        selection.collapseToEnd();
        this.inputHandler(null);
    }

    execCommand(cmd,args) {
        document.execCommand(cmd,false,args);
    }

    initImageResize() {
        this.resize = {};
        let resize,rightBottom;
        if (this.input.querySelector('.img-edit')) {
            resize = this.input.querySelector('.img-edit');
            rightBottom = resize.querySelector('.img-edit-point')
        } else {
            resize = document.createElement('div');
            rightBottom = document.createElement('div');
        }

        resize.className = "img-edit d-none";
        rightBottom.className = "img-edit-point";
        rightBottom.addEventListener("mousedown",(e)=>{
            e.stopPropagation();
            e.preventDefault();
        },false);
        new Drag(rightBottom,rightBottom,{
            start:()=>{
                this.resize.width = resize.clientWidth;
                this.resize.height = resize.clientHeight;
                return true;
            },
            move:(move)=>{
                resize.style.width = move.x + 7 + 'px';
                resize.style.height = move.y + 7 + 'px';
            },
            end:()=>{
                this.currentResize.style.width = resize.style.width;
                this.currentResize.style.height = resize.style.height;
                return true;
            }
        });

        resize.appendChild(rightBottom);
        this.input.appendChild(resize);
        this.resizeImg = resize;
        this.resizeRB = rightBottom;
    }

    bindingResize = (e) => {
        let elm = e.currentTarget;
        this.currentResize = elm;
        elm.classList.add("img-selected");
        this.resizeImg.style.width = elm.clientWidth+2+'px';
        this.resizeImg.style.height = elm.clientHeight+2+'px';
        this.resizeImg.style.left = elm.offsetLeft+'px';
        this.resizeImg.style.top = elm.offsetTop+'px';
        this.resizeRB.style.top = (elm.clientHeight-5)+'px';
        this.resizeRB.style.left = (elm.clientWidth-5)+'px';
        this.resizeImg.classList.remove('d-none');
    };
    unBindingResize = (e)=>{
        let elm = e.currentTarget;
        this.currentResize = null;
        elm.classList.remove("img-selected");
        this.resizeImg.classList.add('d-none');
    };
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
            <div ref={c=>this.mainDom=c} className={this.getMainClasses()} style={this.getMainStyles()}>
                {this.renderLabel()}
                {this.props.htmlMode?this.renderHtmlEditIcon():null}
                {this.props.htmlMode?this.renderHtmlEdit():this.renderTextArea()}
                {this.renderSummary()}
            </div>
        );
    }

    renderTextArea() {
        let style = {};
        if (this.props.height) {
            style['height'] = this.props.height;
        }
        return <textarea ref={c => this.input = c} {...this.props} style={style} onChange={this.changeHandler} value={this.state.value??''} className={this.getInputClasses()} id={this.domId}/>
    }

    renderHtmlEdit() {
        let style = {};
        if (this.props.height) {
            style['height'] = this.props.height;
        }
        return <div ref={c=>this.input=c}
                    contentEditable={!this.props.readOnly}
                    id={this.domId}
                    className={this.getInputClasses()}
                    style={style}
                    onInput={this.inputHandler}
                    onPaste={this.pasteHandler}
                    // onDragOver={e=>{e.preventDefault();}}
                    // onDragEnd={this.dragEndHandler}
                    onDrop={this.dropHandler}
                    dangerouslySetInnerHTML={{__html:this.getContent()}}
                />
    }

    getContent() {
        if (!this.state.value &&this.input) {
            this.input.innerHTML = '';
        }
        return this.state.value??this.state.html;
    }

    renderHtmlEditIcon() {
        if (!this.props.htmlBar) {
            return null;
        }
        let size = this.props.size ?? 'sm';
        let iconClass = 'icon-'+size;
        return <div className='header-bar'>
            <ButtonGroup className='bg-white'>
                <Button className={iconClass} size={size} icon='bold' outline theme='secondary' tip='Bold' onClick={()=>{
                    this.execCommand('bold',null);
                }}/>
                <Button className={iconClass} size={size} icon='italic' outline theme='secondary' tip='Italic' onClick={()=>{
                    this.execCommand('italic',null);
                }}/>
                <Button className={iconClass} size={size} icon='underline' outline theme='secondary' tip='Underline' onClick={()=>{
                    this.execCommand('underline',null);
                }}/>
                <Button className={iconClass} size={size} icon='undo' outline theme='secondary' tip='Undo' onClick={()=>{
                    this.execCommand('undo',null);
                }}/>
                <Button className={iconClass} size={size} icon='redo' outline theme='secondary' tip='Redo' onClick={()=>{
                    this.execCommand('redo',null);
                }}/>
                <Dropdown size={size} outline icon='text-height' data={[
                    {text:'x-Small',value:'1'},
                    {text:'Small',value:'2'},
                    {text:'Medium',value:'3'},
                    {text:'Large',value:'4'},
                    {text:'x-Large',value:'5'},
                    {text:'xx-Large',value:'6'},
                    {text:'xxx-Large',value:'7'},
                ]} onChange={(txt,val)=>{
                    this.execCommand('fontSize',val);
                }}/>
                <Dropdown size={size} outline icon='highlighter' data={[
                    ['red','orange','yellow','green','blue','purple'],
                    ['white','gray','black','brown','silver','purple'],
                ]} grid onChange={(txt,val)=>{
                    console.log(txt,val);
                    this.execCommand('foreColor',val);
                }}/>

                <Button className={iconClass} size={size} icon='eraser' outline theme='secondary' tip='Clean' onClick={()=>{
                    this.execCommand('removeFormat',null);
                }}/>
                {/*<Button className='icon' size='sm' icon='wrench' outline theme='secondary' tip='Clean' onClick={()=>{*/}
                {/*    console.log(document.queryCommandState('fontSize'));*/}
                {/*    console.log(document.queryCommandValue('fontSize'));*/}
                {/*}}/>*/}
            </ButtonGroup>
            <Button className={iconClass+' float-right'} id={this.domId+'-btn-full'} size={size} icon='expand-arrows-alt' outline theme='secondary' tip='Full Screen' onClick={(e)=>{
                if (this.isFull) {
                    this.isFull = false;
                    document.body.classList.remove('full-none-scroll');
                    this.mainDom.classList.remove('full');
                    this.input.classList.remove('full-input');
                    e.currentTarget.querySelector('i').className = 'fas fa-expand-arrows-alt';
                } else {
                    this.isFull = true;
                    document.body.classList.add('full-none-scroll');
                    this.mainDom.classList.add('full');
                    this.input.classList.add('full-input');
                    e.currentTarget.querySelector('i').className = 'fas fa-compress-arrows-alt';
                }
            }}/>
        </div>
    }
}

TextArea.propTypes = {
    id         : PropTypes.string,
    label      : PropTypes.string,
    data       : PropTypes.any,
    summary    : PropTypes.string,
    readOnly   : PropTypes.bool,
    size       : PropTypes.string,
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
    htmlMode: PropTypes.bool,
    htmlBar: PropTypes.bool,
};

TextArea.defaultProps = {
    label   : '',
    data    : null,
    summary : '',
    readOnly: false,
    htmlMode: false,
    htmlBar: true,
};

export default TextArea;