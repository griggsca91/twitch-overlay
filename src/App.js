import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Message extends Component {
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

class MessageBox extends Component {



  constructor(props) {
    super(props);

    this.config = {
      pass : "",
      nick : "bad_hombres",
      channel : "jumpystick",
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
      messages: [] 
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

  addMessage(data) {
    this.setState((prevState) => {
      let messages = prevState.messages;

      messages.push(<Message key={messages.length}
                content={data.data} />);

      return {
        messages: messages
      }
    })  
  }

  render() {
    return <div className="MessageBox">
      <ul>{this.state.messages}</ul>
      </div>
  }
}

class App extends Component {

  constructor(props) {
    super(props);


  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <MessageBox />
      </div>
    );
  }
}

export default App;
