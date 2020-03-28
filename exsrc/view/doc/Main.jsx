import React from 'react';
import ReactMarkdown from 'react-markdown';

import {
    CDropdown
} from '../../../src';
// import Input from '../../../lib/Input';
import {GetMarkdownRaw} from "../../common/Funcs";
import '../../css/github-markdown.css';
import CodeBlock from "../../components/CodeBlock";
import text from '../../md/index.md';
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content:text,
        }
    }

    componentDidMount() {
        // GetMarkdownRaw('/index.md').then((res)=>{
        //     this.setState({
        //         content:res,
        //     })
        // })
    }

    render() {
        return (
            <div className='markdown-body p-3'>
                <ReactMarkdown source={this.state.content} renderers={{code:CodeBlock}}/>
                <CDropdown >
                    <CDropdown.Value />
                </CDropdown>
            </div>
        )
    }
}

export default Main;