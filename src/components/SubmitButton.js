import React, { Component } from 'react';

export default class SubmitButton extends Component {
  render() {
    return (
      <button type="submit" className="submit-button text-center my-3 fs-5">
        {this.props.children}
      </button>
    );
  }
}
