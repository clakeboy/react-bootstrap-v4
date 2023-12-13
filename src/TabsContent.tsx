import React from 'react';
import { ComponentProps } from './components/common';

interface Props extends ComponentProps{
    id      ?: string
    text    ?: string
    active  ?: boolean
    fade    ?: boolean
    disabled?: boolean
    onClick ?: () => void
}

export class TabsContent extends React.PureComponent<Props,any,any> {
    static defaultProps = {
        fade: false,
    };
    constructor(props:any) {
        super(props);
    }

    render() {
        return null;
    }
}

export default TabsContent;