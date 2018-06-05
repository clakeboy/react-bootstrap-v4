import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import './css/Load.less';

class Load extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    componentDidMount() {

    }

    getClasses() {
        let base = 'ck-load';

        return classNames(base,this.props.className);
    }

    render() {
        return (
            <div className={this.getClasses()}>
                <span className='ck-load-circle ck-load-small'/>
                <span className='ck-load-circle ck-load-big'/>
                <span className='ck-load-circle ck-load-small'/>
                {<span>{'\u0020'}{this.props.children}</span>||null}
            </div>
        );
    }
}

Load.propTypes = {

};

Load.defaultProps = {

};

export default Load;