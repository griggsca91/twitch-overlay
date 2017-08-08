import React, { Component } from 'react';
import './Message.css';

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.userName = props.userName;
    this.message = props.message;
  }
  render() {
    return <li>
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