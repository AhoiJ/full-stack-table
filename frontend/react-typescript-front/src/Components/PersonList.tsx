import React from "react";
import { IPerson } from "./../Interfaces";

interface Props {
  person: IPerson;
}

const PersonList = ({ person }: Props) => {
  return (
    <div className="person">
      <div className="content">
        <span>{person.firstName}</span>
        <span>{person.lastName}</span>
        <span>{person.age}</span>
      </div>
      <button>Del</button>
    </div>
  );
};

export default PersonList;
