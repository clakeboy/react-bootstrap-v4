/**
 * 动态加载组件
 */
import React from 'react';
import PropTypes from "prop-types";
import Load from '../Load';

export class Loader extends React.Component {
    static propTypes = {
        loadPath: PropTypes.string,
        import: PropTypes.func,
    }

    static defaultProps = {
        loadPath:""
    };

    constructor(prop) {
        super(prop);
        this.state = {
            instance:null,
            noFound:false
        };
    }

    componentDidMount() {
        this.loadComponent(this.props.loadPath);
    }

    componentWillReceiveProps(nextProp) {
        if (this.props.loadPath !== nextProp.loadPath) {
            this.setState({
                instance:null,
                noFound:false
            },()=>{
                this.loadComponent(nextProp.loadPath);
            });
        }
    }

    loadComponent(loadPath) {
        this.props.import(loadPath).then(component=>{
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
            return this.renderComponent()
        } else {
            return (
                <div className='text-center mt-5'>
                    {this.state.noFound?'没有找到模块':<Load>模块加载中</Load>}
                </div>
            );
        }
    }

    renderComponent() {
        let Instance = this.state.instance;
        let props = Object.assign({},this.props,{import:null})
        return <Instance {...props}/>;
    }
}

export default Loader;