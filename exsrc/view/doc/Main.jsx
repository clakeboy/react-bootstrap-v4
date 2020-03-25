import React from 'react';
import ReactMarkdown from 'react-markdown';

import {

} from '../../../src/index';
import {GetMarkdownRaw} from "../../common/Funcs";
import '../../css/github-markdown.css';
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content:'',
        }
    }

    componentDidMount() {
        GetMarkdownRaw('/index.md').then((res)=>{
            this.setState({
                content:res,
            })
        })
    }

    render() {
        return (
            <div className='markdown-body p-3'>
                <ReactMarkdown source={this.state.content} renderers={[]}/>
            </div>
        )
    }
}

export default Main;