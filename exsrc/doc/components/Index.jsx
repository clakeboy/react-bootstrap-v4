/**
 * Created by clakeboy on 2020/3/30.
 */
import React from 'react';

import '../../../src/css/Triangle.less';
class Index extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                Index
                <div className='ck-triangle ck-triangle-top border border-dark w-auto position-absolute p-2'>
                    <p>asdfasdfa</p>
                    <p>asdfkkkk</p>
                    <p>32342k3j423</p>
                </div>
            </div>
        );
    }
}

export default Index;