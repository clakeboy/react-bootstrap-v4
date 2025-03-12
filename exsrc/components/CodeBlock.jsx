/**
 * Created by clakeboy on 2020/3/26.
 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

class CodeBlock extends PureComponent {
    static propTypes = {
        value: PropTypes.string.isRequired,
        language: PropTypes.string
    };

    static defaultProps = {
        language: null
    };

    render() {
        const { language, value } = this.props;
        return (
            <>
                <SyntaxHighlighter showLineNumbers language={language} style={dark}>
                    {value}
                </SyntaxHighlighter>
            </>
        );
    }
}

export default CodeBlock;