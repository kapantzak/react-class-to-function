import React, { Component } from "react";

function App(props) {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("John");

  const methodName = () => {
    state.name = "John";
  };

  return <div>
        <input type="checkbox" onChange={methodName} />
      </div>;
}

export default App;