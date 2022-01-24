import React, { FC, ChangeEvent, useState } from "react";
import { IPerson } from "./Interfaces";
import PersonList from "./Components/PersonList";
import "./App.css";

const App: FC = () => {
  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [pList, setPList] = useState<IPerson[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "fnameIn") {
      setFname(event.target.value);
    } else if (event.target.name === "lnameIn") {
      setLname(event.target.value);
    } else {
      setAge(Number(event.target.value));
    }
  };

  const addPerson = (): void => {
    const newPerson = { firstName: fname, lastName: lname, age: age };
    setPList([...pList, newPerson]);
    setFname("");
    setLname("");
    setAge(0);
  };
  // implement with id
  const deletePerson = (personToDelete: string): void => {
    setPList(
      pList.filter((person) => {
        return person.firstName != personToDelete;
      })
    );
  };

  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input
            type="text"
            placeholder="First name..."
            name="fnameIn"
            value={fname}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Last name..."
            name="lnameIn"
            value={lname}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Age..."
            name="ageIn"
            value={age}
            onChange={handleChange}
          />
        </div>
        <button onClick={addPerson}>Add Person</button>
      </div>
      <div className="peopleList">
        {pList.map((person: IPerson, key: number) => {
          return (
            <PersonList key={key} person={person} deletePerson={deletePerson} />
          );
        })}
      </div>
    </div>
  );
};

export default App;
