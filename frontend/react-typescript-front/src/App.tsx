import React, { FC } from "react";
import "./App.css";

const App: FC = () => {
  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input type="text" placeholder="Task..." />
          <input type="text" placeholder="Test..." />
        </div>
        <button>Add Person</button>
      </div>
      <div className="peopleList"></div>
    </div>
  );
};

export default App;
