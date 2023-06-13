export class SvgEl {
    /**
     * 主节点
     * @type SVGElement
     */
    el = null;
    constructor(el_name,selector) {
        if (selector) {
            this.el = document.querySelector(selector)
        } else {
            this.el = document.createElementNS('http://www.w3.org/2000/svg',el_name??'svg')
        }
    }

    add(el_name) {
        if (!el_name) return
        let child = new SvgEl(el_name)
        this.el.appendChild(child.el)
        return child
    }

    attr(name,val) {
        this.el.setAttribute(name,val)
        return this
    }

    attachTo(selector) {
        document.querySelector(selector).appendChild(this.el)
    }
}

export function Svg() {
    return new SvgEl()
}

export function SvgSelector(selector) {
    return new SvgEl(null,selector)
}