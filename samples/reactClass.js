import React, { Component } from 'react';

class App extends Component {

  alertName = () => {
    alert('John Doe');
  };

  render() {
    return (
      <div>
        <h3> This is a Class Component </h3>
        <button onClick={this.alertName}> Alert </button>
      </div>
    );
  }
}

class App2 extends Component {
	
  alertName2 = () => {
    alert('John Doe');
  };

  render() {
    return (
      <div>
        <h3> This is a Class Component </h3>
        <button onClick={this.alertName}> Alert </button>
      </div>
    );
  }
}

export default App;