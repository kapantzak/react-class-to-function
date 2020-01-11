import React, { Component } from "react";

function App(props) {
  constructor(props) {
    super(props);
    state = {
      count: 0
    };
    methodName = methodName.bind(this);
  }

  const methodName = () => {
    console.log(props.name);
  };

  return <div>
        <input type="checkbox" onChange={methodName} />
      </div>;
}

export default App;