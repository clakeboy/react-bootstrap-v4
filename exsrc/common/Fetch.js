import 'es6-promise/auto';
import 'whatwg-fetch';

let DebugURL = '';
if (window.__DEBUG__) {
    DebugURL = window.__URL__ || 'http://localhost:9900';
}

function Fetch(url,data,fn,err) {
    fetch(DebugURL+url,{
        method: 'post',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(function(response){
        return response.text();
    }).then(function(text){
        fn(JSON.parse(text));
    }).catch(function(ex){
        if (typeof err === 'function') {
            err(ex);
        } else {
            console.log('error: '+ex);
            if (window.__DEBUG__) alert('远程调用失败，详细请查看控制台输出');
        }
    });

}

export default Fetch;