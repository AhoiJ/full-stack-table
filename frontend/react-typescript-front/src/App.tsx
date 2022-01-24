import React, { Component, ReactNode } from "react";
import { IPerson } from "./Interfaces";
import PersonList from "./Components/PersonList";
import "./App.css";
import axios from "axios";

class App extends Component {
  state = {
    peopleList: [],
    fName: "",
    lName: "",
    age: 0,
  };

  componentDidMount(): void {
    axios.get("http://localhost:4000/people").then((res) => {
      const peopleList = res.data;
      this.setState({ peopleList });
      console.log(peopleList);
    });
  }

  render(): ReactNode {
    return (
      <div className="app">
        <h1>{this.state.age}</h1>
      </div>
    );
  }
}

export default App;
