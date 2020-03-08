import React from 'react';
import PropTypes from 'prop-types';
import Input from "./Input";

class CDropdown extends React.Component {
    constructor(props) {
        super(props);

        this.listData = this.props.data;
        this.state = {
            data:this.props.data
        };
    }

    render() {
        if (React.Children.count(this.props.children)) {
            let list = [];
            React.Children.forEach(this.props.children, (item, key) => {
                if (item.type === CDropdownValue) {
                    list.push({
                        text: item.props.text,
                        value: item.props.value,
                    })
                }
            });
            this.listData = list;
        }
        return (
            <Input className={this.props.className} combo={{
                width: '100%',
                filterColumns: ['text'],
                showRows: this.props.showRows
            }} comboData={this.listData} label={this.props.label} readOnly
                   onChange={this.props.onChange}
                   placeholder={this.props.text}
                   data={this.state.data}
            />
        );
    }
}

CDropdown.propTypes = {
    data: PropTypes.array,
    text: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    showRows: PropTypes.number,
};

CDropdown.defaultProps = {
    data: [],
    text: '',
    showRows: 5,
};

class CDropdownValue extends React.Component {}
CDropdownValue.propTypes = {
    text: PropTypes.string,
    value: PropTypes.string
};

CDropdown.Value = CDropdownValue;

export default CDropdown;