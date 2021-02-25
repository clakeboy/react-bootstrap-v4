import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import './css/Image.less';
import Icon from './Icon';

class RImage extends React.Component {
    constructor(props) {
        super(props);
        let is_load,src=null;
        if (typeof this.props.src === 'string' || !this.props.src) {
            is_load = false;
        } else {
            is_load = true;
            src = this.props.src;
        }

        this.state = {
            isLoad:is_load,
            src:src,
            display:null
        };
    }

    componentDidMount() {
        if (!this.state.isLoad) {
            this.loadImage(this.props.src);
        }
    }

    loadImage(src) {
        let img = new Image();
        img.onload = ()=>{
            img.onload = null;
            let dis = '';
            if (img.width > img.height) {
                dis = 'horizontal';
            } else if (img.height > img.width) {
                dis = 'vertical';
            }
            this.setState({
                isLoad:true,
                src:img.src,
                display:dis
            });
        };
        img.src = src;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.src !== this.props.src) {
            let is_load = true;
            if (typeof nextProps.src === 'string' || !nextProps.src) {
                is_load = false;
            }
            this.setState({isLoad:is_load},()=>{
                this.loadImage(nextProps.src);
            })
        }
    }

    getClasses() {
        let base = 'ck-image d-flex';

        if (this.props.border || !this.state.isLoad) {
            base = classNames(base,'border');
        }

        if (this.props.circle) {
            base = classNames(base,'ck-image-circle');
        }

        if (this.props.onClick) {
            base = classNames(base,'ck-image-click');
        }

        if (this.props.display === 'center') {
            if (this.state.display === 'vertical') {
                base = classNames(base,'align-items-center');
            } else if (this.state.display === 'horizontal') {
                base = classNames(base,'justify-content-center');
            } else {
                base = classNames(base,'justify-content-center','align-items-center');
            }
        } else {
            base = classNames(base,'justify-content-center','align-items-center');
        }

        return classNames(base,this.props.className);
    }

    getStyles() {
        let base = {
            height: '100px',
            width:'100px'
        };

        if (this.props.height) {
            base.height = this.props.height;
        }

        if (this.props.width) {
            base.width = this.props.width;
        }

        return base;
    }

    clickHandler = (e)=>{
        if (typeof this.props.onClick === 'function') {
            this.props.onClick(e);
        }
    };

    render() {
        let imgStyle = {};
        if (this.props.display === 'center') {
            if (this.state.display === 'vertical') {
                imgStyle.maxWidth = '100%';
            } else {
                imgStyle.maxHeight = '100%';
            }
        } else {
            imgStyle.maxWidth = '100%';
            imgStyle.maxHeight = '100%';
        }

        return (
            <div className={this.getClasses()} onClick={this.clickHandler} style={this.getStyles()}>
                {this.state.isLoad?
                    <img src={this.state.src} style={imgStyle}/>:
                    <Icon icon='image'/>
                }
            </div>
        );
    }
}

RImage.propTypes = {
    src: PropTypes.any,
    height: PropTypes.string,
    width: PropTypes.string,
    border: PropTypes.bool,
    circle: PropTypes.bool,
    onClick: PropTypes.func,
    display: PropTypes.oneOf(['center','full'])
};

RImage.defaultProps = {
    display:'center'
};

export default RImage;