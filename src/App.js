import React, { Component } from 'react';
import './App.css';
import MessageBox from './components/MessageBox.js';
import { parseChatMessage } from './Utils.js';
import Message from './components/Message.js';


class App extends Component {

  constructor(props) {
    super(props);

    this.config = {
      pass : "",
      nick : "bad_hombres",
      channel : "bad_hombres",
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
    this.onMessage = this.onMessage.bind(this);
    this.socket.onmessage = this.onMessage;


    this.addMessage = this.addMessage.bind(this);


    this.state = {
      messages : [],
      messageCount: 0
    };

  }


  onMessage(data) {
    this.addMessage(data.data)
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


  addMessage(message) {

    let content = parseChatMessage(message);

    if (!content) {
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
            userName={content.userName}
            message={content.message} />);

        return {
            messages: messages,
            messageCount: ++messageCount 
        }
    });
  }


  render() {
    return (
      <div className="App">
        <MessageBox
            messages={this.state.messages} />
      </div>
    );
  }
}

export default App;
