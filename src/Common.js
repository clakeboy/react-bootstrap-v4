/**
 * extend object
 * @param org
 * @param exd
 */
export var extend = (org,exd) => {
    if (typeof exd === "object") {
        for (let key in org) {
            org[key] = exd[key];
        }
    }
    return org;
};

/**
 * random string
 * @param str_length
 * @param tab
 * @returns {string}
 * @constructor
 */
export var RandomString = (str_length,tab="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz") => {
    let num,out_str="";

    for (let i=0;i<str_length;i++) {
        num = Math.round(Math.random()*tab.length);
        out_str += tab.substring(num, num+1);
    }

    return out_str;
};

/**
 * dynamic loading script or css file
 * @type {{_loaded: {}, load: LoadScript.load}}
 */
export var LoadScript = {
    _loaded:{},
    load:function(srcStr,strID){
        let func = arguments[2];
        let version = arguments[3];
        if (this._loaded[strID]) {
            if (func && typeof func === "function") func();
            return;
        }
        let element;
        let ext = srcStr.split('?')[0].substr(srcStr.lastIndexOf('.')+1);
        if (ext === 'css') {
            element = document.createElement("LINK");
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
            element = document.createElement("SCRIPT");
            if (typeof version === "string") {
                element.src = srcStr+"?"+version;
            } else if (typeof version === "boolean") {
                element.src = srcStr+"?"+RandomString(5);
            } else {
                element.src = srcStr;
            }
            element.type = 'text/javascript';
            element.id = strID;
            element.language = 'javascript';
        }

        this._loaded[strID] = false;
        let self = this;
        element.onload = function(){
            this.onload = null;
            self._loaded[strID] = true;
            if (func && typeof func === "function") func();
        };
        element.onerror = function(){
            alert("Load Library Error!");
        };

        document.getElementsByTagName("head")[0].appendChild(element);
        element = null;
    }
};

/**
 * get html dom element position
 * @param e
 * @returns {{}}
 * @constructor
 */
export var GetDomXY = (e) => {
    let parent = arguments[1]?arguments[1]:undefined;
    let t = {
        top:e.offsetTop,
        left:e.offsetLeft,
        height:e.clientHeight,
        width:e.clientWidth
    };

    let scrollTop = 0;
    let scrollLeft = 0;
    let topScroll = 0;
    let leftScroll = 0;
    while ((e = e.offsetParent) && e !== parent) {
        t['top'] += e.offsetTop;
        t['left'] += e.offsetLeft;
        topScroll = e.scrollTop;
        scrollTop += topScroll;
        leftScroll = e.scrollLeft;
        scrollLeft += leftScroll;
    }
    t['top'] = t['top'] - (scrollTop - topScroll);
    t['left'] = t['left'] - (scrollLeft - leftScroll);

    scrollTop = topScroll = scrollLeft = leftScroll = parent = null;
    return t;
};

/**
 * get current screen DPI size
 * @returns {Array}
 * @constructor
 */
export var GetDPI = () => {
    let arrDPI = [];
    if (window.screen.deviceXDPI) {
        arrDPI[0] = window.screen.deviceXDPI;
        arrDPI[1] = window.screen.deviceYDPI;
    }
    else {
        let tmpNode = document.createElement("DIV");
        tmpNode.style.cssText = "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden";
        document.body.appendChild(tmpNode);
        arrDPI[0] = parseInt(tmpNode.offsetWidth);
        arrDPI[1] = parseInt(tmpNode.offsetHeight);
        tmpNode.parentNode.removeChild(tmpNode);
    }
    return arrDPI;
};

/**
 * has object in array
 * @param needle
 * @param haystack
 * @returns {boolean}
 * @constructor
 */
export var InArray = (needle,haystack) => {
    if(typeof needle === 'string' || typeof needle === 'number') {
        for(let i in haystack) {
            if(haystack[i] === needle) {
                return true;
            }
        }
    }
    return false;
};
/**
 * Map object
 * @param obj
 * @param func
 * @returns {Array}
 */
export var map = (obj,func) => {
    if (typeof obj !== 'object') {
        return [];
    }
    if (typeof func !== 'function') {
        return [];
    }
    let list = [];
    let idx = 0;
    for (let k in obj) {
        list.push(func(obj[k],k,idx));
        idx++
    }
    return list;
};

export var str_pad = (text, length, padstring) => {
    let type = arguments[3] || "left";
    text += '';
    padstring += '';
    let padtext = null;
    if(text.length < length) {
        padtext = padstring;

        while(padtext.length < (length - text.length)) {
            padtext += padstring;
        }
        if (type === "left") {
            text = padtext.substr(0, (length - text.length)) + text;
        } else if (type === "right") {
            text = text + padtext.substr(0, (length - text.length));
        }

    }
    padtext = null;
    return text;
}

export default {
    extend:extend,
    GetDomXY:GetDomXY,
    InArray:InArray,
    GetDPI:GetDPI,
    LoadScript:LoadScript,
    RandomString:RandomString,
    map:map,
    strpad:str_pad,
};