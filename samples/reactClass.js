import React, { Component } from 'react';

class App extends Component {

  alertName = () => {
    alert('John Doe');
  };
  
  methodName = () => {
	console.log('test');
  }
  
  //componentDidMount() {
    //console.log("");
  //}

  render() {
    return (
      <div>
        <button onClick={this.alertName}> Alert </button>
		<input type='checkbox' onChange={this.methodName} />
      </div>
    );
  }
}

export default App;