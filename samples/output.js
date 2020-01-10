import React, { Component } from 'react';

function App(props) {
  const alertName = () => {
    alert('John Doe');
  };

  render() {
    return <div>
        <h3> This is a Class Component </h3>
        <button onClick={this.alertName}> Alert </button>
      </div>;
  }
}

function App2(props) {
  const alertName2 = () => {
    alert('John Doe');
  };

  render() {
    return <div>
        <h3> This is a Class Component </h3>
        <button onClick={this.alertName}> Alert </button>
      </div>;
  }
}

export default App;