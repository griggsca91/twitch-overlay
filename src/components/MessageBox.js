import React, { Component } from 'react';
import './MessageBox.css';

export default class MessageBox extends Component {

  render() {
    return <div className="MessageBox">
      <ul>{this.props.messages}</ul>
      </div>
  }
}