import React, { Component } from 'react';
import './MessageRow.css';

export default class MessageRow extends Component {
  constructor(props) {
    super(props);
    this.userName = props.userName;
    this.message = props.message;
  }
  render() {
    return <li className="MessageRow">
        <p>
        <span className="username">
      {this.userName}: 
      </span>
      <span className="message">
          {this.message}
          </span>
          </p>
      </li>
  }
}