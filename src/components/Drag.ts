/**
 * 拖动控制类
 * @author clake
 * @version 0.1
 */

const move: {x:number,y:number} = {
    x:0,
    y:0
};

interface MoveEventStart {
    (dragDom:HTMLElement,eventDom:HTMLElement,event:MouseEvent):boolean
}

interface MoveEventMove {
    (move:{x:number,y:number},dragDom:HTMLElement,eventDom:HTMLElement,event:MouseEvent): void
}

interface MoveEvent {
    start?: MoveEventStart
    move?: MoveEventMove
    end?: MoveEventStart
}

export class Drag {
    dragX = 0
    dragY = 0
    domX = 0
    domY = 0
    x = 0
    y = 0

    dragDom: HTMLElement
    eventDom: HTMLElement
    _evtStart: MoveEventStart
    _evtMove?: MoveEventMove
    _evtEnd: MoveEventStart
    /**
     * 初始化方法
     * @param dragDom  DOMElement|string   拖动对像,可以传入DOM对像或selector字符串
     * @param eventDom DOMElement|string   拖动事件对像,可以传入DOM对像或selector字符串
     * @param events   object              事件对像,可选多个事件
     */
    constructor(dragDom: HTMLElement|string, eventDom:HTMLElement|string, events: MoveEvent) {
        this.setDragDom(dragDom);
        this.setEventDom(eventDom);
        this.initEvents(events);
    }

    setDragDom(dragDom:HTMLElement|string) {
        if (dragDom instanceof HTMLElement) {
            this.dragDom = dragDom;
        } else if (typeof dragDom === "string") {
            const dom = document.querySelector(dragDom)
            if (!dom ) {
                throw "dragDom must be selector string or HTMLElement object";    
            }
            this.dragDom = dom as HTMLElement;
        } else {
            throw "dragDom must be selector string or HTMLElement object";
        }
    }

    setEventDom(eventDom:HTMLElement|string) {
        if (eventDom instanceof HTMLElement) {
            this.eventDom = eventDom;
        } else if (typeof eventDom === 'string') {
            const dom = document.querySelector(eventDom)
            if (!dom ) {
                this.eventDom = this.dragDom;    
            }
            this.eventDom = dom as HTMLElement;
        } else {
            this.eventDom = this.dragDom;
        }

        this.bindEvents();
    }

    initEvents(events: MoveEvent) {
        this._evtStart = events.start ?? defaultEvent;
        this._evtMove = events.move ?? undefined;
        this._evtEnd = events.end ?? defaultEvent;
    }

    bindEvents() {
        this.eventDom?.addEventListener("mousedown",this.beginDrag,false);
    }

    unbind() {
        this.eventDom?.removeEventListener('mousedown',this.beginDrag);
    }

    beginDrag = (e:MouseEvent) => {
        if (e.button !== 0) {
            return false;
        }
        
        this.eventDom = e?.currentTarget as HTMLElement;
        
        // e.preventDefault();
        window.addEventListener('mousemove',this.startMove,false);
    };

    startMove = (e:MouseEvent)=> {
        if (e.buttons !== 1) {
            window.removeEventListener('mousemove',this.startMove,false);
            return false;
        }
        
        window.removeEventListener('mousemove',this.startMove,false);
        if (!this._evtStart(this.dragDom,this.eventDom,e)) {
            return false;
        }
        this.domX = parseInt(this.dragDom?.style.left??'0');
        this.domY = parseInt(this.dragDom?.style.top??'0');
        this.dragX = e.pageX;
        this.dragY = e.pageY;
        window.addEventListener('mousemove',this.moveDrag,false);
        window.addEventListener('mouseup',this.overDrag,false);
    };

    moveDrag = (e:MouseEvent)=>{
        move.x = (this.domX + (e.pageX - this.dragX));
        move.y = (this.domY + (e.pageY - this.dragY));
        if (typeof this._evtMove === "function") {
            this._evtMove(move,this.dragDom,this.eventDom,e)
        }
        this.dragDom.style.top = move.y + 'px';
        this.dragDom.style.left = move.x + 'px';
    };

    overDrag = (e:MouseEvent)=>{
        window.removeEventListener('mousemove',this.moveDrag);
        window.removeEventListener('mouseup',this.overDrag);
        this._evtEnd(this.dragDom,this.eventDom,e);
    };
}

function defaultEvent() {
    return true;
}

export default Drag