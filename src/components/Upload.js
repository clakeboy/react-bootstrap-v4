//upload common component
let fileDom;
export default class Upload {
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
    currentFile;
    //post file field name
    fieldName;

    static NewUpload(opts) {
        return new Upload(opts);
    }

    constructor(opts) {
        this.changeEvent = opts?.change ?? null;
        this.progressEvent = opts?.progress ?? null;
        this.successEvent = opts?.success ?? null;
        this.errorEvent = opts?.error ?? null;
        this.uploadHost = opts?.host ?? '';
        this.fieldName = opts?.field ?? 'upfile';
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
        this.isInit = true;
    }

    changeHandler = (e) => {
        this.currentFile = fileDom.files[0];
        if (typeof this.changeEvent === 'function') {
            this.changeEvent(fileDom.files[0],e);
        }
    };
    //tiger choose upload file
    click() {
        fileDom.value = '';
        fileDom.click();
    }
    //upload to host
    up() {
        let ot,oloaded;
        let data = new FormData();
        data.append(this.fieldName,this.currentFile);
        let xhr = new XMLHttpRequest();
        xhr.open("post",this.uploadHost,true);
        // 请求成功回调函数
        xhr.addEventListener('load', e => {
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
            } else {
                oloaded = e.loaded
            }
            if (typeof this.progressEvent === 'function') {
                this.progressEvent(loaded,total,percent);
            }
        });
        //start
        xhr.addEventListener('loadstart',e=>{
            ot = new Date().getTime();
            oloaded = 0;
        });
        xhr.responseType = 'json';
        xhr.send(data)
    }
}

