import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import './css/ImageView.less';
import common from "./Common";
import RImage from "./RImage";
import { ComponentProps } from './components/common';

interface Props extends ComponentProps {
    src:any[]
}

interface State {
    src:any[]
    currIdx:number
}

export class ImageView extends React.Component<Props,State> {
    static propTypes = {
        src: PropTypes.array,
    };
    static defaultProps = {
        src: [],
    };

    domId:string
    mainDom:HTMLDivElement
    constructor(props:any) {
        super(props);
        this.state = {
            src: this.props.src,
            currIdx: 0,
        }

        this.domId = 'img-view-'+common.RandomString(16);
        if (this.props.id) {
            this.domId = this.props.id;
        }
    }

    componentDidMount() {

    }

    UNSAFE_componentWillReceiveProps(nextProps:Props) {
        if (nextProps.src !== this.state.src) {
            this.setState({
                src:nextProps.src,
                currIdx:0,
            })
        }
    }

    getClasses() {
        const base = 'img-view d-none';

        return classNames(base,this.props.className);
    }

    closeHandler = ()=>{
        this.mainDom.classList.add('d-none');
    }

    show(srcList:any[]) {
        let src = this.state.src;
        if (srcList) {
            if (typeof srcList === "string") {
                src = [srcList]
            } else {
                src = srcList;
            }
        }
        this.setState({
            src:src,
            currIdx:0,
        },()=>{
            this.mainDom.classList.remove('d-none');
        })
    }

    next = () => {
        if (this.state.src.length <= 0) return
        let idx = 0;
        if (this.state.currIdx+1 < this.state.src.length) {
            idx = this.state.currIdx+1;
        }
        this.setState({currIdx:idx});
    }

    previous = () => {
        if (this.state.src.length <= 0) return
        let idx = this.state.src.length-1;
        if (this.state.currIdx > 0) {
            idx = this.state.currIdx - 1;
        }
        this.setState({currIdx:idx});
    }

    render() {
        const data = this.state.src[this.state.currIdx]
        const is_obj = typeof data === "object"
        const con = (
            <div id={this.domId} ref={(c:any)=>this.mainDom=c} className={this.getClasses()}>
                <div id='image-main' className='image-main'>
                    <div className='top'>
                        <span>{is_obj?data.title:''}</span>
                        <button className="btn-close" onClick={this.closeHandler}>
                            <span>
                                <svg fill="white" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 512 512" >
                                <path
                                    d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4 L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1 c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1 c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"></path>
                                </svg>
                            </span>
                        </button>
                    </div>
                    <figure>
                        <RImage display='full' className="img" width='100vw' height='100vw' src={is_obj?data.src:data}/>
                    </figure>
                    <div className='foot'>
                        <figcaption className="title"></figcaption>
                        <div>{this.state.currIdx+1} / {this.state.src.length}</div>
                    </div>
                </div>
                {this.renderSwitchButton()}
            </div>
        );


        return ReactDom.createPortal(con,document.body);
    }

    renderSwitchButton() {
        if (this.state.src.length <= 1) {
            return null
        }
        return <>
            <button type="button" className="btn" style={{left:'10px'}} onClick={this.previous}>
                    <span>
                        <svg fill="#fff" version="1.1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" width="100%" height="100%" viewBox="0 0 512 512" >
                            <path
                                d="M213.7,256L213.7,256L213.7,256L380.9,81.9c4.2-4.3,4.1-11.4-0.2-15.8l-29.9-30.6c-4.3-4.4-11.3-4.5-15.5-0.2L131.1,247.9 c-2.2,2.2-3.2,5.2-3,8.1c-0.1,3,0.9,5.9,3,8.1l204.2,212.7c4.2,4.3,11.2,4.2,15.5-0.2l29.9-30.6c4.3-4.4,4.4-11.5,0.2-15.8 L213.7,256z"></path>
                        </svg>
                    </span>
            </button>
            <button type="button" className="btn" style={{right:'10px'}} onClick={this.next}>
                    <span>
                        <svg fill="#fff" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 512 512" >
                        <path
                            d="M298.3,256L298.3,256L298.3,256L131.1,81.9c-4.2-4.3-4.1-11.4,0.2-15.8l29.9-30.6c4.3-4.4,11.3-4.5,15.5-0.2l204.2,212.7 c2.2,2.2,3.2,5.2,3,8.1c0.1,3-0.9,5.9-3,8.1L176.7,476.8c-4.2,4.3-11.2,4.2-15.5-0.2L131.3,446c-4.3-4.4-4.4-11.5-0.2-15.8 L298.3,256z"></path>
                        </svg>
                    </span>
            </button>
        </>
    }
}

export default ImageView;