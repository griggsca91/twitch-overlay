import React, { Component } from 'react';
import Message from './Message.js';
import { formatChatMessage } from '../Utils.js';

export default class MessageBox extends Component {

  constructor(props) {
    super(props);

    this.config = {
      pass : "",
      nick : "bad_hombres",
      channel : "moonmoon_ow",
      URI : "ws://irc-ws.chat.twitch.tv:80",
    };

    this.socket = new WebSocket(this.config.URI, "irc");

    // When the socket open, send the messages to log into the IRC channel
    this.socketOpen = this.socketOpen.bind(this);
    this.socket.onopen = this.socketOpen;

    // Lets track errors
    this.socketError = this.socketError.bind(this);
    this.socket.onerror = this.socketError;

    // Add the message function where it updates the state
    this.addMessage = this.addMessage.bind(this);
    this.socket.onmessage = this.addMessage;

    // Initialize the state variable to begin adding messages to it
    this.state = {
      messages: [],
      messageCount: 0
    }
  }


  socketOpen() {
      this.socket.send("CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership");
      this.socket.send(`PASS ${this.config.pass}`);
      this.socket.send(`NICK ${this.config.nick}`);
      this.socket.send(`USER ${this.config.nick} 8 * :${this.config.nick}`)
      this.socket.send(`JOIN #${this.config.channel}`);
      console.log("opened");
  }
  // TODO: Should figure out what to do once I know all the errors
  socketError(err) {
    console.log("Error: ", err);
  }

  
  /**
   * 
   * 
   * @param {string} data 
   * @memberof MessageBox
   */
  addMessage(data) {

    
    let content = formatChatMessage(data.data);

    if (!content.length) {
        return;
    }    

    this.setState((prevState) => {
        let messages = prevState.messages;
        let messageCount = prevState.messageCount;
    
        
        if (messages.length >= 10) {
            messages.shift();
        }
        messages.push(<Message
            key={messageCount}
            content={content} />);

        return {
            messages: messages,
            messageCount: ++messageCount 
        }
    });
  }

  render() {
    return <div className="MessageBox">
      <ul>{this.state.messages}</ul>
      </div>
  }
}