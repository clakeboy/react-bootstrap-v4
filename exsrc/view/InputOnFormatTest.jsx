import React from 'react';
import Input from '../../src/Input';

export default class InputOnFormatTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1234567.89
        };
    }

    render() {
        return (
            <div className="container mt-5">
                <h1>Input onFormat Test</h1>
                <div className="card mb-3">
                    <div className="card-body">
                        <h5>Case 1: Currency Format</h5>
                        <p>Value should be formatted as currency on blur, and raw number on focus.</p>
                        <Input
                            label="Amount"
                            data={this.state.value}
                            onChange={(val) => {
                                console.log('onChange:', val);
                                this.setState({ value: val });
                            }}
                            onFormat={(val) => {
                                console.log('onFormat called with:', val);
                                if (!val) return '';
                                return `$${Number(val).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
                            }}
                        />
                        <div className="mt-2">
                            <strong>Current State Value:</strong> {this.state.value}
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <h5>Case 2: Phone Number Format</h5>
                        <Input
                            label="Phone (1234567890 -> (123) 456-7890)"
                            onFormat={(val) => {
                                if (!val) return '';
                                const cleaned = ('' + val).replace(/\D/g, '');
                                const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
                                if (match) {
                                    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
                                }
                                return val;
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
