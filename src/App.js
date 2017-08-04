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

    this.pass = "";
    this.nick = "bad_hombres";
    this.channel = "jumpystick";
    this.socket = new WebSocket("ws://irc-ws.chat.twitch.tv:80", "irc");
    this.socket.onopen = () => {
      this.socket.send("CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership");
      this.socket.send(`PASS ${this.pass}`);
      this.socket.send(`NICK ${this.nick}`);
      this.socket.send(`USER ${this.nick} 8 * :${this.nick}`)
      this.socket.send(`JOIN #${this.channel}`);
      console.log("opened");
    };

    this.socket.onerror = (e) => {
      console.log(e);
    };

    this.addMessage = this.addMessage.bind(this);
    this.socket.onmessage = this.addMessage;


    this.state = {
      messages: [] 
    }
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
