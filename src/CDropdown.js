import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import common from "./Common";
import './css/Dropdown.less';

class CDropdown extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text,
            value: '',
            list: this.props.data,
        };

        if (!this.props.id) {
            this.props.id = 'cdrop-'+common.RandomString(16);
        }
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProp) {
        this.setState({
            text: nextProp.text,
            list: nextProp.data
        })
    }

    getClasses() {
        let base = 'form-group';

        return classNames(base,this.props.className);
    }

    getStyles() {
        //default style
        let base = {"position": "relative"};
        if (this.props.width) {
            base.width = this.props.width;
        }
        if (this.props.height) {
            base.height = this.props.height;
        }
        if (this.props.absolute) {
            base.position = 'absolute';
        }
        if (this.props.x) {
            base.left = this.props.x;
        }
        if (this.props.y) {
            base.top = this.props.y;
        }
        if (!this.props.label) {
            base.marginBottom = '0';
        }

        return common.extend(base, this.props.style)
    }

    getDropClasses() {
        let base = 'form-control ck-dropdown';
        return classNames(base, this.props.dropClass);
    }

    getDropStyles() {

    }

    renderLabel() {
        if (this.props.label === '') {
            return null;
        }
        return (
            <label htmlFor={this.domId}>{this.props.label}</label>
        )
    }

    renderList() {
        return (
            <div className='ck-dropdown-list'>

            </div>
        )
    }

    render() {
        return (
            <div className={this.getClasses()} style={this.getStyles()}>
                {this.renderLabel()}
                <div className={this.getDropClasses()} style={this.getDropStyles()}>
                    {this.state.text}
                </div>
                {this.renderList()}
            </div>
        );
    }
}

CDropdown.propTypes = {
    data: PropTypes.array,
    text: PropTypes.string,
    onChange: PropTypes.func,
    width: PropTypes.string,
    height:PropTypes.string,
    absolute: PropTypes.bool,
    x: PropTypes.string,
    y: PropTypes.string,
    label: PropTypes.string,
    dropClass: PropTypes.string
};

CDropdown.defaultProps = {
    data: [],
    text: '',
};

export default CDropdown;