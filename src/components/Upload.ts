//upload common component
import Common from '../Common';
let fileDom:HTMLInputElement;

interface UploadOptions {
    change?: (file:File,fileName:string) => void;
    progress?: (loaded?:number,total?:number,percent?:string) => void;
    success?: (result:any,status:number,xhr:XMLHttpRequest) => void;
    error?: (status:number,e:any) => void;
    uploadHost?:string
    fieldName?:string
    host?:string
    field?:string
    drag_target?:any
}

export class Upload {
    //change event handler
    changeEvent;
    //progress event handler
    progressEvent;
    //success event handler
    successEvent;
    //error event handler
    errorEvent;
    //upload server address
    uploadHost;
    //is init dom
    isInit = false;
    //current choose file
    currentFile?:File;
    //post file field name
    fieldName:string;
    //drag file selector
    dragSelector:any;

    static NewUpload(opts:UploadOptions) {
        return new Upload(opts);
    }

    constructor(opts:UploadOptions) {
        this.changeEvent = opts?.change ?? null;
        this.progressEvent = opts?.progress ?? null;
        this.successEvent = opts?.success ?? null;
        this.errorEvent = opts?.error ?? null;
        this.uploadHost = opts?.host ?? '';
        this.fieldName = opts?.field ?? 'upfile';
        this.dragSelector = opts?.drag_target ?? null;
        this.initFileDom();
    }

    initFileDom() {
        if (!fileDom) {
            fileDom = document.createElement("input");
            fileDom.type = 'file';
            fileDom.className = 'd-none';
            fileDom.addEventListener("change",this.changeHandler);
            // document.body.appendChild(fileDom);
        }
        let dragDom: HTMLElement | undefined = undefined;
        if (typeof this.dragSelector === 'string') {
            const dom =document.querySelector("#"+this.dragSelector)
            if (!dom) {
                throw "can not found drag selector"
            }
            dragDom = dom as HTMLElement;
        }
        if (dragDom) {
            dragDom.addEventListener("dragover",this.dragOver,false);
            dragDom.addEventListener("dragleave",this.dropHandler,false);
            dragDom.addEventListener("drop",this.dropHandler,false);
        }
        this.isInit = true;
    }

    dragOver = (e:DragEvent)=> { 
        e.preventDefault();
        const dom = e.currentTarget as HTMLElement;
        dom.style.border = "1px solid #0095ff"
    }

    dragLeave = (e:DragEvent)=> {
        e.preventDefault();
        const dom = e.currentTarget as HTMLElement;
        dom.style.border = "none"
    }

    dropHandler = (e:DragEvent)=> {
        e.preventDefault();
        const dom = e.currentTarget as HTMLElement;
        dom.style.border = "none"
        if (e.dataTransfer && e.dataTransfer.files.length > 0) {
            this.currentFile = e.dataTransfer.files[0];
            if (typeof this.changeEvent === 'function') {
                this.changeEvent(this.currentFile,this.currentFile.name);
            }
        }
    };

    changeHandler = () => {
        this.currentFile = fileDom.files?.[0];
        if (typeof this.changeEvent === 'function' && this.currentFile) {
            this.changeEvent(this.currentFile,this.currentFile.name);
        }
    };
    //tiger choose upload file
    choose() {
        fileDom.value = '';
        fileDom.click();
    }
    //upload to host
    up(post_data?:{[propName: string]: any},headers?:{[propName: string]: string}) {   
        if (!this.currentFile) {
            return
        }
        // let ot,oloaded;
        const data = new FormData();
        data.append(this.fieldName,this.currentFile);
        if (post_data) {
            Common.map(post_data,(item:any,key:string)=>{
                data.append(key,item)
            })
        }
        const xhr = new XMLHttpRequest();
        xhr.open("post",this.uploadHost,true);
        if (headers) {
            Common.map(headers,(item:any,key:string)=>{
                xhr.setRequestHeader(key,item);
            })
        }
        // 请求成功回调函数
        xhr.addEventListener('load', (e: ProgressEvent) => {
            const status = xhr.status;
            if ((status >= 200 && status < 300) || status === 304) {
                let result;
                if (xhr.responseType === 'text') {
                    result = xhr.responseText;
                } else if (xhr.responseType === 'document') {
                    result = xhr.responseXML;
                } else {
                    result = xhr.response;
                }
                // 注意:状态码200表示请求发送/接受成功,不表示业务处理成功
                if (typeof this.successEvent === 'function')
                    this.successEvent(result, status, xhr);
            } else {
                if (typeof this.errorEvent === 'function')
                    this.errorEvent(status, e);
            }
        });
        // 请求出错
        xhr.addEventListener('error', e => {
            if (typeof this.errorEvent === 'function')
                this.errorEvent(xhr.status, e);
        });
        // 请求超时
        xhr.addEventListener('timeout', e => {
            if (typeof this.errorEvent === 'function')
                this.errorEvent(408, e);
        });
        // xhr.upload.addEventListener('progress');
        //upload progress
        xhr.upload.addEventListener("progress",e=>{
            let loaded,total,percent;
            if (e.lengthComputable) {
                loaded = e.loaded;
                total = e.total;
                percent = (loaded/total*100).toFixed(0);
            } 
            if (typeof this.progressEvent === 'function') {
                this.progressEvent(loaded,total,percent);
            }
        });
        //start
        // xhr.addEventListener('loadstart',()=>{
        //     ot = new Date().getTime();
        //     oloaded = 0;
        // });
        xhr.responseType = 'json';
        xhr.send(data)
    }
}

export default Upload;