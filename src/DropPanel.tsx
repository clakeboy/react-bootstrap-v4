import React from 'react';
import classNames from 'classnames/bind';
import './css/DropPanel.less';
import './css/TriangleTarget.less';
import common from "./Common";
import { ComponentProps } from './components/common';

interface Props extends ComponentProps {
    border?: boolean
    borderTheme?: string
    round?: boolean
    shadow?: boolean
    selector?: string
    position?: string
}


export class DropPanel extends React.Component<Props,any> {

    static defaultProps = {
        border: true,
        round: true,
        shadow: true,
    };
    constructor(props:any) {
        super(props);
    }

    targetDom?:HTMLElement
    mainDom:HTMLDivElement
    componentDidMount() {
        this.targetDom = document.querySelector(this.props.selector??'')??undefined;
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

    show(showDom?:HTMLElement) {
        if (showDom) {
            this.targetDom = showDom;
        }
        window.addEventListener('mousedown',this.hide,false);
        this.mainDom.classList.remove('d-none');
        this?.targetDom?.classList.add('ck-intriangle');
        this.fixPosition();
    }

    hide = () => {
        this.mainDom.classList.add('d-none');
        this?.targetDom?.classList.remove('ck-intriangle');
        window.removeEventListener('mousedown',this.hide);
    };

    fixPosition() {
        if (!this.targetDom) return
        const scrollParent = common.hasScrolledParent(this.targetDom) ?? document.documentElement;
        const position = common.GetDomXY(this.targetDom,null);
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
            <div ref={(c:any)=>this.mainDom=c} className={this.getClasses()}>
                {React.Children.map(this.props.children,(item)=>{
                    return React.cloneElement(item,{...item.props,parent:this})
                })}
            </div>
        );
    }
}

export default DropPanel;