import React from 'react';

interface Props {
    id      ?: string
    text    ?: string
    active  ?: boolean
    fade    ?: boolean
    disabled?: boolean
    onClick ?: () => void
}

export class TabsContent extends React.PureComponent<Props> {

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