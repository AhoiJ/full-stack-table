import React, { Component, ReactNode } from "react";
import { IPerson } from "./Interfaces";
//import PersonList from "./Components/PersonList";
import "./App.css";
import axios from "axios";
//import Table from "./Components/Table";
import EdiTable from "./Components/EdiTable";

interface Test {
  peopleList: [];
  fName: string;
  lName: string;
  age: number;
  modfName: string;
  modlName: string;
  modAge: number;
}

class App extends Component<{}, Test> {
  constructor(props: any) {
    super(props);
    this.state = {
      peopleList: [],
      fName: "",
      lName: "",
      age: 0,
      modfName: "",
      modlName: "",
      modAge: 0,
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
    } else if (e.target.name === "ageIn") {
      this.setState({ age: e.target.value });
    }
    if (e.target.name === "fnameMod") {
      this.setState({ modfName: e.target.value });
    } else if (e.target.name === "lnameMod") {
      this.setState({ modlName: e.target.value });
    } else if (e.target.name === "ageMod") {
      this.setState({ modAge: e.target.value });
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
  }

  deletePerson = (personToDelete: number): void => {
    axios
      .delete("http://localhost:4000/people/" + String(personToDelete))
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    this.componentDidUpdate();
  };

  modifyPerson = (personToModify: number): void => {
    const firstname = this.state.modfName;
    const lastname = this.state.modlName;
    const age = this.state.modAge;
    if (firstname && lastname !== "")
      axios
        .put("http://localhost:4000/people/" + String(personToModify), {
          fname: firstname,
          lname: lastname,
          age: age,
          id: personToModify,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    this.componentDidUpdate();
  };

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
          <div className="modifyContainer">
            <input
              type="text"
              placeholder="First name to modify"
              name="fnameMod"
              value={this.state.modfName}
              onChange={this.handleChange}
            />
            <input
              type="text"
              placeholder="Last name to modify"
              name="lnameMod"
              value={this.state.modlName}
              onChange={this.handleChange}
            />
            <input
              type="text"
              placeholder="Age..."
              name="ageMod"
              value={this.state.modAge}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="peopleList">
          <EdiTable />
        </div>
      </div>
    );
  }
}

export default App;

/*
  <Table
            peopleList={this.state.peopleList}
            deletePerson={this.deletePerson}
            modifyPerson={this.modifyPerson}
          />
*/

/* 
 {this.state.peopleList.map((person: IPerson, key: number) => {
            return (
              <PersonList
                key={key}
                person={person}
                deletePerson={this.deletePerson}
                modifyPerson={this.modifyPerson}
              />
            );
          })}
*/
