import React, { Component } from 'react';
import Footer from './Footer';
import HeaderB from './HeaderB';

export default class LayoutB extends Component {
  render() {
    return (
      <>
        <HeaderB />
        {this.props.children}
        <Footer />
      </>
    );
  }
}
