import React, { Component } from 'react';

export default class MessageBox extends Component {

  render() {
    return <div className="MessageBox">
      <ul>{this.props.messages}</ul>
      </div>
  }
}