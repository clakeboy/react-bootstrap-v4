
export const extend = (org:any,exd:any) => {
    if (typeof exd === "object") {
        for (const key in exd) {
            org[key] = exd[key];
        }
    }
    return org;
};


export const RandomString = (str_length:number,tab="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz") => {
    let num,out_str="";

    for (let i=0;i<str_length;i++) {
        num = Math.round(Math.random()*tab.length);
        out_str += tab.substring(num, num+1);
    }

    return out_str;
};

export const RandNum = (start:number,end:number) => {
    const choice = end - start + 1;

    return Math.floor(Math.random() * choice + start)
}


export const LoadScript:{_loaded:{[propName:string]:boolean},load:(srcStr:string,strID:string,func?:()=>void,version?:string|boolean)=>void} = {
    _loaded:{},
    load:function(srcStr:string,strID:string,func?:()=>void,version?:string|boolean) {
        if (this._loaded[strID]) {
            if (func && typeof func === "function") func();
            return;
        }
        let element: HTMLLinkElement|HTMLScriptElement;
        const ext = srcStr.split('?')[0].substr(srcStr.lastIndexOf('.')+1);
        if (ext === 'css') {
            element = document.createElement("LINK") as HTMLLinkElement;
            if (typeof version === "string") {
                element.href = srcStr+"?"+version;
            } else if (typeof version === "boolean") {
                element.href = srcStr+"?"+RandomString(5);
            } else {
                element.href = srcStr;
            }
            element.rel = 'stylesheet';
            element.id = strID;
            element.type = 'text/css';
        } else if (ext === 'js') {
            element = document.createElement("SCRIPT") as HTMLScriptElement;
            if (typeof version === "string") {
                element.src = srcStr+"?"+version;
            } else if (typeof version === "boolean") {
                element.src = srcStr+"?"+RandomString(5);
            } else {
                element.src = srcStr;
            }
            element.type = 'text/javascript';
            element.id = strID;
        } else {
            return
        }

        this._loaded[strID] = false;
        const loaded = this._loaded;
        element.onload = function() {
            this.onload = null;
            loaded[strID] = true;
            if (func && typeof func === "function") func();
        };
        element.onerror = function(){
            alert("Load Library Error!");
        };

        document.getElementsByTagName("head")[0].appendChild(element);
    }
};


export const GetDomXY = (e:HTMLElement,parent:HTMLElement|null=null) => {
    const t = {
        top:e.offsetTop,
        left:e.offsetLeft,
        height:e.clientHeight,
        width:e.clientWidth
    };
    let scrollTop = 0;
    let scrollLeft = 0;
    let topScroll = 0;
    let leftScroll = 0;
    while ((e = e.offsetParent as HTMLElement) && e !== parent) {
        t['top'] += e.offsetTop;
        t['left'] += e.offsetLeft;
        topScroll = e.scrollTop;
        scrollTop += topScroll;
        leftScroll = e.scrollLeft;
        scrollLeft += leftScroll;
    }
    t['top'] = t['top'] - (scrollTop - topScroll);
    t['left'] = t['left'] - (scrollLeft - leftScroll);

    return t;
};


export const GetDPI = () => {
    const arrDPI = [];

    const tmpNode = document.createElement("DIV");
    tmpNode.style.cssText = "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden";
    document.body.appendChild(tmpNode);
    arrDPI[0] = tmpNode.offsetWidth;
    arrDPI[1] = tmpNode.offsetHeight;
    tmpNode.parentNode?.removeChild(tmpNode);
    
    return arrDPI;
};

/**
 * Map object
 * @param obj
 * @param func
 * @returns {Array}
 */
export const map = (obj:any,func:any) => {
    if (typeof obj !== 'object') {
        return [];
    }
    if (typeof func !== 'function') {
        return [];
    }
    const list = [];
    let idx = 0;
    for (const k in obj) {
        list.push(func(obj[k],k,idx));
        idx++
    }
    return list;
};

export const strpad = (text:string ,length:number, padstring:string, type="left") => {
    text += '';
    padstring += '';
    let padtext = null;
    if(text.length < length) {
        padtext = padstring;

        while(padtext.length < (length - text.length)) {
            padtext += padstring;
        }
        if (type === "left") {
            text = padtext.substring(0, (length - text.length)) + text;
        } else if (type === "right") {
            text = text + padtext.substring(0, (length - text.length));
        }

    }
    padtext = null;
    return text;
};

export const ucFirst = (str:string) => {
    if (str.length <= 0) return "";
    return str[0].toUpperCase()+str.substring(1);
};

export const under2hump = (str:string) => {
    const arr = str.split('_');
    const hump = arr.map((item)=>{
        return ucFirst(item);
    });
    return hump.join('');
};

export const explainUrl = (path:string) => {
    const arr = path.split('/');
    arr.shift();
    let module = arr.pop() ?? '';
    module = under2hump(module);
    const ext_path = arr.length > 0 ? '/' : '';
    return ext_path + arr.join('/') + "/" + module;
};

export const Clone = (obj:any) => {
    return JSON.parse(JSON.stringify(obj));
};

export function hasScrolledParent(el:HTMLElement, direction = "vertical") {
    while ((el = el.offsetParent as HTMLElement) && el !== undefined) {
        if(direction === "vertical") {
            const style = window.getComputedStyle(el);
            const isScroll = style.overflowY === 'scroll' || style.overflowY === 'auto';
            if (el.scrollHeight > el.clientHeight && isScroll) return el;
        } else if(direction === "horizontal") {
            if (el.scrollWidth > el.clientWidth) return el;
        }
    }
}

export class Runtime {
    start;
    constructor() {
        this.start = new Date();
    }

    static Start() {
        return new Runtime();
    }

    begin() {
        this.start = new Date();
    }

    end(print=false) {
        const cur_date = new Date();
        const diff = cur_date.getTime() - this.start.getTime();
        const res = Math.floor(diff/1000)
        if (print) {
            console.log(res)
        }
        return res
    }
}

export function Version() {
    const u = navigator.userAgent;
    return {
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
        iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
        weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
        qq: !!u.match(/\sQQ/i) //是否QQ
    };
}

export default {
    extend,
    GetDomXY,
    GetDPI,
    LoadScript,
    RandomString,
    map,
    strpad,
    ucFirst,
    under2hump,
    explainUrl,
    Clone,
    hasScrolledParent,
    RandNum,
    Runtime,
    Version
};