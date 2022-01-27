import React, { Component, ReactNode } from "react";
import { IPerson } from "./Interfaces";
import "./App.css";
import axios from "axios";
import EdiTable from "./Components/EdiTable";

interface Test {
  peopleList: [];
  fName: string;
  lName: string;
  age: number;
}

class App extends Component<{}, Test> {
  constructor(props: any) {
    super(props);
    this.state = {
      peopleList: [],
      fName: "",
      lName: "",
      age: 0,
    };
  }

  componentDidMount(): void {
    axios.get("http://localhost:4000/people").then((res) => {
      const peopleList = res.data;
      this.setState({ peopleList });
      console.log(peopleList);
    });
  }

  componentDidUpdate(): void {
    axios.get("http://localhost:4000/people").then((res) => {
      const peopleList = res.data;
      this.setState({ peopleList });
      //console.log(peopleList);
    });
  }

  handleChange = (e: any) => {
    if (e.target.name === "fnameIn") {
      this.setState({ fName: e.target.value });
    } else if (e.target.name === "lnameIn") {
      this.setState({ lName: e.target.value });
    } else {
      this.setState({ age: e.target.value });
    }

    console.log(this.state);
  };

  addPerson() {
    const firstname = this.state.fName;
    const lastname = this.state.lName;
    const age = this.state.age;

    // important to keep as fname, lname, age
    axios
      .post("http://localhost:4000/people", {
        fname: firstname,
        lname: lastname,
        age: age,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    this.setState({ fName: "", lName: "", age: 0 });
    this.componentDidMount();
    window.location.reload();
  }

  render(): ReactNode {
    return (
      <div className="App">
        <div className="header">
          <div className="inputContainer">
            <input
              type="text"
              placeholder="First name..."
              name="fnameIn"
              value={this.state.fName}
              onChange={this.handleChange}
            />
            <input
              type="text"
              placeholder="Last name..."
              name="lnameIn"
              value={this.state.lName}
              onChange={this.handleChange}
            />
            <input
              type="text"
              placeholder="Age..."
              name="ageIn"
              value={this.state.age}
              onChange={this.handleChange}
            />
          </div>
          <button onClick={() => this.addPerson()}>Add Person</button>
        </div>
        <div className="peopleList">
          <EdiTable />
        </div>
      </div>
    );
  }
}

export default App;
