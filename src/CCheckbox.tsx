import React from 'react';
import classNames from 'classnames/bind';
import common from './Common';
import Icon from './Icon';
import './css/CCheck.less';
import { ComponentProps, StrObject } from './components/common';

interface Props extends ComponentProps {
    inline?: boolean;
    label?: string;
    checked?: boolean;
    onChange?: (checked: boolean, e?: Event) => void;
    half?: boolean;
}

interface State {
    checked: boolean;
    half: boolean;
}

export class CCheckbox extends React.Component<Props, State> {
    static defaultProps = {
        label: '',
        checked: false,
        disabled: false,
        inline: false,
        half: false,
        tabIndex: '0',
    };

    domId: string;

    icon: Icon;

    constructor(props: any) {
        super(props);

        this.domId = 'ccheck-' + common.RandomString(16);
        if (this.props.id) {
            this.domId = this.props.id;
        }

        this.state = {
            checked: this.props.checked ?? false,
            half: this.props.half ?? false,
        };
    }

    UNSAFE_componentWillReceiveProps(nextProp: Props) {
        this.setState({ checked: nextProp.checked ?? false, half: nextProp.half ?? false });
    }

    shouldComponentUpdate(nextProps: Props, nextState: State) {
        if (nextProps.disabled !== this.props.disabled) {
            return true;
        }
        if (nextProps.label !== this.props.label) {
            return true;
        }
        if (nextState.half !== this.state.half) {
            return true;
        }
        return nextState.checked !== this.state.checked;
    }

    getClasses() {
        let base = 'ck-check';
        if (this.props.inline) {
            base = classNames(base, 'ck-check-inline');
        }

        if (this.props.disabled) {
            base = classNames(base, 'ck-check-disabled');
        }

        if (this.props.absolute) {
            base = classNames(base, 'position-absolute');
        }

        return classNames(base, this.props.className);
    }

    getStyles() {
        const base: StrObject = {};
        if (this.props.absolute) {
            base.top = this.props.y ?? '';
            base.left = this.props.x ?? '';
        }
        return base;
    }

    setValue = this.setChecked;

    setChecked(checked: boolean) {
        this.setState({ checked: checked, half: false });
    }

    setHalf(flag: boolean) {
        this.setState({ half: flag });
    }

    getChecked() {
        return this.state.checked;
    }

    getCheckedIcon(t: string) {
        if (this.state.half) {
            if (t === 'icon') {
                return 'minus-square';
            }

            if (t === 'type') {
                return 'solid';
            }
        }

        if (t === 'icon') {
            return this.state.checked ? 'check-square' : 'square';
        }

        if (t === 'type') {
            return this.state.checked ? 'solid' : 'regular';
        }
    }

    changeHandler = (e: any) => {
        if (this.props.disabled) return;
        const chk = !this.state.checked;
        this.setState({ checked: chk, half: false });
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(chk, e);
        }
    };

    keyUpHandler = (e: any) => {
        if (this.props.disabled) return;
        if (e.key !== 'Enter' && e.key !== ' ') return;
        const chk = !this.state.checked;
        this.setState({ checked: chk, half: false });
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(chk, e);
        }
    };

    render() {
        return (
            <div
                {...(this.props as any)}
                className={this.getClasses()}
                style={this.getStyles()}
                onKeyUp={this.keyUpHandler}
                onClick={this.changeHandler}>
                <Icon
                    ref={(c: any) => (this.icon = c)}
                    className="ck-check-icon"
                    icon={this.getCheckedIcon('icon')}
                    iconType={this.getCheckedIcon('type')}
                />
                {this.props.label === '' ? null : <span className="ck-check-label">{this.props.label}</span>}
            </div>
        );
    }
}

export default CCheckbox;
