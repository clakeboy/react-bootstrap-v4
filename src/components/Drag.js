/**
 * 拖动控制类
 * @author clake
 * @version 0.1
 */

let move = {
    x:0,
    y:0
};

export default class Drag {
    /**
     * 初始化方法
     * @param dragDom  DOMElement|string   拖动对像,可以传入DOM对像或selector字符串
     * @param eventDom DOMElement|string   拖动事件对像,可以传入DOM对像或selector字符串
     * @param events   object              事件对像,可选多个事件
     */
    constructor(dragDom, eventDom, events) {
        this.dragX = 0;
        this.dragY = 0;
        this.domX  = 0;
        this.domY  = 0;
        this.x = 0;
        this.y = 0;

        this.setDragDom(dragDom);
        this.setEventDom(eventDom);
        this.initEvents(events||{});
    }

    setDragDom(dragDom) {
        if (dragDom instanceof HTMLElement) {
            this.dragDom = dragDom;
        } else if (typeof dragDom === "string") {
            this.dragDom = document.querySelector(dragDom);
        } else {
            throw "dragDom must be selector string or HTMLElement object";
        }
    }

    setEventDom(eventDom) {
        if (eventDom instanceof HTMLElement) {
            this.eventDom = eventDom;
        } else if (typeof eventDom === 'string') {
            this.eventDom = document.querySelector(eventDom);
        } else {
            this.eventDom = this.dragDom;
        }

        this.bindEvents();
    }

    initEvents(events) {
        this._evtStart = events.start || defaultEvent;
        this._evtMove = events.move || null;
        this._evtEnd = events.end || defaultEvent;
    }

    bindEvents() {
        this.eventDom.addEventListener("mousedown",this.beginDrag,false);
    }

    unbind() {
        this.eventDom.removeEventListener('mousedown',this.beginDrag);
    }

    beginDrag = (e) => {
        if (e.button !== 0) {
            return false;
        }
        this.eventDom = e.currentTarget;
        // e.preventDefault();
        window.addEventListener('mousemove',this.startMove,false);
    };

    startMove = (e)=> {
        if (e.buttons !== 1) {
            window.removeEventListener('mousemove',this.startMove,false);
            return false;
        }
        window.removeEventListener('mousemove',this.startMove,false);
        if (!this._evtStart(this.dragDom,this.eventDom,e)) {
            return false;
        }
        this.domX = parseInt(this.dragDom.style.left);
        this.domY = parseInt(this.dragDom.style.top);
        this.dragX = parseInt(e.pageX);
        this.dragY = parseInt(e.pageY);
        window.addEventListener('mousemove',this.moveDrag,false);
        window.addEventListener('mouseup',this.overDrag,false);
    };

    moveDrag = (e)=>{
        move.x = (this.domX + (parseInt(e.pageX) - this.dragX));
        move.y = (this.domY + (parseInt(e.pageY) - this.dragY));
        if (typeof this._evtMove === "function") {
            this._evtMove(move,this.dragDom,this.eventDom,e)
        }
        this.dragDom.style.top = move.y + 'px';
        this.dragDom.style.left = move.x + 'px';
    };

    overDrag = (e)=>{
        window.removeEventListener('mousemove',this.moveDrag);
        window.removeEventListener('mouseup',this.overDrag);
        this._evtEnd(this.dragDom,this.eventDom,e);
    };
}

function defaultEvent() {
    return true;
}