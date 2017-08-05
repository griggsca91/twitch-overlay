import React, { Component } from 'react';

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.content = props.content;
  }
  render() {
    return <li> 
      {this.content}
      </li>
  }
}