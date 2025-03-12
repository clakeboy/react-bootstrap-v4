/**
 * 动态加载组件
 */
import React from 'react';
import Load from '../Load';
import PropTypes from 'prop-types';
import {under2hump} from "../Common";

interface State {
    instance?: JSX.Element
    noFound: boolean
}

interface Props extends React.HTMLProps<any>{
    loadPath: string
    import: (path:string) => Promise<any>
}

export class Loader extends React.Component<Props,State> {
    static defaultProps = {
        loadPath:PropTypes.string.isRequired
    };

    constructor(prop?:any) {
        super(prop);
        this.state = {
            instance:undefined,
            noFound:false
        };
    }

    componentDidMount() {
        this.loadComponent(this.props.loadPath);
    }

    UNSAFE_componentWillReceiveProps(nextProp: Props) {
        if (this.props.loadPath !== nextProp.loadPath) {
            this.setState({
                instance:undefined,
                noFound:false
            },()=>{
                this.loadComponent(nextProp.loadPath);
            });
        }
    }

    explainUrl(path:string) {
        const arr = path.split('/');
        arr.shift();
        let module = arr.pop();
        module = under2hump(module??'')
        const ext_path = arr.length > 0 ? '/' : '';
        return ext_path + arr.join('/') + "/" + module;
    }

    loadComponent(loadPath:string) {
        const filePath = this.explainUrl(loadPath);
        this.props.import(filePath).then(component=>{
            if (typeof component === "string") {
                this.setState({
                    noFound:true
                });
            } else {
                this.setState({
                    instance:component
                });
            }
        });
    }

    render() {
        if (this.state.instance) {
            return this.renderComponent(this.state.instance)
        } else {
            return (
                <div className='text-center mt-5'>
                    {this.state.noFound?'没有找到模块':<Load>模块加载中</Load>}
                </div>
            );
        }
    }

    renderComponent(instance:any) {
        const Instance:typeof React.Component = instance;
        const props:any = Object.assign({},this.props,{import:null})
        return <Instance {...props}/>;
    }
}

export default Loader;