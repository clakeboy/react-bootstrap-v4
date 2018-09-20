import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import common from "./Common";

class CCheckbox extends React.PureComponent {
    constructor(props) {
        super(props);

        this.domId = 'ccheck-'+common.RandomString(16);
        if (this.props.id) {
            this.domId = this.props.id;
        }
    }


    getClasses() {
        let base = 'custom-control custom-checkbox';
        if (this.props.inline) {
            base = classNames(base,'custom-control-inline');
        }

        return classNames(base,this.props.className);
    }

    render() {
        return (
            <div className={this.getClasses()}>
                <input type="checkbox" className="custom-control-input" id={this.domId}/>
                <label className="custom-control-label" htmlFor={this.domId}>{this.props.label}</label>
            </div>
        );
    }
}

CCheckbox.propTypes = {
    inline: PropTypes.bool,
    id: PropTypes.string,
    label: PropTypes.string,
};

CCheckbox.defaultProps = {

};

export default CCheckbox;