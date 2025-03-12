export class SvgEl {
    /**
     * 主节点
     * @type SVGElement
     */
    el:SVGElement
    constructor(el_name?:string,selector?:string,elm?:SVGElement) {
        if (elm) {
            this.el = elm
        } else if (selector) {
            const dom = document.querySelector(selector)
            if (!dom) {
                throw "selector not found"
            }
            this.el = dom as SVGElement
        } else {
            this.el = document.createElementNS('http://www.w3.org/2000/svg',el_name??'svg')
        }
    }

    add(el_name:string) {
        if (!el_name) return this
        const child = new SvgEl(el_name)
        this.el.appendChild(child.el)
        return child
    }

    attr(name:string,val:string) {
        this.el.setAttribute(name,val)
        return this
    }

    attachTo(selector:string) {
        document.querySelector(selector)?.appendChild(this.el)
    }
}

export function Svg():SvgEl {
    return new SvgEl()
}

export function SvgSelector(selector:string):SvgEl {
    return new SvgEl(undefined,selector)
}

export function SvgElm(elm:SVGElement):SvgEl {
    return new SvgEl(undefined,undefined,elm)
}