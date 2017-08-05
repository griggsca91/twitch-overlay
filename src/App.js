import React, { Component } from 'react';
import './App.css';
import MessageBox from './components/MessageBox.js';


class App extends Component {

  render() {
    return (
      <div className="App">
        <MessageBox />
      </div>
    );
  }
}

export default App;
