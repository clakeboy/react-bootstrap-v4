import React from 'react';
import PropTypes from 'prop-types';
import Input from "./Input";

class CDropdown extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        if (React.Children.count(this.props.children)) {
            React.Children.forEach(this.props.children, (item, key) => {
                let list = [];
                if (item.type === CDropdownValue) {
                    list.push({
                        text: item.props.text,
                        value: item.props.value,
                    })
                }
                this.props.data = list;
            });
        }
        return (
            <Input combo={{
                width: '100%',
                filterColumns: ['text'],
                showRows: this.props.showRows,
                data: this.props.data
            }} label={this.props.label} readOnly
                   onChange={this.props.onChange}
                   placeholder={this.props.text}
                   data={this.props.value}
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