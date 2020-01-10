import React, { Component } from 'react';

function App(props) {
  const alertName = () => {
    alert('John Doe');
  };

  const methodName = () => {
    console.log('test');
  };

  return <div>
        <button onClick={alertName}> Alert </button>
		<input type='checkbox' onChange={methodName} />
      </div>;
}

export default App;