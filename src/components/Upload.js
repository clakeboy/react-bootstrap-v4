//upload common component
let fileDom;
export default class Upload {
    //change event handler
    changeEvent;
    //is init dom
    isInit = false;

    static NewUpload(opts) {
        return new Upload(opts);
    }

    constructor(opts) {
        this.changeHandler = opts?.change ?? null;

        this.initFileDom();
    }

    initFileDom() {
        if (!fileDom) {
            fileDom = document.createElement("<input type='file'/>");
            fileDom.addEventListener("change",this.changeHandler);
            document.body.appendChild(fileDom);
        }
        this.isInit = true;
    }

    changeHandler = (e) => {

    };

    click() {
        fileDom.click();
    }
}

