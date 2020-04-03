import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import {
    Common,
} from '../../src';
import '../css/github-markdown.css';

import CodeBlock from "../components/CodeBlock";
import text from '../md/index.md';
import '../css/main.less';
import TreeMenu from "./TreeMenu";
import {GetDocComponent} from "../common/Funcs";
import Loader from "../components/Loader";
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            menu : [
                // {
                //     menu_name:'',
                //     menu_text:'系统',
                //     step:'1'
                // },
                // {
                //     menu_name:'system',
                //     menu_text:'系统管理',
                //     menu_icon:'cogs',
                //     sub_menus:[
                //         {
                //             menu_name:'user_manage',
                //             menu_text:'后台用户管理',
                //             menu_icon:'home',
                //             menu_link:'/account/list'
                //         },
                //         // {
                //         //     menu_name:'menu_manage',
                //         //     menu_text:'后台菜单管理',
                //         //     menu_icon:'home',
                //         //     menu_link:'/system/menu'
                //         // },
                //         // {
                //         //     menu_name:'role_manage',
                //         //     menu_text:'角色管理',
                //         //     menu_icon:'home',
                //         //     menu_link:'/system/role'
                //         // },
                //         // {
                //         //     menu_name:'func_manage',
                //         //     menu_text:'功能模块管理',
                //         //     menu_icon:'home',
                //         //     menu_link:'/system/func'
                //         // },
                //         // {
                //         //     menu_name:'rule_manage',
                //         //     menu_text:'权限管理',
                //         //     menu_icon:'home',
                //         //     menu_link:'/system/rule_manage'
                //         // }
                //     ]
                // },
                {
                    menu_name:'',
                    menu_text:'组件列表',
                    step:'1'
                },
                {
                    menu_name:'index',
                    menu_text:'首页',
                    menu_icon:'home',
                    menu_link:'/doc/index'
                },
                {
                    menu_name:'button',
                    menu_text:'Button',
                    menu_icon:'button',
                    menu_link:'/doc/button'
                },
                {
                    menu_name:'button_group',
                    menu_text:'ButtonGroup',
                    menu_icon:'',
                    menu_link:'/doc/button_group'
                },
            ],
            init_menu:true
        };
    }

    componentDidMount() {
        // GetMarkdownRaw('/index.md').then((res)=>{
        //     this.setState({
        //         content:res,
        //     })
        // })
    }

    explainUrl(path) {
        // path = path.replace(/\/doc\//,'');
        console.log(this.props.match.params);
        if (!path) {
            return '/Index';
        }
        let arr = path.split('/');
        let module = arr.pop();
        if (module === "") {
            module = 'Index';
        } else {
            module = Common.under2hump(module);
        }
        let ext_path = arr.length > 0 ? '/' : '';
        return ext_path + arr.join('/') + "/" + module;
    }

    menuClickHandler = (item) => {
        this.context.router.history.replace(item.menu_link);
    };

    render() {
        let load_path = this.explainUrl(this.props.match.params.path);
        console.log(load_path);
        return (
            <div className='d-flex h-100 w-100'>
                <div className='doc-left'>
                    <div className='p-2 bg-dark text-light'>
                        React Bootstrap v4 UI
                    </div>
                    <TreeMenu data={this.state.menu} onClick={this.menuClickHandler}/>
                </div>
                <div className='doc-main flex-grow-1'>
                    <Loader loadPath={load_path} import={GetDocComponent} {...this.props}/>
                </div>
            </div>
        )
    }
}

Main.contextTypes = {
    router: PropTypes.object
};

export default Main;