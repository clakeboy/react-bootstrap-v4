/**
 * Created by clakeboy on 2017/12/3.
 */
import React from 'react';
import {GetComponent} from "../common/Funcs";
import Loader from './Loader';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    ucFirst(str) {
        let first = str[0].toUpperCase();
        return first+str.substr(1);
    }

    under2hump(str) {
        let arr = str.split('_');
        let hump = arr.map((item)=>{
            return this.ucFirst(item);
        });
        return hump.join('');
    }

    explainUrl(path) {
        let arr = path.split('/');
        arr.shift();
        let module = arr.pop();
        if (module === "") {
            module = 'Main';
        } else {
            module = this.under2hump(module)
        }
        let ext_path = arr.length > 0 ? '/' : '';
        return ext_path + arr.join('/') + "/" + module;
    }

    render() {
        console.log("render app");
        let load_path = this.explainUrl(this.props.location.pathname);
        return <Loader loadPath={load_path} import={GetComponent} {...this.props}/>
    }
}