import React from 'react';
import classNames from 'classnames/bind';
import common from './Common';
import { ComponentProps, StrObject } from './components/common';

interface Props extends ComponentProps {
  label?: string;
  inline?: boolean;
  data?: any;
  checked?: boolean;
  onChange?: (evt?: any, obj?: any) => void;
}

interface State {
  value: any;
  checked: boolean;
}

export class Checkbox extends React.Component<Props, State> {

  static defaultProps = {
    inline: false,
    label: '',
  };
  domId: string;
  constructor(props: any) {
    super(props);

    this.state = {
      value: this.props.data??'',
      checked: this.props.checked??false,
    };

    this.domId = 'check-' + common.RandomString(16);
    if (this.props.id) {
      this.domId = this.props.id;
    }
  }

  UNSAFE_componentWillReceiveProps(nextProp: Props) {
    this.setState({ checked: nextProp.checked??false });
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    if (nextProps.disabled !== this.props.disabled) {
      return true;
    }
    if (nextProps.label !== this.props.label) {
      return true;
    }
    return nextState.checked !== this.state.checked;
  }

  /**
   * get checked
   * @returns {Boolean|*}
   */
  getChecked() {
    return this.state.checked;
  }

  /**
   * set checked
   * @param val
   */
  setChecked(val: boolean) {
    this.setState({ checked: val });
  }

  getClasses() {
    let base = 'form-check';
    if (this.props.inline) {
      base = classNames(base, 'form-check-inline');
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

  /*********************
   * Event
   *********************/
  changeHandler = (e: React.ChangeEvent) => {
    this.setState({
      checked: (e.target as HTMLInputElement).checked,
    });

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(e, this);
    }
  };

  /*********************
   * render method
   *********************/
  render() {
    // console.log('render Checkbox');
    const inProps:Props = {...this.props}
    delete inProps.absolute
    delete inProps.inline
    delete inProps.half
    return (
      <div className={this.getClasses()} style={this.getStyles()}>
        <input
          {...(inProps as any)}
          onChange={this.changeHandler}
          checked={this.state.checked}
          className="form-check-input"
          type="checkbox"
          id={this.domId}
        />
        <label className="form-check-label" htmlFor={this.domId}>
          {this.props.label}
        </label>
      </div>
    );
  }
}

export default Checkbox;
