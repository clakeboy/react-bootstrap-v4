/**
 * 动态加载组件
 */
import React from 'react';
import PropTypes from "prop-types";
import {Load} from '../../src/index';

export default class Loader extends React.Component {
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
                console.log(component);
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
                <div className='text-center text-primary mt-5'>
                    {this.state.noFound?'没有找到模块':<Load>模块加载中</Load>}
                </div>
            );
        }
    }

    renderComponent() {
        let Instance = this.state.instance;
        return <Instance {...this.props}/>;
    }
}

Loader.propTypes = {
    loadPath: PropTypes.string,
    import: PropTypes.func,
};

Loader.defaultProps = {
    loadPath:""
};