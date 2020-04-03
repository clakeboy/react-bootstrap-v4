import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import './css/DropPanel.less';
import './css/TriangleTarget.less';
import common from "./Common";

class DropPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.targetDom = document.querySelector(this.props.selector);
        this.iniTarget();
    }

    componentWillUnmount() {
        this.destroy();
    }

    getClasses() {
        let base = 'ck-drop-panel d-none';

        if (this.props.border) {
            base = classNames(base,'border');
        }

        if (this.props.borderTheme) {
            base = classNames(base,'border-'+this.props.borderTheme);
        }

        if (this.props.round) {
            base = classNames(base,'rounded');
        }

        if (this.props.shadow) {
            base = classNames(base,'shadow');
        }

        return classNames(base,this.props.className);
    }

    iniTarget() {
        if (!this.targetDom) {
            return
        }
        this.targetDom.addEventListener('click',()=>{
            this.show();
        },false);
        this.mainDom.addEventListener('mousedown',(e)=>{
              e.stopPropagation();
        },)
    }

    destroy() {
        window.removeEventListener('mousedown',this.hide);
    }

    show(showDom,position) {
        if (showDom) {
            this.targetDom = showDom;
        }
        window.addEventListener('mousedown',this.hide,false);
        this.mainDom.classList.remove('d-none');
        this.targetDom.classList.add('ck-intriangle');
        this.fixPosition();
    }

    hide = () => {
        this.mainDom.classList.add('d-none');
        this.targetDom.classList.remove('ck-intriangle');
        window.removeEventListener('mousedown',this.hide);
    };

    fixPosition() {
        let scrollParent = common.hasScrolledParent(this.targetDom) ?? document.documentElement;
        let position = common.GetDomXY(this.targetDom,null);
        if (position.top + this.targetDom.offsetHeight + this.mainDom.offsetHeight >
            scrollParent.scrollTop + scrollParent.offsetHeight) {
            this.mainDom.style.top = -(this.targetDom.offsetHeight+this.mainDom.offsetHeight)+'px';
            this.targetDom.classList.remove('ck-intriangle-bottom');
            this.targetDom.classList.add('ck-intriangle-top');
        } else {
            this.mainDom.style.top = this.targetDom.offsetHeight+8+'px';
            this.targetDom.classList.remove('ck-intriangle-top');
            this.targetDom.classList.add('ck-intriangle-bottom');
        }

        if (position.left + this.mainDom.offsetWidth >
            scrollParent.scrollLeft + scrollParent.offsetWidth) {
            // this.mainDom.style.left = -((position.left + this.mainDom.offsetWidth) - (scrollParent.scrollLeft + scrollParent.offsetWidth)) + 'px';
            this.mainDom.style.left = (this.targetDom.offsetWidth-this.mainDom.offsetWidth) + 'px';
        } else {
            this.mainDom.style.left = '0';
        }
    }

    render() {
        return (
            <div ref={c=>this.mainDom=c} className={this.getClasses()}>
                {React.Children.map(this.props.children,(item)=>{
                    return React.cloneElement(item,{...item.props,parent:this})
                })}
            </div>
        );
    }
}

DropPanel.propTypes = {
    border: PropTypes.bool,
    borderTheme: PropTypes.string,
    round: PropTypes.bool,
    shadow: PropTypes.bool,
    selector: PropTypes.string,
    position: PropTypes.string,
};

DropPanel.defaultProps = {
    border: true,
    round: true,
    shadow: true,
};

export default DropPanel;