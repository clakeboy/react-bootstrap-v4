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
        let active;
        if (React.Children.count(this.props.children)) {
            let list = [];
            React.Children.forEach(this.props.children, (item, key) => {
                if (item.type === CDropdownValue) {
                    list.push({
                        text: item.props.text,
                        value: item.props.value,
                    });
                    if (item.props.active) {
                        active = item.props.text;
                    }
                }
            });
            this.listData = list;
        }
        return (
            <Input className={this.props.className} width={this.props.width} combo={{
                searchColumn:'text',
                noSearch:true,
                width: this.props.dropWidth,
                filterColumns: ['text'],
                showRows: this.props.showRows,
            }} comboData={this.listData} label={this.props.label} readOnly
                   onChange={this.props.onChange}
                   placeholder={this.props.text}
                   data={active??this.props.data}
                   size={this.props.size}
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
    size: PropTypes.string,
    dropWidth: PropTypes.string,
    width: PropTypes.string,
};

CDropdown.defaultProps = {
    data: '',
    text: '',
    showRows: 5,
    dropWidth: '100%',
};

class CDropdownValue extends React.Component {}
CDropdownValue.propTypes = {
    text: PropTypes.string,
    value: PropTypes.string,
    active: PropTypes.bool
};

CDropdown.Value = CDropdownValue;

export default CDropdown;