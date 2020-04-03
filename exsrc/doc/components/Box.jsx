/**
 * Created by clakeboy on 2020/3/29.
 */
import React from 'react';
import ReactMarkdown from "react-markdown";
import CodeBlock from "../../components/CodeBlock";

class Box extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className='p-3'>
                <div className="markdown-body">
                    <ReactMarkdown source={this.state.content} renderers={{code:CodeBlock}}/>
                </div>
            </div>
        );
    }
}

export default Box;