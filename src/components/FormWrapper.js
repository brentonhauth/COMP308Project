import React from 'react';
import Toast from '../helpers/Toast';


/**
 * @typedef FormWrapperProps
 * @property {(data:any)=>Promise<void>} onSubmit
 */

/**
 * @extends {React.Component<FormWrapperProps>}
 */
export default class FormWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sending: false };
    this.trySending = this.trySending.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async trySending(data) {
    this.setState({ sending: true });
    try {
      await this.props.onSubmit(data);
    } catch (e) {
      Toast.error(e);
    }
    this.setState({ sending: false });
  }

  /**
   * @param {Event} event
   */
  onSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      const formData = new FormData(form);
      const data = {};
      formData.forEach((v, k) => data[k] = v);
      this.trySending(data);
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        {this.props.children(this.state.sending)}
      </form>
    );
  }
}
